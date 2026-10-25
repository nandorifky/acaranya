export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isCTA?: boolean;
  icon?: string;
  description?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export const mainNavigation: NavItem[] = [
  { label: 'Fitur', href: '/fitur/' },
  { label: 'Harga', href: '/harga/' },
  { label: 'Desain', href: '/desain-undangan-digital/' },
  { label: 'Portofolio', href: '/portfolio/' },
  { label: 'Artikel', href: '/artikel/' },
  { label: 'Cari', href: '/search/' },
  { label: 'Kontak', href: '/kontak/' },
];

export const mobileNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Fitur', href: '/fitur/' },
  { label: 'Harga', href: '/harga/' },
  { label: 'Desain Undangan', href: '/desain-undangan-digital/' },
  { label: 'Portofolio', href: '/portfolio/' },
  { label: 'Artikel', href: '/artikel/' },
  { label: 'Cari', href: '/search/' },
  { label: 'Mitra Reseller', href: '/reseller-undangan-digital/' },
  { label: 'Tentang', href: '/tentang/' },
  { label: 'Kontak', href: '/kontak/' },
];

/**
 * Grouped navigation for the mobile drawer.
 * Kept separate from `mobileNavigation` so existing consumers are unaffected.
 */
export const mobileNavigationGroups: NavGroup[] = [
  {
    title: 'Layanan',
    items: [
      { label: 'Desain Undangan', href: '/desain-undangan-digital/', icon: 'gem', description: 'Katalog tema undangan digital' },
      { label: 'Harga & Paket', href: '/harga/', icon: 'wallet', description: 'Pilihan paket sesuai kebutuhan' },
      { label: 'Fitur', href: '/fitur/', icon: 'sparkles', description: 'Semua yang kamu dapatkan' },
      { label: 'Portofolio', href: '/portfolio/', icon: 'folder', description: 'Karya nyata klien kami' },
    ],
  },
  {
    title: 'Jelajahi',
    items: [
      { label: 'Artikel', href: '/artikel/', icon: 'pen-line', description: 'Tips & panduan pernikahan' },
      { label: 'Area Layanan', href: '/area/', icon: 'map-pin', description: 'Undangan digital di kotamu' },
      { label: 'Tools Gratis', href: '/tools/', icon: 'sliders-horizontal', description: 'Kalkulator & generator' },
      { label: 'Cari', href: '/search/', icon: 'search', description: 'Telusuri seluruh situs' },
    ],
  },
  {
    title: 'Perusahaan',
    items: [
      { label: 'Tentang Kami', href: '/tentang/', icon: 'users', description: 'Kenali tim Acaranya.id' },
      { label: 'Mitra Reseller', href: '/reseller-undangan-digital/', icon: 'store', description: 'Peluang kerja sama' },
      { label: 'Kontak', href: '/kontak/', icon: 'message-square', description: 'Hubungi tim kami' },
    ],
  },
];

export const ctaNavItem: NavItem = {
  label: 'Order Sekarang',
  href: '/order-undangan/',
  isCTA: true,
};

export const footerNavigation = {
  layanan: [
    { label: 'Undangan Digital', href: '/desain-undangan-digital/' },
    { label: 'Undangan Pernikahan', href: '/desain-undangan-digital/pernikahan/' },
    { label: 'Undangan Khitanan', href: '/desain-undangan-digital/khitan/' },
    { label: 'Undangan Ulang Tahun', href: '/desain-undangan-digital/birthday-party/' },
    { label: 'Undangan Aqiqah', href: '/desain-undangan-digital/aqiqah/' },
  ],
  perusahaan: [
    { label: 'Tentang', href: '/tentang/' },
    { label: 'Kontak', href: '/kontak/' },
    { label: 'Portofolio', href: '/portfolio/' },
    { label: 'Artikel', href: '/artikel/' },
    { label: 'Mitra Reseller', href: '/reseller-undangan-digital/' },
    { label: 'Area Layanan', href: '/area/' },
  ],
  bantuan: [
    { label: 'Harga', href: '/harga/' },
    { label: 'Fitur', href: '/fitur/' },
    { label: 'Syarat & Ketentuan', href: '/legal/syarat-ketentuan/' },
    { label: 'Kebijakan Privasi', href: '/legal/kebijakan-privasi/' },
    { label: 'Refund Policy', href: '/legal/refund-policy/' },
    { label: 'Tools', href: '/tools/' },
    { label: 'Review Us', href: '/review-us/' },
  ],
};
