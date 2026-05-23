import { siteConfig } from '../../data/site';

interface WhatsAppOptions {
  context?: 'general' | 'template_order' | 'package_order' | 'pricing_inquiry' | 'custom_design';
  templateSlug?: string;
  templateName?: string;
  packageName?: string;
  name?: string;
  whatsapp?: string;
  eventType?: string;
  eventDate?: string;
  notes?: string;
}

const templates: Record<string, (opts: WhatsAppOptions) => string> = {
  general: () =>
    `Halo Acaranya.id, saya ingin bertanya tentang layanan undangan digital.`,

  template_order: (opts) =>
    `Halo Acaranya.id, saya mau order undangan digital.

Nama: ${opts.name || '-'}
WhatsApp: ${opts.whatsapp || '-'}
Jenis acara: ${opts.eventType || '-'}
Paket: ${opts.packageName || '-'}
Template: ${opts.templateSlug || '-'}
Tanggal acara: ${opts.eventDate || '-'}
Catatan: ${opts.notes || '-'}`,

  package_order: (opts) =>
    `Halo Acaranya.id, saya tertarik dengan paket *${opts.packageName || ''}*.
Bisa dibantu untuk proses order?`,

  pricing_inquiry: () =>
    `Halo Acaranya.id, saya ingin bertanya tentang harga paket undangan digital.`,

  custom_design: () =>
    `Halo Acaranya.id, saya ingin request desain custom untuk undangan digital. Bisa dibantu?`,
};

export function createWhatsappUrl(opts: WhatsAppOptions = {}): string {
  const context = opts.context || 'general';
  const templateFn = templates[context] || templates.general;
  const message = templateFn(opts);

  const phone = siteConfig.contact.whatsapp.replace(/\D/g, '');
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phone}?text=${encoded}`;
}
