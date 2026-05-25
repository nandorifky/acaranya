export interface PricingPlan {
  name: string;
  slug: string;
  price: number;
  priceDisplay: string;
  description: string;
  features: string[];
  isPopular: boolean;
  ctaLabel: string;
}

export const pricingPlans: PricingPlan[] = [
  {
    name: 'Simple',
    slug: 'simple',
    price: 75000,
    priceDisplay: 'Rp75.000',
    description: 'Cocok untuk undangan sederhana dengan fitur dasar yang lengkap.',
    features: [
      'Unlimited tamu',
      'Google Maps',
      'RSVP',
      'Ucapan & Doa',
      'Countdown',
      'Galeri foto (5 foto)',
      'Musik background',
      'Custom nama tamu',
      'Share ke WhatsApp',
    ],
    isPopular: false,
    ctaLabel: 'Pilih Simple',
  },
  {
    name: 'Mengundang',
    slug: 'mengundang',
    price: 150000,
    priceDisplay: 'Rp150.000',
    description: 'Paket terlaris dengan fitur lengkap untuk acara spesialmu.',
    features: [
      'Semua fitur Simple',
      'Galeri foto (15 foto)',
      'Love story / Timeline',
      'Rundown acara',
      'Amplop digital',
      'QR Code check-in',
      'Video embed',
      'Animasi premium',
      'Buku tamu',
    ],
    isPopular: true,
    ctaLabel: 'Pilih Mengundang',
  },
  {
    name: 'Meriah',
    slug: 'meriah',
    price: 250000,
    priceDisplay: 'Rp250.000',
    description: 'Paket premium dengan semua fitur untuk acara yang tak terlupakan.',
    features: [
      'Semua fitur Mengundang',
      'Galeri unlimited',
      'Live streaming embed',
      'Custom domain undangan',
      'Multiple event/sesi',
      'Desain custom request',
      'Priority support',
      'Revisi unlimited',
      'Masa aktif 1 tahun',
    ],
    isPopular: false,
    ctaLabel: 'Pilih Meriah',
  },
];

export interface ComparisonFeature {
  name: string;
  simple: boolean | string;
  mengundang: boolean | string;
  meriah: boolean | string;
}

export const comparisonFeatures: ComparisonFeature[] = [
  { name: 'Unlimited tamu', simple: true, mengundang: true, meriah: true },
  { name: 'Google Maps', simple: true, mengundang: true, meriah: true },
  { name: 'RSVP', simple: true, mengundang: true, meriah: true },
  { name: 'Ucapan & Doa', simple: true, mengundang: true, meriah: true },
  { name: 'Custom nama tamu', simple: true, mengundang: true, meriah: true },
  { name: 'Countdown timer', simple: true, mengundang: true, meriah: true },
  { name: 'Musik background', simple: true, mengundang: true, meriah: true },
  { name: 'Share WhatsApp', simple: true, mengundang: true, meriah: true },
  { name: 'Galeri foto', simple: '5 foto', mengundang: '15 foto', meriah: 'Unlimited' },
  { name: 'Love story / Timeline', simple: false, mengundang: true, meriah: true },
  { name: 'Rundown acara', simple: false, mengundang: true, meriah: true },
  { name: 'Amplop digital', simple: false, mengundang: true, meriah: true },
  { name: 'QR Code check-in', simple: false, mengundang: true, meriah: true },
  { name: 'Video embed', simple: false, mengundang: true, meriah: true },
  { name: 'Buku tamu', simple: false, mengundang: true, meriah: true },
  { name: 'Live streaming', simple: false, mengundang: false, meriah: true },
  { name: 'Custom domain', simple: false, mengundang: false, meriah: true },
  { name: 'Multiple sesi', simple: false, mengundang: false, meriah: true },
  { name: 'Desain custom', simple: false, mengundang: false, meriah: true },
  { name: 'Priority support', simple: false, mengundang: false, meriah: true },
  { name: 'Revisi', simple: '2x', mengundang: '5x', meriah: 'Unlimited' },
  { name: 'Masa aktif', simple: '6 bulan', mengundang: '6 bulan', meriah: '1 tahun' },
];
