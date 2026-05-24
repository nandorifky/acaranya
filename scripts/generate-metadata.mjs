import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');

const tagRules = {
  'pernikahan': ['nikah', 'wedding', 'pengantin', 'akad', 'resepsi', 'mantu', 'mahar', 'seserahan'],
  'undangan-digital': ['digital', 'website', 'online', 'link', 'wa', 'whatsapp', 'canva'],
  'islami': ['islam', 'syariat', 'doa', 'barakallah', 'ijab', 'kabul', 'sholat', 'ramadhan'],
  'adat': ['jawa', 'sunda', 'betawi', 'bugis', 'tradisi', 'budaya'],
  'tips': ['cara', 'tips', 'trik', 'panduan', 'tahapan', 'list', 'persiapan'],
  'kata-kata': ['ucapan', 'kalimat', 'kata-kata', 'quotes', 'teks', 'doa'],
  'desain': ['aesthetic', 'tema', 'warna', 'layout', 'background', 'bingkai', 'motif']
};

function generateTags(title, content) {
  const tags = new Set();
  const lowerTitle = title.toLowerCase();
  const lowerContent = content.toLowerCase();

  for (const [tag, keywords] of Object.entries(tagRules)) {
    if (keywords.some(kw => lowerTitle.includes(kw) || lowerContent.includes(kw))) {
      tags.add(tag);
    }
  }
  return Array.from(tags);
}

function generateDescription(content) {
  // Bersihkan markdown basics
  let cleanText = content
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // link
    .replace(/[#*`>]/g, '') // markdown chars
    .replace(/\s+/g, ' ') // whitespace
    .trim();

  // Ambil kalimat pertama atau 150-160 karakter pertama
  if (cleanText.length > 155) {
    cleanText = cleanText.substring(0, 152) + '...';
  }
  return cleanText;
}

async function updateMetadata() {
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md'));
  console.log(`Memproses SEO untuk ${files.length} artikel...`);

  let count = 0;
  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    let changed = false;

    // 1. Update Deskripsi jika kosong atau terlalu pendek
    if (!data.description || data.description.length < 50) {
      data.description = generateDescription(content);
      changed = true;
    }

    // 2. Update Tags jika kosong
    if (!data.tags || data.tags.length === 0) {
      data.tags = generateTags(data.title, content);
      changed = true;
    }

    if (changed) {
      const newFileContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, newFileContent);
      count++;
    }
  }

  console.log(`\nSelesai! Berhasil memperbarui SEO di ${count} artikel.`);
}

updateMetadata();
