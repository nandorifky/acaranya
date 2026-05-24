import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const designs = defineCollection({
  loader: glob({ pattern: '**/*.{md,json,mdoc}', base: './src/content/designs' }),
  schema: z.object({
    title: z.string(),
    category: z.string(),
    eventType: z.enum(['wedding', 'khitanan', 'birthday', 'aqiqah', 'corporate', 'graduation', 'other']),
    thumbnail: z.string().optional(),
    previewUrl: z.string(),
    isFeatured: z.boolean().default(false),
    isPremium: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    package: z.enum(['simple', 'mengundang', 'meriah']).optional(),
    sortOrder: z.number().default(0),
    status: z.enum(['draft', 'published']).default('published'),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    author: z.string(), // Slug of the author in the authors collection
    category: z.string(),
    tags: z.array(z.string()).default([]),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    imageTitle: z.string().optional(),
    imageCaption: z.string().optional(),
    status: z.enum(['draft', 'published']).default('published'),
    // SEO Fields
    seoTitle: z.string().optional(),
    customBreadcrumbLabel: z.string().optional(),
    canonicalUrl: z.string().optional(),
    noindex: z.boolean().default(false),
  }),
});

const testimonials = defineCollection({
  loader: glob({ pattern: '**/*.{md,json,mdoc}', base: './src/content/testimonials' }),
  schema: z.object({
    name: z.string(),
    eventType: z.string(),
    message: z.string(),
    rating: z.number().min(1).max(5),
    image: z.string().optional(),
    status: z.enum(['draft', 'published']).default('published'),
  }),
});

const faqs = defineCollection({
  loader: glob({ pattern: '**/*.{md,json,mdoc}', base: './src/content/faqs' }),
  schema: z.object({
    question: z.string(),
    answer: z.string(),
    category: z.string(),
    sortOrder: z.number().default(0),
    status: z.enum(['draft', 'published']).default('published'),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,json,mdoc}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
    socialTwitter: z.string().optional(),
    socialInstagram: z.string().optional(),
    socialFacebook: z.string().optional(),
    socialLinkedin: z.string().optional(),
    socialGithub: z.string().optional(),
    socialWebsite: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

export const collections = { designs, designCategories, blog, testimonials, faqs, authors };
ault('published'),
  }),
});

const authors = defineCollection({
  loader: glob({ pattern: '**/*.{md,json,mdoc}', base: './src/content/authors' }),
  schema: z.object({
    name: z.string(),
    role: z.string(),
    bio: z.string(),
    avatar: z.string().optional(),
    socialTwitter: z.string().optional(),
    socialInstagram: z.string().optional(),
    socialFacebook: z.string().optional(),
    socialLinkedin: z.string().optional(),
    socialGithub: z.string().optional(),
    socialWebsite: z.string().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
  }),
});

export const collections = { designs, blog, testimonials, faqs, authors };
