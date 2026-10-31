import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import slugify from 'slugify';

const PUBLIC_DIR = fileURLToPath(new URL('../../../public/', import.meta.url));
const cache = new Map<string, DesignThumb>();

export interface DesignThumb {
  src: string;
  srcset?: string;
  local: boolean;
}

/**
 * Resolve a design thumbnail to the locally mirrored WebP pair.
 * Falls back to the original remote URL when the mirror is missing.
 */
export function resolveDesignThumb(id: string, fallback: string): DesignThumb {
  if (cache.has(id)) return cache.get(id)!;

  const key = slugify(id, { lower: true, strict: true });
  const url = (width: number) => `/images/designs/${key}-${width}.webp`;
  const has320 = fs.existsSync(path.join(PUBLIC_DIR, 'images', 'designs', `${key}-320.webp`));
  const has640 = fs.existsSync(path.join(PUBLIC_DIR, 'images', 'designs', `${key}-640.webp`));

  const result: DesignThumb = has640
    ? {
        src: url(640),
        srcset: [has320 ? `${url(320)} 320w` : null, `${url(640)} 640w`].filter(Boolean).join(', '),
        local: true,
      }
    : { src: fallback, local: false };

  cache.set(id, result);
  return result;
}
