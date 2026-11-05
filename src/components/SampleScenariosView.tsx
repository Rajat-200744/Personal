import React from 'react';
import { SAMPLE_SCENARIOS } from '../data/sampleScenarios';
import { ScenarioInput } from '../types';
import { ArrowRight, Sparkles } from 'lucide-react';

interface SampleScenariosViewProps {
  onSelectScenario: (scenario: ScenarioInput) => void;
}

export const SampleScenariosView: React.FC<SampleScenariosViewProps> = ({ onSelectScenario }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
          Real-World Case Studies
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mt-1 mb-2">
          Explore Pre-Calibrated Dilemma Presets
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
          Complex scenarios often feel unique and isolating, but human relational and decision patterns
          frequently repeat. Review these real-world cases and load them directly into the advisor to inspect
          their evidence-backed diagnoses.
        </p>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {SAMPLE_SCENARIOS.map((item, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-all shadow-xs"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-stone-500 mb-2">
                <span>{item.tag}</span>
                <span className="capitalize">{item.data.urgency} urgency</span>
              </div>

              <h2 className="text-lg font-bold text-stone-900 mb-2">{item.data.title}</h2>

              <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-3">
                {item.data.description}
              </p>

              <div className="space-y-2 mb-4 text-xs">
                <div className="p-2.5 bg-stone-50 rounded border border-stone-200/80">
                  <span className="font-semibold text-stone-800">Stakeholders: </span>
                  <span className="text-stone-600">{item.data.stakeholders}</span>
                </div>

                <div className="p-2.5 bg-stone-50 rounded border border-stone-200/80">
                  <span className="font-semibold text-stone-800">Core Stakes / Constraints: </span>
                  <span className="text-stone-600">{item.data.constraints}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-xs text-stone-400 font-mono">Case #{idx + 1}</span>
              <button
                onClick={() => onSelectScenario(item.data)}
                className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-stone-900 hover:bg-emerald-900 rounded-lg transition-colors shadow-2xs"
              >
                <span>Analyze This Case</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
