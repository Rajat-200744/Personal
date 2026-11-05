import React, { useState } from 'react';
import { Sparkles, Brain, CheckCircle2, RotateCcw, AlertCircle } from 'lucide-react';

interface Distortion {
  id: string;
  name: string;
  description: string;
  example: string;
}

const COMMON_DISTORTIONS: Distortion[] = [
  {
    id: 'catastrophizing',
    name: 'Catastrophizing',
    description: 'Anticipating the absolute worst possible outcome while drastically underestimating your ability to cope.',
    example: '"If I negotiate, they will rescind the offer, blackball me, and I will be homeless."',
  },
  {
    id: 'mind-reading',
    name: 'Mind Reading',
    description: 'Assuming you know what others are thinking without concrete behavioral proof.',
    example: '"They were quiet during my presentation, so they definitely think I am incompetent."',
  },
  {
    id: 'all-or-nothing',
    name: 'All-or-Nothing (Polarized) Thinking',
    description: 'Viewing situations in rigid black-and-white categories with zero nuance.',
    example: '"If this resolution is not 100% painless, the whole effort is a total failure."',
  },
  {
    id: 'fortune-telling',
    name: 'Fortune Telling',
    description: 'Predicting that events will unfold negatively as an established fact.',
    example: '"There is no point in having this boundary conversation; they will never change."',
  },
  {
    id: 'emotional-reasoning',
    name: 'Emotional Reasoning',
    description: 'Assuming that because you feel anxious or guilty, an objective catastrophe or wrongdoing exists.',
    example: '"I feel immense guilt for saying no, therefore I must be a terrible person."',
  },
  {
    id: 'should-statements',
    name: 'Tyranny of "Shoulds"',
    description: 'Imposing rigid, punitive rules upon yourself or others, creating guilt and resentment.',
    example: '"I should have known better and never let things get this bad."',
  },
];

export const CognitiveReframer: React.FC = () => {
  const [automaticThought, setAutomaticThought] = useState('');
  const [selectedDistortion, setSelectedDistortion] = useState<string>('catastrophizing');
  const [evidenceFor, setEvidenceFor] = useState('');
  const [evidenceAgainst, setEvidenceAgainst] = useState('');
  const [rationalResponse, setRationalResponse] = useState('');
  const [savedReframes, setSavedReframes] = useState<
    { thought: string; distortion: string; rational: string }[]
  >([]);

  const handleGenerateRational = () => {
    if (!automaticThought.trim()) return;

    const distortionObj = COMMON_DISTORTIONS.find((d) => d.id === selectedDistortion);
    const distName = distortionObj ? distortionObj.name : 'Cognitive Distortion';

    let generated = '';
    if (selectedDistortion === 'catastrophizing') {
      generated = `While this outcome is uncomfortable, the absolute worst-case scenario has a low probability. Even if unexpected friction occurs, I have managed challenging transitions before and possess the resources to adapt step-by-step.`;
    } else if (selectedDistortion === 'mind-reading') {
      generated = `I cannot observe the other person's internal mental state. Their silence or brevity is more likely a reflection of their own stress, workload, or style rather than a character judgment of me. I will base my choices on verifiable actions.`;
    } else if (selectedDistortion === 'all-or-nothing') {
      generated = `Progress is rarely all-or-nothing. A partial boundary or an imperfect compromise still shifts the dynamic forward. Success is measured by consistent incremental agency, not flawless perfection.`;
    } else if (selectedDistortion === 'emotional-reasoning') {
      generated = `My feelings of guilt or anxiety are valid signals of stress, not proof that I am doing something wrong. Setting a reasonable boundary is an act of long-term health, even if it feels temporarily uncomfortable in my nervous system.`;
    } else {
      generated = `Replacing punitive expectations with objective reality: I am operating with the information and energy available to me now. Rather than ruminating on what should have happened, I focus on the single next constructive step.`;
    }

    setRationalResponse(generated);
  };

  const handleSaveReframe = () => {
    if (!automaticThought.trim() || !rationalResponse.trim()) return;
    setSavedReframes([
      {
        thought: automaticThought,
        distortion: selectedDistortion,
        rational: rationalResponse,
      },
      ...savedReframes,
    ]);
    setAutomaticThought('');
    setRationalResponse('');
    setEvidenceFor('');
    setEvidenceAgainst('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
          Cognitive Behavioral Science (CBT)
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mt-1 mb-2">
          Beck's 3-Column Thought Reframing Studio
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed max-w-2xl">
          Based on Dr. Aaron Beck and Dr. David Burns' clinical paradigm: when an intrusive thought triggers
          panic or avoidance, identifying the distortion and testing empirical evidence rapidly restores
          prefrontal clarity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Input Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6 shadow-xs">
            <label className="block text-sm font-semibold text-stone-900 mb-1">
              Column 1: Automatic Negative Thought
            </label>
            <p className="text-xs text-stone-500 mb-2">
              Write the exact, unvarnished sentence your anxiety is repeating.
            </p>
            <textarea
              rows={3}
              value={automaticThought}
              onChange={(e) => setAutomaticThought(e.target.value)}
              placeholder="e.g., If I tell my family I cannot host the holiday dinner, they will think I am cold and selfish."
              className="w-full p-3 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 mb-4"
            />

            <label className="block text-sm font-semibold text-stone-900 mb-2">
              Column 2: Identify the Cognitive Distortion
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
              {COMMON_DISTORTIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setSelectedDistortion(d.id)}
                  className={`cursor-pointer p-2.5 text-left rounded-lg border text-xs transition-all ${
                    selectedDistortion === d.id
                      ? 'bg-emerald-50 border-emerald-700 text-emerald-950 font-semibold shadow-xs'
                      : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <div className="font-semibold">{d.name}</div>
                  <div className="text-[11px] text-stone-500 mt-0.5 line-clamp-1">{d.description}</div>
                </button>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                disabled={!automaticThought.trim()}
                onClick={handleGenerateRational}
                className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 bg-stone-900 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 disabled:opacity-40 transition-colors shadow-xs"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Formulate Rational Response</span>
              </button>
            </div>
          </div>

          {/* Column 3 Result Card */}
          {rationalResponse && (
            <div className="bg-white rounded-xl border border-emerald-200 p-6 shadow-xs">
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-900 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Column 3: Evidence-Based Rational Reframe</span>
              </div>
              <textarea
                rows={4}
                value={rationalResponse}
                onChange={(e) => setRationalResponse(e.target.value)}
                className="w-full p-3 bg-emerald-50/40 border border-emerald-200 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700 leading-relaxed mb-4"
              />
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={handleSaveReframe}
                  className="cursor-pointer px-4 py-2 bg-emerald-800 text-white rounded-lg text-xs font-semibold hover:bg-emerald-900 transition-colors"
                >
                  Save to Reframing Vault
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Distortion Guide / Saved Reframes */}
        <div className="space-y-6">
          <div className="bg-stone-100/70 rounded-xl border border-stone-200 p-5 text-xs">
            <h3 className="font-bold text-stone-900 mb-2 flex items-center gap-1.5">
              <Brain className="w-4 h-4 text-emerald-800" />
              <span>The 3-Question Reality Test</span>
            </h3>
            <ol className="space-y-2 text-stone-600 list-decimal list-inside leading-relaxed">
              <li>
                <span className="font-semibold text-stone-800">What is the objective evidence?</span> What facts
                support this thought vs what facts contradict it?
              </li>
              <li>
                <span className="font-semibold text-stone-800">What is an alternative explanation?</span> If a close
                friend were in this exact situation, what would you tell them?
              </li>
              <li>
                <span className="font-semibold text-stone-800">What is the actionable next step?</span> Even if this
                difficult scenario occurs, how will you handle it?
              </li>
            </ol>
          </div>

          {/* Saved Reframes List */}
          {savedReframes.length > 0 && (
            <div className="bg-white rounded-xl border border-stone-200 p-5">
              <h3 className="text-sm font-bold text-stone-900 mb-3">Saved Reframes ({savedReframes.length})</h3>
              <div className="space-y-3">
                {savedReframes.map((item, idx) => (
                  <div key={idx} className="p-3 bg-stone-50 rounded-lg border border-stone-200 text-xs">
                    <div className="text-stone-500 line-through mb-1">"{item.thought}"</div>
                    <div className="text-stone-900 font-medium">"{item.rational}"</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
