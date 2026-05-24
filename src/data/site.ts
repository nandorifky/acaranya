export const siteConfig = {
  name: 'Acaranya.id',
  tagline: 'Undangan Digital Modern untuk Berbagai Acara',
  description: 'Buat undangan digital modern dengan desain cantik, fitur lengkap, dan proses mudah. Pilih template, kirim data, lalu bagikan undanganmu.',
  url: 'https://acaranya.id',
  previewDomain: 'https://inv.acaranya.id',
  ogImage: '/og/default-og.jpg',
  locale: 'id_ID',

  contact: {
    whatsapp: '62895395094329',
    whatsappDisplay: '+62 895-3950-94329',
    email: 'halo@acaranya.id',
    instagram: '@acaranya.id',
    instagramUrl: 'https://instagram.com/acaranya.id',
  },

  business: {
    operatingHours: 'Senin - Sabtu, 09:00 - 21:00 WIB',
    location: 'Indonesia',
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
    defaultTitle: 'Acaranya.id — Undangan Digital Cantik untuk Berbagai Acara',
    defaultDescription: 'Buat undangan digital modern dengan desain cantik, fitur lengkap, dan proses mudah. Pilih template, kirim data, lalu bagikan undanganmu.',
    // Tracking & Verification Configurations
    googleSiteVerification: '', // Paste GSC verification code here
    googleAnalyticsId: '',      // Paste GA4 Tag ID (G-XXXXXXXXXX) here
    googleTagManagerId: '',     // Paste GTM Container ID (GTM-XXXXXXX) here
    metaPixelId: '',            // Paste Meta/FB Pixel ID here
  },
} as const;

export type SiteConfig = typeof siteConfig;
