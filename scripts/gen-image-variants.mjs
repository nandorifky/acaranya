// Generate responsive WebP variants for images referenced from content
// frontmatter and Astro/TS source. Output mirrors the public path under
// public/images/variants/ so ResponsiveImage can resolve srcset entries.
// Run with `npm run variants` before building.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import sharp from 'sharp';

const root = fileURLToPath(new URL('..', import.meta.url));
const publicDir = path.join(root, 'public');
const contentDir = path.join(root, 'src', 'content');
const srcDir = path.join(root, 'src');
const widths = [480, 960, 1440];
const quality = 78;
const contentPattern = /\.(md|mdx|mdoc)$/;
const imagePathPattern = /\/images\/[A-Za-z0-9_\-./%]+\.(?:jpe?g|png|webp)/gi;

const walk = (dir, filter, acc = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, filter, acc);
    else if (filter(entry.name)) acc.push(full);
  }
  return acc;
};

const sources = new Set();

for (const file of walk(contentDir, (name) => contentPattern.test(name))) {
  const { data } = matter(fs.readFileSync(file, 'utf8'));
  for (const value of [
    data.image,
    data.coverImage,
    data.thumbnail,
    data.featuredImage,
    data.whyChooseUs?.image,
    ...(Array.isArray(data.gallery) ? data.gallery : []),
  ]) {
    if (typeof value === 'string' && value.startsWith('/images/')) sources.add(value);
  }
}

for (const file of walk(srcDir, (name) => /\.(astro|ts|mjs)$/.test(name))) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(imagePathPattern)) sources.add(match[0]);
}

const decodeToAbs = (publicPath) => {
  const rel = decodeURIComponent(publicPath).replace(/^\/+/, '').split(/[?#]/)[0];
  return path.join(publicDir, rel.split('/').join(path.sep));
};

const variantDirFor = (publicPath) => {
  const rel = decodeURIComponent(publicPath)
    .replace(/^\/images\//, '')
    .split(/[?#]/)[0];
  return path.dirname(path.join(publicDir, 'images', 'variants', rel.split('/').join(path.sep)));
};

const variantPathFor = (publicPath, width) => {
  const rel = decodeURIComponent(publicPath)
    .replace(/^\/images\//, '')
    .split(/[?#]/)[0];
  const ext = path.extname(rel);
  return path.join(
    publicDir,
    'images',
    'variants',
    `${rel.slice(0, -ext.length)}-${width}.webp`.split('/').join(path.sep),
  );
};

let created = 0;
let skipped = 0;

for (const publicPath of [...sources].sort()) {
  const abs = decodeToAbs(publicPath);
  if (!fs.existsSync(abs)) continue;
  if (/\s/.test(decodeURIComponent(publicPath))) continue;

  let metadata;
  try {
    metadata = await sharp(abs).metadata();
  } catch {
    continue;
  }
  if (!metadata.width) continue;

  const targetWidths = widths.filter((width) => width < metadata.width);
  if (targetWidths.length === 0) continue;

  fs.mkdirSync(variantDirFor(publicPath), { recursive: true });

  for (const width of targetWidths) {
    const out = variantPathFor(publicPath, width);
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= fs.statSync(abs).mtimeMs) {
      skipped++;
      continue;
    }
    await sharp(abs)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality, effort: 4 })
      .toFile(out);
    created++;
  }
}

console.log(`image variants: ${created} created, ${skipped} up to date, ${sources.size} referenced`);
