import { readFile, writeFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";

function parseArgs(argv) {
  const args = {
    source: "docs/04-design-system.md",
    out: "site/src/styles/tokens.css",
    require: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--source") args.source = argv[++i];
    else if (arg === "--out") args.out = argv[++i];
    else if (arg === "--require") args.require = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/build-tokens.mjs [--source <file>] [--out <file>] [--require]

Reads the canonical token JSON block from docs/04-design-system.md and writes
CSS custom properties. --require fails when no tokens are defined.`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function kebab(value) {
  return String(value)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[^a-zA-Z0-9-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

function flatten(value, path = [], out = []) {
  if (value === null || value === undefined) return out;
  if (typeof value === "object" && !Array.isArray(value)) {
    for (const [key, child] of Object.entries(value)) {
      if (path.length === 0 && (key === "version" || key === "meta")) continue;
      flatten(child, [...path, key], out);
    }
    return out;
  }
  if (Array.isArray(value)) return out;
  if (typeof value === "string" && value.trim() === "") return out;
  if (typeof value === "boolean") return out;
  if (typeof value === "number" && !Number.isFinite(value)) return out;

  const name = path.map(kebab).filter(Boolean).join("-");
  if (!name) return out;
  const raw = String(value).trim();
  if (raw.includes(";") || raw.includes("}") || raw.includes("{")) {
    throw new Error(`Unsafe CSS token value at "${name}": ${raw}`);
  }
  out.push({ name: `--${name}`, value: raw });
  return out;
}

const args = parseArgs(process.argv.slice(2));
const sourcePath = resolve(process.cwd(), args.source);
const outPath = resolve(process.cwd(), args.out);

const markdown = await readFile(sourcePath, "utf8");
const match = markdown.match(
  /<!-- BEGIN DESIGN TOKENS JSON -->([\s\S]*?)<!-- END DESIGN TOKENS JSON -->/,
);
if (!match) {
  console.error(`No token block found in ${args.source}.`);
  process.exit(1);
}

let parsed;
try {
  parsed = JSON.parse(match[1].trim());
} catch (error) {
  console.error(`Token JSON is invalid: ${error.message}`);
  process.exit(1);
}

const tokens = flatten(parsed);
if (tokens.length === 0) {
  if (args.require) {
    console.error(
      "No approved design tokens found. Fill the token block in docs/04-design-system.md before running G4.",
    );
    process.exit(1);
  }
  console.log(
    "No design tokens defined yet; writing a template notice to the output file.",
  );
}

const status = parsed?.meta?.status || "unknown";
const name = parsed?.meta?.name || "unnamed";
const lines = [
  "/*",
  " * GENERATED FILE - do not edit by hand.",
  ` * Source: ${args.source}`,
  ` * Design system: ${name} (status: ${status})`,
  " * Regenerate: npm run tokens:build",
  " */",
  "",
  ":root {",
  ...(tokens.length > 0
    ? tokens.map((token) => `  ${token.name}: ${token.value};`)
    : ["  /* No approved tokens defined yet. */"]),
  "}",
  "",
];

await mkdir(dirname(outPath), { recursive: true });
await writeFile(outPath, lines.join("\n"), "utf8");

console.log(
  `Generated ${tokens.length} token(s) -> ${args.out} (status: ${status})`,
);
