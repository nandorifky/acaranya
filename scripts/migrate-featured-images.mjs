import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const DEST_DIR = path.join(__dirname, '../public/images/blog/featured');

// Pastikan folder tujuan ada
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

async function downloadImage(url, destPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Gagal download: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (error) {
    console.error(`Error mendownload ${url}:`, error.message);
    return false;
  }
}

async function migrate() {
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
  console.log(`Menemukan ${files.length} artikel. Memulai migrasi...`);

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    const slug = file.replace('.md', '');

    if (data.image && (data.image.startsWith('http') || data.image.includes('wp-content'))) {
      const ext = path.extname(data.image.split('?')[0]) || '.jpg';
      const newFileName = `${slug}${ext}`;
      const destPath = path.join(DEST_DIR, newFileName);
      const newPublicPath = `/images/blog/featured/${newFileName}`;

      console.log(`Migrasi: ${slug} -> ${data.image}`);
      
      const success = await downloadImage(data.image, destPath);
      
      if (success) {
        data.image = newPublicPath;
        const newYaml = matter.stringify(content, data);
        fs.writeFileSync(filePath, newYaml);
        console.log(`✅ Berhasil: ${newFileName}`);
      }
    } else {
      console.log(`⏭️  Skip: ${slug} (Sudah lokal atau tidak ada gambar)`);
    }
  }

  console.log('\nMigrasi selesai!');
}

migrate();
