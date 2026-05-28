/**
 * Acaranya.id — Homepage Link Detector
 * 
 * Memindai semua berkas Markdown (.md & .mdoc) langsung di folder 'src/content/'
 * untuk mencari internal link yang masih menggunakan URL absolute mengarah ke Homepage.
 * 
 * Cara Menjalankan:
 * 1. node scripts/check-homepage-links.cjs
 */

const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '../src/content');
const REPORT_FILE = path.join(__dirname, '../homepage-links-report.md');

// Helper untuk membaca file Markdown/Markdoc secara rekursif
function getMarkdownFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    console.error(`\x1b[31m[ERROR] Direktori '${dir}' tidak ditemukan!\x1b[0m`);
    process.exit(1);
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdoc')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Fungsi utama detector
function runHomepageLinkDetector() {
  console.log('\n\x1b[36m🔍 MEMULAI PENDETEKSIAN LINK HOMEPAGE DI SOURCE FILE...\x1b[0m');
  console.log(`📂 Folder Target: ${CONTENT_DIR}\n`);

  const files = getMarkdownFiles(CONTENT_DIR);
  console.log(`📄 Ditemukan \x1b[32m${files.length}\x1b[0m berkas konten untuk dianalisis.\n`);

  // Struktur penyimpanan hasil grouping:
  // { "[undangan digital](https://acaranya.id/)": [ { file: "path", title: "judul", line: 12 }, ... ] }
  const groupedLinks = {};
  let totalOccurrences = 0;

  for (const file of files) {
    const relativePath = path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // Ekstrak Title dari Frontmatter
    let pageTitle = 'Tanpa Judul';
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (fmMatch) {
      const fmContent = fmMatch[1];
      const titleLine = fmContent.split('\n').find(line => line.startsWith('title:'));
      if (titleLine) {
        pageTitle = titleLine.replace('title:', '').replace(/['"]/g, '').trim();
      }
    }

    // Pisahkan baris untuk mencatat nomor baris kemunculan
    const lines = content.split(/\r?\n/);

    // Loop per baris
    lines.forEach((lineText, lineIdx) => {
      const lineNum = lineIdx + 1;

      // 1. Deteksi link format Markdown: [text](https://acaranya.id/)
      // Pencarian fleksibel untuk https://acaranya.id, http://acaranya.id, dll (opsional dengan slash di akhir)
      const mdRegex = /\[([^\]]+)\]\((https?:\/\/acaranya\.id\/?)\)/gi;
      let mdMatch;
      while ((mdMatch = mdRegex.exec(lineText)) !== null) {
        const anchorText = mdMatch[1].trim();
        const url = mdMatch[2].trim();
        const key = `[${anchorText}](${url})`;

        if (!groupedLinks[key]) {
          groupedLinks[key] = [];
        }

        groupedLinks[key].push({
          file: relativePath,
          title: pageTitle,
          line: lineNum
        });
        totalOccurrences++;
      }

      // 2. Deteksi link format HTML: <a href="https://acaranya.id/">text</a>
      const htmlRegex = /<a\s+[^>]*href=["'](https?:\/\/acaranya\.id\/??)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let htmlMatch;
      while ((htmlMatch = htmlRegex.exec(lineText)) !== null) {
        const url = htmlMatch[1].trim();
        const anchorTextRaw = htmlMatch[2].trim();
        // Bersihkan tag HTML internal jika ada
        const anchorText = anchorTextRaw.replace(/<[^>]+>/g, '').trim();
        const key = `[${anchorText}](${url})`;

        if (!groupedLinks[key]) {
          groupedLinks[key] = [];
        }

        groupedLinks[key].push({
          file: relativePath,
          title: pageTitle,
          line: lineNum
        });
        totalOccurrences++;
      }
    });
  }

  // Cetak hasil di terminal CLI
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 \x1b[1mRANGKUMAN LINK HOMEPAGE DI SOURCE CODE\x1b[22m`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`🔗 Total Link Homepage Terdeteksi : \x1b[31m${totalOccurrences}\x1b[0m`);
  console.log(`🔠 Jumlah Jenis Variasi Anchor    : \x1b[32m${Object.keys(groupedLinks).length}\x1b[0m`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (totalOccurrences > 0) {
    // Urutkan berdasarkan kemunculan terbanyak
    const sortedEntries = Object.entries(groupedLinks).sort((a, b) => b[1].length - a[1].length);

    for (const [linkStr, occurrences] of sortedEntries) {
      console.log(`🔹 \x1b[33m${linkStr}\x1b[0m ➔ Ada \x1b[32m${occurrences.length}\x1b[0m kali`);
      const uniqueFiles = new Set(occurrences.map(o => `   📄 ${o.title} (${o.file}:${o.line})`));
      uniqueFiles.forEach(fileStr => console.log(fileStr));
      console.log('');
    }

    // Buat laporan berkas Markdown
    generateMarkdownReport(totalOccurrences, groupedLinks);
  } else {
    console.log('🎉 \x1b[32mHEBAT! Tidak ditemukan link absolute homepage di file Markdown Anda!\x1b[0m\n');
  }
}

// Fungsi pembuat laporan berkas Markdown (.md)
function generateMarkdownReport(total, grouped) {
  const dateStr = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
  const sortedEntries = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);

  let mdContent = `# 🔗 Laporan Tautan Absolute Homepage — Acaranya.id\n\n`;
  mdContent += `*Laporan ini dihasilkan otomatis pada: **${dateStr}***\n\n`;
  mdContent += `Laporan ini mendeteksi seluruh link absolute mengarah ke homepage (\`https://acaranya.id\` atau \`https://acaranya.id/\`) pada berkas sumber di dalam folder \`src/content/\` untuk memudahkan Anda melakukan penggantian (*replace*) konten.\n\n`;

  mdContent += `## 📈 Rangkuman Singkat\n`;
  mdContent += `* **Total Kemunculan Link Homepage**: **${total}** kali\n`;
  mdContent += `* **Jumlah Variasi Format Tautan**: ${sortedEntries.length} jenis\n\n`;

  mdContent += `## 📋 Daftar Rincian & Lokasi Link Homepage\n\n`;

  sortedEntries.forEach(([linkKey, occurrences], idx) => {
    mdContent += `### ${idx + 1}. \`${linkKey}\` (${occurrences.length} Kemunculan)\n`;
    mdContent += `Berikut berkas-berkas artikel yang memuat tautan ini:\n\n`;
    
    occurrences.forEach(occ => {
      mdContent += `* **${occ.title}** ➔ [\`${occ.file}\`](file:///${path.resolve(occ.file).replace(/\\/g, '/')}) pada baris **${occ.line}**\n`;
    });
    mdContent += `\n---\n\n`;
  });

  fs.writeFileSync(REPORT_FILE, mdContent, 'utf8');
  console.log(`💾 Laporan detail berhasil disimpan di: \x1b[36mhomepage-links-report.md\x1b[0m\n`);
}

// Jalankan detector
runHomepageLinkDetector();
