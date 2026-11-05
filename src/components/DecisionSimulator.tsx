import React, { useState } from 'react';
import { Sliders, RotateCcw, TrendingUp, ShieldCheck } from 'lucide-react';

interface CriteriaWeight {
  id: string;
  label: string;
  weight: number; // 0 to 10
  description: string;
}

export const DecisionSimulator: React.FC = () => {
  const [weights, setWeights] = useState<CriteriaWeight[]>([
    { id: 'health', label: 'Mental Peace & Autonomy', weight: 8, description: 'Reducing daily anxiety and regaining personal control.' },
    { id: 'financial', label: 'Financial Security & Upside', weight: 7, description: 'Preserving cash flow and avoiding immediate liquidity shocks.' },
    { id: 'trajectory', label: 'Long-Term Growth & Trajectory', weight: 6, description: 'Career capital, reputation, and 5-year compounding.' },
    { id: 'harmony', label: 'Relational Stability & Peace', weight: 5, description: 'Preventing permanent family or team ruptures.' },
  ]);

  const updateWeight = (id: string, val: number) => {
    setWeights((prev) => prev.map((w) => (w.id === id ? { ...w, weight: val } : w)));
  };

  const handleReset = () => {
    setWeights([
      { id: 'health', label: 'Mental Peace & Autonomy', weight: 8, description: 'Reducing daily anxiety and regaining personal control.' },
      { id: 'financial', label: 'Financial Security & Upside', weight: 7, description: 'Preserving cash flow and avoiding immediate liquidity shocks.' },
      { id: 'trajectory', label: 'Long-Term Growth & Trajectory', weight: 6, description: 'Career capital, reputation, and 5-year compounding.' },
      { id: 'harmony', label: 'Relational Stability & Peace', weight: 5, description: 'Preventing permanent family or team ruptures.' },
    ]);
  };

  // Base raw scores for 3 archetypal paths (0 to 10 across the 4 criteria)
  const paths = [
    {
      id: 'path-a',
      title: 'Path A: Measured Staged Transition',
      description: 'Preserving baseline stability while quietly setting up an external exit or boundaries.',
      scores: { health: 7, financial: 9, trajectory: 6, harmony: 8 },
      downsideRisk: 'Risk of prolonged low-grade fatigue while managing dual agendas.',
      hedgingRule: 'Set a hard calendar tripwire: if no progress in 60 days, transition immediately to Path C.',
    },
    {
      id: 'path-b',
      title: 'Path B: Assertive Direct Negotiation',
      description: 'Presenting a structured, non-negotiable proposal to restructure the current dynamic.',
      scores: { health: 6, financial: 8, trajectory: 9, harmony: 5 },
      downsideRisk: 'Risk of immediate defensive friction or pushback from counterparties.',
      hedgingRule: 'Secure a verifiable BATNA (external offer or fallback) before initiating the meeting.',
    },
    {
      id: 'path-c',
      title: 'Path C: Decisive Clean Departure',
      description: 'Terminating the arrangement immediately to recover full cognitive focus.',
      scores: { health: 10, financial: 4, trajectory: 7, harmony: 4 },
      downsideRisk: 'Near-term financial burn and temporary status ambiguity.',
      hedgingRule: 'Maintain an untouchable 4-month liquidity runway before executing departure.',
    },
  ];

  // Calculate weighted utility score
  const totalWeight = weights.reduce((acc, curr) => acc + curr.weight, 0) || 1;

  const scoredPaths = paths
    .map((p) => {
      const weightedSum = weights.reduce((acc, w) => {
        const raw = (p.scores as any)[w.id] || 0;
        return acc + raw * w.weight;
      }, 0);
      const normalizedScore = Math.round((weightedSum / (totalWeight * 10)) * 100);
      return { ...p, score: normalizedScore };
    })
    .sort((a, b) => b.score - a.score);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
          Decision Theory & Utility Modeling
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mt-1 mb-2">
          Multi-Criteria Decision Analysis (MCDA) Simulator
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed max-w-2xl">
          Calibrate what matters most to your current life season. The simulator calculates real-time
          weighted expected utility scores across standard strategic pathways.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sliders Column */}
        <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-stone-100">
            <div className="flex items-center gap-2 text-sm font-bold text-stone-900">
              <Sliders className="w-4 h-4 text-emerald-800" />
              <span>Calibrate Priorities</span>
            </div>
            <button
              onClick={handleReset}
              className="cursor-pointer text-xs text-stone-500 hover:text-stone-900 flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          <div className="space-y-5">
            {weights.map((w) => (
              <div key={w.id}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-stone-800">{w.label}</span>
                  <span className="font-mono text-emerald-800 font-bold">{w.weight} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={w.weight}
                  onChange={(e) => updateWeight(w.id, parseInt(e.target.value))}
                  className="w-full accent-emerald-800 cursor-pointer h-1.5 bg-stone-200 rounded-lg"
                />
                <p className="text-[11px] text-stone-500 mt-1">{w.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Results Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 mb-2">
            Calculated Decision Utility Rankings
          </div>

          {scoredPaths.map((p, idx) => (
            <div
              key={p.id}
              className={`p-6 rounded-xl border transition-all ${
                idx === 0
                  ? 'bg-white border-emerald-700/60 shadow-xs ring-1 ring-emerald-700/20'
                  : 'bg-white border-stone-200 opacity-90'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-stone-900">{p.title}</h3>
                  {idx === 0 && (
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800">
                      Top Match for Your Priorities
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <span className="text-2xl font-mono font-bold text-stone-900">{p.score}</span>
                  <span className="text-xs text-stone-400 font-mono"> / 100</span>
                </div>
              </div>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">{p.description}</p>

              {/* Progress Bar */}
              <div className="w-full bg-stone-100 rounded-full h-2 mb-4 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    idx === 0 ? 'bg-emerald-800' : 'bg-stone-500'
                  }`}
                  style={{ width: `${p.score}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-3 border-t border-stone-100">
                <div className="p-2.5 bg-stone-50 rounded border border-stone-200/80">
                  <span className="font-semibold text-stone-800 block mb-0.5">Downside Vulnerability:</span>
                  <span className="text-stone-600">{p.downsideRisk}</span>
                </div>
                <div className="p-2.5 bg-emerald-50/50 rounded border border-emerald-200/70">
                  <span className="font-semibold text-emerald-950 block mb-0.5">Pre-Mortem Hedge:</span>
                  <span className="text-stone-700">{p.hedgingRule}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
