import { pricingPlans } from './pricing-static';

const minPrice = Math.min(...pricingPlans.map(p => p.price));
const maxPrice = Math.max(...pricingPlans.map(p => p.price));
const dynamicPriceRange = `Rp ${minPrice.toLocaleString('id-ID')} - Rp ${maxPrice.toLocaleString('id-ID')}`;

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
    logo1x1Png: '/images/acaranya 1x1.png',
    favicon: '/images/favicon.ico',
    ogImage: '/images/default-og.jpg',
    themeColor: '#ffffff',
  },

  contact: {
    whatsapp: '62895395094329',
    whatsappDisplay: '+62 895-3950-94329',
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
      url: 'https://www.tiktok.com/@acaranya.id',
      active: true,
    },
    facebook: {
      username: 'Acaranya.id',
      url: 'https://facebook.com/acaranya.fb',
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
      active: false,
    }
  },

  business: {
    operatingHours: 'Senin - Sabtu, 09:00 - 21:00 WIB',
    location: 'Indonesia',
    address: 'Kota Kediri, Jawa Timur, Indonesia',
    googleMapsUrl: 'https://maps.app.goo.gl/2NAJVDngChz91mdt8', // Tambahkan link maps jika ada
    foundedYear: 2022,
    schemaLocality: 'Kediri',
    schemaRegion: 'Jawa Timur',
    schemaCountry: 'ID',
    latitude: -8.039795549091139,
    longitude: 111.99647128908323,
  },

  stats: {
    totalInvitations: '2000+',
    totalGuests: '150k+',
    totalDesigns: '500+',
    since: '2022',
  },

  seo: {
    titleTemplate: '%s | Acaranya.id',
    defaultTitle: 'Buat Undangan Digital Website Terima Jadi Tanpa Antre! | Acaranya.id',
    defaultDescription: 'Buat undangan digital modern dengan desain cantik, fitur lengkap, dan proses mudah. Pilih template, kirim data, lalu bagikan undanganmu.',
    keywords: 'undangan digital, undangan online, undangan website, wedding invitation, e-invitation',

    // Tracking & Verification Configurations
    googleSiteVerification: '4rrj2MUeooSdQXxhHusQ22vNE_M9VjOgFkoMOxVts4E',
    bingSiteVerification: '',
    pinterestSiteVerification: 'be35e8def7fb11e5602fe348ff1dd05a',
    yandexSiteVerification: '',
    googleAnalyticsId: 'G-SME66PTLRE',
    googleTagManagerId: '',
    metaPixelId: '',
    ratingValue: '4.9',
    reviewCount: '384',
    priceRange: dynamicPriceRange,
  },

  integrations: {
    whatsappGateway: 'https://api.whatsapp.com/send',
    orderUrl: '/order-undangan/',
    pricingUrl: '/harga/',
    catalogUrl: '/desain-undangan-digital/',
    contactUrl: '/kontak/',
  },

  team: {
    founder: {
      name: 'Nando Rifky',
      role: 'Founder',
      avatar: '/images/nando-rifky.webp',
      quote: [
        "Saya percaya bahwa setiap momen spesial dalam hidup layak dirayakan dengan cara yang unik dan personal. Kami di Acaranya.id berkomitmen untuk menghadirkan undangan digital yang tidak hanya elegan dan inovatif, tapi juga mencerminkan kisah dan gaya setiap pasangan.",
        "Kami berharap layanan kami dapat membantu menjadikan momen penting Anda lebih berkesan dan terkoneksi dalam setiap detailnya."
      ]
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
      role: 'All Rounder',
    }
  }
} as const;

export type SiteConfig = typeof siteConfig;
