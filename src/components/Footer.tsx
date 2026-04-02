import React from 'react';
export function Footer() {
  return (
    <footer className="bg-cream py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div className="text-center md:text-left">
            <div className="font-serif text-2xl text-ink mb-1">ReturnEase</div>
            <div className="text-ink/60 text-sm font-bold uppercase tracking-wider">
              The Operating System for NRIs.
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm font-bold text-ink/60 uppercase tracking-wider">
            <a href="#" className="hover:text-amber-600 transition-colors">
              Contact Us
            </a>
            <a href="#" className="hover:text-amber-600 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-amber-600 transition-colors">
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