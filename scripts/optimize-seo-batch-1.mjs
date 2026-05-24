import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');

const optimizations = {
  "10-contoh-kata-kata-undangan-grand-opening.md": {
    description: "Cari inspirasi kata-kata undangan grand opening yang elegan & profesional? Cek 10+ contoh kalimat untuk pembukaan toko, restoran, hingga kantor di sini!",
    tags: ["undangan-digital", "kata-kata", "tips", "bisnis"]
  },
  "10-tips-memilih-desain-undangan-digital-sesuai-seleramu.md": {
    description: "Bingung pilih desain undangan digital? Simak 10 tips jitu memilih tema, warna, hingga font yang sesuai dengan karakter pernikahanmu agar tampil menawan!",
    tags: ["undangan-digital", "desain", "tips", "pernikahan"]
  },
  "4-tujuan-utama-pernikahan-dalam-islam.md": {
    description: "Bagi Catin, pahami 4 tujuan mulia pernikahan dalam Islam untuk meraih sakinah, mawaddah, dan warahmah. Wajib tahu sebelum melangkah ke pelaminan!",
    tags: ["pernikahan", "islami", "tips", "edukasi"]
  },
  "40-kata-kata-islami-untuk-undangan-pernikahan.md": {
    description: "Kumpulan 40+ kata-kata Islami untuk undangan pernikahan yang penuh doa & makna. Dari kutipan Al-Qur'an hingga Hadis, bikin undanganmu terasa lebih sakral!",
    tags: ["kata-kata", "islami", "pernikahan", "undangan-digital"]
  },
  "7-tren-desain-undangan-pernikahan-digital-2025.md": {
    description: "Update undangan pernikahanmu dengan 7 tren desain digital terbaru tahun 2025. Dari gaya minimalis hingga tema futuristik, cek inspirasinya di Acaranya ID!",
    tags: ["desain", "undangan-digital", "tren", "pernikahan"]
  },
  "alasan-kenapa-pakai-undangan-digital-untuk-acara-pernikahan.md": {
    description: "Kenapa harus pakai undangan digital? Temukan 5+ alasan mulai dari hemat biaya, proses cepat, hingga fitur lengkap yang bikin acaramu makin praktis!",
    tags: ["undangan-digital", "tips", "pernikahan", "efisiensi"]
  },
  "alasan-tidak-bisa-hadir-di-acara-pernikahan.md": {
    description: "Bingung cara menolak undangan? Cek 8 alasan tidak bisa hadir di acara pernikahan yang sopan & masuk akal tanpa merusak silaturahmi. Lengkap dengan tipsnya!",
    tags: ["tips", "kata-kata", "etika", "pernikahan"]
  },
  "among-tamu.md": {
    description: "Mengenal peran Among Tamu dalam pernikahan adat Jawa. Simak pengertian, tugas penyambutan, hingga tradisi yang membuat tamu merasa dihormati di sini!",
    tags: ["adat", "pernikahan", "budaya", "tips"]
  },
  "apakah-cincin-tunangan-boleh-dijual.md": {
    description: "Bolehkah menjual cincin tunangan menurut pandangan Islam? Simak penjelasan hukum syariah, status kepemilikan, dan adab yang perlu diperhatikan di artikel ini.",
    tags: ["islami", "pernikahan", "tips", "wajib-tahu"]
  },
  "apakah-prosesi-ngunduh-mantu-memerlukan-seserahan.md": {
    description: "Masih bingung soal seserahan di acara Ngunduh Mantu? Temukan jawaban lengkap mengenai tradisi, makna, dan persiapan penting untuk penyatuan dua keluarga.",
    tags: ["adat", "pernikahan", "tips", "seserahan"]
  },
  "apakah-undangan-pernikahan-termasuk-undangan-resmi.md": {
    description: "Apakah undangan pernikahan termasuk kategori undangan resmi? Cek perbedaan format, bahasa, dan konteks penggunaannya agar tidak salah dalam membuatnya!",
    tags: ["undangan-digital", "tips", "edukasi", "pernikahan"]
  },
  "arti-open-marriage-dalam-pernikahan.md": {
    description: "Mengenal apa itu Open Marriage, risiko, serta pandangan hukum dan agama terkait konsep hubungan ini. Simak penjelasan lengkapnya untuk wawasan baru.",
    tags: ["pernikahan", "edukasi", "tips", "hubungan"]
  },
  "aturan-cuti-menikah.md": {
    description: "Panduan lengkap aturan cuti menikah sesuai UU Ketenagakerjaan. Cek jatah hari, syarat pengajuan ke atasan, hingga tips agar tetap tenang saat hari H!",
    tags: ["tips", "pernikahan", "karir", "wajib-tahu"]
  },
  "bacaan-ijab-kabul-nikah-yang-benar.md": {
    description: "Persiapkan akad nikahmu dengan menghafal bacaan ijab kabul yang benar & lancar. Lengkap dengan teks bahasa Indonesia, Arab, dan tips agar tidak grogi!",
    tags: ["islami", "pernikahan", "tips", "akad"]
  },
  "bacaan-istighfar-dan-syahadat-sebelum-akad-nikah.md": {
    description: "Pahami makna dan bacaan Istighfar serta Syahadat sebelum akad nikah dimulai. Langkah penting untuk mensucikan hati demi keberkahan rumah tangga baru.",
    tags: ["islami", "pernikahan", "tips", "akad"]
  },
  "background-undangan-pernikahan.md": {
    description: "Lagi cari background undangan pernikahan yang aesthetic? Cek kumpulan inspirasi motif floral, rustic, hingga minimalis yang bikin undanganmu tampil elegan!",
    tags: ["desain", "undangan-digital", "pernikahan", "background"]
  },
  "baju-kebaya-modern-untuk-pesta-pernikahan.md": {
    description: "Tampil memukau di pesta pernikahan dengan pilihan baju kebaya modern terbaru. Cek tren model, padu padan warna, dan tips memilih kebaya sesuai bentuk tubuh!",
    tags: ["fashion", "tips", "pernikahan", "desain"]
  },
  "baju-pernikahan-adat-betawi.md": {
    description: "Mengenal keunikan baju pernikahan adat Betawi: Rias Besar Dandanan Care Haji dan Care None Pengantin Belade. Simak detail filosofi dan aksesorisnya!",
    tags: ["adat", "budaya", "pernikahan", "fashion"]
  },
  "barakallah-till-jannah.md": {
    description: "Apa arti sebenarnya dari doa Barakallah Till Jannah? Simak ulasan mendalam mengenai makna, penggunaan yang tepat, dan harapan mulia di balik kalimat ini.",
    tags: ["islami", "kata-kata", "pernikahan", "doa"]
  },
  "biaya-akad-nikah-di-kua.md": {
    description: "Update rincian biaya akad nikah di KUA tahun terbaru. Dari tarif gratis hingga biaya nikah di luar kantor, serta dokumen apa saja yang harus disiapkan!",
    tags: ["tips", "pernikahan", "biaya", "wajib-tahu"]
  }
};

async function optimizeBatch() {
  console.log("Memulai Optimasi Manual Batch 1 (20 Artikel)...");

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

  console.log("\nBatch 1 Selesai!");
}

optimizeBatch();
