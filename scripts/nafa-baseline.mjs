/**
 * Nafa v2 audit helper.
 *
 * Loads the app's seed module through Vite's SSR loader, then records every
 * seeded portfolio/client record and every referenced image with a SHA-256
 * hash. The output is evidence for docs/NAFA_V2_BASELINE.md and the after
 * comparison. It never writes to app storage.
 */
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createRequire } from "node:module";
import { dirname, join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

const root = resolve(process.cwd(), "site");
const outFile = resolve(
  process.cwd(),
  process.argv[2] ?? "artifacts/nafa-v2/baseline.json",
);

const siteRequire = createRequire(join(root, "package.json"));
const { createServer } = await import(
  pathToFileURL(siteRequire.resolve("vite")).href
);

const server = await createServer({
  root,
  appType: "custom",
  server: { middlewareMode: true },
  logLevel: "error",
});

try {
  const { createSeedData } = await server.ssrLoadModule("/src/data/seed.ts");
  const data = createSeedData();

  const imageCache = new Map();
  async function imageInfo(path) {
    if (!path) return null;
    if (imageCache.has(path)) return imageCache.get(path);
    const localPath = path.startsWith("/") ? join(root, "public", path) : path;
    try {
      const bytes = await readFile(localPath);
      const info = {
        path,
        bytes: bytes.length,
        sha256: createHash("sha256").update(bytes).digest("hex"),
      };
      imageCache.set(path, info);
      return info;
    } catch (error) {
      const info = {
        path,
        error: error instanceof Error ? error.message : String(error),
      };
      imageCache.set(path, info);
      return info;
    }
  }

  const schools = [];
  for (const school of data.schools) {
    const photos = data.photos.filter((photo) => photo.schoolId === school.id);
    schools.push({
      id: school.id,
      slug: school.slug,
      name: school.name,
      level: school.level,
      location: school.location,
      coverImage: school.coverImage ?? null,
      createdAt: school.createdAt,
      updatedAt: school.updatedAt,
      photoCount: photos.length,
      photos: await Promise.all(
        photos.map(async (photo) => ({
          id: photo.id,
          imagePath: photo.imagePath,
          title: photo.title,
          category: photo.category,
          image: await imageInfo(photo.imagePath),
        })),
      ),
    });
  }

  const distinctImages = [...imageCache.values()];
  const result = {
    generatedAt: new Date().toISOString(),
    source: "site/src/data/seed.ts via Vite SSR",
    seedVersion: data.version,
    counts: {
      schools: data.schools.length,
      photos: data.photos.length,
      users: data.users.length,
      categoryDescriptions: Object.keys(data.categoryDescriptions).length,
      distinctImages: distinctImages.length,
    },
    schools,
    distinctImages,
  };

  await mkdir(dirname(outFile), { recursive: true });
  await writeFile(outFile, `${JSON.stringify(result, null, 2)}\n`, "utf8");
  console.log(
    `Baseline written: ${outFile}\n` +
      `schools=${result.counts.schools} photos=${result.counts.photos} ` +
      `distinctImages=${result.counts.distinctImages}`,
  );
} finally {
  await server.close();
}
