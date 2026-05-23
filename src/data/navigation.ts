export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
  isCTA?: boolean;
}

export const mainNavigation: NavItem[] = [
  { label: 'Fitur', href: '/fitur/' },
  { label: 'Harga', href: '/harga/' },
  { label: 'Desain', href: '/desain-undangan-digital/' },
  { label: 'Artikel', href: '/artikel/' },
  { label: 'Kontak', href: '/kontak/' },
];

export const mobileNavigation: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Fitur', href: '/fitur/' },
  { label: 'Harga', href: '/harga/' },
  { label: 'Desain Undangan', href: '/desain-undangan-digital/' },
  { label: 'Artikel', href: '/artikel/' },
  { label: 'Tentang', href: '/tentang/' },
  { label: 'Kontak', href: '/kontak/' },
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
    { label: 'Undangan Khitanan', href: '/desain-undangan-digital/khitanan/' },
    { label: 'Undangan Ulang Tahun', href: '/desain-undangan-digital/ulang-tahun/' },
    { label: 'Undangan Aqiqah', href: '/desain-undangan-digital/aqiqah/' },
  ],
  perusahaan: [
    { label: 'Tentang', href: '/tentang/' },
    { label: 'Kontak', href: '/kontak/' },
    { label: 'Artikel', href: '/artikel/' },
  ],
  bantuan: [
    { label: 'Harga', href: '/harga/' },
    { label: 'Fitur', href: '/fitur/' },
    { label: 'Syarat & Ketentuan', href: '/legal/syarat-ketentuan/' },
    { label: 'Kebijakan Privasi', href: '/legal/kebijakan-privasi/' },
    { label: 'Refund Policy', href: '/legal/refund-policy/' },
  ],
};
