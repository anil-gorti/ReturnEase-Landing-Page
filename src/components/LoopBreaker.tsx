import {
  RefreshCcw,
  Smartphone,
  Home,
  Check } from
'lucide-react';
export function LoopBreaker() {
  return (
    <section className="py-24 bg-ink text-cream border-b-2 border-ink overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: The Problem */}
          <div>
            <div className="text-amber-500 font-bold text-[11px] tracking-widest uppercase mb-4">
              The Loop Breaker
            </div>
            <h2 className="text-4xl md:text-5xl text-cream mb-6 font-serif">
              The Documentation Deadlock
            </h2>

            <div className="border-2 border-amber-500/20 p-6 mb-8 relative">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cream/5">
                <RefreshCcw className="w-16 h-16" />
              </div>
              <p className="text-lg text-cream/85 font-medium text-center relative z-10 leading-relaxed">
                "No SIM without Aadhaar.
                <br />
                No Aadhaar update without Mobile OTP."
              </p>
            </div>

            <p className="text-cream/50 font-medium leading-relaxed text-[15px]">
              This single dependency loop delays most returning NRIs by 3–4
              weeks. Our pre-sequenced protocol breaks the loop in 5 days.
            </p>
          </div>

          {/* Right: The Protocol Flowchart */}
          <div className="relative">
            <div className="space-y-4 relative z-10">
              {/* Step 1 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 border-2 border-cream/30 flex items-center justify-center text-amber-500 bg-ink">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <div className="w-px h-8 bg-cream/15 mt-2"></div>
                </div>
                <div className="border border-cream/15 p-4 flex-1 bg-ink">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-cream/40 uppercase tracking-widest">
                      Step 1
                    </span>
                    <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">
                      Day 1
                    </span>
                  </div>
                  <h3 className="text-cream font-bold text-base mb-1">
                    Temporary SIM
                  </h3>
                  <p className="text-sm text-cream/50 font-medium">
                    Acquired via OCI or Foreign Passport upon landing.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 border-2 border-cream/30 flex items-center justify-center text-amber-500 bg-ink">
                    <Home className="w-5 h-5" />
                  </div>
                  <div className="w-px h-8 bg-cream/15 mt-2"></div>
                </div>
                <div className="border border-cream/15 p-4 flex-1 bg-ink">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-cream/40 uppercase tracking-widest">
                      Step 2
                    </span>
                    <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">
                      Day 2–3
                    </span>
                  </div>
                  <h3 className="text-cream font-bold text-base mb-1">
                    Aadhaar Update
                  </h3>
                  <p className="text-sm text-cream/50 font-medium">
                    Address updated using Gated Community Rental Agreement.
                  </p>
                </div>
              </div>

              {/* Step 3 — Highlighted */}
              <div className="flex gap-4 items-start">
                <div className="flex flex-col items-center flex-shrink-0">
                  <div className="w-10 h-10 border-2 border-amber-500 flex items-center justify-center text-ink bg-amber-500">
                    <Check className="w-5 h-5" strokeWidth={3} />
                  </div>
                </div>
                <div className="border-2 border-amber-500 p-4 flex-1 bg-amber-500/5">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest">
                      Step 3
                    </span>
                    <span className="text-[10px] font-bold text-amber-500/60 uppercase tracking-widest">
                      Day 4–5
                    </span>
                  </div>
                  <h3 className="text-cream font-bold text-base mb-1">
                    Finalize Bank KYC
                  </h3>
                  <p className="text-sm text-amber-200/60 font-medium">
                    NRE/NRO accounts fully activated and compliant.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

}
