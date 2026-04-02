import React from 'react';
import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
const comparisonData = [
{
  feature: 'Approach',
  agents: 'Transactional',
  forums: 'Emotional / Anecdotal',
  returnease: 'Owner-aligned'
},
{
  feature: 'Speed',
  agents: 'Slow (Vendor dependent)',
  forums: '6 months of trial & error',
  returnease: 'Setup in 30 Days'
},
{
  feature: 'Deliverable',
  agents: 'PDF Brochures',
  forums: 'Outdated Posts',
  returnease: 'Notion-based Workspace'
},
{
  feature: 'System',
  agents: 'Ad-hoc fixes',
  forums: 'Crowdsourced guesses',
  returnease: 'Pre-sequenced Protocol'
}];

export function Differentiator() {
  return (
    <section className="py-24 bg-cream border-b-2 border-ink">
      <div className="max-w-5xl mx-auto px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl text-ink mb-4">
            Why ReturnEase?
          </h2>
          <p className="text-lg text-ink/70 font-medium">
            Built by Product Leaders, for Global Indians.
          </p>
        </div>

        <div className="bg-white border-2 border-ink shadow-solid overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="bg-cream border-b-2 border-ink">
                <th className="p-6 text-sm font-bold text-ink/60 uppercase tracking-wider w-1/4">
                  Dimension
                </th>
                <th className="p-6 text-lg font-serif text-ink w-1/4">
                  Relocation Agents
                </th>
                <th className="p-6 text-lg font-serif text-ink w-1/4">
                  Forums / Blogs
                </th>
                <th className="p-6 text-lg font-serif text-amber-800 bg-amber-50 w-1/4 border-l-2 border-ink">
                  ReturnEase
                </th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-ink/10">
              {comparisonData.map((row, index) =>
              <tr key={index} className="hover:bg-cream/50 transition-colors">
                  <td className="p-6 text-sm font-bold text-ink">
                    {row.feature}
                  </td>
                  <td className="p-6 text-sm text-ink/70 font-medium">
                    <div className="flex items-center gap-2">
                      <MinusCircle className="w-4 h-4 text-ink/40 shrink-0" />
                      {row.agents}
                    </div>
                  </td>
                  <td className="p-6 text-sm text-ink/70 font-medium">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-500 shrink-0" />
                      {row.forums}
                    </div>
                  </td>
                  <td className="p-6 text-sm font-bold text-ink bg-amber-50 border-l-2 border-ink">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
                      {row.returnease}
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>);

}