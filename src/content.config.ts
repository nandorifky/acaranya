import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const designs = defineCollection({
  loader: glob({ pattern: '**/*.{md,json,mdoc}', base: './src/content/designs' }),
  schema: z.object({
    title: z.string(),
    category: z.string(), // Referring to the slug of designCategories
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

const designCategories = defineCollection({
  loader: glob({ pattern: '**/*.{md,json,mdoc}', base: './src/content/design-categories' }),
  schema: z.object({
    title: z.string(), // Main Label
    labelShort: z.string(),
    description: z.string(),
    metaTitle: z.string(),
    metaDescription: z.string(),
    icon: z.string(), // Lucide icon name
    sortOrder: z.number().default(0),
    status: z.enum(['draft', 'published']).default('published'),
    // Page Content Overrides
    heroTitle: z.string().optional(),
    heroSubtitle: z.string().optional(),
    whyChooseUs: z.object({
      title: z.string().optional(),
      subtitle: z.string().optional(),
      image: z.string().optional(),
      features: z.array(z.object({
        title: z.string(),
        description: z.string(),
        icon: z.string(),
      })).optional(),
    }).optional(),
    ctaTitle: z.string().optional(),
    ctaSubtitle: z.string().optional(),
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

const tools = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/tools' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    toolComponent: z.string(),
    icon: z.string().optional(),
    publishedAt: z.coerce.date().optional(),
    status: z.enum(['draft', 'published']).default('published'),
    // SEO & SoftwareApplication Schema Fields
    seoTitle: z.string().optional(),
    canonicalUrl: z.string().optional(),
    noindex: z.boolean().default(false),
    schemaSoftwareName: z.string().optional(),
    schemaOperatingSystem: z.string().default('All'),
    schemaApplicationCategory: z.string().default('WebApplication'),
    schemaOffersPrice: z.string().default('0'),
    schemaOffersPriceCurrency: z.string().default('IDR'),
    schemaRatingValue: z.number().optional(),
    schemaRatingCount: z.number().optional(),
  }),
});

const portfolio = defineCollection({
  loader: glob({ pattern: '**/*.{md,json,mdoc}', base: './src/content/portfolio' }),
  schema: z.object({
    title: z.string(),
    clientName: z.string(),
    category: z.string(),
    designUsed: z.string().optional(),
    thumbnail: z.string(),
    gallery: z.array(z.string()).default([]),
    liveUrl: z.string().url().optional(),
    eventDate: z.coerce.date().optional(),
    location: z.string().optional(),
    featuresUsed: z.array(z.string()).default([]),
    clientTestimonial: z.string().optional(),
    sortOrder: z.number().default(0),
    status: z.enum(['draft', 'published']).default('published'),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
  }),
});

const area = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx,mdoc}', base: './src/content/area' }),
  schema: ({ image }) => z.object({
    title: z.string(),
    description: z.string(),
    cityName: z.string(),
    province: z.string().optional(),
    coverImage: image().optional(),
    imageAlt: z.string().optional(),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    status: z.enum(['draft', 'published']).default('published'),
    // SEO
    seoTitle: z.string().optional(),
    noindex: z.boolean().default(false),
    whatsappText: z.string().optional(),
  }),
});

export const collections = { designs, designCategories, blog, testimonials, faqs, authors, tools, portfolio, area };
