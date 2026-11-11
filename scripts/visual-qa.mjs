import { spawnSync } from "node:child_process";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const AB_CLI = resolve(
  process.cwd(),
  "node_modules",
  "agent-browser",
  "bin",
  "agent-browser.js",
);

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "desktop", width: 1440, height: 900 },
];

function parseArgs(argv) {
  const args = {
    url: null,
    out: "artifacts/visual-qa",
    session: null,
    strict: false,
    keepOpen: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--url") args.url = argv[++i];
    else if (arg === "--out") args.out = argv[++i];
    else if (arg === "--session") args.session = argv[++i];
    else if (arg === "--strict") args.strict = true;
    else if (arg === "--keep-open") args.keepOpen = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/visual-qa.mjs --url <url> [options]

Options:
  --url <url>       Running site URL (required)
  --out <dir>       Output directory (default: artifacts/visual-qa)
  --session <name>  agent-browser session name
  --strict          Exit 1 when automated checks find issues
  --keep-open       Leave the browser session open for manual inspection
  -h, --help        Show this help

This script captures screenshots and measurements. It does NOT grant a visual
pass. Open every screenshot with an image-capable reviewer and record findings
in docs/06-visual-qa.md.`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  if (!args.url) throw new Error("--url is required.");
  return args;
}

function runAgent(args, { allowFailure = false, json = false } = {}) {
  const finalArgs = json ? ["--json", ...args] : args;
  const result = spawnSync(process.execPath, [AB_CLI, ...finalArgs], {
    cwd: process.cwd(),
    encoding: "utf8",
    maxBuffer: 30 * 1024 * 1024,
    windowsHide: true,
  });
  if (result.error) throw result.error;
  if (result.status !== 0 && !allowFailure) {
    throw new Error(
      `agent-browser ${args.join(" ")} failed (${result.status}): ${(
        result.stderr || result.stdout
      ).trim()}`,
    );
  }
  return result;
}

function runJson(args) {
  const result = runAgent(args, { json: true });
  const parsed = JSON.parse(result.stdout);
  if (parsed.error) throw new Error(parsed.error.message || String(parsed.error));
  return parsed;
}

function sessionName() {
  const parsed = runJson(["session", "id", "--scope", "worktree", "--prefix", "visual-qa"]);
  return parsed.data.session;
}

function safeSessionName(value) {
  return String(value).replace(/[^a-zA-Z0-9_-]/g, "-");
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

const METRICS_SCRIPT = `(() => {
  const doc = document.documentElement;
  const images = Array.from(document.images).map((img) => ({
    src: img.currentSrc || img.getAttribute("src") || "",
    alt: img.getAttribute("alt"),
    complete: img.complete,
    naturalWidth: img.naturalWidth,
    naturalHeight: img.naturalHeight,
    renderedWidth: Math.round(img.getBoundingClientRect().width),
    renderedHeight: Math.round(img.getBoundingClientRect().height)
  }));
  const controls = Array.from(document.querySelectorAll("input, select, textarea"))
    .filter((el) => el.type !== "hidden")
    .map((el) => {
      const id = el.id;
      const explicit = id ? document.querySelector('label[for="' + CSS.escape(id) + '"]') : null;
      const wrapped = el.closest("label");
      return {
        tag: el.tagName.toLowerCase(),
        type: el.type || "",
        name: el.name || "",
        hasLabel: Boolean(explicit || wrapped || el.getAttribute("aria-label") || el.getAttribute("aria-labelledby"))
      };
    });
  const unnamedInteractive = Array.from(document.querySelectorAll('a, button, [role="button"]'))
    .filter((el) => {
      const text = (el.innerText || el.textContent || "").trim();
      const aria = el.getAttribute("aria-label") || "";
      const title = el.getAttribute("title") || "";
      const imgAlt = el.querySelector("img") ? el.querySelector("img").getAttribute("alt") || "" : "";
      return !(text || aria || title || imgAlt);
    })
    .map((el) => el.outerHTML.slice(0, 240));
  return {
    title: document.title,
    url: location.href,
    lang: doc.lang || "",
    viewport: { width: window.innerWidth, height: window.innerHeight, dpr: window.devicePixelRatio },
    scroll: {
      documentScrollWidth: doc.scrollWidth,
      documentClientWidth: doc.clientWidth,
      bodyScrollWidth: document.body ? document.body.scrollWidth : null,
      overflowX: doc.scrollWidth > window.innerWidth + 1
    },
    headings: Array.from(document.querySelectorAll("h1, h2, h3, h4, h5, h6")).map((el) => ({
      level: Number(el.tagName.slice(1)),
      text: (el.innerText || "").trim().slice(0, 160)
    })),
    landmarks: document.querySelectorAll('main, header, nav, footer, aside, [role="main"]').length,
    images: {
      total: images.length,
      broken: images.filter((img) => !img.complete || img.naturalWidth === 0),
      missingAlt: images.filter((img) => img.alt === null).length
    },
    controls: {
      total: controls.length,
      unlabeled: controls.filter((control) => !control.hasLabel)
    },
    unnamedInteractive
  };
})()`;

function evalMetrics(session) {
  const base64 = Buffer.from(METRICS_SCRIPT, "utf8").toString("base64");
  const parsed = runJson(["--session", session, "eval", "-b", base64]);
  if (parsed.data?.result === undefined) {
    throw new Error("Could not read page metrics from agent-browser.");
  }
  return parsed.data.result;
}

function collectConsole(session) {
  const parsed = runJson(["--session", session, "console"]);
  return (parsed.data?.messages || []).map((message) => ({
    type: message.type,
    text: message.text,
  }));
}

function collectErrors(session) {
  const parsed = runJson(["--session", session, "errors"]);
  return (parsed.data?.errors || []).map((error) => ({
    text: error.text,
    url: error.url || null,
    line: error.line || null,
    column: error.column || null,
  }));
}

function collectA11y(session) {
  const parsed = runJson(["--session", session, "a11y"]);
  const data = parsed.data || {};
  return {
    axeVersion: data.axeVersion || null,
    counts: data.counts || null,
    violations: (data.violations || []).map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      help: violation.help,
      helpUrl: violation.helpUrl,
      nodeCount: violation.nodeCount,
      nodes: (violation.nodes || []).slice(0, 5),
    })),
    incomplete: (data.incomplete || []).map((item) => ({
      id: item.id,
      impact: item.impact,
      help: item.help,
      nodeCount: item.nodeCount,
    })),
  };
}

function isIssue(viewport) {
  return (
    viewport.metrics.scroll.overflowX ||
    viewport.metrics.images.broken.length > 0 ||
    viewport.metrics.images.missingAlt > 0 ||
    viewport.metrics.controls.unlabeled.length > 0 ||
    viewport.metrics.unnamedInteractive.length > 0 ||
    viewport.consoleErrors.length > 0 ||
    viewport.pageErrors.length > 0 ||
    viewport.a11y.violations.some((violation) =>
      ["critical", "serious"].includes(violation.impact),
    )
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const session = options.session || sessionName();
  const runId = stamp();
  const outputDir = resolve(process.cwd(), options.out, runId);
  await mkdir(outputDir, { recursive: true });

  console.log(`Visual QA: ${options.url}`);
  console.log(`Session:   ${session}`);
  console.log(`Output:    ${outputDir}`);

  const results = [];
  try {
    for (const viewport of VIEWPORTS) {
      console.log(`\n[${viewport.name}] ${viewport.width}x${viewport.height}`);
      runAgent(["--session", session, "console", "--clear"], { allowFailure: true });
      runAgent(["--session", session, "errors", "--clear"], { allowFailure: true });
      runAgent(["--session", session, "set", "viewport", String(viewport.width), String(viewport.height)]);
      runAgent(["--session", session, "open", options.url]);
      runAgent(["--session", session, "wait", "--load", "load"]);
      // Force eager loading so the full-page capture does not miss lazy images.
      runAgent([
        "--session",
        session,
        "eval",
        "-b",
        Buffer.from(
          'document.querySelectorAll("img[loading=lazy]").forEach((img) => { img.loading = "eager"; }); true',
          "utf8",
        ).toString("base64"),
      ], { allowFailure: true });

      const metrics = evalMetrics(session);
      const screenshot = resolve(outputDir, `${viewport.name}-${viewport.width}.png`);
      runAgent(["--session", session, "screenshot", screenshot, "--full"]);
      const consoleMessages = collectConsole(session);
      const pageErrors = collectErrors(session);
      const a11y = collectA11y(session);

      const record = {
        name: viewport.name,
        width: viewport.width,
        height: viewport.height,
        screenshot,
        metrics,
        consoleMessages,
        consoleErrors: consoleMessages.filter((message) =>
          ["error", "warning"].includes(message.type),
        ),
        pageErrors,
        a11y,
      };
      results.push(record);

      const issue = isIssue(record);
      console.log(
        `  ${issue ? "ISSUES" : "OK"} — title "${metrics.title}", ${metrics.images.total} image(s), ` +
          `${record.consoleErrors.length} console error/warning(s), ` +
          `${a11y.violations.length} axe violation(s)`,
      );
      console.log(`  Screenshot: ${screenshot}`);
    }
  } finally {
    if (!options.keepOpen) {
      runAgent(["--session", session, "close"], { allowFailure: true });
    }
  }

  const report = {
    generatedAt: new Date().toISOString(),
    url: options.url,
    session,
    note:
      "Automated capture only. Visual inspection is PENDING until an image-capable model or human reviews every screenshot.",
    viewports: results.map((record) => ({
      ...record,
      screenshot: record.screenshot.replace(/\\/g, "/"),
    })),
    summary: {
      viewports: results.length,
      issues: results.filter(isIssue).map((record) => record.name),
      automatedChecks:
        "overflow, broken images, missing alt, unlabeled controls, unnamed interactive elements, console errors, page errors, axe violations",
      visualInspection: "PENDING",
    },
  };
  const reportPath = resolve(outputDir, "report.json");
  await writeFile(reportPath, JSON.stringify(report, null, 2), "utf8");

  console.log(`\nReport: ${reportPath}`);
  console.log(
    "Visual inspection is PENDING. Open each screenshot with an image-capable reviewer and update docs/06-visual-qa.md.",
  );

  if (options.strict && report.summary.issues.length > 0) {
    console.error(`Strict mode: issues found at ${report.summary.issues.join(", ")}.`);
    process.exit(1);
  }
}

try {
  await main();
} catch (error) {
  console.error(`Visual QA failed: ${error.message}`);
  process.exit(1);
}
