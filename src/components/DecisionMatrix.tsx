import { useState } from 'react';
import { MapPin, GraduationCap, ArrowRight, Info } from 'lucide-react';
import { trackEvent } from '../lib/analytics';
const locations = [
'Whitefield',
'Sarjapur',
'HSR Layout',
'Indiranagar',
'Electronic City'];

const schoolTypes = ['International (IB)', 'CBSE/ICSE', 'Montessori'];
const communityTiers = [
{
  label: 'Premium Gated',
  desc: 'Embassy, Prestige, Brigade'
},
{
  label: 'Mid-Range',
  desc: 'Sobha, Salarpuria, Puravankara'
},
{
  label: 'Emerging',
  desc: 'New developments, standalone'
}];

export function DecisionMatrix() {
  const [selectedLoc, setSelectedLoc] = useState(locations[0]);
  const [selectedSchool, setSelectedSchool] = useState(schoolTypes[0]);
  return (
    <section className="py-24 bg-cream border-b-2 border-ink">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-12 text-center max-w-2xl mx-auto">
          <div className="text-amber-600 font-bold text-sm tracking-wider uppercase mb-3">
            Artifact Preview
          </div>
          <h2 className="text-4xl md:text-5xl text-ink mb-4">
            The Decision Matrix
          </h2>
          <p className="text-lg text-ink/70 font-medium">
            We solve the Distance Paradox before you sign a lease.
          </p>
        </div>

        <div className="bg-white border-2 border-ink shadow-solid overflow-hidden">
          {/* Toolbar */}
          <div className="px-5 py-3 border-b border-ink/10 bg-cream flex items-center justify-between">
            <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-ink/40">
              <div className="w-2 h-2 bg-amber-500 border border-ink"></div>
              School × Commute Analysis
            </div>
            <div className="flex items-center gap-1 text-[11px] text-ink/30 font-medium">
              <Info className="w-3 h-3" />
              Sample data
            </div>
          </div>

          {/* Controls */}
          <div className="px-6 py-5 border-b-2 border-ink bg-white flex flex-col sm:flex-row gap-5 items-end">
            <div className="flex-1 w-full">
              <label
                htmlFor="office-location"
                className="block text-[11px] font-bold text-ink/50 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <MapPin className="w-3 h-3" /> Office Location
              </label>
              <select
                id="office-location"
                className="w-full bg-cream border-2 border-ink px-4 py-2.5 text-sm font-bold text-ink focus:outline-none focus:border-amber-600 transition-colors appearance-none"
                value={selectedLoc}
                onChange={(e) => setSelectedLoc(e.target.value)}>
                
                {locations.map((loc) =>
                <option key={loc} value={loc}>
                    {loc}
                  </option>
                )}
              </select>
            </div>
            <div className="flex-1 w-full">
              <label
                htmlFor="school-preference"
                className="block text-[11px] font-bold text-ink/50 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <GraduationCap className="w-3 h-3" /> School Preference
              </label>
              <select
                id="school-preference"
                className="w-full bg-cream border-2 border-ink px-4 py-2.5 text-sm font-bold text-ink focus:outline-none focus:border-amber-600 transition-colors appearance-none"
                value={selectedSchool}
                onChange={(e) => setSelectedSchool(e.target.value)}>
                
                {schoolTypes.map((type) =>
                <option key={type} value={type}>
                    {type}
                  </option>
                )}
              </select>
            </div>
          </div>

          {/* Heatmap Grid */}
          <div className="p-6 overflow-x-auto">
            <div className="min-w-[640px]">
              {/* Header Row */}
              <div className="grid grid-cols-[180px_1fr_1fr_1fr] gap-3 mb-3">
                <div className="text-[10px] font-bold text-ink/30 uppercase tracking-widest px-1">
                  Community Type
                </div>
                {communityTiers.map((tier) =>
                <div key={tier.label} className="text-center">
                    <div className="text-[11px] font-bold text-ink/70 uppercase tracking-wider">
                      {tier.label}
                    </div>
                    <div className="text-[10px] text-ink/30 font-medium">
                      {tier.desc}
                    </div>
                  </div>
                )}
              </div>

              {/* Data Rows */}
              <div className="space-y-2">
                {['Primary Hub', 'Secondary Hub', 'Peripheral Zone'].map(
                  (hub, rowIndex) =>
                  <div
                    key={hub}
                    className="grid grid-cols-[180px_1fr_1fr_1fr] gap-3 items-stretch">
                    
                      <div className="flex items-center text-sm font-bold text-ink/70 px-1">
                        {hub}
                      </div>
                      {[0, 1, 2].map((colIndex) => {
                      const val =
                      (selectedLoc.length +
                      selectedSchool.length +
                      rowIndex +
                      colIndex) %
                      3;
                      const status =
                      val === 0 ?
                      'optimal' :
                      val === 1 ?
                      'moderate' :
                      'warning';
                      const time =
                      val === 0 ? '15–25m' : val === 1 ? '35–45m' : '60m+';
                      const label =
                      val === 0 ?
                      'Optimal' :
                      val === 1 ?
                      'Manageable' :
                      'Caution';
                      const styles = {
                        optimal:
                        'bg-green-50 border-green-700/30 text-green-800',
                        moderate:
                        'bg-amber-50 border-amber-600/30 text-amber-800',
                        warning: 'bg-red-50 border-red-600/30 text-red-800'
                      };
                      const dotStyles = {
                        optimal: 'bg-green-500',
                        moderate: 'bg-amber-500',
                        warning: 'bg-red-500'
                      };
                      return (
                        <div
                          key={colIndex}
                          className={`border-2 p-3 flex flex-col items-center justify-center gap-0.5 ${styles[status]}`}>
                          
                            <span className="text-lg font-bold leading-tight">
                              {time}
                            </span>
                            <div className="flex items-center gap-1">
                              <div
                              className={`w-1.5 h-1.5 rounded-full ${dotStyles[status]}`}>
                            </div>
                              <span className="text-[10px] font-bold uppercase tracking-wider">
                                {label}
                              </span>
                            </div>
                          </div>);

                    })}
                    </div>

                )}
              </div>
            </div>
          </div>

          <div className="bg-cream px-6 py-4 border-t-2 border-ink flex items-center justify-between">
            <span className="text-[11px] text-ink/40 font-medium">
              Based on avg. school proximity to {selectedLoc} for{' '}
              {selectedSchool}
            </span>
            <a
              href="#discovery"
              onClick={() =>
                trackEvent('cta_click', {
                  location: 'decision_matrix',
                  cta: 'get_personalized_matrix',
                })
              }
              className="inline-flex items-center gap-1.5 text-sm font-bold text-amber-600 hover:text-amber-700 transition-colors">
              
              Get your personalized matrix{' '}
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>);

}
