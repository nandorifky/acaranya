export const siteConfig = {
  name: 'Acaranya.id',
  tagline: 'Undangan Digital Modern untuk Berbagai Acara',
  description: 'Buat undangan digital modern dengan desain cantik, fitur lengkap, dan proses mudah. Pilih template, kirim data, lalu bagikan undanganmu.',
  url: 'https://acaranya.id',
  previewDomain: 'https://acaranya.id',
  locale: 'id_ID',
  
  branding: {
    logo: '/images/acaranya-logo.png',
    logo1x1: '/images/acaranya logo 1x1.webp',
    favicon: '/images/favicon.ico',
    ogImage: '/og/default-og.jpg',
  },

  contact: {
    whatsapp: '6281234807480',
    whatsappDisplay: '+62 812-3480-7480',
    email: 'acaranya.id@gmail.com',
    emailDisplay: 'acaranya.id@gmail.com',
  },

  social: {
    instagram: {
      username: '@acaranya.id',
      url: 'https://instagram.com/acaranya.id',
      active: true,
    },
    tiktok: {
      username: '@acaranya.id',
      url: 'https://tiktok.com/@acaranya.id',
      active: true,
    },
    facebook: {
      username: 'Acaranya.id',
      url: 'https://facebook.com/acaranya.id',
      active: true,
    },
    youtube: {
      username: 'Acaranya ID',
      url: 'https://youtube.com/@acaranyaid',
      active: false,
    },
    twitter: {
      username: '@acaranya_id',
      url: 'https://twitter.com/acaranya_id',
      active: false,
    },
    linkedin: {
      username: 'Acaranya ID',
      url: 'https://linkedin.com/company/acaranyaid',
      active: false,
    },
    telegram: {
      url: 'https://t.me/acaranyaid',
      active: true,
    }
  },

  business: {
    operatingHours: 'Senin - Sabtu, 09:00 - 21:00 WIB',
    location: 'Indonesia',
    address: 'Perumahan Wilis Indah II Blok H3 No. 12, Kediri, Jawa Timur',
    googleMapsUrl: 'https://maps.app.goo.gl/xxxx', // Tambahkan link maps jika ada
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
    keywords: 'undangan digital, undangan online, undangan website, wedding invitation, e-invitation',
    
    // Tracking & Verification Configurations
    googleSiteVerification: '4rrj2MUeooSdQXxhHusQ22vNE_M9VjOgFkoMOxVts4E',
    bingSiteVerification: '',
    pinterestSiteVerification: 'be35e8def7fb11e5602fe348ff1dd05a',
    yandexSiteVerification: '',
    googleAnalyticsId: 'G-SME66PTLRE',
    googleTagManagerId: 'G-SME66PTLRE',
    metaPixelId: '',
  },

  integrations: {
    whatsappGateway: 'https://api.whatsapp.com/send',
    orderUrl: '/order-undangan/',
    pricingUrl: '/harga/',
    catalogUrl: '/desain-undangan-digital/',
  },

  team: {
    founder: {
      name: 'Nando Rifky',
      role: 'Founder',
      avatar: '/images/nando-rifky.webp',
    },
    editor1: {
      name: 'Indira',
      role: 'Editor',
      avatar: '/images/indira.webp',
    },
    editor2: {
      name: 'Vivi',
      role: 'Editor',
      avatar: '/images/vivi.webp',
    },
    freelancers: {
      name: '5+ Freelancers',
      role: 'Marketing/Editor/Designer',
    }
  }
} as const;

export type SiteConfig = typeof siteConfig;
