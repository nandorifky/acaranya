export interface DesignCategory {
  slug: string;
  label: string;
  labelShort: string;
  description: string;
  metaTitle: string;
  metaDescription: string;
  icon: string; // Lucide icon name
  longContent?: {
    title: string;
    subtitle: string;
    paragraphs: string[];
  };
}

export const designCategories: DesignCategory[] = [
  {
    slug: 'pernikahan',
    label: 'Pernikahan',
    labelShort: 'Pernikahan',
    description: 'Template undangan digital pernikahan elegan, modern, dan siap digunakan untuk hari istimewamu.',
    metaTitle: 'Template Undangan Digital Pernikahan | Acaranya.id',
    metaDescription: 'Pilih template undangan digital pernikahan yang elegan, modern, dan siap digunakan. Preview desain lalu order dengan mudah di Acaranya.id.',
    icon: 'gem',
    longContent: {
      title: 'Sentuhan Keanggunan Klasik untuk Pernikahan Sakral Anda',
      subtitle: 'Kenapa memilih undangan pernikahan digital?',
      paragraphs: [
        'Hari pernikahan adalah salah satu momen paling bersejarah dalam hidup Anda. Undangan digital pernikahan kami dirancang secara eksklusif untuk memantulkan keanggunan, kesakralan, dan kepribadian romantis Anda dan pasangan.',
        'Setiap template pernikahan didukung oleh ornamen tipografi Cormorant Garamond, tata letak bergaya majalah butik, peta koordinat GPS interaktif untuk kelancaran tamu, serta kolom RSVP dan amplop e-gift instan yang mempermudah restu digital.'
      ]
    }
  },
  {
    slug: 'khitanan',
    label: 'Khitanan',
    labelShort: 'Khitanan',
    description: 'Template undangan khitanan yang rapi dan modern untuk merayakan momen spesial putramu.',
    metaTitle: 'Template Undangan Digital Khitanan | Acaranya.id',
    metaDescription: 'Temukan template undangan digital khitanan modern dan siap pakai. Preview dan order mudah di Acaranya.id.',
    icon: 'party-popper',
    longContent: {
      title: 'Rayakan Syukuran Khitanan Putra Tercinta dengan Sukacita',
      subtitle: 'Kemudahan mengundang keluarga dan kerabat dekat',
      paragraphs: [
        'Momen syukuran khitanan adalah pencapaian istimewa dalam tumbuh kembang putra Anda. Undangan digital khitanan dirancang dengan nuansa ceria namun tetap rapi, islami, dan modern.',
        'Dilengkapi fitur navigasi Google Maps untuk memudahkan kedatangan tamu, kolom ucapan doa selamat yang interaktif, serta integrasi pemindaian QR Code check-in tamu untuk kerapian manajemen kehadiran.'
      ]
    }
  },
  {
    slug: 'ulang-tahun',
    label: 'Ulang Tahun',
    labelShort: 'Ultah',
    description: 'Template undangan ulang tahun yang seru dan cantik untuk perayaanmu.',
    metaTitle: 'Template Undangan Digital Ulang Tahun | Acaranya.id',
    metaDescription: 'Pilih template undangan ulang tahun yang seru dan cantik. Buat undangan digital dengan mudah di Acaranya.id.',
    icon: 'cake',
    longContent: {
      title: 'Pesta Ulang Tahun yang Seru, Meriah, dan Sangat Berkesan',
      subtitle: 'Sebarkan kebahagiaan pesta Anda dalam hitungan detik',
      paragraphs: [
        'Siapkan pesta ulang tahun Anda atau putra-putri tercinta dengan undangan digital bertema modern, penuh warna-warni dinamis, dan sangat menyenangkan.',
        'Undangan ulang tahun kami memudahkan teman and keluarga melakukan konfirmasi kehadiran (RSVP), melihat hitung mundur menuju pesta, serta mendengarkan alunan musik latar ceria pilihan Anda.'
      ]
    }
  },
  {
    slug: 'aqiqah',
    label: 'Aqiqah',
    labelShort: 'Aqiqah',
    description: 'Template undangan aqiqah yang islami dan elegan untuk menyambut kelahiran buah hatimu.',
    metaTitle: 'Template Undangan Digital Aqiqah | Acaranya.id',
    metaDescription: 'Temukan template undangan aqiqah yang islami dan modern. Preview desain dan order undangan digital di Acaranya.id.',
    icon: 'baby',
    longContent: {
      title: 'Sambut Kehadiran Buah Hati dengan Penuh Doa Rasa Syukur',
      subtitle: 'Undangan tasyakuran aqiqah islami berestetika tinggi',
      paragraphs: [
        'Menyambut kehadiran buah hati ke dunia adalah anugerah terindah yang patut disyukuri. Undangan digital aqiqah dari Acaranya.id dirancang secara syahdu, bersih, dan memancarkan ketulusan doa.',
        'Tampilkan foto-foto menggemaskan si kecil dalam kolase galeri estetik lengkap dengan kutipan doa terbaik, rundown acara tasyakuran, serta navigasi peta lokasi.'
      ]
    }
  },
  {
    slug: 'corporate',
    label: 'Corporate Event',
    labelShort: 'Corporate',
    description: 'Template undangan acara corporate, seminar, gathering, dan event profesional.',
    metaTitle: 'Template Undangan Digital Corporate Event | Acaranya.id',
    metaDescription: 'Template undangan digital untuk acara corporate, seminar, dan gathering. Desain profesional dan modern di Acaranya.id.',
    icon: 'building',
    longContent: {
      title: 'Undangan Profesional untuk Acara Korporat & Gathering Bisnis',
      subtitle: 'Representasi mewah untuk prestise brand perusahaan Anda',
      paragraphs: [
        'Event corporate gathering, seminar umum, atau grand opening memerlukan representasi digital yang solid, terpercaya, and profesional.',
        'Undangan digital korporat kami menawarkan layout minimalis fungsional yang sangat rapi, fitur pendaftaran tamu QR Code yang andal, and detail agenda rundown yang terperinci.'
      ]
    }
  },
  {
    slug: 'graduation',
    label: 'Graduation',
    labelShort: 'Wisuda',
    description: 'Template undangan wisuda dan kelulusan untuk merayakan pencapaianmu.',
    metaTitle: 'Template Undangan Digital Graduation | Acaranya.id',
    metaDescription: 'Pilih template undangan wisuda yang modern dan elegan. Buat undangan digital dengan mudah di Acaranya.id.',
    icon: 'graduation-cap',
    longContent: {
      title: 'Rayakan Momen Wisuda & Pencapaian Kelulusan Terbaik Anda',
      subtitle: 'Bagikan kebahagiaan kesuksesan akademis bersama keluarga',
      paragraphs: [
        'Kelulusan wisuda yang membanggakan layak dirayakan bersama orang-orang tercinta yang mendukung langkah perjuangan Anda.',
        'Tampilkan foto wisuda terbaik Anda dalam balutan tata letak undangan digital premium yang mewah, lengkap dengan agenda syukuran dan peta lokasi perayaan.'
      ]
    }
  },
];

export function getCategoryBySlug(slug: string): DesignCategory | undefined {
  return designCategories.find(c => c.slug === slug);
}
