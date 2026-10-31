import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { getImageDimensions } from './get-image-dimensions';

const PUBLIC_DIR = fileURLToPath(new URL('../../../public/', import.meta.url));
const VARIANT_WIDTHS = [480, 960, 1440];
const cache = new Map<string, string | null>();

function variantExists(publicPath: string, width: number): boolean {
  const rel = decodeURIComponent(publicPath).replace(/^\/images\//, '').split(/[?#]/)[0];
  const ext = path.extname(rel);
  const abs = path.join(PUBLIC_DIR, 'images', 'variants', `${rel.slice(0, -ext.length)}-${width}.webp`);
  return fs.existsSync(abs);
}

export function getVariantUrl(publicPath: string, width: number): string {
  const rel = decodeURIComponent(publicPath).replace(/^\/images\//, '').split(/[?#]/)[0];
  const ext = path.extname(rel);
  return `/images/variants/${rel.slice(0, -ext.length)}-${width}.webp`;
}

/**
 * Build a `srcset` string from pre-generated WebP variants.
 * Returns `undefined` when the image is remote or has no variants on disk,
 * so callers fall back to the original `src` alone.
 */
export function getVariantSrcset(src: string, widths = VARIANT_WIDTHS): string | undefined {
  if (!src || !src.startsWith('/images/')) return undefined;
  if (cache.has(src)) return cache.get(src) ?? undefined;

  const entries = widths.filter((width) => variantExists(src, width)).map((width) => `${getVariantUrl(src, width)} ${width}w`);
  const intrinsic = getImageDimensions(src);
  const largestVariant = entries.length > 0 ? widths.filter((width) => variantExists(src, width)).at(-1) ?? 0 : 0;
  if (intrinsic && intrinsic.w > largestVariant) entries.push(`${src} ${intrinsic.w}w`);

  const srcset = entries.length > 0 ? entries.join(', ') : null;

  cache.set(src, srcset);
  return srcset ?? undefined;
}
