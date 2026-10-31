// Mirror the 500+ hotlinked design thumbnails from inv.acaranya.id into
// public/images/designs so catalog pages stop depending on a third-party
// origin. Idempotent: existing files are left untouched.
// Run with `npm run designs:thumbs`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import sharp from 'sharp';
import slugify from 'slugify';

const root = fileURLToPath(new URL('..', import.meta.url));
const designsDir = path.join(root, 'src', 'content', 'designs');
const outDir = path.join(root, 'public', 'images', 'designs');
const widths = [320, 640];
const contentPattern = /\.(md|mdx|mdoc)$/;
const concurrency = 6;

const walk = (dir, acc = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, acc);
    else if (contentPattern.test(entry.name)) acc.push(full);
  }
  return acc;
};

const jobs = [];
for (const file of walk(designsDir)) {
  const { data } = matter(fs.readFileSync(file, 'utf8'));
  if (data.status !== 'published' || typeof data.thumbnail !== 'string') continue;
  if (!/^https?:\/\//.test(data.thumbnail)) continue;
  const id = path.relative(designsDir, file).replace(contentPattern, '').split(path.sep).join('/');
  const key = slugify(id, { lower: true, strict: true });
  const targets = widths.map((width) => path.join(outDir, `${key}-${width}.webp`));
  if (targets.every((target) => fs.existsSync(target))) continue;
  jobs.push({ url: data.thumbnail, key, targets });
}

fs.mkdirSync(outDir, { recursive: true });
console.log(`design thumbnails: ${jobs.length} to mirror`);

let done = 0;
let failed = 0;

const download = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return Buffer.from(await response.arrayBuffer());
};

const runJob = async ({ url, key, targets }) => {
  try {
    const buffer = await download(url);
    for (let index = 0; index < widths.length; index++) {
      if (fs.existsSync(targets[index])) continue;
      await sharp(buffer)
        .resize({ width: widths[index], withoutEnlargement: true })
        .webp({ quality: 76, effort: 4 })
        .toFile(targets[index]);
    }
    done++;
  } catch (error) {
    failed++;
    console.warn(`skip ${key}: ${error.message}`);
  }
};

const queue = [...jobs];
const workers = Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
  while (queue.length > 0) {
    const job = queue.shift();
    if (job) await runJob(job);
    if ((done + failed) % 50 === 0) {
      console.log(`progress: ${done + failed}/${jobs.length}`);
    }
  }
});

await Promise.all(workers);
console.log(`design thumbnails done: ${done} mirrored, ${failed} failed`);
