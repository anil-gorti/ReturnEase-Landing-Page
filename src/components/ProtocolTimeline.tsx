import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Target, Clock } from 'lucide-react';
const phaseGroups = [
{
  label: 'Before Move',
  timeframe: 'T-6 months to departure',
  phases: [
  {
    num: 1,
    title: 'Planning',
    outcome: 'RNOR Strategy & Document Audit',
    details:
    'We audit your current visa status, initiate OCI processing, and map out your RNOR (Resident but Not Ordinarily Resident) tax shield timeline to protect your global income.'
  },
  {
    num: 2,
    title: 'Education',
    outcome: 'School-to-Commute Heatmap',
    details:
    'Navigate the narrow Indian metro admission windows. We provide a data-driven shortlist of schools based on curriculum preference and map them against potential office hubs.'
  },
  {
    num: 3,
    title: 'Wealth',
    outcome: '401k/IRA Compliance Roadmap',
    details:
    'Step-by-step guidance on managing US retirement accounts, setting up NRE/NRO banking structures, and optimizing your cross-border asset transfer.'
  },
  {
    num: 4,
    title: 'Logistics',
    outcome: 'Customs-Cleared Shipping Plan',
    details:
    'A definitive guide on what to ship vs. sell (110v vs 220v), navigating Indian customs duties, and vetting reliable international movers.'
  }]

},
{
  label: 'Landing Week',
  timeframe: 'Days 1–7 in India',
  phases: [
  {
    num: 5,
    title: 'The Landing',
    outcome: 'SIM/Aadhaar/Bank KYC in 5 days',
    details:
    "We break the 'No-SIM-without-Aadhaar' loop. Execute our pre-sequenced protocol to get your local mobile number, update Aadhaar, and finalize bank KYC within your first week."
  }]

},
{
  label: 'First 90 Days',
  timeframe: 'Settling in & integration',
  phases: [
  {
    num: 6,
    title: 'The Home',
    outcome: 'Vetted Community Shortlist & Domestic Help',
    details:
    'Skip the broker spam. Get curated listings in top-tier gated communities, guidance on rental agreements, and protocols for hiring reliable domestic staff.'
  },
  {
    num: 7,
    title: 'Integration',
    outcome: 'Local Professional Network Access',
    details:
    "Manage the 'India Pace' effectively. We plug you into curated networks of fellow returnees and local product leaders to accelerate your professional soft landing."
  }]

}];

export function ProtocolTimeline() {
  const [activePhase, setActivePhase] = useState<number | null>(1);
  return (
    <section id="protocol" className="py-24 bg-cream border-b-2 border-ink">
      <div className="max-w-3xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl text-ink mb-4">
            The 7-Phase Protocol
          </h2>
          <p className="text-lg text-ink/70 font-medium">
            A structured execution plan from decision to integration.
          </p>
        </div>

        <div className="space-y-10">
          {phaseGroups.map((group) =>
          <div key={group.label}>
              {/* Group Header */}
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  {group.label}
                </span>
                <span className="text-xs font-medium text-ink/40">
                  — {group.timeframe}
                </span>
                <div className="flex-1 h-px bg-ink/10"></div>
              </div>

              <div className="space-y-3">
                {group.phases.map((phase) => {
                const isActive = activePhase === phase.num;
                const detailsId = `phase-details-${phase.num}`;
                return (
                  <div
                    key={phase.num}
                    className={`bg-white border-2 transition-all duration-200 overflow-hidden ${isActive ? 'border-ink shadow-solid' : 'border-ink/15 hover:border-ink/40'}`}>
                    
                      <button
                      type="button"
                      onClick={() =>
                      setActivePhase(isActive ? null : phase.num)
                      }
                      aria-expanded={isActive}
                      aria-controls={detailsId}
                      className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none gap-4">
                      
                        <div className="flex items-center gap-4 min-w-0">
                          <div
                          className={`flex-shrink-0 flex items-center justify-center w-7 h-7 border-2 border-ink text-xs font-bold ${isActive ? 'bg-amber-500 text-ink' : 'bg-cream text-ink/70'}`}>
                          
                            {phase.num}
                          </div>
                          <h3
                          className={`text-lg font-serif truncate ${isActive ? 'text-ink' : 'text-ink/80'}`}>
                          
                            {phase.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-cream border border-ink/15 text-[11px] font-bold uppercase tracking-wider text-ink/60">
                            <Target className="w-3 h-3 text-amber-600" />
                            {phase.outcome}
                          </div>
                          <ChevronDown
                          className={`w-4 h-4 text-ink/50 transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                        
                        </div>
                      </button>

                      <AnimatePresence>
                        {isActive &&
                      <motion.div
                        id={detailsId}
                        initial={{
                          height: 0,
                          opacity: 0
                        }}
                        animate={{
                          height: 'auto',
                          opacity: 1
                        }}
                        exit={{
                          height: 0,
                          opacity: 0
                        }}
                        transition={{
                          duration: 0.3,
                          ease: 'easeInOut'
                        }}>
                        
                            <div className="px-5 pb-5 pt-1 ml-11 border-t border-ink/10">
                              <div className="md:hidden flex items-center gap-1.5 px-2.5 py-1.5 bg-cream border border-ink/15 text-[11px] font-bold uppercase tracking-wider text-ink/60 mb-3 inline-flex">
                                <Target className="w-3 h-3 text-amber-600" />
                                {phase.outcome}
                              </div>
                              <p className="text-ink/75 font-medium leading-relaxed text-[15px]">
                                {phase.details}
                              </p>
                            </div>
                          </motion.div>
                      }
                      </AnimatePresence>
                    </div>);

              })}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}
