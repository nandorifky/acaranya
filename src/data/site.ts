export const siteConfig = {
  name: 'Acaranya.id',
  tagline: 'Undangan Digital Modern untuk Berbagai Acara',
  description: 'Buat undangan digital modern dengan desain cantik, fitur lengkap, dan proses mudah. Pilih template, kirim data, lalu bagikan undanganmu.',
  url: 'https://acaranya.id',
  previewDomain: 'https://acaranya.id',
  ogImage: '/og/default-og.jpg',
  locale: 'id_ID',

  contact: {
    whatsapp: '6281234807480',
    whatsappDisplay: '+62 812-3480-7480',
    email: 'acaranya.id@gmail.com',
    instagram: '@acaranya.id',
    instagramUrl: 'https://instagram.com/acaranya.id',
  },

  business: {
    operatingHours: 'Senin - Sabtu, 09:00 - 21:00 WIB',
    location: 'Indonesia',
    address: 'Perumahan Wilis Indah II Blok H3 No. 12, Kediri, Jawa Timur',
    foundedYear: 2022,
  },

  stats: {
    totalInvitations: '2000+',
    totalGuests: '150k+',
    totalDesigns: '200+',
    since: 'Sejak 2022',
  },

  seo: {
    titleTemplate: '%s | Acaranya.id',
    defaultTitle: 'Undangan Digital Cantik untuk Berbagai Acara | Acaranya.id',
    defaultDescription: 'Buat undangan digital modern dengan desain cantik, fitur lengkap, dan proses mudah. Pilih template, kirim data, lalu bagikan undanganmu.',
    // Tracking & Verification Configurations
    googleSiteVerification: '4rrj2MUeooSdQXxhHusQ22vNE_M9VjOgFkoMOxVts4E',
    bingSiteVerification: '',      // Paste Bing Webmaster verification code here
    pinterestSiteVerification: 'be35e8def7fb11e5602fe348ff1dd05a',  // Paste Pinterest verification code here
    yandexSiteVerification: '',     // Paste Yandex verification code here
    googleAnalyticsId: 'G-SME66PTLRE',
    googleTagManagerId: 'G-SME66PTLRE',
    metaPixelId: '',
  },
} as const;

export type SiteConfig = typeof siteConfig;
