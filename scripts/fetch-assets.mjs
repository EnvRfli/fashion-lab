import { createHash } from "node:crypto";
import { mkdir, writeFile, copyFile, stat } from "node:fs/promises";
import { imageSize } from "image-size";

const assets = [
  { id: "hero-uniform-flatlay", pexels: 36910113 },
  { id: "editorial-atelier-rail", pexels: 7671167 },
  { id: "product-poplin-shirt", pexels: 28576622 },
  { id: "product-wool-blazer", pexels: 19109151 },
  { id: "product-striped-knit", pexels: 45982 },
  { id: "product-cotton-skirt", pexels: 38266547 },
  { id: "product-twill-trouser", pexels: 33633245 },
  { id: "product-leather-loafer", pexels: 10259873 },
];

await mkdir("assets/downloads", { recursive: true });
await mkdir("site/public/images", { recursive: true });

const out = [];
for (const asset of assets) {
  const url = `https://images.pexels.com/photos/${asset.pexels}/pexels-photo-${asset.pexels}.jpeg?auto=compress&cs=tinysrgb&w=1600`;
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${asset.id}: HTTP ${response.status} ${url}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.length < 20000) throw new Error(`${asset.id}: suspiciously small (${buffer.length})`);
  const downloadPath = `assets/downloads/${asset.id}.jpg`;
  const publicPath = `site/public/images/${asset.id}.jpg`;
  await writeFile(downloadPath, buffer);
  await copyFile(downloadPath, publicPath);
  const dimensions = imageSize(buffer);
  const sha256 = createHash("sha256").update(buffer).digest("hex");
  const size = (await stat(publicPath)).size;
  const record = { ...asset, downloadPath, publicPath, bytes: size, width: dimensions.width, height: dimensions.height, sha256 };
  out.push(record);
  console.log(JSON.stringify(record));
}

await writeFile("assets/downloads/download-summary.json", JSON.stringify(out, null, 2));
console.log(`Downloaded ${out.length} assets.`);
