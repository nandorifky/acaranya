// Build a URL -> last-commit-date map for sitemap <lastmod>.
// Run locally with `npm run dates` and commit the generated JSON.
// Do NOT run inside the CI build: shallow clones report the deploy date
// for every file, which would recreate the fake-freshness pattern this
// script exists to avoid.
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import slugify from 'slugify';

const root = fileURLToPath(new URL('..', import.meta.url));
const site = 'https://acaranya.id';
const outFile = path.join(root, 'src', 'data', 'content-dates.json');
const contentPattern = /\.(md|mdx|mdoc)$/;

const walk = (dir, recursive = false, acc = []) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (recursive) walk(full, true, acc);
      continue;
    }
    if (contentPattern.test(entry.name)) acc.push(full);
  }
  return acc;
};

const rel = (abs) => path.relative(root, abs).split(path.sep).join('/');

const dirtyPaths = new Set(
  execFileSync('git', ['status', '--porcelain'], { cwd: root, encoding: 'utf8' })
    .split('\n')
    .map((line) => line.slice(3).trim())
    .filter(Boolean),
);

const gitDate = (abs) => {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cI', '--', rel(abs)], {
      cwd: root,
      encoding: 'utf8',
    }).trim();
    return out ? new Date(out).toISOString() : null;
  } catch {
    return null;
  }
};

const withFallback = (abs) => {
  const fromGit = gitDate(abs);
  const mtime = fs.statSync(abs).mtime.toISOString();
  // Uncommitted edits are a real freshness signal; committed files keep their commit date.
  if (dirtyPaths.has(rel(abs))) return !fromGit || mtime > fromGit ? mtime : fromGit;
  if (fromGit) return fromGit;
  return mtime;
};

const dates = {};
const addEntry = (abs, url) => {
  const date = withFallback(abs);
  if (date) dates[url] = date;
};

const blogEntries = [];
for (const abs of walk(path.join(root, 'src/content/blog'))) {
  const { data } = matter(fs.readFileSync(abs, 'utf8'));
  if (data.status !== 'published') continue;
  const id = path.basename(abs).replace(contentPattern, '');
  const url = `${site}/artikel/${data.customSlug || id}/`;
  addEntry(abs, url);
  blogEntries.push({
    url,
    date: dates[url],
    tags: data.tags ?? [],
    category: data.category,
  });
}

for (const entry of [
  { dir: 'src/content/area', prefix: '/area/' },
  { dir: 'src/content/tools', prefix: '/' },
  { dir: 'src/content/design-categories', prefix: '/desain-undangan-digital/' },
]) {
  for (const abs of walk(path.join(root, entry.dir))) {
    const { data } = matter(fs.readFileSync(abs, 'utf8'));
    if (data.status !== 'published') continue;
    const id = path.basename(abs).replace(contentPattern, '');
    addEntry(abs, `${site}${entry.prefix}${data.customSlug || id}/`);
  }
}

// Hub pages inherit the newest post they list.
const newestPerKey = (entries, keyFn) => {
  const map = new Map();
  for (const entry of entries) {
    for (const key of new Set(keyFn(entry))) {
      if (!key) continue;
      const current = map.get(key);
      if (!current || entry.date > current.date) {
        map.set(key, { date: entry.date, count: (current?.count ?? 0) + 1 });
      } else {
        map.set(key, { date: current.date, count: current.count + 1 });
      }
    }
  }
  return map;
};

for (const [tag, info] of newestPerKey(blogEntries, (entry) => entry.tags)) {
  if (info.count >= 3 && /^[a-z0-9-]+$/.test(tag)) {
    dates[`${site}/artikel/tag/${tag}/`] = info.date;
  }
}
for (const [category, info] of newestPerKey(blogEntries, (entry) => [entry.category])) {
  if (info.count >= 3) {
    dates[`${site}/artikel/kategori/${slugify(category, { lower: true, strict: true })}/`] =
      info.date;
  }
}
if (blogEntries.length > 0) {
  dates[`${site}/artikel/`] = blogEntries.reduce(
    (latest, entry) => (entry.date > latest ? entry.date : latest),
    '',
  );
}

// Catalog hub inherits the newest theme, category, or template change.
const catalogSources = [
  ...walk(path.join(root, 'src/content/designs'), true),
  ...walk(path.join(root, 'src/content/design-categories')),
  path.join(root, 'src/pages/desain-undangan-digital/[...path].astro'),
].filter((abs) => fs.existsSync(abs));
const catalogDate = catalogSources.map(withFallback).sort().at(-1);
if (catalogDate) dates[`${site}/desain-undangan-digital/`] = catalogDate;

for (const abs of fs
  .readdirSync(path.join(root, 'src/content/authors'))
  .filter((file) => file.endsWith('.json'))) {
  const id = path.basename(abs, '.json');
  addEntry(path.join(root, 'src/content/authors', abs), `${site}/penulis/${id}/`);
}

const staticPages = {
  'src/pages/index.astro': '/',
  'src/pages/fitur.astro': '/fitur/',
  'src/pages/harga.astro': '/harga/',
  'src/pages/kontak.astro': '/kontak/',
  'src/pages/tentang.astro': '/tentang/',
  'src/pages/reseller-undangan-digital.astro': '/reseller-undangan-digital/',
  'src/pages/review-us.astro': '/review-us/',
  'src/pages/portfolio/index.astro': '/portfolio/',
  'src/pages/penulis/index.astro': '/penulis/',
  'src/pages/area/[...page].astro': '/area/',
  'src/pages/tools.astro': '/tools/',
  'src/pages/order-undangan/index.astro': '/order-undangan/',
};

for (const [file, pathname] of Object.entries(staticPages)) {
  const abs = path.join(root, file);
  if (fs.existsSync(abs)) addEntry(abs, `${site}${pathname}`);
}

const sorted = Object.fromEntries(
  Object.entries(dates).sort(([a], [b]) => a.localeCompare(b)),
);
fs.writeFileSync(outFile, `${JSON.stringify(sorted, null, 2)}\n`, 'utf8');
console.log(`content-dates.json: ${Object.keys(sorted).length} URLs`);
