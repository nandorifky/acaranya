import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const PUBLIC_DIR = fileURLToPath(new URL('../../../public/', import.meta.url));
const cache = new Map();

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

function svgSize(buf) {
  const txt = buf.toString('utf8', 0, Math.min(buf.length, 2000));
  if (!/<svg/i.test(txt)) return null;
  const wm = txt.match(/\bwidth=["']?([\d.]+)/i);
  const hm = txt.match(/\bheight=["']?([\d.]+)/i);
  if (wm && hm) return { w: Math.round(parseFloat(wm[1])), h: Math.round(parseFloat(hm[1])) };
  const vm = txt.match(/viewBox=["']([^"']+)["']/i);
  if (vm) {
    const parts = vm[1].trim().split(/[\s,]+/).map(Number);
    if (parts.length === 4 && parts[2] > 0 && parts[3] > 0) {
      return { w: Math.round(parts[2]), h: Math.round(parts[3]) };
    }
  }
  return null;
}

/**
 * Read intrinsic pixel dimensions of a file in `public/`.
 * Accepts a public path such as `/images/foo.webp`.
 * Returns `null` for remote URLs or unreadable files so callers can fall back.
 */
export function getImageDimensions(src) {
  if (!src || typeof src !== 'string') return null;
  if (!src.startsWith('/') || src.startsWith('//')) return null;
  if (cache.has(src)) return cache.get(src);

  let dims = null;
  try {
    const rel = decodeURIComponent(src).replace(/^\/+/, '').split(/[?#]/)[0];
    const abs = path.join(PUBLIC_DIR, rel.split('/').join(path.sep));
    if (fs.existsSync(abs)) {
      const buf = fs.readFileSync(abs);
      dims = pngSize(buf) || jpegSize(buf) || webpSize(buf) || gifSize(buf) || svgSize(buf) || null;
    }
  } catch {
    dims = null;
  }

  cache.set(src, dims);
  return dims;
}

/**
 * Build `width`/`height` HTML attributes for a public image path.
 * Returns an empty object when the file cannot be resolved, so the
 * attribute is simply omitted instead of rendering a wrong value.
 */
export function getImageSizeAttrs(src) {
  const dims = getImageDimensions(src);
  return dims ? { width: dims.w, height: dims.h } : {};
}
