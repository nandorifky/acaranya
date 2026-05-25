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
      'Revisi Sepuasnya',
      'Unlimited Tamu',
      'Hitung Mundur Waktu Acara',
      'Integrasi Google Maps',
      'Background Music',
      '6 Foto Galeri',
      'Quotes',
      'Form RSVP & Ucapan',
      'QR Code Check-In Acara',
      'Layar Sapa & Check-In Counter',
      'Buku Tamu',
    ],
    isPopular: false,
    ctaLabel: 'Pilih Simple',
  },
  {
    name: 'Mengundang',
    slug: 'mengundang',
    price: 105000,
    priceDisplay: 'Rp105.000',
    description: 'Paket terlaris dengan fitur lengkap untuk acara spesialmu.',
    features: [
      'Revisi Sepuasnya',
      'Unlimited Tamu Undangan',
      'Hitung Mundur Waktu Acara',
      'Integrasi Google Maps',
      'Background Music',
      '10 Foto Galeri',
      'Quotes',
      'Form RSVP & Ucapan',
      'QR Code Check-In Acara',
      'Layar Sapa & Check-In Counter',
      'Buku Tamu',
      'Amplop Digital & Tanda Kasih',
      'Rundown Acara',
      'Love Story (pernikahan)',
      '1 Video',
      'Live Streaming',
    ],
    isPopular: true,
    ctaLabel: 'Pilih Mengundang',
  },
  {
    name: 'Meriah',
    slug: 'meriah',
    price: 150000,
    priceDisplay: 'Rp150.000',
    description: 'Paket premium dengan semua fitur untuk acara yang tak terlupakan.',
    features: [
      'Revisi Sepuasnya',
      'Unlimited Tamu Undangan',
      'Hitung Mundur Waktu Acara',
      'Integrasi Google Maps',
      'Background Music',
      '10+ Foto Galeri',
      'Quotes',
      'Form RSVP & Ucapan',
      'QR Code Check-In Acara',
      'Layar Sapa & Check-In Counter',
      'Buku Tamu',
      'Amplop Digital & Tanda Kasih',
      'Rundown Acara',
      'Love Story (Pernikahan)',
      '1 Video',
      'Live Streaming',
      'Custom Desain',
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
  { name: 'Revisi', simple: 'Sepuasnya', mengundang: 'Sepuasnya', meriah: 'Sepuasnya' },
  { name: 'Unlimited tamu', simple: true, mengundang: true, meriah: true },
  { name: 'Google Maps', simple: true, mengundang: true, meriah: true },
  { name: 'RSVP', simple: true, mengundang: true, meriah: true },
  { name: 'Ucapan & Doa', simple: true, mengundang: true, meriah: true },
  { name: 'Countdown timer', simple: true, mengundang: true, meriah: true },
  { name: 'Musik background', simple: true, mengundang: true, meriah: true },
  { name: 'Quotes', simple: true, mengundang: true, meriah: true },
  { name: 'Buku tamu', simple: true, mengundang: true, meriah: true },
  { name: 'QR Code check-in', simple: true, mengundang: true, meriah: true },
  { name: 'Layar Sapa & Check-In Counter', simple: true, mengundang: true, meriah: true },
  { name: 'Galeri foto', simple: '6 foto', mengundang: '10 foto', meriah: '10+ foto' },
  { name: 'Amplop digital', simple: false, mengundang: true, meriah: true },
  { name: 'Rundown acara', simple: false, mengundang: true, meriah: true },
  { name: 'Love story / Timeline', simple: false, mengundang: true, meriah: true },
  { name: 'Video embed', simple: false, mengundang: '1 video', meriah: '1 video' },
  { name: 'Live streaming', simple: false, mengundang: true, meriah: true },
  { name: 'Desain custom', simple: false, mengundang: false, meriah: true },
];
