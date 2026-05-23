import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { mobileNavigation, ctaNavItem } from '../../data/navigation';
import { createWhatsappUrl } from '../../lib/whatsapp/create-whatsapp-url';
import { X, Menu, ArrowUpRight } from 'lucide-react';

const WhatsAppIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className="shrink-0">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

function MenuOverlay({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label="Menu navigasi"
      style={{
        backgroundColor: 'var(--color-cream)',
        animation: 'mnFadeIn 0.25s ease-out',
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-5 shrink-0 relative z-10"
        style={{
          height: '68px',
          borderBottom: '1px solid color-mix(in srgb, var(--color-border-soft) 50%, transparent)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--color-brand-500)' }}
          >
            <span
              style={{ fontFamily: 'var(--font-serif)' }}
              className="text-base text-white font-bold"
            >
              A
            </span>
          </div>
          <span
            style={{ fontFamily: 'var(--font-serif)' }}
            className="text-[17px] font-semibold"
          >
            Acaranya.id
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="w-10 h-10 flex items-center justify-center rounded-full transition-colors relative z-20"
          style={{ backgroundColor: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)' }}
          aria-label="Tutup menu"
        >
          <X size={18} strokeWidth={2} className="pointer-events-none" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-center px-8 overflow-y-auto" style={{ marginTop: '-40px' }}>
        <div>
          {mobileNavigation.map((item, i) => (
            <a
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between py-3"
              onClick={onClose}
              style={{
                borderBottom: i < mobileNavigation.length - 1
                  ? '1px solid color-mix(in srgb, var(--color-border-soft) 40%, transparent)'
                  : 'none',
                animation: `mnSlideUp 0.3s ease-out ${i * 0.04}s both`,
              }}
            >
              <span
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", color: 'var(--color-text-primary)' }}
                className="text-2xl font-medium"
              >
                {item.label}
              </span>
              <ArrowUpRight size={16} style={{ color: 'var(--color-text-muted)', opacity: 0.3 }} />
            </a>
          ))}
        </div>
      </nav>

      {/* Bottom CTAs */}
      <div
        className="px-5 py-5 shrink-0"
        style={{
          borderTop: '1px solid color-mix(in srgb, var(--color-border-soft) 50%, transparent)',
        }}
      >
        <a
          href={ctaNavItem.href}
          className="flex items-center justify-center gap-2 w-full py-3.5 text-white text-[12px] font-semibold uppercase rounded-sm"
          style={{
            backgroundColor: 'var(--color-brand-900)',
            letterSpacing: '0.15em',
          }}
          onClick={onClose}
        >
          {ctaNavItem.label}
        </a>
        <a
          href={createWhatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-3 text-[12px] font-semibold uppercase rounded-sm mt-2.5"
          style={{
            border: '1px solid var(--color-border-soft)',
            color: 'var(--color-text-primary)',
            letterSpacing: '0.15em',
          }}
          onClick={onClose}
        >
          <WhatsAppIcon size={15} />
          Chat WhatsApp
        </a>
      </div>

      {/* Inline styles */}
      <style>{`
        @keyframes mnFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes mnSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollYRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      scrollYRef.current = window.scrollY;
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="p-2 -mr-2 transition-colors"
        style={{ color: 'var(--color-text-primary)' }}
        aria-label="Buka menu"
        id="mobile-menu-trigger"
      >
        <Menu size={22} strokeWidth={1.75} />
      </button>

      {/* Portal the overlay to document.body so it escapes any stacking context */}
      {mounted && isOpen && createPortal(
        <MenuOverlay onClose={handleClose} />,
        document.body
      )}
    </>
  );
}
