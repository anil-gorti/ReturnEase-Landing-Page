import { siteConfig } from '../config/site';
import { trackEvent } from '../lib/analytics';
import { BrandLogo } from './BrandLogo';

type FooterProps = {
  onOpenContact: () => void;
};

export function Footer({ onOpenContact }: FooterProps) {
  return (
    <footer className="bg-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center md:text-left">
            <BrandLogo compact />
            <div className="text-ink/60 text-xs font-bold uppercase tracking-[0.16em] mt-2">
              Built for families moving back to India.
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-bold text-ink/60 uppercase tracking-wider">
            <button
              type="button"
              onClick={() => {
                onOpenContact();
                trackEvent('cta_click', {
                  location: 'footer',
                  cta: 'contact_us',
                });
              }}
              className="hover:text-amber-600 transition-colors">
              Contact Us
            </button>
            <a
              href={siteConfig.termsPath}
              onClick={() =>
                trackEvent('cta_click', {
                  location: 'footer',
                  cta: 'terms_of_service',
                })
              }
              className="hover:text-amber-600 transition-colors">
              Terms
            </a>
            <a
              href={siteConfig.privacyPath}
              onClick={() =>
                trackEvent('cta_click', {
                  location: 'footer',
                  cta: 'privacy_policy',
                })
              }
              className="hover:text-amber-600 transition-colors">
              Privacy Policy
            </a>
            <a
              href={siteConfig.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('cta_click', {
                  location: 'footer',
                  cta: 'linkedin',
                })
              }
              className="hover:text-amber-600 transition-colors">
              LinkedIn
            </a>
          </div>
        </div>

        <div className="pt-8 border-t-2 border-ink/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-bold text-ink/40 uppercase tracking-wider">
          <p className="text-center md:text-left max-w-2xl leading-relaxed">
            Disclaimer: Tax advisory provided in partnership with licensed CPAs.
            ReturnEase does not provide direct tax or legal counsel.
          </p>
          <p>© 2026 ReturnEase. Based in India.</p>
        </div>
      </div>
    </footer>);

}
