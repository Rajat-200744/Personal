import React, { useState } from 'react';
import { DomainType, ScenarioInput } from '../types';
import { SAMPLE_SCENARIOS } from '../data/sampleScenarios';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, HelpCircle, Check } from 'lucide-react';

interface IntakeWizardProps {
  onSubmit: (input: ScenarioInput) => void;
  isLoading: boolean;
  initialData?: ScenarioInput | null;
}

const DOMAINS: { id: DomainType; label: string; desc: string }[] = [
  { id: 'career', label: 'Career & Work', desc: 'Promotions, negotiations, toxic dynamics, pivots' },
  { id: 'relationship', label: 'Interpersonal & Family', desc: 'Boundaries, conflicts, partner tensions, ruptures' },
  { id: 'finance', label: 'Financial Decisions', desc: 'Debt, investments, resource allocation, family money' },
  { id: 'wellness', label: 'Wellness & Burnout', desc: 'Exhaustion, life crossroads, identity shifts' },
];

const EMOTIONAL_TAGS = [
  'Paralyzed by Indecision',
  'Deep Resentment',
  'Severe Anxiety',
  'Chronic Burnout',
  'Feeling Undervalued',
  'Guilt & Obligation',
  'Fear of Conflict',
  'Imposter Syndrome',
  'Loss of Autonomy',
  'High Urgency',
];

export const IntakeWizard: React.FC<IntakeWizardProps> = ({ onSubmit, isLoading, initialData }) => {
  const [mode, setMode] = useState<'guided' | 'express'>('guided');
  const [step, setStep] = useState<number>(1);

  // Form State
  const [domain, setDomain] = useState<DomainType>(initialData?.domain || 'career');
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [stakeholders, setStakeholders] = useState(initialData?.stakeholders || '');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(
    initialData?.emotionalState ? initialData.emotionalState.split(', ') : ['Paralyzed by Indecision']
  );
  const [customEmotion, setCustomEmotion] = useState('');
  const [constraints, setConstraints] = useState(initialData?.constraints || '');
  const [desiredOutcome, setDesiredOutcome] = useState(initialData?.desiredOutcome || '');
  const [urgency, setUrgency] = useState<'immediate' | 'moderate' | 'long-term'>(
    initialData?.urgency || 'moderate'
  );

  const toggleEmotion = (tag: string) => {
    if (selectedEmotions.includes(tag)) {
      setSelectedEmotions(selectedEmotions.filter((t) => t !== tag));
    } else {
      setSelectedEmotions([...selectedEmotions, tag]);
    }
  };

  const handleAddCustomEmotion = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && customEmotion.trim()) {
      e.preventDefault();
      if (!selectedEmotions.includes(customEmotion.trim())) {
        setSelectedEmotions([...selectedEmotions, customEmotion.trim()]);
      }
      setCustomEmotion('');
    }
  };

  const handleLoadSample = (sample: ScenarioInput) => {
    setDomain(sample.domain);
    setTitle(sample.title);
    setDescription(sample.description);
    setStakeholders(sample.stakeholders || '');
    if (sample.emotionalState) {
      setSelectedEmotions(sample.emotionalState.split(', '));
    }
    setConstraints(sample.constraints || '');
    setDesiredOutcome(sample.desiredOutcome || '');
    setUrgency(sample.urgency || 'moderate');
  };

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!description.trim()) return;

    const payload: ScenarioInput = {
      title: title.trim() || 'Untitled Situation',
      domain,
      description: description.trim(),
      stakeholders: stakeholders.trim() || 'Key parties and self',
      emotionalState: selectedEmotions.join(', ') || 'Uncertain / High Stress',
      constraints: constraints.trim() || 'Standard time and personal constraints',
      desiredOutcome: desiredOutcome.trim() || 'Objective clarity and evidence-backed next steps',
      urgency,
    };

    onSubmit(payload);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Intro & Compassion Banner */}
      <div className="mb-8">
        <div className="flex items-center justify-between gap-4 mb-2">
          <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
            Evidence-Based Life Advisor
          </span>
          {/* Mode Switcher */}
          <div className="flex items-center gap-1 p-0.5 bg-stone-200/70 rounded-lg text-xs font-medium">
            <button
              type="button"
              onClick={() => setMode('guided')}
              className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
                mode === 'guided'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Guided Walkthrough
            </button>
            <button
              type="button"
              onClick={() => setMode('express')}
              className={`cursor-pointer px-3 py-1 rounded-md transition-colors ${
                mode === 'express'
                  ? 'bg-white text-stone-900 shadow-xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Express Entry
            </button>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mb-3">
          Deconstruct your dilemma with proven behavioral science.
        </h1>
        <p className="text-stone-600 text-base leading-relaxed">
          Stress narrows working memory and accelerates emotional reactivity. Share your current
          crossroad—Groundwork diagnoses cognitive biases, cites peer-reviewed research, and produces
          a chronological action protocol.
        </p>

        {/* Quick Sample Presets Bar */}
        <div className="mt-4 pt-4 border-t border-stone-200/80 flex flex-wrap items-center gap-2">
          <span className="text-xs text-stone-500 font-medium">Try a real-world scenario:</span>
          {SAMPLE_SCENARIOS.slice(0, 3).map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleLoadSample(item.data)}
              className="cursor-pointer text-xs text-stone-700 bg-stone-100 hover:bg-stone-200 px-2.5 py-1 rounded-md transition-colors border border-stone-200/60"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Intake Card */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs">
        {mode === 'guided' ? (
          <div>
            {/* Step Indicators */}
            <div className="flex items-center justify-between pb-6 mb-6 border-b border-stone-100">
              <div className="flex items-center gap-6 text-xs text-stone-500">
                <span className={step >= 1 ? 'text-stone-900 font-semibold' : ''}>
                  01. The Situation
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className={step >= 2 ? 'text-stone-900 font-semibold' : ''}>
                  02. Dynamics & Emotions
                </span>
                <span aria-hidden="true" className="text-stone-300">·</span>
                <span className={step >= 3 ? 'text-stone-900 font-semibold' : ''}>
                  03. Stakes & Outcome
                </span>
              </div>
              <span className="text-xs font-mono text-stone-500">Step {step} of 3</span>
            </div>

            {/* Step 1: Situation & Domain */}
            {step === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-stone-900 mb-2">
                    Which domain does this dilemma primarily touch?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {DOMAINS.map((d) => (
                      <button
                        key={d.id}
                        type="button"
                        onClick={() => setDomain(d.id)}
                        className={`cursor-pointer p-3.5 text-left rounded-lg border transition-all ${
                          domain === d.id
                            ? 'bg-emerald-50/50 border-emerald-700 text-emerald-950 shadow-xs'
                            : 'bg-stone-50/50 border-stone-200 text-stone-700 hover:bg-stone-100/50'
                        }`}
                      >
                        <div className="text-sm font-semibold">{d.label}</div>
                        <div className="text-xs text-stone-500 mt-0.5">{d.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label htmlFor="scenario-title" className="block text-sm font-semibold text-stone-900 mb-1">
                    Situation Headline
                  </label>
                  <p className="text-xs text-stone-500 mb-2">A concise summary of the active conflict or decision.</p>
                  <input
                    id="scenario-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Passed over for promotion after leading migration project for 14 months"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label htmlFor="scenario-description" className="block text-sm font-semibold text-stone-900">
                      What is happening right now?
                    </label>
                    <span className="text-xs text-stone-400">Be as honest as possible</span>
                  </div>
                  <p className="text-xs text-stone-500 mb-2">
                    Describe the sequence of events, what was said or decided, and where the impasse lies.
                  </p>
                  <textarea
                    id="scenario-description"
                    rows={6}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide the raw context: what happened, what commitments were made, what changed, and how it is impacting you day-to-day..."
                    className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all leading-relaxed"
                  />
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="button"
                    disabled={!description.trim()}
                    onClick={() => setStep(2)}
                    className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-stone-900 hover:bg-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-colors shadow-xs"
                  >
                    <span>Next: Dynamics & Feelings</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Dynamics & Emotional State */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="stakeholders-input" className="block text-sm font-semibold text-stone-900 mb-1">
                    Who are the key stakeholders involved?
                  </label>
                  <p className="text-xs text-stone-500 mb-2">
                    E.g., Your supervisor, spouse, team members, parents, or counter-parties.
                  </p>
                  <input
                    id="stakeholders-input"
                    type="text"
                    value={stakeholders}
                    onChange={(e) => setStakeholders(e.target.value)}
                    placeholder="e.g., VP of Engineering, HR Director, my direct reports, spouse"
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-900 mb-1">
                    What emotional and mental states are present for you?
                  </label>
                  <p className="text-xs text-stone-500 mb-3">
                    Naming your exact emotions de-biases affective forecasting and calms amygdala reactivity.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {EMOTIONAL_TAGS.map((tag) => {
                      const isSelected = selectedEmotions.includes(tag);
                      return (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => toggleEmotion(tag)}
                          className={`cursor-pointer px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                            isSelected
                              ? 'bg-stone-900 text-white shadow-xs'
                              : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80 border border-stone-200/70'
                          }`}
                        >
                          {isSelected && <Check className="w-3 h-3" />}
                          <span>{tag}</span>
                        </button>
                      );
                    })}
                  </div>
                  <input
                    type="text"
                    value={customEmotion}
                    onChange={(e) => setCustomEmotion(e.target.value)}
                    onKeyDown={handleAddCustomEmotion}
                    placeholder="Type a custom feeling and press Enter..."
                    className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-stone-900 hover:bg-emerald-900 rounded-lg transition-colors shadow-xs"
                  >
                    <span>Next: Stakes & Desired Outcome</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Stakes, Constraints, Outcome */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="constraints-input" className="block text-sm font-semibold text-stone-900 mb-1">
                    What are your non-negotiables and hard constraints?
                  </label>
                  <p className="text-xs text-stone-500 mb-2">
                    E.g., Financial runway, contract dates, family commitments, ethical lines.
                  </p>
                  <textarea
                    id="constraints-input"
                    rows={3}
                    value={constraints}
                    onChange={(e) => setConstraints(e.target.value)}
                    placeholder="e.g., Cannot be without income for more than 6 weeks; equity vests in 4 months; want to maintain cordial terms with colleagues."
                    className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="outcome-input" className="block text-sm font-semibold text-stone-900 mb-1">
                    What does a successful resolution look like?
                  </label>
                  <p className="text-xs text-stone-500 mb-2">
                    What are you hoping to achieve or protect at the end of this process?
                  </p>
                  <input
                    id="outcome-input"
                    type="text"
                    value={desiredOutcome}
                    onChange={(e) => setDesiredOutcome(e.target.value)}
                    placeholder="e.g., Fair compensation matching market, or a calm 90-day exit plan with no burned bridges."
                    className="w-full px-3.5 py-2.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-900 mb-2">
                    Timeline Urgency
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'immediate', label: 'Acute (24-48 Hours)', desc: 'Crisis or imminent discussion' },
                      { id: 'moderate', label: 'Developing (1-4 Weeks)', desc: 'Strategic decision pending' },
                      { id: 'long-term', label: 'Structural (1-3 Months)', desc: 'Ongoing systemic pattern' },
                    ].map((u) => (
                      <button
                        key={u.id}
                        type="button"
                        onClick={() => setUrgency(u.id as any)}
                        className={`cursor-pointer p-3 text-left rounded-lg border text-xs transition-all ${
                          urgency === u.id
                            ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                            : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <div className="font-semibold">{u.label}</div>
                        <div className={`mt-0.5 text-[11px] ${urgency === u.id ? 'text-stone-300' : 'text-stone-500'}`}>
                          {u.desc}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-stone-100">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-stone-700 hover:text-stone-900 rounded-lg transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    type="button"
                    disabled={isLoading || !description.trim()}
                    onClick={() => handleSubmit()}
                    className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all shadow-sm active:scale-[0.98]"
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Synthesizing Evidence...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        <span>Generate Evidence-Based Analysis</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Express Entry Mode */
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex items-center justify-between">
              <label htmlFor="express-domain" className="text-sm font-semibold text-stone-900">
                Primary Domain
              </label>
              <select
                id="express-domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value as DomainType)}
                className="text-xs bg-stone-100 border border-stone-300 rounded-md px-2.5 py-1 text-stone-800 focus:outline-none"
              >
                {DOMAINS.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="express-title" className="block text-sm font-semibold text-stone-900 mb-1">
                Headline / Short Label
              </label>
              <input
                id="express-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Impasse on counteroffer negotiation"
                className="w-full px-3.5 py-2 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
              />
            </div>

            <div>
              <label htmlFor="express-description" className="block text-sm font-semibold text-stone-900 mb-1">
                Full Scenario Details
              </label>
              <textarea
                id="express-description"
                rows={8}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Paste or write your full situation here, including what happened, the other parties involved, constraints, and what you are hoping to achieve..."
                className="w-full p-3.5 bg-stone-50 border border-stone-300 rounded-lg text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700 leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                type="submit"
                disabled={isLoading || !description.trim()}
                className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:opacity-40 disabled:cursor-not-allowed rounded-lg transition-all shadow-sm active:scale-[0.98]"
              >
                {isLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Synthesizing Evidence...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Analyze Situation</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Reassurance Footer */}
      <div className="mt-6 flex items-start gap-3 p-4 bg-stone-100/70 rounded-lg border border-stone-200/60 text-xs text-stone-600">
        <HelpCircle className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <span className="font-semibold text-stone-800">Groundwork Privacy & Scientific Ethics:</span> Your inputs
          are processed directly to evaluate cognitive patterns and behavioral options. Your scenarios are saved only
          locally in your browser and are never shared or commercialized.
        </div>
      </div>
    </div>
  );
};
