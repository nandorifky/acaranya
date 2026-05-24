import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');

const optimizations = {
  "biaya-akad-nikah-ditanggung-siapa.md": {
    description: "Siapa yang menanggung biaya akad nikah? Simak pembahasannya dari sisi adat, agama, hingga solusi modern bagi pasangan yang ingin berbagi budget pernikahan.",
    tags: ["anggaran", "pernikahan", "tips", "biaya"]
  },
  "bingkai-undangan-pernikahan.md": {
    description: "Kumpulan bingkai undangan pernikahan gratis dengan berbagai tema: bunga, vintage, hingga minimalis. Bikin desain undanganmu makin menawan & elegan di sini!",
    tags: ["desain", "undangan-digital", "inspirasi", "background"]
  },
  "bolehkah-orang-jawa-menikah-dengan-orang-sunda.md": {
    description: "Mitos Jawa-Sunda dilarang menikah masih sering terdengar. Simak fakta sejarah Perang Bubat, pandangan hukum Islam, dan tips menjalaninya di era modern!",
    tags: ["perencanaan", "adat", "budaya", "pernikahan"]
  },
  "buat-undangan-digital-pakai-aplikasi-apa.md": {
    description: "Cari aplikasi buat undangan digital? Cek rekomendasi terbaik mulai dari Canva hingga website instan yang praktis, hemat biaya, dan hasilnya profesional!",
    tags: ["undangan-digital", "tips", "aplikasi", "desain"]
  },
  "cara-berpose-foto-prewedding-yang-bagus.md": {
    description: "Ingin hasil foto prewedding romantis & natural? Simak 8 cara berpose yang bagus, mulai dari interaksi natural hingga pemilihan angle yang pas untuk pasangan!",
    tags: ["prewedding", "tips", "desain", "pernikahan"]
  },
  "cara-bikin-undangan-pernikahan-digital-di-canva.md": {
    description: "Panduan lengkap cara membuat undangan pernikahan digital di Canva secara gratis. Bisa buat format gambar, video, hingga website tanpa perlu skill desain!",
    tags: ["undangan-digital", "tips", "canva", "desain"]
  },
  "cara-melewati-ujian-finansial-sebelum-menikah.md": {
    description: "Ujian finansial sebelum menikah sering jadi tantangan berat. Simak tips mengatur keuangan, menyiapkan dana darurat, dan menjaga kejujuran bersama pasangan.",
    tags: ["anggaran", "tips", "pernikahan", "keuangan"]
  },
  "cara-membangun-hubungan-baik-dengan-calon-mertua.md": {
    description: "8 Cara ampuh membangun hubungan harmonis dengan calon mertua. Dari cara bersikap sopan hingga memberi perhatian kecil demi restu dan kebahagiaan keluarga.",
    tags: ["wajib-tahu", "tips", "hubungan", "etika"]
  },
  "cara-membuat-barcode-lokasi-untuk-undangan-pernikahan.md": {
    description: "Mudahkan tamu temukan lokasi acaramu! Simak langkah praktis cara membuat barcode Google Maps untuk undangan pernikahan digital agar akurat dan efisien.",
    tags: ["undangan-digital", "tips", "tutorial", "teknologi"]
  },
  "cara-membuat-surat-keterangan-belum-menikah-online.md": {
    description: "Panduan cara membuat surat keterangan belum menikah secara online. Cek syarat dokumen dari RT hingga Kelurahan agar urusan administrasimu cepat selesai!",
    tags: ["legalitas", "tips", "wajib-tahu", "administrasi"]
  },
  "cara-membuat-undangan-digital.md": {
    description: "Tutorial lengkap cara membuat undangan digital sendiri di HP & Laptop secara gratis. Cocok untuk pemula yang ingin undangan aesthetic & kekinian!",
    tags: ["undangan-digital", "tips", "tutorial", "desain"]
  },
  "cara-membuat-website-undangan-pernikahan-sendiri-tanpa-coding.md": {
    description: "Bikin website undangan pernikahan sendiri tanpa ribet coding! Simak pilihan platform terbaik dan fitur interaktif yang bikin undanganmu tampil beda & mewah.",
    tags: ["undangan-digital", "perencanaan", "website", "tips"]
  },
  "cara-mendapatkan-sertifikat-layak-nikah.md": {
    description: "Syarat dan cara mendapatkan Sertifikat Layak Nikah dari Puskesmas. Dokumen wajib bagi catin di beberapa daerah untuk memastikan kesiapan kesehatan keluarga.",
    tags: ["legalitas", "tips", "kesehatan", "wajib-tahu"]
  },
  "cara-mengecek-status-pernikahan.md": {
    description: "Cara mengecek status pernikahan seseorang secara online melalui SIMKAH atau Dukcapil. Penting untuk validasi legalitas sebelum melangkah ke jenjang serius.",
    tags: ["wajib-tahu", "tips", "legalitas", "edukasi"]
  },
  "cara-mengetes-mantan-masih-sayang-atau-tidak.md": {
    description: "Masih penasaran dengan perasaan si dia? Cek cara mengetes mantan masih sayang atau sudah move on melalui sinyal media sosial & sikapnya saat bertemu kembali.",
    tags: ["wajib-tahu", "tips", "hubungan", "psikologi"]
  },
  "cara-mengirim-undangan-digital-lewat-wa.md": {
    description: "Etika & cara mengirim undangan digital lewat WhatsApp agar tetap sopan. Simak tips menulis kalimat pengantar yang menghargai tamu meskipun tanpa tatap muka.",
    tags: ["undangan-digital", "tips", "etika", "whatsapp"]
  },
  "cara-menuliskan-pangkat-tni-di-undangan-yang-tepat.md": {
    description: "Jangan sampai keliru! Simak aturan & tata cara penulisan pangkat TNI di undangan resmi pernikahan agar sesuai dengan protokol militer dan etika yang benar.",
    tags: ["inspirasi", "tips", "etika", "tni"]
  },
  "contoh-love-story.md": {
    description: "6 Contoh Love Story di undangan digital yang bikin baper! Dari pertemuan tak terduga hingga cinta pada pandangan pertama, bikin undanganmu lebih personal.",
    tags: ["inspirasi", "kata-kata", "love-story", "undangan-digital"]
  },
  "contoh-mahar-pernikahan-dalam-islam.md": {
    description: "Bingung pilih mahar? Cek 6 contoh mahar pernikahan dalam Islam & ketentuannya. Dari seperangkat alat shalat hingga logam mulia yang penuh makna spiritual.",
    tags: ["islami", "mahar", "inspirasi", "pernikahan"]
  },
  "contoh-ucapan-tidak-bisa-mengundang-di-acara-pernikahan.md": {
    description: "Cara menolak undangan dengan halus? Cek 5 contoh ucapan tidak bisa mengundang di acara pernikahan agar tetap menjaga silaturahmi & perasaan teman.",
    tags: ["inspirasi", "kata-kata", "etika", "pernikahan"]
  }
};

async function optimizeBatch() {
  console.log("Memulai Optimasi Manual Batch 2 (20 Artikel)...");

  for (const [fileName, meta] of Object.entries(optimizations)) {
    const filePath = path.join(BLOG_DIR, fileName);
    
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);

      data.description = meta.description;
      data.tags = meta.tags;

      const newFileContent = matter.stringify(content, data);
      fs.writeFileSync(filePath, newFileContent);
      console.log(`✅ Teroptimasi: ${fileName}`);
    } else {
      console.log(`⚠️ File tidak ditemukan: ${fileName}`);
    }
  }

  console.log("\nBatch 2 Selesai!");
}

optimizeBatch();
