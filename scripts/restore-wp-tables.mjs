import fs from "node:fs/promises";
import path from "node:path";
import TurndownService from "turndown";
import turndownPluginGfm from "turndown-plugin-gfm";
import matter from "gray-matter";

const WP_SITE = "https://acaranya.id";
const OUTPUT_DIR = "src/content/blog";
const { tables } = turndownPluginGfm;

// Initialize Turndown with GFM tables support
const turndown = new TurndownService({
    headingStyle: "atx",
    codeBlockStyle: "fenced",
});
turndown.use(tables);

async function getAllPosts() {
    let page = 1;
    const posts = [];
    while (true) {
        const url = `${WP_SITE}/wp-json/wp/v2/posts?per_page=100&page=${page}&_embed=1`;
        const res = await fetch(url);
        if (res.status === 400) break;
        if (!res.ok) throw new Error(`Gagal mengambil data dari WordPress page ${page}`);
        const batch = await res.json();
        if (!batch.length) break;
        posts.push(...batch);
        page++;
    }
    return posts;
}

async function main() {
    console.log("Memulai proses pemulihan tabel...");
    const posts = await getAllPosts();
    console.log(`Total artikel WordPress ditemukan: ${posts.length}`);

    let updatedCount = 0;
    for (const post of posts) {
        const slug = post.slug;
        const filePath = path.join(OUTPUT_DIR, `${slug}.md`);

        try {
            // 1. Read existing local .md file
            const fileContent = await fs.readFile(filePath, "utf8");
            
            // 2. Parse existing frontmatter using gray-matter (preserves local tags, image, etc. 100%)
            const parsed = matter(fileContent);
            const localFrontmatter = parsed.data;

            // 3. Convert WordPress HTML to GFM Markdown (with tables)
            const html = post.content?.rendered || "";
            const markdown = turndown.turndown(html);

            // 4. Combine local frontmatter with new GFM markdown content
            const newContent = matter.stringify(markdown, localFrontmatter);

            // 5. Write back to local file
            await fs.writeFile(filePath, newContent, "utf8");
            console.log(`✓ DIPULIHKAN: ${slug} (Metadata/Frontmatter lokal dipertahankan)`);
            updatedCount++;
        } catch (err) {
            // Skip files that do not exist locally
            if (err.code !== 'ENOENT') {
                console.error(`x ERROR pada ${slug}:`, err.message);
            }
        }
    }
    console.log(`\nSelesai! Berhasil memulihkan tabel pada ${updatedCount} artikel blog.`);
}

main().catch(console.error);
