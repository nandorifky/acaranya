import fs from "node:fs/promises";
import path from "node:path";

const DIRECTORY = "src/content/blog";

// Regex to capture WordPress upload URLs with optional domain
const WP_IMAGE_REGEX = /(?:https?:\/\/acaranya\.id)?\/wp-content\/uploads\/[^\s\)\"\']+\/([^\s\)\"\'\?#]+)/g;
const TARGET_PATH = "/images/blog/content/";

async function main() {
    console.log("Memulai perbaikan URL gambar di dalam isi artikel...");
    
    // Read all files in src/content/blog
    const files = await fs.readdir(DIRECTORY);
    const mdFiles = files.filter(f => f.endsWith(".md"));
    
    console.log(`Ditemukan ${mdFiles.length} file markdown.`);
    
    let processedCount = 0;
    let replacedUrlsCount = 0;

    for (const file of mdFiles) {
        const filePath = path.join(DIRECTORY, file);
        const content = await fs.readFile(filePath, "utf8");
        
        // Count how many matches in this file
        const matches = content.match(WP_IMAGE_REGEX);
        
        if (matches && matches.length > 0) {
            // Replace the URLs
            const updatedContent = content.replace(WP_IMAGE_REGEX, `${TARGET_PATH}$1`);
            
            await fs.writeFile(filePath, updatedContent, "utf8");
            console.log(`✓ DIPERBAIKI: ${file} (${matches.length} gambar diperbarui)`);
            processedCount++;
            replacedUrlsCount += matches.length;
        }
    }
    
    console.log(`\nSelesai! Berhasil memperbaiki ${replacedUrlsCount} URL gambar pada ${processedCount} file artikel.`);
}

main().catch(console.error);
