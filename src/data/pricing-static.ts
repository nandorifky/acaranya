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
