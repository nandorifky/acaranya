/**
 * Acaranya.id — High-Performance Broken Link Detector (Markdown Source Edition)
 * 
 * Memindai semua file Markdown (.md & .mdoc) di folder 'src/content/' secara langsung,
 * memverifikasi apakah target link internalnya ada di folder 'dist/' hasil kompilasi,
 * lalu mengelompokkannya berdasarkan format tag Markdown (e.g. [Fitur RSVP](/rsvp/))
 * agar Anda dapat melakukan search-and-replace massal dengan sangat mudah.
 * 
 * Cara Menjalankan:
 * 1. pnpm build
 * 2. node scripts/check-links.cjs
 * 3. Untuk scan instan link internal saja: node scripts/check-links.cjs --internal-only
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Konfigurasi
const CONTENT_DIR = path.join(__dirname, '../src/content');
const DIST_DIR = path.join(__dirname, '../dist');
const REPORT_FILE = path.join(__dirname, '../broken-links-report.md');
const CONCURRENCY_LIMIT = 5; // Batas request eksternal paralel
const REQUEST_TIMEOUT = 5000; // Timeout 5 detik

// Argument flags
const args = process.argv.slice(2);
const isInternalOnly = args.includes('--internal-only');

// Helper untuk rekursif mencari berkas Markdown (.md & .mdoc)
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

// Verifikasi apakah file target internal ada di folder dist/
function verifyInternalPath(targetPath) {
  let decodedPath = '';
  try {
    decodedPath = decodeURIComponent(targetPath);
  } catch (e) {
    decodedPath = targetPath;
  }

  // Hapus optional Markdown title, query params, dan hash.
  // Contoh: /img.webp "judul" -> /img.webp
  const titleMatch = decodedPath.match(/^([^\s]+)\s+(['"]).*\2$/);
  if (titleMatch) decodedPath = titleMatch[1];
  decodedPath = decodedPath.split('?')[0].split('#')[0];

  // Abaikan link kosong atau jangkar halaman saat ini
  if (decodedPath === '' || decodedPath.startsWith('#')) {
    return true;
  }

  // Jika berupa path absolute (dimulai dengan /)
  if (decodedPath.startsWith('/')) {
    const rootPath = decodedPath.slice(1);
    const rootPathNoSlash = rootPath.replace(/\/$/, '');
    
    const possiblePaths = [
      path.join(DIST_DIR, rootPathNoSlash, 'index.html'), // Folder routing (/desain/ -> dist/desain/index.html)
      path.join(DIST_DIR, rootPath + '.html'),       // File direct (/desain -> dist/desain.html)
      path.join(DIST_DIR, rootPath),                 // Aset langsung (/images/logo.png -> dist/images/logo.png)
      path.join(DIST_DIR, rootPathNoSlash + '/index.html') // Folder routing tanpa trailing slash
    ];

    return possiblePaths.some(p => fs.existsSync(p));
  } 
  
  // Jika path relative, di markdown file content collections biasanya diselesaikan relatif terhadap domain utama.
  // Kita asumsikan mengarah ke routing root path jika tidak dimulai dengan /
  const cleanedRelative = decodedPath.replace(/^\.\//, '').replace(/^\.\.\//, '');
  const possiblePaths = [
    path.join(DIST_DIR, cleanedRelative, 'index.html'),
    path.join(DIST_DIR, cleanedRelative + '.html'),
    path.join(DIST_DIR, cleanedRelative)
  ];
  return possiblePaths.some(p => fs.existsSync(p));
}

// Uji coba ping link eksternal menggunakan HEAD/GET request dengan pembatasan
function testExternalUrl(url) {
  return new Promise((resolve) => {
    try {
      const parsedUrl = new URL(url);
      const options = {
        method: 'HEAD',
        timeout: REQUEST_TIMEOUT,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) LinkChecker/1.0'
        }
      };

      const client = parsedUrl.protocol === 'https:' ? https : http;

      const req = client.request(url, options, (res) => {
        if (res.statusCode < 400) {
          resolve({ ok: true, status: res.statusCode });
        } else {
          // Coba ulang dengan GET jika HEAD ditolak
          options.method = 'GET';
          const getReq = client.request(url, options, (getRes) => {
            resolve({ ok: getRes.statusCode < 400, status: getRes.statusCode });
          });
          getReq.on('error', () => resolve({ ok: false, status: 'Koneksi Gagal' }));
          getReq.end();
        }
      });

      req.on('timeout', () => {
        req.destroy();
        resolve({ ok: false, status: 'Timeout' });
      });

      req.on('error', (err) => {
        resolve({ ok: false, status: err.message || 'Koneksi Gagal' });
      });

      req.end();
    } catch (e) {
      resolve({ ok: false, status: 'URL Tidak Valid' });
    }
  });
}

// Fungsi utama crawler
async function runCrawler() {
  if (!fs.existsSync(DIST_DIR)) {
    console.error(`\x1b[31m[ERROR] Direktori '${DIST_DIR}' tidak ditemukan. Silakan jalankan 'pnpm build' terlebih dahulu sebelum scan agar verifikasi akurat!\x1b[0m`);
    process.exit(1);
  }

  console.log('\n\x1b[36m🚀 MEMULAI PEMINDAIAN BROKEN LINK SUMBER MARKDOWN...\x1b[0m');
  console.log(`📂 Folder Sumber: ${CONTENT_DIR}`);
  console.log(`📂 Folder Build (Verifikator): ${DIST_DIR}`);
  console.log(`⚙️  Scan Mode: ${isInternalOnly ? '\x1b[33mInternal Link Saja\x1b[0m' : '\x1b[32mInternal & Eksternal Link\x1b[0m'}\n`);

  const files = getMarkdownFiles(CONTENT_DIR);
  console.log(`📄 Ditemukan \x1b[32m${files.length}\x1b[0m berkas konten untuk dipindai.\n`);

  const allLinks = [];
  let totalLinksChecked = 0;

  // 1. Ekstrak semua link dan posisinya di file Markdown
  for (const file of files) {
    const relativePath = path.relative(path.join(__dirname, '..'), file).replace(/\\/g, '/');
    const content = fs.readFileSync(file, 'utf8');

    // Ekstrak Title Halaman dari Frontmatter
    let pageTitle = 'Tanpa Judul';
    const fmMatch = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
    if (fmMatch) {
      const fmContent = fmMatch[1];
      const titleLine = fmContent.split('\n').find(line => line.startsWith('title:'));
      if (titleLine) {
        pageTitle = titleLine.replace('title:', '').replace(/['"]/g, '').trim();
      }
    }

    const lines = content.split(/\r?\n/);

    lines.forEach((lineText, lineIdx) => {
      const lineNum = lineIdx + 1;

      // a. Tautan format Markdown standar: [Anchor](URL). Negative lookbehind agar ![Alt](URL) tidak dihitung ganda.
      const mdLinkRegex = /(?<!!)\[([^\]]+)\]\(([^)]+)\)/g;
      let mdMatch;
      while ((mdMatch = mdLinkRegex.exec(lineText)) !== null) {
        const anchor = mdMatch[1].trim();
        const href = mdMatch[2].trim().match(/^([^\s]+)\s+(['"]).*\2$/)?.[1] || mdMatch[2].trim();

        if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || href.startsWith('#')) {
          continue;
        }

        allLinks.push({
          type: 'Anchor',
          href: href,
          anchorText: anchor,
          representation: `[${anchor}](${href})`,
          pageTitle: pageTitle,
          fileSource: relativePath,
          line: lineNum
        });
      }

      // b. Tautan format Gambar Markdown standar: ![Alt](URL)
      const mdImgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
      let imgMatch;
      while ((imgMatch = mdImgRegex.exec(lineText)) !== null) {
        const alt = imgMatch[1].trim();
        const src = imgMatch[2].trim().match(/^([^\s]+)\s+(['"]).*\2$/)?.[1] || imgMatch[2].trim();

        allLinks.push({
          type: 'Gambar',
          href: src,
          anchorText: alt || 'Naked URL Gambar',
          representation: `![${alt}](${src})`,
          pageTitle: pageTitle,
          fileSource: relativePath,
          line: lineNum
        });
      }

      // c. Tautan format HTML Anchor: <a href="URL">text</a>
      const htmlLinkRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
      let htmlMatch;
      while ((htmlMatch = htmlLinkRegex.exec(lineText)) !== null) {
        const href = htmlMatch[1].trim();
        const textRaw = htmlMatch[2].trim();
        const text = textRaw.replace(/<[^>]+>/g, '').trim(); // Bersihkan HTML internal

        if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || href.startsWith('#')) {
          continue;
        }

        allLinks.push({
          type: 'Anchor HTML',
          href: href,
          anchorText: text,
          representation: `<a href="${href}">${text}</a>`,
          pageTitle: pageTitle,
          fileSource: relativePath,
          line: lineNum
        });
      }
    });
  }

  const brokenLinks = [];
  const externalLinksQueue = [];
  const groupedBrokenLinks = {}; // Menyimpan kemunculan link rusak yang dikelompokkan oleh format Markdown-nya

  // 2. Validasi Tautan
  for (const link of allLinks) {
    totalLinksChecked++;
    const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://');

    if (isExternal) {
      // Periksa jika eksternal tapi mengarah ke localhost
      const isLocalhost = link.href.includes('localhost:') || link.href.includes('127.0.0.1');
      if (isLocalhost) {
        const localPath = new URL(link.href).pathname;
        const isOk = verifyInternalPath(localPath);
        if (!isOk) {
          link.status = '404: Not Found (Localhost)';
          brokenLinks.push(link);
          
          if (!groupedBrokenLinks[link.representation]) {
            groupedBrokenLinks[link.representation] = [];
          }
          groupedBrokenLinks[link.representation].push(link);
        }
      } else if (!isInternalOnly) {
        externalLinksQueue.push(link);
      }
    } else {
      // Link Internal
      const isOk = verifyInternalPath(link.href);
      if (!isOk) {
        link.status = '404: Not Found';
        brokenLinks.push(link);

        if (!groupedBrokenLinks[link.representation]) {
          groupedBrokenLinks[link.representation] = [];
        }
        groupedBrokenLinks[link.representation].push(link);
      }
    }
  }

  // 3. Verifikasi Tautan Eksternal secara paralel (Throttled)
  if (externalLinksQueue.length > 0) {
    console.log(`🌐 Memverifikasi \x1b[35m${externalLinksQueue.length}\x1b[0m link eksternal secara paralel (Throttled)...`);
    
    let index = 0;
    const runWorker = () => {
      return new Promise((resolve) => {
        const next = async () => {
          if (index >= externalLinksQueue.length) {
            resolve();
            return;
          }

          const currentLink = externalLinksQueue[index++];
          process.stdout.write(`\r🔍 Memverifikasi link luar: ${index}/${externalLinksQueue.length}...`);
          
          try {
            const result = await testExternalUrl(currentLink.href);
            if (!result.ok) {
              currentLink.status = `${result.status}`;
              brokenLinks.push(currentLink);
              
              if (!groupedBrokenLinks[currentLink.representation]) {
                groupedBrokenLinks[currentLink.representation] = [];
              }
              groupedBrokenLinks[currentLink.representation].push(currentLink);
            }
          } catch (e) {
            currentLink.status = 'Koneksi Gagal';
            brokenLinks.push(currentLink);

            if (!groupedBrokenLinks[currentLink.representation]) {
              groupedBrokenLinks[currentLink.representation] = [];
            }
            groupedBrokenLinks[currentLink.representation].push(currentLink);
          }
          
          next();
        };
        next();
      });
    };

    const workers = [];
    for (let i = 0; i < Math.min(CONCURRENCY_LIMIT, externalLinksQueue.length); i++) {
      workers.push(runWorker());
    }
    await Promise.all(workers);
    console.log('\n\x1b[32m✓ Selesai memverifikasi link eksternal.\x1b[0m\n');
  }

  // 4. Tampilkan Hasil Rangkuman CLI Grouped
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 \x1b[1mRANGKUMAN AUDIT BROKEN LINK SUMBER KONTEN\x1b[22m`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Total Link Diperiksa : \x1b[32m${totalLinksChecked}\x1b[0m`);
  console.log(`❌ Total Broken Link    : \x1b[31m${brokenLinks.length}\x1b[0m`);
  console.log(`🔠 Variasi Broken Link  : \x1b[33m${Object.keys(groupedBrokenLinks).length}\x1b[0m`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  if (brokenLinks.length > 0) {
    const sortedEntries = Object.entries(groupedBrokenLinks).sort((a, b) => b[1].length - a[1].length);

    for (const [rep, list] of sortedEntries) {
      console.log(`🔹 \x1b[31m${rep}\x1b[0m ➔ Muncul \x1b[33m${list.length} kali\x1b[0m`);
      const occurrences = list.map(o => `   📄 ${o.pageTitle} (${o.fileSource}:${o.line}) [${o.status}]`);
      occurrences.forEach(occ => console.log(occ));
      console.log('');
    }
  } else {
    console.log('🎉 \x1b[32mHEBAT! Seluruh link internal & eksternal di artikel Anda 100% aktif dan sehat!\x1b[0m\n');
  }

  // 5. Generate Markdown Report (.md)
  generateMarkdownReport(totalLinksChecked, brokenLinks, groupedBrokenLinks);
}

// Laporan File Markdown
function generateMarkdownReport(totalChecked, brokenList, groupedMap) {
  const dateStr = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
  const sortedEntries = Object.entries(groupedMap).sort((a, b) => b[1].length - a[1].length);

  let mdContent = `# 📊 Laporan Audit Broken Link Sumber Konten — Acaranya.id\n\n`;
  mdContent += `*Laporan ini dihasilkan otomatis pada: **${dateStr}***\n\n`;
  mdContent += `Laporan ini menyajikan broken link yang ditemukan langsung pada file **sumber Markdown (\`src/content/\`)** dan dikelompokkan berdasarkan penulisan aslinya untuk mempermudah Anda melakukan global search-and-replace di editor.\n\n`;

  mdContent += `## 📈 Rangkuman Utama\n`;
  mdContent += `* **Total Link Diperiksa**: ${totalChecked} Link\n`;
  mdContent += `* **Total Broken Link Terdeteksi**: **${brokenList.length}** Tautan Rusak\n`;
  mdContent += `* **Jumlah Variasi Format Rusak**: ${sortedEntries.length} Jenis Tautan\n`;
  mdContent += `* **Status Scan**: ${isInternalOnly ? 'Hanya Scan Link Internal' : 'Scan Link Internal & Eksternal'}\n\n`;

  if (brokenList.length === 0) {
    mdContent += `> [Rumusan]\n`;
    mdContent += `> 🎉 **Luar biasa!** Website Anda 100% bersih dan sehat. Tidak ada broken link yang terdeteksi pada berkas Markdown Anda.\n`;
  } else {
    mdContent += `## 📋 Daftar Rincian & Lokasi Perbaikan Broken Link\n\n`;

    sortedEntries.forEach(([repKey, list], idx) => {
      mdContent += `### ${idx + 1}. \`${repKey}\` (${list.length} Kemunculan)\n`;
      mdContent += `*Status Error: \`${list[0].status}\`*\n\n`;
      mdContent += `Berikut berkas-berkas artikel yang memuat tautan rusak ini:\n\n`;
      
      list.forEach(occ => {
        mdContent += `* **${occ.pageTitle}** ➔ [\`${occ.fileSource}\`](file:///${path.resolve(occ.fileSource).replace(/\\/g, '/')}) pada baris **${occ.line}**\n`;
      });
      mdContent += `\n---\n\n`;
    });
  }

  fs.writeFileSync(REPORT_FILE, mdContent, 'utf8');
  console.log(`💾 Laporan detail berhasil disimpan di: \x1b[36mbroken-links-report.md\x1b[0m\n`);
}

// Jalankan crawler
runCrawler();
