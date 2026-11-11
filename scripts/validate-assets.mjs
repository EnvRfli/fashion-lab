import { createHash } from "node:crypto";
import { mkdtemp, mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import {
  dirname,
  extname,
  isAbsolute,
  join,
  normalize,
  relative,
  resolve,
} from "node:path";
import { imageSize } from "image-size";

const RASTER_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".gif"]);
const IMAGE_EXTENSIONS = new Set([...RASTER_EXTENSIONS, ".svg"]);
const SOURCE_EXTENSIONS = new Set([
  ".html",
  ".htm",
  ".js",
  ".jsx",
  ".ts",
  ".tsx",
  ".vue",
  ".svelte",
  ".astro",
  ".css",
  ".scss",
  ".sass",
  ".less",
  ".mdx",
]);
const PRODUCT_PATTERN = /(product|products|catalog|inventory|shop|uniform|seragam|item)/i;
const PLACEHOLDER_HOSTS = [
  "placehold.co",
  "placeholder.com",
  "via.placeholder.com",
  "dummyimage.com",
  "picsum.photos",
  "loremflickr.com",
  "placekitten.com",
  "example.com",
  "fakeimg.pl",
];
const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  ".next",
  ".nuxt",
  ".svelte-kit",
  "dist",
  "build",
  "out",
  "coverage",
  ".turbo",
  "artifacts",
  "docs",
  "scripts",
  ".agents",
  ".opencode",
  ".vercel",
]);

function parseArgs(argv) {
  const args = {
    root: process.cwd(),
    manifest: "docs/03-asset-manifest.md",
    scan: [],
    requireAssets: false,
    checkImages: null,
    selfTest: false,
    json: false,
    allowRemoteImages: false,
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--root") args.root = argv[++i];
    else if (arg === "--manifest") args.manifest = argv[++i];
    else if (arg === "--scan") args.scan.push(argv[++i]);
    else if (arg === "--require-assets") args.requireAssets = true;
    else if (arg === "--check-images") args.checkImages = argv[++i];
    else if (arg === "--self-test") args.selfTest = true;
    else if (arg === "--json") args.json = true;
    else if (arg === "--allow-remote-images") args.allowRemoteImages = true;
    else if (arg === "--help" || arg === "-h") {
      console.log(`Usage: node scripts/validate-assets.mjs [options]

Options:
  --root <dir>             Repository root (default: cwd)
  --manifest <file>        Manifest Markdown file (default: docs/03-asset-manifest.md)
  --scan <dir>             Source directory to scan; repeatable
  --require-assets         Fail when the manifest has no assets
  --check-images <dir>     Validate all image files in a directory
  --self-test              Run isolated pass/fail fixture tests
  --allow-remote-images    Downgrade non-placeholder remote image URLs to warnings
  --json                   Print a JSON report
  -h, --help               Show this help

Policy checks:
  - product images must be local raster files, never SVG or SVG data URLs
  - source, creator, license, license URL, date, hash, and dimensions are required
  - empty/corrupt files, missing files, hash/dimension mismatches are errors
  - placeholder and product-context remote image URLs are errors`);
      process.exit(0);
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return args;
}

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

function slash(value) {
  return value.replace(/\\/g, "/");
}

function rel(root, file) {
  return slash(relative(root, file));
}

function isHttp(value) {
  return typeof value === "string" && /^https?:\/\//i.test(value);
}

function isClientSupplied(provider) {
  return /^(client|user|original|commissioned|self)[\s-]?supplied$/i.test(
    String(provider || "").trim(),
  );
}

function detectFormat(buffer) {
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) {
    return "png";
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "jpg";
  }
  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "webp";
  }
  if (
    buffer.length >= 12 &&
    (buffer.subarray(4, 12).toString("ascii") === "ftypavif" ||
      buffer.subarray(4, 12).toString("ascii") === "ftypmif1")
  ) {
    return "avif";
  }
  const header = buffer.subarray(0, 6).toString("ascii");
  if (header === "GIF87a" || header === "GIF89a") return "gif";
  const text = buffer.subarray(0, 1024).toString("utf8").trim().toLowerCase();
  if (text.startsWith("<svg") || (text.startsWith("<?xml") && text.includes("<svg"))) {
    return "svg";
  }
  return null;
}

function formatMatchesExtension(format, extension) {
  if (format === "jpg") return extension === ".jpg" || extension === ".jpeg";
  return format === extension.replace(".", "");
}

async function exists(file) {
  try {
    await stat(file);
    return true;
  } catch {
    return false;
  }
}

async function walk(dir, options = {}) {
  const files = [];
  if (!(await exists(dir))) return files;
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      files.push(...(await walk(full, options)));
      continue;
    }
    if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (options.extensions && !options.extensions.has(ext)) continue;
      files.push(full);
    }
  }
  return files;
}

function extractJsonBlock(text, begin, end) {
  const pattern = new RegExp(`${begin}([\\s\\S]*?)${end}`);
  const match = text.match(pattern);
  if (!match) return null;
  return match[1].trim();
}

function makeReport() {
  return { errors: [], warnings: [], notes: [], checkedAssets: 0, scannedFiles: 0 };
}

function addError(report, code, message, file = null) {
  report.errors.push({ code, message, file });
}

function addWarning(report, code, message, file = null) {
  report.warnings.push({ code, message, file });
}

function addNote(report, message) {
  report.notes.push(message);
}

async function loadManifest(root, manifestRelative) {
  const manifestPath = resolve(root, manifestRelative);
  const text = await readFile(manifestPath, "utf8");
  const json = extractJsonBlock(
    text,
    "<!-- BEGIN ASSET MANIFEST JSON -->",
    "<!-- END ASSET MANIFEST JSON -->",
  );
  if (!json) throw new Error("Manifest JSON markers were not found.");
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch (error) {
    throw new Error(`Manifest JSON is invalid: ${error.message}`);
  }
  if (!parsed || !Array.isArray(parsed.assets)) {
    throw new Error("Manifest must contain an assets array.");
  }
  return parsed;
}

const REQUIRED_FIELDS = [
  "id",
  "kind",
  "localPath",
  "sourceUrl",
  "provider",
  "creator",
  "license",
  "licenseUrl",
  "accessedAt",
  "sha256",
  "width",
  "height",
];

async function validateAsset(root, asset, index, report) {
  const prefix = `asset[${index}]`;
  for (const field of REQUIRED_FIELDS) {
    if (asset[field] === undefined || asset[field] === null || String(asset[field]).trim() === "") {
      addError(report, "missing-field", `${prefix}: missing required field "${field}".`);
    }
  }

  const kind = String(asset.kind || "").toLowerCase();
  if (!["product", "editorial", "logo", "icon", "decorative"].includes(kind)) {
    addError(report, "invalid-kind", `${prefix}: kind must be product, editorial, logo, icon, or decorative.`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(asset.id || ""))) {
    addError(report, "invalid-id", `${prefix}: id must be lowercase kebab-case.`);
  }

  if (!isClientSupplied(asset.provider)) {
    if (!isHttp(asset.sourceUrl)) {
      addError(report, "invalid-source-url", `${prefix}: sourceUrl must be an http(s) URL for a sourced asset.`);
    }
    if (!isHttp(asset.licenseUrl)) {
      addError(report, "invalid-license-url", `${prefix}: licenseUrl must be an http(s) URL for a sourced asset.`);
    }
  }
  if (asset.accessedAt && Number.isNaN(Date.parse(asset.accessedAt))) {
    addError(report, "invalid-date", `${prefix}: accessedAt must be a parseable ISO date.`);
  }

  const localPath = String(asset.localPath || "");
  if (!localPath || isAbsolute(localPath) || localPath.startsWith("/") || localPath.startsWith("data:")) {
    addError(report, "invalid-local-path", `${prefix}: localPath must be repository-relative, not absolute or a data URL.`);
    return;
  }
  const normalizedLocal = slash(normalize(localPath));
  if (normalizedLocal.startsWith("../")) {
    addError(report, "invalid-local-path", `${prefix}: localPath must stay inside the repository.`);
    return;
  }
  const filePath = resolve(root, normalizedLocal);
  const ext = extname(filePath).toLowerCase();

  if (kind === "product" && !RASTER_EXTENSIONS.has(ext)) {
    addError(report, "product-svg", `${prefix}: product imagery must be a raster photograph, not "${ext || "unknown"}".`);
  }

  if (asset.demonstration !== undefined && typeof asset.demonstration !== "boolean") {
    addError(report, "invalid-demonstration", `${prefix}: demonstration must be true or false.`);
  }
  if ((kind === "product" || kind === "editorial") && typeof asset.demonstration !== "boolean") {
    addError(report, "missing-demonstration", `${prefix}: product/editorial assets must set demonstration true or false.`);
  }
  if ((kind === "product" || kind === "editorial") && !String(asset.alt || "").trim()) {
    addError(report, "missing-alt", `${prefix}: content images require meaningful alt text.`);
  }

  if (!(await exists(filePath))) {
    addError(report, "missing-file", `${prefix}: file not found at ${normalizedLocal}.`, normalizedLocal);
    return;
  }

  const info = await stat(filePath);
  if (info.size === 0) {
    addError(report, "empty-file", `${prefix}: file is empty: ${normalizedLocal}.`, normalizedLocal);
    return;
  }

  const buffer = await readFile(filePath);
  const format = detectFormat(buffer);
  if (!format) {
    addError(report, "unrecognized-format", `${prefix}: file is not a recognizable image: ${normalizedLocal}.`, normalizedLocal);
    return;
  }
  if (format === "svg" && kind === "product") {
    addError(report, "product-svg", `${prefix}: SVG content is not allowed for product imagery.`, normalizedLocal);
  }
  if (format !== "svg" && !formatMatchesExtension(format, ext)) {
    addError(report, "format-mismatch", `${prefix}: extension ${ext} does not match detected format ${format}.`, normalizedLocal);
  }

  const hash = sha256(buffer);
  if (String(asset.sha256 || "").toLowerCase() !== hash) {
    addError(report, "hash-mismatch", `${prefix}: sha256 does not match the file. Expected ${hash}.`, normalizedLocal);
  }

  let dimensions;
  try {
    dimensions = imageSize(buffer);
  } catch (error) {
    addError(report, "corrupt-image", `${prefix}: image cannot be decoded (${error.message}).`, normalizedLocal);
    return;
  }
  if (!dimensions || !dimensions.width || !dimensions.height) {
    addError(report, "corrupt-image", `${prefix}: image dimensions could not be read.`, normalizedLocal);
    return;
  }
  if (Number(asset.width) !== dimensions.width || Number(asset.height) !== dimensions.height) {
    addError(
      report,
      "dimension-mismatch",
      `${prefix}: manifest says ${asset.width}x${asset.height}, file is ${dimensions.width}x${dimensions.height}.`,
      normalizedLocal,
    );
  }
  if (kind === "product" && (dimensions.width < 200 || dimensions.height < 200)) {
    addWarning(
      report,
      "small-product-image",
      `${prefix}: product image is only ${dimensions.width}x${dimensions.height}; verify this is intentional.`,
      normalizedLocal,
    );
  }
  if (kind === "product" && asset.demonstration === true) {
    addNote(report, `${asset.id}: demonstration imagery; do not present as real inventory.`);
  }
}

function extractReferences(line) {
  const refs = [];
  const patterns = [
    { kind: "img", regex: /<img\b[^>]*\bsrc\s*=\s*["']([^"']+)["']/gi, group: 1 },
    { kind: "srcset", regex: /\bsrcset\s*=\s*["']([^"']+)["']/gi, group: 1 },
    { kind: "css", regex: /url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, group: 2 },
    { kind: "import", regex: /(?:from\s+|import\s*\()\s*["']([^"']+)["']/gi, group: 1 },
    { kind: "url", regex: /new\s+URL\(\s*["']([^"']+)["']/gi, group: 1 },
  ];
  for (const pattern of patterns) {
    for (const match of line.matchAll(pattern.regex)) {
      let ref = match[pattern.group];
      if (!ref) continue;
      if (pattern.kind === "srcset") ref = ref.split(",")[0].trim().split(/\s+/)[0];
      if (ref) refs.push({ ref, kind: pattern.kind });
    }
  }
  return refs;
}

function resolveReference(root, filePath, ref) {
  let clean = ref.split("#")[0].split("?")[0].trim();
  if (!clean) return null;
  clean = clean.replace(/^['"]|['"]$/g, "");
  if (!clean || /^(data:|https?:|mailto:|tel:|javascript:|#|\/\/)/i.test(clean)) return null;
  if (/[{}<>$]/.test(clean)) return null;

  if (clean.startsWith("@/")) return resolve(root, "site", "src", clean.slice(2));
  if (clean.startsWith("~/")) return resolve(root, "site", "src", clean.slice(2));
  if (clean.startsWith("/")) return resolve(root, "site", "public", clean.slice(1));
  if (clean.startsWith("public/")) return resolve(root, "site", clean);
  return resolve(root, dirname(relative(root, filePath)), clean);
}

function isPlaceholderHost(url) {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return PLACEHOLDER_HOSTS.some((item) => host === item || host.endsWith(`.${item}`));
  } catch {
    return false;
  }
}

async function scanSources(root, scanDirs, manifestPaths, report, allowRemoteImages) {
  const files = [];
  for (const dir of scanDirs) {
    const full = resolve(root, dir);
    files.push(...(await walk(full, { extensions: SOURCE_EXTENSIONS })));
  }
  report.scannedFiles = files.length;
  if (files.length === 0) {
    addNote(report, "No source directories were found; source reference checks were skipped.");
    return;
  }

  for (const file of files) {
    const relFile = rel(root, file);
    let text;
    try {
      text = await readFile(file, "utf8");
    } catch {
      continue;
    }
    const lines = text.split(/\r?\n/);
    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];
      const lineNumber = index + 1;
      const productContext = PRODUCT_PATTERN.test(relFile) || PRODUCT_PATTERN.test(line);

      if (/data:image\/svg\+xml/i.test(line)) {
        if (productContext) {
          addError(
            report,
            "svg-data-url",
            `${relFile}:${lineNumber}: SVG data URL used in product context. Use a real raster photograph.`,
            relFile,
          );
        } else {
          addWarning(
            report,
            "svg-data-url",
            `${relFile}:${lineNumber}: SVG data URL found; allowed for icons, not product imagery.`,
            relFile,
          );
        }
      }

      for (const { ref, kind } of extractReferences(line)) {
        if (/^data:image\/svg\+xml/i.test(ref)) continue; // already reported
        if (/^data:/i.test(ref)) continue;
        if (/^https?:\/\//i.test(ref)) {
          if (isPlaceholderHost(ref)) {
            addError(
              report,
              "placeholder-url",
              `${relFile}:${lineNumber}: placeholder image URL "${ref}" must be replaced by a verified local asset.`,
              relFile,
            );
          } else if (productContext && !allowRemoteImages) {
            addError(
              report,
              "remote-product-image",
              `${relFile}:${lineNumber}: product imagery must be downloaded locally, not hotlinked (${ref}).`,
              relFile,
            );
          } else {
            addWarning(
              report,
              "remote-image",
              `${relFile}:${lineNumber}: remote image reference "${ref}"; verify and download it for product use.`,
              relFile,
            );
          }
          continue;
        }
        if (/^(mailto:|tel:|javascript:|#)/i.test(ref)) continue;
        if (!/[.](png|jpe?g|webp|avif|gif|svg)([?#]|$)/i.test(ref) && kind !== "img") {
          continue;
        }
        const resolved = resolveReference(root, file, ref);
        if (!resolved) continue;
        if (!(await exists(resolved))) {
          addError(
            report,
            "missing-image-reference",
            `${relFile}:${lineNumber}: referenced image does not exist: ${ref}.`,
            relFile,
          );
          continue;
        }
        const relResolved = rel(root, resolved);
        if (!manifestPaths.has(relResolved)) {
          const productRef = productContext && /(product|uniform|seragam|catalog|inventory)/i.test(ref);
          if (productRef) {
            addError(
              report,
              "unmanifested-product-image",
              `${relFile}:${lineNumber}: product image "${ref}" is not in the asset manifest.`,
              relFile,
            );
          } else {
            addWarning(
              report,
              "unmanifested-image",
              `${relFile}:${lineNumber}: image "${ref}" is not in the asset manifest.`,
              relFile,
            );
          }
        }
        if (relResolved.toLowerCase().endsWith(".svg") && productContext && !/(icon|logo|mark|avatar)/i.test(ref)) {
          addError(
            report,
            "product-svg-ref",
            `${relFile}:${lineNumber}: SVG referenced as product imagery: ${ref}.`,
            relFile,
          );
        }
      }
    }
  }
}

async function runValidation(options) {
  const root = resolve(options.root);
  const report = makeReport();
  let manifest;
  try {
    manifest = await loadManifest(root, options.manifest);
  } catch (error) {
    addError(report, "invalid-manifest", error.message, options.manifest);
    return report;
  }

  if (manifest.assets.length === 0) {
    if (options.requireAssets) {
      addError(report, "no-assets", "Manifest has no assets; Phase 3 is not complete.");
    } else {
      addNote(report, "Manifest is empty. Phase 3 has not started; use --require-assets at the G3 gate.");
    }
  }

  const ids = new Set();
  const paths = new Set();
  for (let index = 0; index < manifest.assets.length; index += 1) {
    const asset = manifest.assets[index];
    if (ids.has(asset.id)) {
      addError(report, "duplicate-id", `Duplicate asset id: ${asset.id}.`);
    }
    ids.add(asset.id);
    const normalizedPath = slash(normalize(String(asset.localPath || "")));
    if (paths.has(normalizedPath)) {
      addError(report, "duplicate-path", `Duplicate localPath: ${normalizedPath}.`);
    }
    paths.add(normalizedPath);
    await validateAsset(root, asset, index, report);
    report.checkedAssets += 1;
  }

  let scanDirs = options.scan;
  if (!scanDirs || scanDirs.length === 0) {
    const candidates = ["site/src", "site/app", "site/pages", "site/components", "site/public"];
    scanDirs = [];
    for (const candidate of candidates) {
      if (await exists(resolve(root, candidate))) scanDirs.push(candidate);
    }
  }
  await scanSources(root, scanDirs, paths, report, options.allowRemoteImages);
  return report;
}

async function checkImages(root, directory, report) {
  const files = await walk(resolve(root, directory), { extensions: IMAGE_EXTENSIONS });
  report.scannedFiles = files.length;
  if (files.length === 0) addNote(report, `No image files found under ${directory}.`);
  for (const file of files) {
    const relFile = rel(root, file);
    const info = await stat(file);
    if (info.size === 0) {
      addError(report, "empty-file", `Empty image: ${relFile}.`, relFile);
      continue;
    }
    const buffer = await readFile(file);
    const format = detectFormat(buffer);
    if (!format) {
      addError(report, "unrecognized-format", `Not a recognizable image: ${relFile}.`, relFile);
      continue;
    }
    try {
      const dimensions = imageSize(buffer);
      if (!dimensions.width || !dimensions.height) {
        addError(report, "corrupt-image", `No dimensions: ${relFile}.`, relFile);
      }
    } catch (error) {
      addError(report, "corrupt-image", `Cannot decode ${relFile}: ${error.message}`, relFile);
    }
  }
}

function printReport(report, options) {
  if (options.json) {
    console.log(JSON.stringify(report, null, 2));
    return;
  }
  console.log("Asset validation");
  console.log(`  Manifest: ${options.manifest}`);
  console.log(`  Assets checked: ${report.checkedAssets}`);
  console.log(`  Source files scanned: ${report.scannedFiles}`);
  if (report.notes.length) {
    console.log("\nNotes:");
    for (const note of report.notes) console.log(`  INFO ${note}`);
  }
  if (report.warnings.length) {
    console.log("\nWarnings:");
    for (const warning of report.warnings) {
      console.log(`  WARN [${warning.code}] ${warning.message}`);
    }
  }
  if (report.errors.length) {
    console.log("\nErrors:");
    for (const error of report.errors) {
      console.log(`  ERROR [${error.code}] ${error.message}`);
    }
  }
  console.log(
    `\nSummary: ${report.errors.length} error(s), ${report.warnings.length} warning(s).`,
  );
}

const PNG_1X1 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/lK3m6QAAAABJRU5ErkJggg==";

async function selfTest() {
  const cases = [];
  const base = await mkdtemp(join(tmpdir(), "asset-validator-"));
  const png = Buffer.from(PNG_1X1, "base64");

  async function makeCase(name, mutate, source = "") {
    const root = join(base, name);
    await mkdir(join(root, "site", "public", "images", "products"), { recursive: true });
    await mkdir(join(root, "site", "src"), { recursive: true });
    await mkdir(join(root, "docs"), { recursive: true });
    await writeFile(join(root, "site", "public", "images", "products", "test.png"), png);
    await writeFile(
      join(root, "site", "src", "ProductCard.jsx"),
      source || '<img src="/images/products/test.png" alt="Test product" />',
    );
    const asset = {
      id: "test-product",
      kind: "product",
      localPath: "site/public/images/products/test.png",
      sourceUrl: "https://example.org/photo",
      provider: "Test Source",
      creator: "Test Creator",
      license: "CC0",
      licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
      accessedAt: "2026-01-01",
      sha256: sha256(png),
      width: 1,
      height: 1,
      alt: "Test product",
      demonstration: true,
    };
    await mutate(asset, root);
    const manifest = {
      version: 1,
      assets: [asset],
    };
    await writeFile(
      join(root, "docs", "03-asset-manifest.md"),
      `# Test\n\n<!-- BEGIN ASSET MANIFEST JSON -->\n${JSON.stringify(manifest, null, 2)}\n<!-- END ASSET MANIFEST JSON -->\n`,
    );
    const report = await runValidation({
      root,
      manifest: "docs/03-asset-manifest.md",
      scan: ["site/src"],
      requireAssets: true,
      allowRemoteImages: false,
    });
    return report;
  }

  cases.push({
    name: "valid local product photograph",
    expected: "pass",
    report: await makeCase("valid", () => {}),
  });
  cases.push({
    name: "missing product file",
    expected: "fail:missing-file",
    report: await makeCase("missing", (asset) => {
      asset.localPath = "site/public/images/products/missing.png";
    }),
  });
  cases.push({
    name: "SVG product image",
    expected: "fail:product-svg",
    report: await makeCase("svg-product", async (asset, root) => {
      const svg = '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10"/></svg>';
      await writeFile(join(root, "site", "public", "images", "products", "test.svg"), svg);
      asset.localPath = "site/public/images/products/test.svg";
      asset.sha256 = sha256(Buffer.from(svg));
      asset.width = 10;
      asset.height = 10;
    }),
  });
  cases.push({
    name: "empty image file",
    expected: "fail:empty-file",
    report: await makeCase("empty", async (asset, root) => {
      await writeFile(join(root, "site", "public", "images", "products", "test.png"), "");
      asset.sha256 = sha256(Buffer.from(""));
    }),
  });
  cases.push({
    name: "missing license",
    expected: "fail:missing-field",
    report: await makeCase("license", (asset) => {
      delete asset.license;
    }),
  });
  cases.push({
    name: "invalid manifest JSON",
    expected: "fail:invalid-manifest",
    report: await (async () => {
      const root = join(base, "invalid-json");
      await mkdir(join(root, "docs"), { recursive: true });
      await writeFile(
        join(root, "docs", "03-asset-manifest.md"),
        "<!-- BEGIN ASSET MANIFEST JSON -->\n{\n<!-- END ASSET MANIFEST JSON -->\n",
      );
      return runValidation({
        root,
        manifest: "docs/03-asset-manifest.md",
        scan: [],
        requireAssets: true,
        allowRemoteImages: false,
      });
    })(),
  });
  cases.push({
    name: "placeholder image URL",
    expected: "fail:placeholder-url",
    report: await makeCase(
      "placeholder",
      () => {},
      '<img src="https://placehold.co/600x400" alt="Product" />',
    ),
  });
  cases.push({
    name: "SVG data URL in product context",
    expected: "fail:svg-data-url",
    report: await makeCase(
      "svg-data-url",
      () => {},
      '<img src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3C/svg%3E" alt="Product" />',
    ),
  });
  cases.push({
    name: "hash mismatch",
    expected: "fail:hash-mismatch",
    report: await makeCase("hash", (asset) => {
      asset.sha256 = "0".repeat(64);
    }),
  });
  cases.push({
    name: "dimension mismatch",
    expected: "fail:dimension-mismatch",
    report: await makeCase("dimensions", (asset) => {
      asset.width = 400;
      asset.height = 400;
    }),
  });

  let failures = 0;
  for (const testCase of cases) {
    const codes = testCase.report.errors.map((error) => error.code);
    let ok = false;
    if (testCase.expected === "pass") ok = testCase.report.errors.length === 0;
    else {
      const expectedCode = testCase.expected.split(":")[1];
      ok = codes.includes(expectedCode);
    }
    if (!ok) failures += 1;
    console.log(
      `${ok ? "PASS" : "FAIL"} ${testCase.name} — expected ${testCase.expected}; got ${
        codes.length ? codes.join(", ") : "no errors"
      }`,
    );
  }
  await rm(base, { recursive: true, force: true });
  console.log(`\nSelf-test: ${cases.length - failures}/${cases.length} passed.`);
  if (failures > 0) process.exit(1);
}

try {
  const options = parseArgs(process.argv.slice(2));
  if (options.selfTest) {
    await selfTest();
  } else if (options.checkImages) {
    const report = makeReport();
    await checkImages(resolve(options.root), options.checkImages, report);
    printReport(report, options);
    process.exit(report.errors.length > 0 ? 1 : 0);
  } else {
    const report = await runValidation(options);
    printReport(report, options);
    process.exit(report.errors.length > 0 ? 1 : 0);
  }
} catch (error) {
  console.error(`Asset validation failed to run: ${error.message}`);
  process.exit(1);
}
