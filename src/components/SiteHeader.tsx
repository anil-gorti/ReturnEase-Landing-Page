import { ArrowRight, MessageSquare } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
import { BrandLogo } from './BrandLogo';

type SiteHeaderProps = {
  onOpenContact: () => void;
};

export function SiteHeader({ onOpenContact }: SiteHeaderProps) {

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="min-w-0"
          onClick={() =>
            trackEvent('cta_click', {
              location: 'header',
              cta: 'brand_logo',
            })
          }>
          <BrandLogo compact />
        </a>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="#protocol"
            onClick={() =>
              trackEvent('cta_click', {
                location: 'header',
                cta: 'nav_protocol',
              })
            }
            className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-ink/70 hover:text-ink border border-ink/15 hover:border-ink/40 transition-colors">
            Protocol
          </a>
          <a
            href="#discovery"
            onClick={() =>
              trackEvent('cta_click', {
                location: 'header',
                cta: 'nav_discovery',
              })
            }
            className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-ink/70 hover:text-ink border border-ink/15 hover:border-ink/40 transition-colors">
            Discovery
          </a>
          <button
            type="button"
            onClick={() => {
              onOpenContact();
              trackEvent('cta_click', {
                location: 'header',
                cta: 'contact_us',
              });
            }}
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider border-2 border-ink shadow-solid hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-solid-sm transition-all">
            <MessageSquare className="w-4 h-4" />
            Contact Us
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <button
          type="button"
          onClick={() => {
            onOpenContact();
            trackEvent('cta_click', {
              location: 'header_mobile',
              cta: 'contact_us',
            });
          }}
          className="md:hidden inline-flex items-center gap-1.5 bg-amber-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-ink shadow-solid-sm">
          Contact Us
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </header>
  );
}
