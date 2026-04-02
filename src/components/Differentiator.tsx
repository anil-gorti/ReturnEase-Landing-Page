import { CheckCircle2, XCircle, MinusCircle } from 'lucide-react';
const comparisonData = [
{
  feature: 'Approach',
  agents: 'Transactional',
  forums: 'Emotional / Anecdotal',
  returnease: 'Single accountable partner'
},
{
  feature: 'Speed',
  agents: 'Slow (Vendor dependent)',
  forums: '6 months of trial & error',
  returnease: 'Execution plan in 10 days'
},
{
  feature: 'Deliverable',
  agents: 'PDF Brochures',
  forums: 'Outdated Posts',
  returnease: 'Execution workspace + checklists'
},
{
  feature: 'System',
  agents: 'Ad-hoc fixes',
  forums: 'Crowdsourced guesses',
  returnease: 'Dependency-aware relocation protocol'
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
            One integrated relocation command center for tax, school, housing, and
            first-90-day execution.
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
