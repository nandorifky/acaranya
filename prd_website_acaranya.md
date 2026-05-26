# Product Requirements Document (PRD)

# Website Acaranya.id — Astro Migration

**Versi:** 1.0  
**Status:** Draft awal untuk perencanaan desain, development, dan SEO  
**Produk:** Website marketing + katalog desain undangan digital  
**Brand:** Acaranya.id  
**Primary Accent Color:** `#4d5859`  
**Logo reference:** Monogram “A” modern + wordmark serif elegan berwarna slate/charcoal  
**Target stack:** Astro 6, TypeScript, Tailwind CSS, shadcn/ui, Keystatic Cloud, Astro Actions, Astro DB/Turso opsional, deployment Vercel/Cloudflare Pages

---

## 1. Ringkasan Produk

Acaranya.id adalah website layanan undangan digital modern untuk berbagai acara, dimulai dari pernikahan dan berkembang ke kategori lain seperti khitanan, ulang tahun, aqiqah, corporate event, graduation, dan acara personal lain.

Website baru akan dibangun menggunakan Astro dengan pendekatan **content-driven**, **SEO-first**, **maintainable**, dan **scalable**. Fokus fase awal adalah website publik tanpa login, dengan conversion utama melalui:

1. Form order undangan.
2. Tombol WhatsApp prefilled message.
3. Katalog template di `/desain-undangan-digital/`.
4. Tombol preview yang mengarah ke subdomain `inv.acaranya.id`.

Website harus tampil cantik, elegan, cepat, mudah dibaca, mudah dikelola, dan siap menampung ratusan hingga ribuan desain template di masa depan.

---

## 2. Tujuan Utama

### 2.1 Business Goals

1. Meningkatkan konversi pengunjung menjadi lead/order via WhatsApp dan form.
2. Membangun persepsi brand yang lebih premium, rapi, dan terpercaya.
3. Membuat katalog template undangan digital yang mudah dijelajahi berdasarkan kategori acara.
4. Meningkatkan organic traffic melalui halaman SEO seperti katalog, kategori template, artikel blog, halaman harga, dan FAQ.
5. Mengurangi effort maintenance konten dengan struktur yang rapi dan siap dihubungkan ke Keystatic Cloud.
6. Membuat fondasi teknis yang ringan, cepat, dan mudah dikembangkan tanpa login pada fase awal.

### 2.2 User Goals

1. Pengunjung bisa memahami layanan Acaranya.id dalam kurang dari 10 detik.
2. Pengunjung bisa melihat fitur, harga, dan contoh desain dengan mudah.
3. Pengunjung bisa memilih template berdasarkan kategori acara.
4. Pengunjung bisa preview template di subdomain.
5. Pengunjung bisa order dengan cepat melalui form atau WhatsApp.
6. Pengunjung merasa brand terpercaya dan profesional.

---

## 3. Scope Produk

### 3.1 In Scope — Fase Awal

- Homepage baru.
- Halaman fitur.
- Halaman harga.
- Halaman katalog desain undangan digital.
- Halaman kategori desain.
- Halaman order undangan.
- Halaman blog dan detail artikel.
- Halaman kontak.
- Halaman tentang.
- Halaman legal.
- Floating WhatsApp CTA.
- Form order tanpa login.
- Form kontak sederhana.
- Katalog template berbasis content collection.
- Integrasi CMS Keystatic untuk konten.
- SEO metadata, sitemap, robots, canonical, JSON-LD.
- Design system dasar: warna, tipografi, spacing, radius, shadow, komponen.
- Responsive design mobile-first.

### 3.2 Out of Scope — Fase Awal

- Login user.
- Dashboard client.
- Dashboard admin custom.
- Payment gateway.
- Manajemen order internal kompleks.
- Pembuatan undangan otomatis dari dashboard.
- Editor template undangan.
- Sistem RSVP production di domain utama.
- Multi-vendor atau marketplace.
- Multi-language.

### 3.3 Future Scope

- Dashboard order.
- Tracking status order.
- Payment gateway.
- Sistem invoice.
- Customer portal.
- Template preview detail page di domain utama.
- Search indexing server-side untuk katalog besar.
- AI copy generator untuk teks undangan.
- Integrasi CRM ringan.
- Analytics dashboard internal.

---

## 4. Target Audience

### 4.1 Primary Audience

Calon pengantin atau keluarga yang ingin membuat undangan digital dengan cepat, rapi, dan terjangkau.

Karakteristik:

- Ingin proses praktis.
- Sering akses via mobile.
- Mencari contoh desain sebelum order.
- Sensitif terhadap harga.
- Butuh trust signal sebelum menghubungi admin.
- Lebih nyaman konsultasi via WhatsApp.

### 4.2 Secondary Audience

Pengguna non-wedding seperti keluarga yang mengadakan khitanan, aqiqah, ulang tahun, gathering, corporate event, graduation, dan acara komunitas.

### 4.3 Internal User

Tim Acaranya.id yang akan:

- Menambah template desain.
- Mengubah harga.
- Menambah FAQ.
- Menulis artikel blog SEO.
- Mengubah konten homepage.
- Meninjau lead/order masuk.

---

## 5. Positioning Brand

Acaranya.id harus diposisikan sebagai layanan undangan digital yang:

1. Elegan tetapi tetap terjangkau.
2. Cepat dibuat tetapi tetap rapi.
3. Mudah dipesan tanpa proses teknis rumit.
4. Cocok untuk banyak jenis acara.
5. Modern, mobile-friendly, dan profesional.

### 5.1 Brand Personality

- Elegan.
- Hangat.
- Terpercaya.
- Praktis.
- Modern.
- Human-friendly.

### 5.2 Brand Voice

Bahasa utama: Bahasa Indonesia.

Tone:

- Ramah.
- Jelas.
- Meyakinkan.
- Tidak terlalu formal.
- Tidak terlalu “jualan keras”.
- Menggunakan kalimat pendek untuk bagian CTA.

Contoh gaya copy:

- “Undangan digital cantik untuk momen spesialmu.”
- “Pilih desain, kirim data, undangan siap dibagikan.”
- “Mulai dari Rp75.000, sudah termasuk fitur lengkap.”
- “Lihat desain yang cocok untuk acaramu.”

---

## 6. Logo dan Arahan Visual

Berdasarkan logo yang diberikan, visual brand Acaranya.id memiliki karakter:

- Monogram “A” modern, geometris, dan bersih.
- Wordmark serif dengan kesan elegan, editorial, dan premium.
- Warna logo gelap slate/charcoal yang dekat dengan aksen `#4d5859`.
- Kesan keseluruhan: modern, classy, tidak terlalu feminin, dan cocok untuk wedding maupun event umum.

Arahan visual website sebaiknya tidak terlalu ramai. Gunakan banyak whitespace, warna netral hangat, card bersih, foto/mockup template besar, dan aksen brand secukupnya.

---

## 7. Design System

## 7.1 Color System

### Primary Brand

```txt
Brand / Accent: #4d5859
```

Digunakan untuk:

- Primary CTA.
- Link penting.
- Badge premium.
- Icon highlight.
- Border aksen.
- Heading aksen tertentu.
- Active tab/filter.

### Recommended Palette

```txt
Primary 50:  #f5f7f7
Primary 100: #e7ecec
Primary 200: #ccd6d7
Primary 300: #a7b8b9
Primary 400: #7c9294
Primary 500: #4d5859
Primary 600: #465052
Primary 700: #394244
Primary 800: #303738
Primary 900: #2a3031
Primary 950: #171b1c
```

### Neutral Warm Palette

```txt
Background:        #fbfaf7
Surface:           #ffffff
Surface Muted:     #f6f3ee
Surface Soft:      #f1eee8
Text Primary:      #202526
Text Secondary:    #5f6869
Text Muted:        #8a9293
Border Soft:       #e6e1d8
Border Strong:     #cfc8bc
```

### Accent Support

```txt
Champagne:         #d8c7a3
Soft Gold:         #b89f6a
Blush:             #ead8d2
Sage:              #c8d2c4
Cream:             #fff8ec
Error:             #b42318
Success:           #2f6b4f
Warning:           #b7791f
```

### Usage Rule

- Background utama jangan putih polos terus-menerus; gunakan `#fbfaf7` agar terasa hangat.
- CTA utama gunakan `#4d5859` dengan teks putih.
- CTA secondary gunakan transparent/outline dengan border brand.
- Gold/champagne hanya sebagai aksen minor, bukan warna utama.
- Hindari warna terlalu neon atau terlalu banyak gradient.

---

## 7.2 Typography System

Logo Acaranya.id memiliki wordmark serif elegan. Website sebaiknya menggunakan kombinasi font yang menjaga kesan editorial/premium tanpa mengorbankan keterbacaan.

### Recommended Font Roles

#### 1. Default / Body Font

Untuk paragraf, navigasi, form, tombol, harga, FAQ, dan UI umum.

Rekomendasi utama:

```txt
Inter
```

Alternatif:

```txt
Satoshi
DM Sans
Plus Jakarta Sans
```

Alasan:

- Sangat terbaca di mobile.
- Netral dan modern.
- Cocok dipasangkan dengan serif elegan.
- Aman untuk UI padat seperti katalog dan form.

#### 2. Accent / Display Serif

Untuk hero headline, section title tertentu, quote, dan highlight editorial.

Rekomendasi utama:

```txt
Cormorant Garamond
```

Alternatif:

```txt
Playfair Display
Libre Baskerville
Lora
```

Alasan:

- Mendekati karakter wordmark logo yang serif, elegan, dan wedding-friendly.
- Memberi rasa premium tanpa harus membuat semua teks terlihat formal.
- Cocok untuk headline seperti “Undangan digital cantik untuk momen spesialmu.”

#### 3. Latin / Decorative Font

Untuk aksen kecil, bukan untuk teks panjang.

Rekomendasi utama:

```txt
Allura
```

Alternatif:

```txt
Great Vibes
Parisienne
Sacramento
```

Penggunaan:

- Label kecil di hero.
- Decorative word seperti “Special Moment”.
- Signature-style accent.
- Jangan dipakai untuk navigasi, harga, paragraf, atau tombol.

### Final Font Recommendation

```txt
Default/UI: Inter
Accent/Heading Serif: Cormorant Garamond
Latin Decorative: Allura
```

### Font Usage Rule

```txt
Hero eyebrow decorative: Allura / italic serif
Hero headline: Cormorant Garamond
Section heading: Cormorant Garamond atau Inter semibold, tergantung konteks
Body text: Inter
Button: Inter medium/semibold
Price: Inter semibold/bold
Quote/testimonial highlight: Cormorant Garamond
```

### Type Scale

```txt
Display XL: 64px / 72px / -0.04em
Display LG: 52px / 60px / -0.035em
H1:         44px / 52px / -0.03em
H2:         36px / 44px / -0.025em
H3:         28px / 36px / -0.02em
H4:         22px / 30px
Body LG:    18px / 30px
Body:       16px / 26px
Body SM:    14px / 22px
Caption:    12px / 18px
```

Mobile scale:

```txt
H1 mobile: 38px / 44px
H2 mobile: 30px / 38px
H3 mobile: 24px / 32px
Body:      16px / 26px
```

---

## 7.3 Spacing System

Gunakan spacing berbasis Tailwind default dengan aturan:

```txt
Section desktop: py-24 sampai py-32
Section tablet:  py-20
Section mobile:  py-14 sampai py-16
Container max:   max-w-7xl
Content max:     max-w-3xl
Card padding:    p-5 sampai p-8
Grid gap:        gap-5 sampai gap-8
```

### Layout Rule

- Gunakan `Container.astro` untuk semua section.
- Gunakan `Section.astro` untuk vertical rhythm.
- Jangan hardcode `max-width` berulang di setiap komponen.
- Gunakan grid 12 column untuk desktop, 2 column untuk tablet, 1 column untuk mobile.

---

## 7.4 Radius, Shadow, Border

```txt
Small radius:     rounded-lg
Default card:     rounded-2xl
Large visual:     rounded-3xl
Pill CTA/filter:  rounded-full
```

Shadow:

```txt
Card soft:        0 12px 40px rgba(23, 27, 28, 0.06)
Card hover:       0 20px 60px rgba(23, 27, 28, 0.10)
Header:           0 8px 30px rgba(23, 27, 28, 0.05)
```

Border:

```txt
Default border:   1px solid #e6e1d8
Strong border:    1px solid #cfc8bc
Accent border:    1px solid rgba(77, 88, 89, 0.22)
```

---

## 7.5 Component Style Direction

### Button

Variants:

- Primary.
- Secondary.
- Outline.
- Ghost.
- WhatsApp.
- Premium/gold accent.

Button rule:

- Primary CTA selalu jelas dan kontras.
- Text button harus pendek.
- Gunakan icon panah/WhatsApp hanya jika membantu.
- Mobile button minimal tinggi 44px.

### Card

Card digunakan untuk:

- Template desain.
- Harga paket.
- Fitur.
- Artikel blog.
- Testimoni.
- FAQ group.

Card rule:

- Background putih/surface.
- Border soft.
- Shadow sangat halus.
- Hover hanya naik sedikit.
- Jangan semua card pakai gradient.

### Badge

Badge digunakan untuk:

- Kategori acara.
- Paket.
- Featured.
- Premium.
- Terlaris.

Badge rule:

- Badge kategori menggunakan neutral/brand soft.
- Badge premium boleh champagne/gold.
- Badge jangan terlalu besar.

---

## 8. Information Architecture

## 8.1 Primary Navigation

```txt
Home
Fitur
Harga
Desain
Blog
Kontak
```

CTA kanan:

```txt
Order Sekarang
```

Mobile nav:

```txt
Home
Fitur
Harga
Desain Undangan
Blog
Tentang
Kontak
Order Sekarang
```

---

## 8.2 Route Website

```txt
/                                  Homepage
/fitur/                            Detail fitur undangan digital
/harga/                            Paket harga dan add-on
/desain-undangan-digital/          Katalog semua template
/desain-undangan-digital/page/2/   Pagination katalog
/desain-undangan-digital/kategori/pernikahan/
/desain-undangan-digital/kategori/khitanan/
/desain-undangan-digital/kategori/ulang-tahun/
/desain-undangan-digital/kategori/aqiqah/
/desain-undangan-digital/kategori/corporate/
/order-undangan/                   Form order
/blog/                             Artikel SEO
/blog/kategori/[slug]/             Arsip kategori blog
/blog/[slug]/                      Detail artikel
/kontak/                           Kontak + WhatsApp CTA
/tentang/                          Tentang brand
/legal/syarat-ketentuan/
/legal/kebijakan-privasi/
/legal/refund-policy/
```

---

## 9. Struktur Project Astro

```txt
acaranya-web/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   ├── og/
│   │   └── default-og.jpg
│   └── images/
│       ├── brand/
│       ├── mockups/
│       └── placeholders/
│
├── src/
│   ├── actions/
│   │   ├── index.ts
│   │   ├── order.action.ts
│   │   └── contact.action.ts
│   │
│   ├── assets/
│   │   ├── fonts/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── base/
│   │   ├── layout/
│   │   ├── seo/
│   │   ├── home/
│   │   ├── designs/
│   │   ├── pricing/
│   │   ├── forms/
│   │   ├── blog/
│   │   └── common/
│   │
│   ├── content/
│   │   ├── blog/
│   │   ├── designs/
│   │   ├── pages/
│   │   ├── testimonials/
│   │   ├── faqs/
│   │   └── pricing/
│   │
│   ├── data/
│   │   ├── site.ts
│   │   ├── navigation.ts
│   │   ├── design-categories.ts
│   │   ├── event-types.ts
│   │   ├── pricing-static.ts
│   │   └── whatsapp-templates.ts
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   ├── MarketingLayout.astro
│   │   ├── ArticleLayout.astro
│   │   ├── DesignListingLayout.astro
│   │   └── LegalLayout.astro
│   │
│   ├── lib/
│   │   ├── seo/
│   │   ├── designs/
│   │   ├── forms/
│   │   ├── whatsapp/
│   │   ├── analytics/
│   │   └── utils/
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── fitur.astro
│   │   ├── harga.astro
│   │   ├── tentang.astro
│   │   ├── kontak.astro
│   │   ├── order-undangan/
│   │   │   └── index.astro
│   │   ├── desain-undangan-digital/
│   │   │   ├── index.astro
│   │   │   ├── kategori/
│   │   │   │   └── [slug].astro
│   │   │   └── page/
│   │   │       └── [page].astro
│   │   ├── blog/
│   │   │   ├── index.astro
│   │   │   ├── kategori/
│   │   │   │   └── [slug].astro
│   │   │   └── [slug].astro
│   │   ├── legal/
│   │   │   ├── syarat-ketentuan.astro
│   │   │   ├── kebijakan-privasi.astro
│   │   │   └── refund-policy.astro
│   │   ├── sitemap.xml.ts
│   │   └── 404.astro
│   │
│   ├── styles/
│   │   ├── global.css
│   │   ├── tokens.css
│   │   └── animations.css
│   │
│   ├── types/
│   │   ├── design.ts
│   │   ├── pricing.ts
│   │   └── common.ts
│   │
│   ├── content.config.ts
│   └── env.d.ts
│
├── keystatic.config.ts
├── astro.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 10. Page Requirements

## 10.1 Homepage `/`

### Objective

Meyakinkan pengunjung bahwa Acaranya.id adalah solusi undangan digital yang cantik, cepat, dan mudah dipesan.

### Sections

1. Hero section.
2. Trust stats.
3. Featured designs.
4. Feature highlights.
5. How it works.
6. Pricing preview.
7. Testimonials.
8. FAQ preview.
9. Final CTA.

### Hero Requirements

Hero harus menjawab:

- Apa produk ini?
- Untuk siapa?
- Kenapa harus percaya?
- Apa langkah berikutnya?

Copy direction:

```txt
Undangan digital cantik untuk momen spesialmu.
Pilih desain, kirim data, undangan siap dibagikan.
```

CTA:

- Primary: “Lihat Desain”
- Secondary: “Order via WhatsApp”

Visual:

- Mockup undangan digital di smartphone.
- Background warm cream.
- Accent shape halus menggunakan brand color.
- Logo/monogram sebagai watermark sangat subtle.

Acceptance Criteria:

- Hero terlihat jelas di mobile tanpa scroll horizontal.
- CTA terlihat di viewport pertama mobile.
- LCP image optimized.
- Headline menggunakan accent serif.
- Body menggunakan font default.

---

## 10.2 Halaman Fitur `/fitur/`

### Objective

Menjelaskan fitur undangan digital Acaranya.id secara lengkap dan mudah dipahami.

### Content Blocks

- Hero fitur.
- Grid fitur utama.
- Detail fitur unggulan.
- Perbandingan paket fitur.
- FAQ fitur.
- CTA order.

### Feature List

- Unlimited tamu.
- Google Maps.
- RSVP.
- Ucapan.
- QR Code check-in.
- Buku tamu.
- Amplop digital.
- Galeri foto.
- Countdown.
- Rundown acara.
- Love story.
- Video.
- Live streaming.
- Musik.
- Custom nama tamu.

Acceptance Criteria:

- Setiap fitur punya icon, title, dan deskripsi pendek.
- Fitur yang tergantung paket diberi label.
- Terdapat CTA ke harga dan order.

---

## 10.3 Halaman Harga `/harga/`

### Objective

Membantu pengunjung memilih paket dan mendorong order.

### Sections

- Hero harga.
- Pricing cards.
- Feature comparison table.
- Add-ons.
- FAQ harga.
- CTA WhatsApp.

### Pricing Packages

Initial placeholder:

```txt
Simple
Mengundang
Meriah
```

Data final bisa dikelola via `src/content/pricing/` dan Keystatic.

Acceptance Criteria:

- Paket populer diberi highlight.
- Harga terlihat jelas.
- CTA per paket mengarah ke order dengan query package.
- Tabel perbandingan mobile-friendly.

---

## 10.4 Katalog Desain `/desain-undangan-digital/`

### Objective

Menampilkan ratusan template desain secara rapi, cepat, dan mudah difilter.

### Sections

1. Hero katalog.
2. Category tabs.
3. Search/filter.
4. Design grid.
5. Pagination/load more.
6. SEO content block.
7. FAQ katalog.
8. CTA order custom.

### Card Requirements

Setiap card desain menampilkan:

- Thumbnail.
- Nama desain.
- Kategori acara.
- Badge paket/premium/featured.
- Tags kecil maksimal 3.
- Tombol “Preview”.
- Tombol “Order”.

### Button Behavior

Preview:

```txt
Mengarahkan ke previewUrl, contoh:
https://inv.acaranya.id/wedding-elegant-gold
```

Order:

```txt
Mengarahkan ke:
/order-undangan/?template=wedding-elegant-gold
```

atau membuka WhatsApp dengan template message yang menyebut nama template.

### Filter Requirements

Fase awal:

- Filter kategori.
- Search nama template/tag.
- Filter paket.

Fase lanjut:

- Filter style: elegant, minimalis, floral, luxury, modern, islamic, playful.
- Filter warna dominan.
- Sort terbaru/populer/premium.

### SEO Requirements

Katalog harus punya static content seperti:

- Penjelasan singkat undangan digital.
- Keuntungan memilih template.
- Cara order.
- FAQ.
- Internal link ke kategori populer.

Acceptance Criteria:

- Halaman tetap cepat walau ada 300+ desain.
- Gambar lazy-loaded.
- Card layout tidak pecah di mobile.
- Filter tidak menghilangkan SEO static content.
- Pagination punya canonical yang benar.

---

## 10.5 Halaman Kategori Desain

Route:

```txt
/desain-undangan-digital/kategori/[slug]/
```

### Objective

Membuat halaman SEO khusus untuk setiap kategori acara.

Contoh kategori:

- Pernikahan.
- Khitanan.
- Ulang tahun.
- Aqiqah.
- Corporate.
- Graduation.

### Page Content

- Hero kategori.
- Grid template kategori.
- Deskripsi SEO kategori.
- FAQ kategori.
- CTA order.

### Meta Example

```txt
Title: Template Undangan Digital Pernikahan | Acaranya.id
Description: Pilih template undangan digital pernikahan yang elegan, modern, dan siap digunakan. Preview desain lalu order dengan mudah di Acaranya.id.
```

Acceptance Criteria:

- Semua kategori dari `design-categories.ts` bisa generate route.
- Jika kategori kosong, tampilkan empty state dan CTA custom order.
- Breadcrumb muncul.

---

## 10.6 Order Page `/order-undangan/`

### Objective

Mengumpulkan data awal pemesanan dan mengarahkan user ke WhatsApp/admin.

### Form Fields — Fase Awal

- Nama pemesan.
- Nomor WhatsApp.
- Email opsional.
- Jenis acara.
- Paket.
- Template pilihan.
- Tanggal acara opsional.
- Catatan tambahan.

### Hidden/Query Fields

- `template` dari query string.
- `package` dari query string.
- `source` dari query string atau referrer.

### Submission Flow

```txt
User isi form
→ Validasi field
→ Submit via Astro Action
→ Optional save lead to DB
→ Optional send email notification
→ Generate WhatsApp prefilled URL
→ Redirect/open WhatsApp
```

### WhatsApp Message Example

```txt
Halo Acaranya.id, saya mau order undangan digital.

Nama: [name]
WhatsApp: [whatsapp]
Jenis acara: [eventType]
Paket: [package]
Template: [templateSlug]
Tanggal acara: [eventDate]
Catatan: [notes]
```

Acceptance Criteria:

- Form bisa menerima query `template`.
- Validasi error jelas.
- WhatsApp message sudah terisi rapi.
- Tidak ada login.
- Mobile keyboard type sesuai field.

---

## 10.7 Blog `/blog/` dan `/blog/[slug]/`

### Objective

Meningkatkan organic traffic dan mendukung internal linking ke layanan utama.

### Blog Categories

- Undangan digital.
- Pernikahan.
- Inspirasi desain.
- Tips acara.
- Kata-kata undangan.
- Tutorial.

### Article Structure

- Title.
- Description.
- Published date.
- Updated date.
- Author.
- Featured image.
- Table of contents opsional.
- Content body.
- Related articles.
- CTA ke katalog/order.

### SEO Topic Examples

- Contoh kata-kata undangan digital pernikahan.
- Cara membuat undangan digital yang menarik.
- Undangan digital vs undangan cetak.
- Rekomendasi template undangan digital pernikahan.
- Cara membagikan undangan digital ke WhatsApp.

Acceptance Criteria:

- Blog detail memakai Article schema.
- Internal link ke `/desain-undangan-digital/` dan `/harga/`.
- Related articles muncul berdasarkan kategori/tag.

---

## 10.8 Kontak `/kontak/`

### Objective

Memberikan cara tercepat untuk menghubungi Acaranya.id.

### Content

- WhatsApp utama.
- Email resmi.
- Jam operasional.
- Lokasi/area layanan.
- Contact form sederhana.
- FAQ kontak.

Acceptance Criteria:

- Semua kontak mengambil data dari `siteConfig`.
- Tidak ada inkonsistensi email/nomor di halaman lain.
- CTA WhatsApp terlihat jelas.

---

## 10.9 Tentang `/tentang/`

### Objective

Membangun kepercayaan brand.

### Content

- Cerita singkat Acaranya.id.
- Value proposition.
- Statistik layanan.
- Komitmen kualitas.
- CTA order.

Acceptance Criteria:

- Tone human dan trustworthy.
- Tidak terlalu panjang.
- Ada trust stats atau testimoni.

---

## 10.10 Legal Pages

Routes:

```txt
/legal/syarat-ketentuan/
/legal/kebijakan-privasi/
/legal/refund-policy/
```

Objective:

- Memberikan kejelasan layanan.
- Meningkatkan trust.
- Menyediakan rujukan untuk pembayaran/order.

Acceptance Criteria:

- Brand name konsisten: Acaranya.id.
- Email dan kontak resmi konsisten.
- Update date terlihat.

---

## 11. Content Model

## 11.1 Designs Collection

Path:

```txt
src/content/designs/
```

Schema:

```ts
{
  title: string;
  slug: string;
  category: string;
  eventType: "wedding" | "khitanan" | "birthday" | "aqiqah" | "corporate" | "graduation" | "other";
  thumbnail: string;
  previewUrl: string;
  isFeatured: boolean;
  isPremium: boolean;
  tags: string[];
  package?: "simple" | "mengundang" | "meriah";
  sortOrder: number;
  status: "draft" | "published";
}
```

### Example

```json
{
  "title": "Elegant Gold Wedding",
  "slug": "wedding-elegant-gold",
  "category": "pernikahan",
  "eventType": "wedding",
  "thumbnail": "/images/designs/wedding-elegant-gold.webp",
  "previewUrl": "https://inv.acaranya.id/wedding-elegant-gold",
  "isFeatured": true,
  "isPremium": false,
  "tags": ["elegant", "gold", "minimalis"],
  "package": "meriah",
  "sortOrder": 10,
  "status": "published"
}
```

---

## 11.2 Pricing Collection

Path:

```txt
src/content/pricing/
```

Schema:

```ts
{
  name: string;
  slug: string;
  price: number;
  description: string;
  features: string[];
  isPopular: boolean;
  sortOrder: number;
  status: "draft" | "published";
}
```

---

## 11.3 FAQ Collection

Path:

```txt
src/content/faqs/
```

Schema:

```ts
{
  question: string;
  answer: string;
  category: string;
  sortOrder: number;
  status: "draft" | "published";
}
```

---

## 11.4 Blog Collection

Path:

```txt
src/content/blog/
```

Schema:

```ts
{
  title: string;
  description: string;
  slug: string;
  publishedAt: Date;
  updatedAt?: Date;
  category: string;
  tags: string[];
  image?: string;
  isFeatured: boolean;
  status: "draft" | "published";
}
```

---

## 11.5 Testimonials Collection

Path:

```txt
src/content/testimonials/
```

Schema:

```ts
{
  name: string;
  eventType: string;
  message: string;
  rating: number;
  image?: string;
  status: "draft" | "published";
}
```

---

## 12. Component Architecture

## 12.1 Base Components

```txt
Container.astro
Section.astro
SectionHeader.astro
Prose.astro
OptimizedPicture.astro
```

Purpose:

- Menjaga spacing dan layout konsisten.
- Menghindari style berulang di semua halaman.

---

## 12.2 Layout Components

```txt
SiteHeader.astro
SiteFooter.astro
MobileNav.tsx
FloatingWhatsapp.astro
Breadcrumbs.astro
```

Header requirements:

- Sticky optional.
- Logo kiri.
- Navigation desktop.
- CTA kanan.
- Mobile drawer.

Footer requirements:

- Logo.
- Short description.
- Navigation.
- Contact.
- Social link.
- Legal links.

---

## 12.3 Design Components

```txt
DesignCard.astro
DesignGrid.astro
DesignFilter.tsx
DesignCategoryTabs.astro
DesignSearch.tsx
DesignEmptyState.astro
DesignCTA.astro
```

DesignCard should be mostly static Astro for performance. Interactive search/filter can be React island.

---

## 12.4 Form Components

```txt
OrderForm.astro
ContactForm.astro
Field.astro
SelectField.astro
SubmitButton.tsx
```

Form logic should use reusable schemas from `src/lib/forms/`.

---

## 13. Technical Requirements

## 13.1 Framework

- Astro 6.
- TypeScript strict.
- Tailwind CSS.
- React only for interactive islands.
- shadcn/ui for selected interactive components.

## 13.2 Rendering Strategy

Default:

```txt
Static/prerender
```

Use server runtime only for:

- Astro Actions.
- Form submission.
- Future DB interaction.

## 13.3 State Management

No global state management needed in phase awal.

Use:

- URL query for filters if needed.
- Local React state for client-side catalog filtering.
- Server filtering for category pages.

## 13.4 Database

Phase awal can work without database if all orders redirect to WhatsApp.

Recommended optional setup:

- Astro DB/Turso for lead capture.
- Store: name, whatsapp, email, package, template, eventType, notes, source, createdAt.

## 13.5 CMS

Use Keystatic Cloud for:

Collections:

- designs.
- blog.
- pricing.
- faqs.
- testimonials.

Singletons:

- site settings.
- homepage.
- contact settings.
- SEO defaults.

---

## 14. SEO Requirements

## 14.1 Global SEO

Every page must include:

- Title.
- Meta description.
- Canonical URL.
- Open Graph title.
- Open Graph description.
- Open Graph image.
- Twitter card.
- Robots meta.
- Structured data where relevant.

## 14.2 Structured Data

Use JSON-LD for:

- Organization.
- WebSite.
- Service.
- Product/Offer for pricing.
- FAQPage.
- BreadcrumbList.
- Article.
- Review/testimonial where appropriate.

## 14.3 Sitemap

Sitemap must include:

- Static routes.
- Blog posts.
- Design category pages.
- Katalog pages.

Template preview subdomain should have its own sitemap if indexed separately.

## 14.4 Robots

Recommended:

```txt
User-agent: *
Allow: /

Sitemap: https://acaranya.id/sitemap-index.xml
```

If preview templates on subdomain are not intended to rank individually, use noindex on preview subdomain. If intended to rank, build separate SEO strategy for preview pages.

## 14.5 URL Rules

- All public routes should end with trailing slash for consistency.
- Slug lowercase.
- Use hyphen, not underscore.
- Avoid changing existing URL without redirect.

## 14.6 Redirect Requirements

Existing URLs should be mapped to new routes.

Example:

```txt
/desain/ → /desain-undangan-digital/
/order-undangan-nikah/ → /order-undangan/?eventType=wedding
/ketentuan/ → /legal/syarat-ketentuan/
```

---

## 15. Performance Requirements

Target:

```txt
Lighthouse Performance: 90+
Lighthouse SEO: 95+
Lighthouse Accessibility: 90+
Lighthouse Best Practices: 90+
```

Core Web Vitals target:

```txt
LCP: < 2.5s
INP: < 200ms
CLS: < 0.1
```

Image requirements:

- Use `.webp` or `.avif` where possible.
- Use Astro Image/Picture.
- Lazy-load gallery/grid images.
- Explicit width/height to avoid layout shift.
- Hero image optimized and preloaded if needed.

JavaScript requirements:

- Avoid React for static sections.
- Use islands only for interactive components.
- Avoid heavy animation libraries on many elements.
- Framer Motion only for selective hero/interactions.

---

## 16. Accessibility Requirements

- All buttons must have visible focus state.
- Color contrast must pass WCAG AA.
- Images need alt text.
- Forms need associated labels.
- Error messages must be readable by screen readers.
- Navigation usable with keyboard.
- Mobile drawer must trap focus when open.
- Do not use decorative script font for important text.

---

## 17. Analytics Requirements

Track core events:

```txt
view_home
view_design_catalog
view_design_category
click_design_preview
click_design_order
submit_order_form
click_whatsapp_header
click_whatsapp_floating
click_pricing_order
view_blog_article
```

Recommended analytics:

- Plausible/Umami for lightweight privacy-friendly analytics.
- GA4 if running Google Ads/remarketing.
- Meta Pixel/TikTok Pixel only if needed for ads.

Event payload examples:

```ts
{
  templateSlug?: string;
  category?: string;
  package?: string;
  sourcePage: string;
}
```

---

## 18. Form and Lead Requirements

## 18.1 Order Form Validation

Rules:

- Name required, min 2 chars.
- WhatsApp required, numeric-ish, min 8 chars.
- Event type required.
- Package required.
- Template optional but auto-filled from query.
- Notes optional max length.

## 18.2 Anti-Spam

Recommended:

- Honeypot hidden field.
- Rate limiting if server runtime supports it.
- Cloudflare Turnstile if spam starts appearing.

## 18.3 Lead Storage

Fase awal:

- Redirect to WhatsApp only.

Fase enhancement:

- Save to Astro DB/Turso.
- Send email via Resend.
- Store UTM params.

---

## 19. WhatsApp CTA Requirements

Global WhatsApp helper should live in:

```txt
src/lib/whatsapp/create-whatsapp-url.ts
```

All WhatsApp links must use one source of truth:

```txt
src/data/site.ts
```

Supported WhatsApp contexts:

- General inquiry.
- Order selected template.
- Order selected package.
- Ask about pricing.
- Ask about custom design.

Example context:

```ts
createWhatsappUrl({
  context: "template_order",
  templateSlug: "wedding-elegant-gold",
  packageName: "Meriah"
})
```

---

## 20. Environment Variables

```txt
PUBLIC_SITE_URL=https://acaranya.id
PUBLIC_WHATSAPP_NUMBER=628xxxxxxxxxx
PUBLIC_GA_ID=
PUBLIC_PLAUSIBLE_DOMAIN=acaranya.id
RESEND_API_KEY=
ADMIN_EMAIL=halo@acaranya.id
DATABASE_URL=
TURNSTILE_SECRET_KEY=
PUBLIC_TURNSTILE_SITE_KEY=
```

Rules:

- Public variables only for non-sensitive values.
- Secret keys never exposed to client.
- Site config still used for content-level defaults.

---

## 21. Tailwind Theme Direction

Suggested token mapping:

```ts
theme: {
  extend: {
    colors: {
      brand: {
        50: "#f5f7f7",
        100: "#e7ecec",
        200: "#ccd6d7",
        300: "#a7b8b9",
        400: "#7c9294",
        500: "#4d5859",
        600: "#465052",
        700: "#394244",
        800: "#303738",
        900: "#2a3031",
        950: "#171b1c"
      },
      cream: "#fbfaf7",
      champagne: "#d8c7a3",
      blush: "#ead8d2"
    },
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      serif: ["Cormorant Garamond", "Georgia", "serif"],
      latin: ["Allura", "cursive"]
    },
    borderRadius: {
      xl: "1rem",
      "2xl": "1.25rem",
      "3xl": "1.75rem"
    }
  }
}
```

---

## 22. Maintenability Rules

## 22.1 Do Not Hardcode Reusable Values

Do not hardcode repeatedly:

- WhatsApp number.
- Email.
- Address.
- Social links.
- Package names.
- Design categories.
- SEO defaults.
- Brand colors.

Use:

```txt
src/data/site.ts
src/data/navigation.ts
src/data/design-categories.ts
src/content/pricing/
src/content/faqs/
```

## 22.2 Component Rules

- Page files should be thin.
- Business logic lives in `src/lib/`.
- UI primitives live in `src/components/base/` and `src/components/ui/`.
- Feature components live in named folders like `home`, `designs`, `pricing`.
- Forms use schemas from `src/lib/forms/`.
- SEO generation lives in `src/lib/seo/`.

## 22.3 Naming Rules

Components:

```txt
PascalCase.astro
PascalCase.tsx
```

Utility files:

```txt
kebab-case.ts
```

Routes:

```txt
kebab-case/
```

Content slugs:

```txt
lowercase-hyphen
```

---

## 23. Deployment Requirements

Recommended primary deployment:

```txt
Vercel
```

Alternative:

```txt
Cloudflare Pages
Netlify
```

Deployment must support:

- Static generation.
- Preview deployment.
- Environment variables.
- Serverless/edge function for Astro Actions if needed.
- Redirects.
- Custom domain.

---

## 24. QA Checklist

## 24.1 Visual QA

- Logo sharp on retina screen.
- Font loaded correctly.
- Color token consistent.
- Button states work.
- Card hover not excessive.
- Mobile layout no overflow.
- Katalog grid consistent height.
- Form spacing comfortable.

## 24.2 SEO QA

- Every page has title and description.
- Canonical correct.
- Sitemap generated.
- robots.txt valid.
- JSON-LD valid.
- Open Graph image appears correctly.
- No duplicate title on category pages.
- Redirect old URLs tested.

## 24.3 Performance QA

- Images optimized.
- No unnecessary client JS.
- Lazy-load catalog images.
- LCP image not lazy if above fold.
- Fonts not causing excessive layout shift.
- No huge third-party scripts.

## 24.4 Form QA

- Required validation works.
- WhatsApp URL encoded correctly.
- Query template auto-filled.
- Error message visible.
- Submit button loading state works.
- Spam honeypot does not affect real users.

## 24.5 Content QA

- No typo in headline/CTA.
- Contact info consistent.
- Legal pages use Acaranya.id, not old brand.
- Package info consistent across home/harga/order.
- Category names consistent.

---

## 25. Milestones

## Milestone 1 — Foundation

Deliverables:

- Astro project setup.
- Tailwind theme tokens.
- Font setup.
- Base layout.
- Header/footer.
- Site config.
- Basic SEO component.

## Milestone 2 — Core Marketing Pages

Deliverables:

- Homepage.
- Fitur.
- Harga.
- Tentang.
- Kontak.
- Legal pages.

## Milestone 3 — Katalog Desain

Deliverables:

- Designs collection.
- Category data.
- Catalog page.
- Category page.
- Design card.
- Preview/order buttons.
- Pagination/filtering.

## Milestone 4 — Order Flow

Deliverables:

- Order page.
- Form schema.
- Astro Action.
- WhatsApp helper.
- Query param handling.
- Optional lead storage.

## Milestone 5 — Blog and SEO

Deliverables:

- Blog collection.
- Blog index.
- Blog detail.
- Article layout.
- FAQ schema.
- Sitemap.
- JSON-LD.

## Milestone 6 — CMS Integration

Deliverables:

- Keystatic config.
- Designs editable.
- Blog editable.
- Pricing editable.
- FAQ editable.
- Testimonials editable.

## Milestone 7 — QA and Launch

Deliverables:

- Responsive QA.
- SEO QA.
- Performance QA.
- Redirect setup.
- Analytics setup.
- Production deployment.

---

## 26. Definition of Done

Website dianggap siap launch jika:

1. Semua route utama tersedia dan tidak error.
2. Homepage, fitur, harga, katalog, order, kontak, dan blog berjalan responsif.
3. Katalog bisa menampilkan template dari content collection.
4. Tombol preview mengarah ke `inv.acaranya.id`.
5. Tombol order membawa template terpilih ke form order.
6. Form order bisa generate WhatsApp prefilled message.
7. SEO metadata lengkap di semua halaman utama.
8. Sitemap dan robots tersedia.
9. Lighthouse score memenuhi target minimum.
10. Contact info konsisten di seluruh website.
11. Warna, font, spacing, dan component style mengikuti design system.
12. Konten mudah diedit via content files/Keystatic.

---

## 27. Initial Recommended Build Order

Urutan pengerjaan yang paling aman:

1. Setup project Astro + Tailwind + TypeScript.
2. Setup design tokens: warna, font, spacing, radius.
3. Buat `siteConfig`, navigation, categories.
4. Buat BaseLayout dan MarketingLayout.
5. Buat komponen base: Container, Section, SectionHeader, Button.
6. Buat Header dan Footer.
7. Buat Homepage static.
8. Buat content collection designs.
9. Buat katalog desain.
10. Buat order form dan WhatsApp helper.
11. Buat halaman harga, fitur, kontak, tentang.
12. Buat blog dan SEO.
13. Integrasi Keystatic.
14. QA dan deployment.

---

## 28. Notes for Visual Designer / Developer

- Jangan membuat website terlalu ramai karena brand logo sudah elegan dan mature.
- Gunakan `#4d5859` sebagai anchor visual, bukan sebagai warna seluruh background.
- Kombinasi Inter + Cormorant Garamond + Allura sudah cocok untuk bridging modern UI dan wedding/event elegance.
- Prioritaskan mobile experience karena mayoritas user kemungkinan datang dari Instagram, WhatsApp, atau pencarian mobile.
- Hindari animasi berlebihan. Gunakan motion untuk memperhalus transisi, bukan membuat halaman terasa berat.
- Untuk katalog besar, performa gambar adalah faktor utama.
- Jangan biarkan konten penting hanya muncul lewat interaksi client-side; tetap render konten SEO utama secara static.

---

## 29. Open Questions

1. Apakah semua kategori acara akan langsung dijalankan saat launch atau mulai dari pernikahan dulu?
2. Apakah preview di `inv.acaranya.id` akan di-index Google atau hanya untuk demo?
3. Apakah order form wajib menyimpan data lead ke database dari awal?
4. Apakah perlu notifikasi email setiap order masuk?
5. Apakah harga final masih sama dengan website lama atau akan direstrukturisasi?
6. Apakah Acaranya.id akan menggunakan satu nomor WhatsApp utama atau beberapa nomor berdasarkan kategori?
7. Apakah template premium perlu dibedakan secara visual dan pricing?
8. Apakah blog akan ditulis manual atau dikelola penuh via Keystatic?

---

## 30. Recommended Next Step

Setelah PRD ini disetujui, langkah berikutnya adalah membuat:

1. `package.json` stack final.
2. `astro.config.mjs`.
3. `tailwind/theme` token awal.
4. `src/data/site.ts`.
5. `src/content.config.ts`.
6. Skeleton route dan layout.
7. Komponen awal homepage + katalog desain.

