import { ArrowRight, CalendarDays } from 'lucide-react';
import { siteConfig } from '../config/site';
import { trackEvent } from '../lib/analytics';
import { BrandLogo } from './BrandLogo';

export function SiteHeader() {
  const bookingLink = siteConfig.bookingUrl.startsWith('mailto:')
    ? `mailto:${siteConfig.contactEmail}`
    : siteConfig.bookingUrl;
  const isExternalBookingLink = bookingLink.startsWith('http');

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
          <a
            href={bookingLink}
            target={isExternalBookingLink ? '_blank' : undefined}
            rel={isExternalBookingLink ? 'noopener noreferrer' : undefined}
            onClick={() =>
              trackEvent('cta_click', {
                location: 'header',
                cta: 'book_call',
              })
            }
            className="inline-flex items-center gap-2 bg-amber-600 text-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider border-2 border-ink shadow-solid hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-solid-sm transition-all">
            <CalendarDays className="w-4 h-4" />
            Book Call
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        <a
          href="#discovery"
          onClick={() =>
            trackEvent('cta_click', {
              location: 'header_mobile',
              cta: 'start_now',
            })
          }
          className="md:hidden inline-flex items-center gap-1.5 bg-amber-600 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider border-2 border-ink shadow-solid-sm">
          Start
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </header>
  );
}
