import React from 'react';
export function FounderNote() {
  return (
    <section className="py-20 bg-cream">
      <div className="max-w-2xl mx-auto px-6">
        <div className="border-t border-ink/10 pt-16 pb-4">
          <div className="flex items-start gap-5">
            <div className="flex-shrink-0 w-12 h-12 bg-white border border-ink/15 flex items-center justify-center">
              <span className="font-serif text-lg text-ink/70">AG</span>
            </div>
            <div>
              <div className="mb-4">
                <span className="text-sm font-bold text-ink">Anil Gorti</span>
                <span className="text-sm text-ink/40 font-medium">
                  {' '}
                  · Founder & Ex-NRI
                </span>
              </div>
              <div className="space-y-4 text-[15px] text-ink/70 font-medium leading-relaxed">
                <p>
                  "After 15 years in Silicon Valley, I moved my family back to
                  India. I expected the chaos; I didn't expect the total lack of
                  a support ecosystem for the 'logistics' of returning.
                </p>
                <p>
                  I spent months solving problems that should have taken days.
                  ReturnEase is the service I wish I had—a single point of
                  accountability for your soft landing."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}