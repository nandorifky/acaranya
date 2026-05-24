import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';
import fetch from 'node-fetch';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');
const DEST_DIR = path.join(__dirname, '../public/images/blog/content');

if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

async function downloadImage(url, destPath) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Gagal: ${response.statusText}`);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(destPath, buffer);
    return true;
  } catch (error) {
    console.error(`Error download ${url}:`, error.message);
    return false;
  }
}

function getUniqueFileName(originalName) {
  let name = originalName;
  let ext = path.extname(originalName);
  let base = path.basename(originalName, ext);
  let counter = 1;
  
  while (fs.existsSync(path.join(DEST_DIR, name))) {
    name = `${base}-${counter}${ext}`;
    counter++;
  }
  return name;
}

async function migrate() {
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
  const urlMap = new Map(); // Untuk menghindari download ulang file yang sama

  console.log(`Memulai migrasi gambar konten dari ${files.length} artikel...`);

  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    let fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Regex untuk mencari markdown image: ![alt](url)
    const imgRegex = /!\[.*?\]\((https?:\/\/acaranya\.id\/wp-content\/uploads\/.*?)\)/g;
    let match;
    let hasChanged = false;

    while ((match = imgRegex.exec(fileContent)) !== null) {
      const fullUrl = match[1];
      const originalName = path.basename(fullUrl.split('?')[0]);
      
      let finalFileName;
      if (urlMap.has(fullUrl)) {
        finalFileName = urlMap.get(fullUrl);
      } else {
        finalFileName = getUniqueFileName(originalName);
        const destPath = path.join(DEST_DIR, finalFileName);
        
        console.log(`Downloading: ${originalName} -> ${finalFileName}`);
        const success = await downloadImage(fullUrl, destPath);
        if (success) {
          urlMap.set(fullUrl, finalFileName);
        } else {
          continue;
        }
      }

      const newLocalPath = `/images/blog/content/${finalFileName}`;
      fileContent = fileContent.replace(fullUrl, newLocalPath);
      hasChanged = true;
    }

    if (hasChanged) {
      fs.writeFileSync(filePath, fileContent);
      console.log(`✅ Update konten: ${file}`);
    }
  }

  console.log('\nMigrasi gambar konten selesai!');
}

migrate();
