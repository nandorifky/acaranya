/**
 * Acaranya.id — High-Performance Broken Link Detector
 * 
 * Memindai seluruh berkas HTML di direktori 'dist/' hasil pnpm build.
 * Mendeteksi link internal & eksternal yang rusak secara instan.
 * 
 * Cara Menjalankan:
 * 1. pnpm build
 * 2. node scripts/check-links.js
 * 3. Untuk scan instan link internal saja: node scripts/check-links.js --internal-only
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

// Konfigurasi
const DIST_DIR = path.join(__dirname, '../dist');
const REPORT_FILE = path.join(__dirname, '../broken-links-report.md');
const CONCURRENCY_LIMIT = 5; // Batas request eksternal paralel
const REQUEST_TIMEOUT = 5000; // Timeout 5 detik

// Argument flags
const args = process.argv.slice(2);
const isInternalOnly = args.includes('--internal-only');

// Helper untuk rekursif mencari berkas HTML
function getHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) {
    console.error(`\x1b[31m[ERROR] Direktori '${dir}' tidak ditemukan. Silakan jalankan 'pnpm build' terlebih dahulu!\x1b[0m`);
    process.exit(1);
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

// Membersihkan teks jangkar (anchor text)
function cleanAnchorText(text, href) {
  if (!text) return '';
  // Hapus semua tag HTML internal
  let cleaned = text.replace(/<[^>]+>/g, '').trim();
  cleaned = cleaned.replace(/\s+/g, ' ');

  // Jika teks kosong tetapi ada gambar di dalamnya, jadikan naked URL gambar sebagai anchor
  if (!cleaned) {
    const imgMatch = text.match(/src=["']([^"']*)["']/i);
    if (imgMatch) {
      return `[Gambar: ${imgMatch[1]}]`;
    }
    return `[Naked URL: ${href}]`;
  }
  return cleaned;
}

// Verifikasi apakah file target internal ada di folder dist/
function verifyInternalPath(targetPath, sourceFile) {
  let decodedPath = '';
  try {
    decodedPath = decodeURIComponent(targetPath);
  } catch (e) {
    decodedPath = targetPath;
  }

  // Hapus query params dan hash
  decodedPath = decodedPath.split('?')[0].split('#')[0];

  // Abaikan link kosong atau jangkar halaman saat ini
  if (decodedPath === '' || decodedPath.startsWith('#')) {
    return true;
  }

  // Jika berupa path absolute (dimulai dengan /)
  if (decodedPath.startsWith('/')) {
    const rootPath = decodedPath.slice(1);
    
    const possiblePaths = [
      path.join(DIST_DIR, rootPath, 'index.html'),   // Folder routing (/desain/ -> dist/desain/index.html)
      path.join(DIST_DIR, rootPath + '.html'),       // File direct (/desain -> dist/desain.html)
      path.join(DIST_DIR, rootPath),                 // Aset langsung (/images/logo.png -> dist/images/logo.png)
      path.join(DIST_DIR, rootPath.replace(/\/$/, '') + '/index.html') // Folder routing tanpa trailing slash
    ];

    return possiblePaths.some(p => fs.existsSync(p));
  } 
  
  // Jika berupa path relative (tidak dimulai dengan / atau http)
  const sourceDir = path.dirname(sourceFile);
  const relativeTarget = path.resolve(sourceDir, decodedPath);
  
  const possibleRelativePaths = [
    relativeTarget,
    path.join(relativeTarget, 'index.html'),
    relativeTarget + '.html'
  ];

  return possibleRelativePaths.some(p => fs.existsSync(p));
}

// Uji coba ping link eksternal menggunakan HEAD/GET request dengan pembatasan
function testExternalUrl(url) {
  return new Promise((resolve) => {
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
      // Jika HEAD mendapat status <= 400, link aman
      if (res.statusCode < 400) {
        resolve({ ok: true, status: res.statusCode });
      } else {
        // Coba ulang dengan GET jika HEAD diblokir
        options.method = 'GET';
        const getReq = client.request(url, options, (getRes) => {
          resolve({ ok: getRes.statusCode < 400, status: getRes.statusCode });
        });
        getReq.on('error', () => resolve({ ok: false, status: 'Error connection' }));
        getReq.end();
      }
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({ ok: false, status: 'Timeout' });
    });

    req.on('error', (err) => {
      resolve({ ok: false, status: err.message || 'Error connection' });
    });

    req.end();
  });
}

// Fungsi utama crawler
async function runCrawler() {
  console.log('\n\x1b[36m🚀 MEMULAI PEMINDAIAN BROKEN LINK ACARANYA.ID...\x1b[0m');
  console.log(`📂 Folder Target: ${DIST_DIR}`);
  console.log(`⚙️  Scan Mode: ${isInternalOnly ? '\x1b[33mInternal Link Saja\x1b[0m' : '\x1b[32mInternal & Eksternal Link\x1b[0m'}\n`);

  const htmlFiles = getHtmlFiles(DIST_DIR);
  console.log(`📄 Ditemukan \x1b[32m${htmlFiles.length}\x1b[0m file HTML untuk dipindai.\n`);

  const allLinks = [];
  let totalLinksChecked = 0;

  // 1. Ekstrak seluruh link dari file HTML
  for (const file of htmlFiles) {
    const relativeFilePath = path.relative(DIST_DIR, file);
    const content = fs.readFileSync(file, 'utf8');

    // Ekstrak Title Halaman
    const titleMatch = content.match(/<title>([\s\S]*?)<\/title>/i);
    const pageTitle = titleMatch ? titleMatch[1].replace(/ \| Acaranya\.id/g, '').trim() : 'Tanpa Judul';

    // Regex pencarian anchor link <a href="...">text</a>
    const aRegex = /<a\s+[^>]*href=["']([^"']*)["'][^>]*>([\s\S]*?)<\/a>/gi;
    let match;
    while ((match = aRegex.exec(content)) !== null) {
      const href = match[1];
      const anchorTextRaw = match[2];
      
      // Filter link tidak valid / ignored
      if (!href || href.startsWith('mailto:') || href.startsWith('tel:') || href.startsWith('javascript:') || href.startsWith('#')) {
        continue;
      }

      allLinks.push({
        type: 'Anchor',
        href: href,
        anchorText: cleanAnchorText(anchorTextRaw, href),
        pageTitle: pageTitle,
        pageUrl: `/${relativeFilePath.replace(/index\.html$/, '').replace(/\\/g, '/')}`,
        fileSource: file
      });
    }

    // Regex pencarian tag gambar <img src="...">
    const imgRegex = /<img\s+[^>]*src=["']([^"']*)["'][^>]*>/gi;
    let imgMatch;
    while ((imgMatch = imgRegex.exec(content)) !== null) {
      const src = imgMatch[1];
      if (!src || src.startsWith('data:')) {
        continue;
      }

      // Cari atribut alt gambar jika ada
      const imgTag = imgMatch[0];
      const altMatch = imgTag.match(/alt=["']([^"']*)["']/i);
      const altText = altMatch ? altMatch[1] : '';

      allLinks.push({
        type: 'Gambar',
        href: src,
        anchorText: `[Naked URL: ${src}]${altText ? ` (Alt: ${altText})` : ''}`,
        pageTitle: pageTitle,
        pageUrl: `/${relativeFilePath.replace(/index\.html$/, '').replace(/\\/g, '/')}`,
        fileSource: file
      });
    }
  }

  const brokenLinks = [];
  const externalLinksQueue = [];
  const targetSummaryMap = {}; // Untuk menghitung jumlah kemunculan per target broken link

  // 2. Validasi Link satu per satu
  for (const link of allLinks) {
    totalLinksChecked++;
    
    // Deteksi jenis link (Internal vs Eksternal)
    const isExternal = link.href.startsWith('http://') || link.href.startsWith('https://');

    if (isExternal) {
      // Jika link eksternal menunjuk ke localhost sendiri, ubah jadi deteksi internal
      const isLocalhost = link.href.includes('localhost:') || link.href.includes('127.0.0.1');
      if (isLocalhost) {
        const localPath = new URL(link.href).pathname;
        const isOk = verifyInternalPath(localPath, link.fileSource);
        if (!isOk) {
          link.status = '404: Not Found (Localhost)';
          brokenLinks.push(link);
          targetSummaryMap[localPath] = (targetSummaryMap[localPath] || 0) + 1;
        }
      } else if (!isInternalOnly) {
        // Antrikan verifikasi link eksternal asli
        externalLinksQueue.push(link);
      }
    } else {
      // Link Internal
      const isOk = verifyInternalPath(link.href, link.fileSource);
      if (!isOk) {
        link.status = '404: Not Found';
        brokenLinks.push(link);
        // Kelompokkan berdasarkan target path agar user tahu mana link paling fatal
        const cleanedTarget = link.href.split('?')[0].split('#')[0];
        targetSummaryMap[cleanedTarget] = (targetSummaryMap[cleanedTarget] || 0) + 1;
      }
    }
  }

  // 3. Eksekusi antrian link eksternal dengan concurrency limit
  if (externalLinksQueue.length > 0) {
    console.log(`🌐 Melakukan verifikasi \x1b[35m${externalLinksQueue.length}\x1b[0m link eksternal secara paralel (Throttled)...`);
    
    let activeWorkers = 0;
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
              const cleanedTarget = currentLink.href.split('?')[0].split('#')[0];
              targetSummaryMap[cleanedTarget] = (targetSummaryMap[cleanedTarget] || 0) + 1;
            }
          } catch (e) {
            currentLink.status = 'Koneksi Gagal';
            brokenLinks.push(currentLink);
            const cleanedTarget = currentLink.href.split('?')[0].split('#')[0];
            targetSummaryMap[cleanedTarget] = (targetSummaryMap[cleanedTarget] || 0) + 1;
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

  // 4. Print Rangkuman di CLI
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`📊 \x1b[1mRANGKUMAN AUDIT LINK WEBSITE\x1b[22m`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`✅ Total Link Diperiksa : \x1b[32m${totalLinksChecked}\x1b[0m`);
  console.log(`❌ Total Broken Link    : \x1b[31m${brokenLinks.length}\x1b[0m`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');

  if (brokenLinks.length > 0) {
    console.log('\n🚨 \x1b[31mKEMUNCULAN BROKEN LINK TERBANYAK:\x1b[0m');
    const sortedTargets = Object.entries(targetSummaryMap).sort((a, b) => b[1] - a[1]);
    for (const [target, count] of sortedTargets) {
      console.log(`   🔗 \x1b[33m${target}\x1b[0m ➔ Muncul \x1b[31m${count} kali\x1b[0m`);
    }
  } else {
    console.log('\n🎉 \x1b[32mHEBAT! Tidak ditemukan broken link sama sekali di website Anda!\x1b[0m\n');
  }

  // 5. Generate Laporan File Markdown (.md)
  generateMarkdownReport(totalLinksChecked, brokenLinks, targetSummaryMap);
}

// Fungsi pembuat laporan file Markdown
function generateMarkdownReport(totalChecked, brokenList, summaryMap) {
  const dateStr = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });
  const sortedTargets = Object.entries(summaryMap).sort((a, b) => b[1] - a[1]);

  let mdContent = `# 📊 Laporan Audit Broken Link — Acaranya.id\n\n`;
  mdContent += `*Laporan ini dihasilkan otomatis pada: **${dateStr}***\n\n`;

  mdContent += `## 📈 Rangkuman Utama (Summary)\n`;
  mdContent += `* **Total Link Diperiksa**: ${totalChecked} Link\n`;
  mdContent += `* **Total Broken Link**: **${brokenList.length}** Tautan Rusak\n`;
  mdContent += `* **Status Scan**: ${isInternalOnly ? 'Hanya Scan Link Internal' : 'Scan Link Internal & Eksternal'}\n\n`;

  if (brokenList.length === 0) {
    mdContent += `> [!NOTE]\n`;
    mdContent += `> 🎉 **Luar biasa!** Website Anda 100% bersih dan sehat. Tidak ada broken link yang terdeteksi pada pemindaian kali ini.\n`;
  } else {
    mdContent += `## 🚨 Kemunculan Broken Link Terbanyak (Top Targets)\n`;
    mdContent += `Berikut daftar alamat link rusak paling vital yang perlu Anda perbaiki secara massal:\n\n`;
    mdContent += `| No | Alamat Target Rusak | Jumlah Broken Link | Status Error |\n`;
    mdContent += `|---|---|---|---|\n`;
    
    sortedTargets.forEach(([target, count], idx) => {
      const sampleItem = brokenList.find(b => b.href.split('?')[0].split('#')[0] === target);
      mdContent += `| ${idx + 1} | \`${target}\` | **${count}** kali | \`${sampleItem ? sampleItem.status : '404'}\` |\n`;
    });

    mdContent += `\n## 📋 Detail Lokasi Tautan Rusak (Detailed List)\n\n`;
    mdContent += `| No | Halaman Asal (Judul) | Tipe | Target Link Rusak | Anchor Text / Alt Teks | Status |\n`;
    mdContent += `|---|---|---|---|---|---|\n`;

    brokenList.forEach((item, idx) => {
      mdContent += `| ${idx + 1} | [${item.pageTitle}](${item.pageUrl}) | ${item.type} | \`${item.href}\` | "${item.anchorText}" | \`${item.status}\` |\n`;
    });
  }

  fs.writeFileSync(REPORT_FILE, mdContent, 'utf8');
  console.log(`\n💾 Laporan detail berhasil disimpan di: \x1b[36mbroken-links-report.md\x1b[0m\n`);
}

// Jalankan crawler
runCrawler();
