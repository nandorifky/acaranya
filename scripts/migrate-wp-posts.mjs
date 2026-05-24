import fs from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";
import matter from "gray-matter";
import he from "he";
import slugify from "slugify";

const WP_SITE = "https://acaranya.id";
const NEW_SITE = "https://acaranya.id";
const OUTPUT_DIR = "src/content/blog";

const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
});

async function getAllPosts() {
    let page = 1;
    const posts = [];

    while (true) {
        const url = `${WP_SITE}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=1`;
        const res = await fetch(url);

        if (res.status === 400) break;
        if (!res.ok) throw new Error(`Gagal ambil post page ${page}`);

        const batch = await res.json();
        if (!batch.length) break;

        posts.push(...batch);
        page++;
    }

    return posts;
}

function cleanText(value = "") {
    return he.decode(value).replace(/<[^>]+>/g, "").trim();
}

function getTitle(post) {
    return cleanText(post.title?.rendered || "Tanpa Judul");
}

function getDescription(post) {
    return cleanText(post.excerpt?.rendered || "").slice(0, 160);
}

function getFeaturedImage(post) {
    return post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || "";
}

function getCategories(post) {
    return post._embedded?.["wp:term"]?.[0]?.map((term) => term.name) || [];
}

function getTags(post) {
    return post._embedded?.["wp:term"]?.[1]?.map((term) => term.name) || [];
}

function getSlug(post, title) {
    return post.slug || slugify(title, { lower: true, strict: true });
}

async function main() {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    const posts = await getAllPosts();

    console.log(`Total artikel ditemukan: ${posts.length}`);

    for (const post of posts) {
        const title = getTitle(post);
        const slug = getSlug(post, title);
        const description = getDescription(post);
        const categories = getCategories(post);
        const tags = getTags(post);
        const image = getFeaturedImage(post);

        const html = post.content?.rendered || "";
        const markdown = turndown.turndown(html);

        const frontmatter = {
            title,
            description,
            publishedAt: post.date,
            updatedAt: post.modified,
            author: "tim-acaranya",
            category: categories[0] || "umum",
            tags,
            image,
            imageAlt: title,
            imageTitle: title,
            imageCaption: "",
            status: post.status === "publish" ? "published" : "draft",
            seoTitle: title,
            customBreadcrumbLabel: title,
            canonicalUrl: `${NEW_SITE}/artikel/${slug}/`,
            noindex: false,
        };

        const content = matter.stringify(markdown, frontmatter);
        const filePath = path.join(OUTPUT_DIR, `${slug}.md`);

        await fs.writeFile(filePath, content, "utf8");

        console.log(`OK: ${slug}`);
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});