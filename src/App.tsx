import { useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { ContactFormModal } from './components/ContactFormModal';
import { SiteHeader } from './components/SiteHeader';
import { ProtocolTimeline } from './components/ProtocolTimeline';
import { DecisionMatrix } from './components/DecisionMatrix';
import { LoopBreaker } from './components/LoopBreaker';
import { Differentiator } from './components/Differentiator';
import { DiscoveryForm } from './components/DiscoveryForm';
import { FounderNote } from './components/FounderNote';
import { Footer } from './components/Footer';
export function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  return (
    <div
      id="top"
      className="min-h-screen bg-cream font-sans text-ink selection:bg-amber-500 selection:text-white">
      <SiteHeader onOpenContact={() => setIsContactModalOpen(true)} />
      <HeroSection />
      <ProtocolTimeline />
      <DecisionMatrix />
      <LoopBreaker />
      <Differentiator />
      <DiscoveryForm />
      <FounderNote />
      <Footer onOpenContact={() => setIsContactModalOpen(true)} />
      <ContactFormModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>);

}
