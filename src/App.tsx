import { HeroSection } from './components/HeroSection';
import { SiteHeader } from './components/SiteHeader';
import { ProtocolTimeline } from './components/ProtocolTimeline';
import { DecisionMatrix } from './components/DecisionMatrix';
import { LoopBreaker } from './components/LoopBreaker';
import { Differentiator } from './components/Differentiator';
import { DiscoveryForm } from './components/DiscoveryForm';
import { FounderNote } from './components/FounderNote';
import { Footer } from './components/Footer';
export function App() {
  return (
    <div
      id="top"
      className="min-h-screen bg-cream font-sans text-ink selection:bg-amber-500 selection:text-white">
      <SiteHeader />
      <HeroSection />
      <ProtocolTimeline />
      <DecisionMatrix />
      <LoopBreaker />
      <Differentiator />
      <DiscoveryForm />
      <FounderNote />
      <Footer />
    </div>);

}
