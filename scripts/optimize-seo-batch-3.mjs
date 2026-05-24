import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_DIR = path.join(__dirname, '../src/content/blog');

const optimizations = {
  "contoh-undangan-bukber-via-wa.md": {
    description: "Cari contoh undangan bukber via WA yang sopan & menarik? Simak ide kata-kata dan format undangan buka puasa bersama yang efektif untuk grup teman & keluarga.",
    tags: ["undangan-digital", "islami", "tips", "kata-kata"]
  },
  "contoh-undangan-ngunduh-mantu.md": {
    description: "Inspirasi 5+ contoh undangan Ngunduh Mantu yang berkesan. Pahami makna tradisi, rangkaian prosesi, hingga tips membuat undangan yang sesuai dengan nilai adat.",
    tags: ["pernikahan", "adat", "tips", "kata-kata"]
  },
  "contoh-undangan-pembentukan-panitia-pernikahan.md": {
    description: "Butuh referensi undangan pembentukan panitia pernikahan? Cek contoh teks undangan rapat yang sopan untuk meminta bantuan teman & keluarga melancarkan hari H.",
    tags: ["pernikahan", "tips", "kata-kata", "organisasi"]
  },
  "contoh-undangan-pengajian-pernikahan.md": {
    description: "Panduan membuat & contoh undangan pengajian pernikahan yang benar. Gunakan bahasa yang formal & sopan untuk momen doa restu bersama keluarga besar & kerabat.",
    tags: ["pernikahan", "islami", "tips", "kata-kata"]
  },
  "contoh-undangan-pernikahan-bahasa-inggris.md": {
    description: "Kumpulan contoh undangan pernikahan bahasa Inggris (Wedding Invitation) lengkap dengan artinya. Bikin undanganmu tampil lebih kekinian, elegan, dan profesional!",
    tags: ["undangan-digital", "kata-kata", "bahasa-inggris", "inspirasi"]
  },
  "contoh-undangan-pernikahan-bahasa-jawa.md": {
    description: "Cek 9 contoh undangan pernikahan bahasa Jawa halus (Kromo Inggil) yang sopan. Wujudkan penghormatan mendalam bagi tamu dengan sentuhan tradisi yang kental.",
    tags: ["pernikahan", "adat", "bahasa-jawa", "budaya"]
  },
  "contoh-undangan-pernikahan-digital.md": {
    description: "Cari referensi undangan pernikahan digital? Intip berbagai contoh desain gambar, video, hingga website yang sedang tren dan banyak diminati calon pengantin muda.",
    tags: ["undangan-digital", "desain", "tips", "pernikahan"]
  },
  "contoh-undangan-pernikahan-islami.md": {
    description: "5 Inspirasi desain & contoh undangan pernikahan Islami yang unik. Simak format kata-kata penuh doa & nuansa religius yang cocok untuk momen sakral akad nikah.",
    tags: ["islami", "pernikahan", "desain", "kata-kata"]
  },
  "contoh-undangan-pernikahan.md": {
    description: "Lagi cari ide undangan? Cek kumpulan contoh undangan pernikahan mulai dari gaya simple, minimalis, hingga mewah yang bisa kamu jadikan referensi hari spesial.",
    tags: ["pernikahan", "inspirasi", "desain", "tips"]
  },
  "contoh-undangan-walimatul-ursy-dan-format-penulisannya.md": {
    description: "Panduan menyusun undangan Walimatul Ursy yang sopan & sesuai sunnah. Lengkap dengan format penulisan dasar mulai dari salam hingga detail informasi acara.",
    tags: ["islami", "pernikahan", "tips", "kata-kata"]
  },
  "daftar-tanggal-cantik-untuk-menikah-tahun-2025.md": {
    description: "Rencana menikah di tahun 2025? Cek daftar tanggal cantik dengan susunan angka unik & bermakna. Abadikan momen sakralmu di hari yang mudah diingat & spesial!",
    tags: ["perencanaan", "tips", "tanggal-cantik", "pernikahan"]
  },
  "desain-undangan-pernikahan-aesthetic.md": {
    description: "Kumpulan desain undangan pernikahan aesthetic yang jarang dipakai! Dari tema Vintage Forest hingga Floral Purple, bikin undangan digitalmu tampil beda & indah.",
    tags: ["desain", "undangan-digital", "aesthetic", "inspirasi"]
  },
  "doa-istri-ucapan-anniversary-pernikahan.md": {
    description: "40 Doa istri & ucapan anniversary pernikahan romantis untuk suami. Kumpulan kalimat penuh makna & doa Islami untuk mensyukuri perjalanan cinta yang penuh berkah.",
    tags: ["islami", "kata-kata", "hubungan", "doa"]
  },
  "doa-ulang-tahun-pernikahan-untuk-diri-sendiri.md": {
    description: "10 Doa ulang tahun pernikahan untuk diri sendiri. Langkah reflektif memohon keharmonisan, kesetiaan, dan keberkahan dalam menjalani bahtera rumah tangga.",
    tags: ["islami", "kata-kata", "pernikahan", "doa"]
  },
  "double-date-artinya.md": {
    description: "Apa itu Double Date? Pahami pengertian, manfaat untuk keharmonisan hubungan, serta tips kencan ganda yang seru & bermakna bareng pasangan sahabatmu!",
    tags: ["relationship", "tips", "hubungan", "lifestyle"]
  },
  "etika-penulisan-nama-tamu-undangan.md": {
    description: "Pahami etika penulisan nama tamu undangan pernikahan agar lebih menghargai. Dari ejaan yang benar hingga penggunaan gelar, pastikan detail kecil ini tidak terlewat!",
    tags: ["pernikahan", "etika", "tips", "kata-kata"]
  },
  "format-undangan-pernikahan.md": {
    description: "Susun undanganmu dengan format yang benar! Cek elemen penting mulai dari nama pengantin hingga RSVP agar informasi acara tersampaikan dengan jelas & informatif.",
    tags: ["pernikahan", "tips", "desain", "format"]
  },
  "hantaran-pernikahan-mewah.md": {
    description: "10 Inspirasi hantaran pernikahan mewah sebagai simbol penghormatan. Dari perhiasan hingga set pakaian tradisional, temukan model seserahan terbaru di sini!",
    tags: ["inspirasi", "pernikahan", "seserahan", "hantaran"]
  },
  "hukum-menikah-dengan-sepupu-sendiri-dalam-islam.md": {
    description: "Bagaimana hukum menikah dengan sepupu dalam Islam? Simak penjelasan lengkap berdasarkan dalil syariah, sejarah, serta jenis-jenis hubungan sepupu yang halal dinikahi.",
    tags: ["wajib-tahu", "islami", "pernikahan", "hukum"]
  },
  "ide-pertanyaan-truth-or-dare-untuk-pasangan.md": {
    description: "50 Ide pertanyaan Truth or Dare untuk pasangan agar makin dekat & seru! Cara asyik menggali kejujuran sekaligus menciptakan momen emosional yang tak terlupakan.",
    tags: ["inspirasi", "hubungan", "tips", "game"]
  }
};

async function optimizeBatch() {
  console.log("Memulai Optimasi Manual Batch 3 (Posts 41-60)...");

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

  console.log("\nBatch 3 Selesai!");
}

optimizeBatch();
