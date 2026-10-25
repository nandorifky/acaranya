// Generate src/data/image-dimensions.json from .mdoc content.
// Run before build: `node scripts/gen-image-dimensions.mjs`
// The Markdoc transform runs inside the Astro prerender runtime where `fs`
// is unavailable, so the dimension table must be a plain JSON import.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const contentDir = path.join(root, 'src', 'content');
const publicDir = path.join(root, 'public');
const outFile = path.join(root, 'src', 'data', 'image-dimensions.json');

function pngSize(buf) {
  if (buf.length < 24 || buf[0] !== 0x89 || buf[1] !== 0x50) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) { i += 1; continue; }
    const marker = buf[i + 1];
    if (marker === 0xd8 || marker === 0xd9 || (marker >= 0xd0 && marker <= 0xd7)) { i += 2; continue; }
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return null;
}

function webpSize(buf) {
  if (buf.length < 30) return null;
  if (buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return null;
  const fmt = buf.toString('ascii', 12, 16);
  if (fmt === 'VP8 ') {
    return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  }
  if (fmt === 'VP8L') {
    const b = buf.readUInt32LE(21);
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
  }
  if (fmt === 'VP8X') {
    return {
      w: 1 + (buf[24] | (buf[25] << 8) | (buf[26] << 16)),
      h: 1 + (buf[27] | (buf[28] << 8) | (buf[29] << 16)),
    };
  }
  return null;
}

function gifSize(buf) {
  if (buf.length < 10 || buf.toString('ascii', 0, 3) !== 'GIF') return null;
  return { w: buf.readUInt16LE(6), h: buf.readUInt16LE(8) };
}

function sizeOf(file) {
  const buf = fs.readFileSync(file);
  return pngSize(buf) || jpegSize(buf) || webpSize(buf) || gifSize(buf) || null;
}

function collectMdocFiles(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectMdocFiles(full, acc);
    else if (entry.name.endsWith('.mdoc')) acc.push(full);
  }
  return acc;
}

const srcs = new Set();
for (const file of collectMdocFiles(contentDir)) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(/!\[[^\]]*\]\(\s*(\/[^)\s]+)/g)) srcs.add(m[1]);
}

const dimensions = {};
for (const src of [...srcs].sort()) {
  try {
    const rel = decodeURIComponent(src).replace(/^\/+/, '').split(/[?#]/)[0];
    const abs = path.join(publicDir, rel.split('/').join(path.sep));
    if (!fs.existsSync(abs)) continue;
    const dims = sizeOf(abs);
    if (dims) dimensions[src] = [dims.w, dims.h];
  } catch {
    // Ignore unreadable files.
  }
}

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, `${JSON.stringify(dimensions, null, 2)}\n`, 'utf8');
console.log(`image-dimensions.json: ${Object.keys(dimensions).length} entries`);
