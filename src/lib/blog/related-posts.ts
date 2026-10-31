interface RelatedPost {
  id: string;
  data: {
    tags: string[];
    category: string;
    publishedAt: Date;
    status: string;
    noindex?: boolean;
  };
}

const SAME_CATEGORY = 3;
const SHARED_TAG = 2;
const RECENCY_WINDOW_DAYS = 180;

export function getRelatedPosts<T extends RelatedPost>(
  post: T,
  allPosts: T[],
  limit = 3,
): T[] {
  const tags = new Set(post.data.tags);
  const candidates = allPosts.filter(
    (p) => p.id !== post.id && p.data.status === 'published' && !p.data.noindex,
  );

  const scored = candidates
    .map((candidate) => {
      let score = candidate.data.category === post.data.category ? SAME_CATEGORY : 0;
      for (const tag of candidate.data.tags) {
        if (tags.has(tag)) score += SHARED_TAG;
      }
      const dayDistance =
        Math.abs(candidate.data.publishedAt.getTime() - post.data.publishedAt.getTime()) /
        86_400_000;
      if (dayDistance <= RECENCY_WINDOW_DAYS) score += 1;
      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.candidate.data.publishedAt.getTime() - a.candidate.data.publishedAt.getTime() ||
        a.candidate.id.localeCompare(b.candidate.id),
    );

  const picked = scored.slice(0, limit).map((entry) => entry.candidate);
  if (picked.length >= limit) return picked;

  const pickedIds = new Set(picked.map((p) => p.id));
  const fillers = candidates
    .filter((p) => !pickedIds.has(p.id))
    .sort(
      (a, b) =>
        b.data.publishedAt.getTime() - a.data.publishedAt.getTime() ||
        a.id.localeCompare(b.id),
    );

  for (const filler of fillers) {
    if (picked.length >= limit) break;
    picked.push(filler);
  }

  return picked;
}
