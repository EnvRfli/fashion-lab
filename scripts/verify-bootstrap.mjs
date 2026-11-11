import { spawnSync } from "node:child_process";
import { readFile, stat } from "node:fs/promises";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

const ROOT = process.cwd();
const SKILLS = ["frontend-design", "web-design-guidelines", "agent-browser"];
const REQUIRED_FILES = [
  "AGENTS.md",
  "README.md",
  "package.json",
  "skills-lock.json",
  ".gitignore",
  ".opencode/commands/build-site.md",
  "docs/WORKFLOW.md",
  "docs/QUALITY_GATES.md",
  "docs/PHASE_STATUS.md",
  "docs/BOOTSTRAP_HANDOFF.md",
  "docs/DECISIONS.md",
  "docs/01-product-brief.md",
  "docs/02-visual-references.md",
  "docs/03-asset-manifest.md",
  "docs/04-design-system.md",
  "docs/05-page-specifications.md",
  "docs/06-visual-qa.md",
  "scripts/validate-assets.mjs",
  "scripts/visual-qa.mjs",
  "scripts/build-tokens.mjs",
  "scripts/verify-bootstrap.mjs",
  "scripts/serve-fixture.mjs",
  "artifacts/visual-qa/.gitkeep",
];

const results = [];
function check(name, fn, detail = "") {
  return Promise.resolve()
    .then(fn)
    .then((outcome) => {
      const result = outcome === true || outcome === undefined ? {} : outcome;
      results.push({
        name,
        pass: result.pass !== false,
        detail: result.detail || detail,
      });
    })
    .catch((error) => {
      results.push({ name, pass: false, detail: error.message });
    });
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
    windowsHide: true,
  });
  if (result.error) throw result.error;
  return result;
}

const skipBrowser = process.argv.includes("--skip-browser");
const json = process.argv.includes("--json");

await check("Node.js >= 22", () => {
  const major = Number(process.versions.node.split(".")[0]);
  return major >= 22
    ? { detail: process.version }
    : { pass: false, detail: `Node ${process.version} is too old.` };
});

for (const file of REQUIRED_FILES) {
  await check(`file: ${file}`, async () => {
    const path = resolve(ROOT, file);
    if (!existsSync(path)) return { pass: false, detail: "missing" };
    const info = await stat(path);
    if (info.size === 0) return { pass: false, detail: "empty" };
    return { detail: `${info.size} bytes` };
  });
}

await check("AGENTS.md asset policy", async () => {
  const text = (await readFile(resolve(ROOT, "AGENTS.md"), "utf8")).toLowerCase();
  const required = [
    "real-world products must be represented by",
    "svg is allowed for",
    "ai image generation",
    "demonstration imagery",
    "no false pass",
    "390px",
  ];
  const missing = required.filter((phrase) => !text.includes(phrase));
  return missing.length
    ? { pass: false, detail: `missing: ${missing.join("; ")}` }
    : { detail: "critical phrases present" };
});

await check("skills installed", async () => {
  const lock = JSON.parse(await readFile(resolve(ROOT, "skills-lock.json"), "utf8"));
  const missing = SKILLS.filter((skill) => !lock.skills?.[skill]);
  if (missing.length) return { pass: false, detail: `lock missing: ${missing.join(", ")}` };
  for (const skill of SKILLS) {
    const path = resolve(ROOT, ".agents", "skills", skill, "SKILL.md");
    if (!existsSync(path)) return { pass: false, detail: `missing ${path}` };
    const text = await readFile(path, "utf8");
    if (!text.includes("---") || text.length < 200) {
      return { pass: false, detail: `${skill}/SKILL.md looks invalid` };
    }
  }
  return { detail: SKILLS.join(", ") };
});

await check("skill discovery evidence", async () => {
  const text = await readFile(resolve(ROOT, "docs/BOOTSTRAP_HANDOFF.md"), "utf8");
  return text.includes("Discovery evidence") && text.includes("skill` tool")
    ? { detail: "recorded in handoff" }
    : { pass: false, detail: "no discovery evidence recorded in handoff" };
});

await check("/build-site command", async () => {
  const text = await readFile(
    resolve(ROOT, ".opencode", "commands", "build-site.md"),
    "utf8",
  );
  const required = ["agent: build", "$ARGUMENTS", "AGENTS.md", "WORKFLOW.md", "QUALITY_GATES.md", "PHASE_STATUS.md"];
  const missing = required.filter((phrase) => !text.includes(phrase));
  return missing.length
    ? { pass: false, detail: `missing: ${missing.join("; ")}` }
    : { detail: "frontmatter and required references present" };
});

await check("package scripts", async () => {
  const pkg = JSON.parse(await readFile(resolve(ROOT, "package.json"), "utf8"));
  const required = ["verify:bootstrap", "validate:assets", "qa:visual", "tokens:build", "serve:fixture"];
  const missing = required.filter((script) => !pkg.scripts?.[script]);
  const missingDeps = ["agent-browser", "skills", "image-size"].filter(
    (dep) => !pkg.devDependencies?.[dep],
  );
  if (missing.length) return { pass: false, detail: `missing scripts: ${missing.join(", ")}` };
  if (missingDeps.length) return { pass: false, detail: `missing deps: ${missingDeps.join(", ")}` };
  return { detail: "scripts and devDependencies present" };
});

await check("asset manifest markers", async () => {
  const text = await readFile(resolve(ROOT, "docs/03-asset-manifest.md"), "utf8");
  return text.includes("<!-- BEGIN ASSET MANIFEST JSON -->") &&
    text.includes("<!-- END ASSET MANIFEST JSON -->")
    ? { detail: "markers present" }
    : { pass: false, detail: "manifest markers missing" };
});

await check("design token markers", async () => {
  const text = await readFile(resolve(ROOT, "docs/04-design-system.md"), "utf8");
  return text.includes("<!-- BEGIN DESIGN TOKENS JSON -->") &&
    text.includes("<!-- END DESIGN TOKENS JSON -->")
    ? { detail: "markers present" }
    : { pass: false, detail: "token markers missing" };
});

await check("git repository", () => {
  const result = run("git", ["rev-parse", "--is-inside-work-tree"]);
  return result.status === 0
    ? { detail: "initialized" }
    : { pass: false, detail: "not a git repository" };
});

await check("agent-browser CLI", () => {
  const cli = resolve(ROOT, "node_modules", "agent-browser", "bin", "agent-browser.js");
  if (!existsSync(cli)) return { pass: false, detail: "local package missing" };
  const result = run(process.execPath, [cli, "--version"]);
  return result.status === 0
    ? { detail: result.stdout.trim() }
    : { pass: false, detail: (result.stderr || result.stdout).trim() };
});

if (!skipBrowser) {
  await check("agent-browser doctor", () => {
    const cli = resolve(ROOT, "node_modules", "agent-browser", "bin", "agent-browser.js");
    const result = run(process.execPath, [cli, "doctor"], { timeout: 120000 });
    const text = `${result.stdout}\n${result.stderr}`;
    const summary = text.match(/Summary:\s*(.+)/);
    return result.status === 0
      ? { detail: summary ? summary[1].trim() : "all checks passed" }
      : { pass: false, detail: summary ? summary[1].trim() : "doctor failed" };
  });
}

await check("QA/asset scripts run", () => {
  const asset = run(process.execPath, ["scripts/validate-assets.mjs", "--self-test"]);
  if (asset.status !== 0) {
    return { pass: false, detail: "asset self-test failed" };
  }
  const token = run(process.execPath, [
    "scripts/build-tokens.mjs",
    "--out",
    "artifacts/tmp/bootstrap-tokens.css",
  ]);
  if (token.status !== 0) {
    return { pass: false, detail: "token build failed" };
  }
  return { detail: "asset self-test and token build passed" };
});

if (json) {
  console.log(JSON.stringify(results, null, 2));
} else {
  console.log("Bootstrap verification\n");
  for (const result of results) {
    console.log(`${result.pass ? "PASS" : "FAIL"}  ${result.name}${result.detail ? ` — ${result.detail}` : ""}`);
  }
  const failed = results.filter((result) => !result.pass);
  console.log(`\nSummary: ${results.length - failed.length}/${results.length} checks passed.`);
  if (failed.length) {
    console.log("\nFix the failed checks before project work.");
    process.exit(1);
  }
}
