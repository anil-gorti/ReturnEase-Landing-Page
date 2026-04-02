import { motion } from 'framer-motion';
import {
  ArrowRight,
  FileText,
  CheckCircle2,
  Layout,
  Settings,
  Users,
  BookOpen } from
'lucide-react';
import { trackEvent } from '../lib/analytics';
export function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 overflow-hidden bg-cream border-b-2 border-ink">
      {/* Subtle Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px)',
          backgroundSize: '32px 32px'
        }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy & CTAs */}
          <motion.div
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="max-w-2xl">
            
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-50 border-2 border-ink text-amber-700 text-sm font-bold uppercase tracking-wider mb-8 shadow-solid-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse border border-ink"></span>
              ReturnEase for Returnees
            </div>

            <h1 className="text-4xl md:text-6xl leading-[1.15] mb-6 text-ink">
              Relocation Clarity for Families Moving Home to India.
            </h1>

            <p className="text-lg text-ink/80 mb-10 leading-relaxed font-medium">
              Don't crowdsource your life. Get a pre-sequenced execution plan
              for your move to Bengaluru, Hyderabad, or Pune.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#discovery"
                onClick={() =>
                  trackEvent('cta_click', {
                    location: 'hero',
                    cta: 'get_personalized_playbook',
                  })
                }
                className="group flex items-center justify-center gap-2 bg-amber-600 text-white px-6 py-3.5 font-bold border-2 border-ink shadow-solid hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-solid-sm transition-all">
                
                Get Personalized Playbook
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#protocol"
                onClick={() =>
                  trackEvent('cta_click', {
                    location: 'hero',
                    cta: 'view_sample_protocol',
                  })
                }
                className="flex items-center justify-center gap-2 bg-white text-ink px-6 py-3.5 font-bold border-2 border-ink shadow-solid hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-solid-sm transition-all">
                
                View Sample Protocol
              </a>
            </div>
          </motion.div>

          {/* Right: Notion-style UI Mockup */}
          <motion.div
            initial={{
              opacity: 0,
              x: 20,
              rotateY: 10
            }}
            animate={{
              opacity: 1,
              x: 0,
              rotateY: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="relative perspective-1000">
            
            <div className="bg-white border-2 border-ink shadow-solid overflow-hidden flex flex-col h-[480px]">
              {/* Mockup Header */}
              <div className="h-12 border-b-2 border-ink flex items-center px-4 gap-4 bg-cream">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full border-2 border-ink bg-white"></div>
                  <div className="w-3 h-3 rounded-full border-2 border-ink bg-white"></div>
                  <div className="w-3 h-3 rounded-full border-2 border-ink bg-white"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white border-2 border-ink px-3 py-1 text-xs text-ink font-bold uppercase tracking-wider flex items-center gap-2 shadow-solid-sm">
                    <BookOpen className="w-3 h-3" />
                    Your India Return Plan
                  </div>
                </div>
              </div>

              {/* Mockup Body */}
              <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-48 border-r-2 border-ink bg-cream p-4 hidden sm:block">
                  <div className="text-xs font-bold text-ink/50 mb-3 uppercase tracking-wider">
                    Phases
                  </div>
                  <div className="space-y-1">
                    {[
                    {
                      icon: FileText,
                      text: '1. Planning',
                      active: true
                    },
                    {
                      icon: BookOpen,
                      text: '2. Education'
                    },
                    {
                      icon: Layout,
                      text: '3. Wealth'
                    },
                    {
                      icon: Settings,
                      text: '4. Logistics'
                    },
                    {
                      icon: CheckCircle2,
                      text: '5. The Landing'
                    },
                    {
                      icon: Users,
                      text: '6. The Home'
                    },
                    {
                      icon: Users,
                      text: '7. Integration'
                    }].
                    map((item, i) =>
                    <div
                      key={i}
                      className={`flex items-center gap-2 px-2 py-1.5 text-sm font-medium ${item.active ? 'bg-amber-100 text-ink border-2 border-ink shadow-solid-sm' : 'text-ink/60'}`}>
                      
                        <item.icon className="w-3.5 h-3.5" />
                        {item.text}
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 sm:p-8 bg-white overflow-hidden relative">
                  <div className="max-w-md">
                    <h2 className="text-2xl font-serif text-ink mb-2">
                      Phase 1: Planning & Audit
                    </h2>
                    <p className="text-sm text-ink/60 font-medium mb-6">
                      Complete these tasks before T-Minus 6 Months.
                    </p>

                    <div className="space-y-3">
                      {[
                      {
                        title: 'RNOR Strategy Document',
                        status: 'Done',
                        color: 'bg-green-100 text-green-800 border-green-800'
                      },
                      {
                        title: 'OCI Card Application',
                        status: 'In Progress',
                        color: 'bg-amber-100 text-amber-800 border-amber-800'
                      },
                      {
                        title: 'Transfer of Residence (TR) Prep',
                        status: 'To Do',
                        color: 'bg-cream text-ink/60 border-ink/30'
                      }].
                      map((task, i) =>
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 border-2 border-ink bg-cream">
                        
                          <div className="flex items-center gap-3">
                            <div
                            className={`w-4 h-4 rounded-none border-2 ${task.status === 'Done' ? 'bg-amber-500 border-ink' : 'border-ink bg-white'}`}>
                            
                              {task.status === 'Done' &&
                            <CheckCircle2 className="w-4 h-4 text-ink -ml-[2px] -mt-[2px]" />
                            }
                            </div>
                            <span className="text-sm font-bold text-ink">
                              {task.title}
                            </span>
                          </div>
                          <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 border-2 ${task.color}`}>
                          
                            {task.status}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Fade out bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Trust Bar */}
      <div className="mt-20 border-t-2 border-ink bg-cream py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 text-sm font-bold text-ink/50 uppercase tracking-widest">
          <span>Bengaluru</span>
          <span className="hidden sm:inline">•</span>
          <span>Hyderabad</span>
          <span className="hidden sm:inline">•</span>
          <span>Pune</span>
          <span className="hidden sm:inline">•</span>
          <span>NCR</span>
        </div>
      </div>
    </section>);

}
