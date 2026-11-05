import React, { useState } from 'react';
import { AnalysisResult, ScenarioInput } from '../types';
import {
  Bookmark,
  CheckCircle2,
  Copy,
  Check,
  ArrowLeft,
  Share2,
  BookOpen,
  GitBranch,
  MessageSquare,
  ShieldAlert,
  Calendar,
  Layers,
  ChevronRight,
} from 'lucide-react';

interface AnalysisReportProps {
  scenario: ScenarioInput;
  analysis: AnalysisResult;
  onBackToEdit: () => void;
  onSaveCase: () => void;
  isSaved: boolean;
}

export const AnalysisReport: React.FC<AnalysisReportProps> = ({
  scenario,
  analysis,
  onBackToEdit,
  onSaveCase,
  isSaved,
}) => {
  const [activeSection, setActiveSection] = useState<
    'overview' | 'biases' | 'frameworks' | 'playbook' | 'scripts' | 'simulator' | 'citations'
  >('overview');

  const [copiedScriptIndex, setCopiedScriptIndex] = useState<number | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({});

  const handleCopyScript = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedScriptIndex(index);
    setTimeout(() => setCopiedScriptIndex(null), 2000);
  };

  const toggleStep = (stepKey: string) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [stepKey]: !prev[stepKey],
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Top Breadcrumb & Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b border-stone-200">
        <button
          onClick={onBackToEdit}
          className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Adjust Situation Inputs</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={onSaveCase}
            className={`cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isSaved
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-white text-stone-700 hover:bg-stone-50 border border-stone-200 shadow-2xs'
            }`}
          >
            {isSaved ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" /> : <Bookmark className="w-3.5 h-3.5" />}
            <span>{isSaved ? 'Saved in My Cases' : 'Save Case'}</span>
          </button>
        </div>
      </div>

      {/* Hero Situation Summary Banner */}
      <div className="bg-white rounded-xl border border-stone-200 p-6 sm:p-8 shadow-xs mb-8">
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
          <span className="capitalize">{scenario.domain} Domain</span>
          <span aria-hidden="true">·</span>
          <span>{scenario.urgency === 'immediate' ? 'Acute Timeline' : 'Strategic Timeline'}</span>
          {scenario.emotionalState && (
            <>
              <span aria-hidden="true">·</span>
              <span>{scenario.emotionalState}</span>
            </>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mb-3">
          {scenario.title || 'Situation Feedback & Action Blueprint'}
        </h1>

        <p className="text-stone-700 text-base leading-relaxed mb-6">
          {analysis.summary}
        </p>

        {/* Empathy Attunement Callout */}
        <div className="bg-stone-50/80 rounded-lg border border-stone-200/70 p-4 sm:p-5">
          <div className="text-xs font-semibold uppercase tracking-wider text-emerald-900 mb-1">
            Psychological & Emotional Attunement
          </div>
          <p className="text-sm text-stone-700 leading-relaxed italic">
            "{analysis.empathyAttunement}"
          </p>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-3 mb-8 border-b border-stone-200/80 text-sm font-medium">
        <button
          onClick={() => setActiveSection('overview')}
          className={`cursor-pointer px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors ${
            activeSection === 'overview'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          Executive Synthesis
        </button>
        <button
          onClick={() => setActiveSection('biases')}
          className={`cursor-pointer px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'biases'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <ShieldAlert className="w-3.5 h-3.5" />
          <span>Cognitive Biases ({analysis.cognitiveBiases.length})</span>
        </button>
        <button
          onClick={() => setActiveSection('frameworks')}
          className={`cursor-pointer px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'frameworks'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Proven Frameworks</span>
        </button>
        <button
          onClick={() => setActiveSection('playbook')}
          className={`cursor-pointer px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'playbook'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <Calendar className="w-3.5 h-3.5" />
          <span>Action Playbook</span>
        </button>
        <button
          onClick={() => setActiveSection('scripts')}
          className={`cursor-pointer px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'scripts'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Verbatim Scripts</span>
        </button>
        <button
          onClick={() => setActiveSection('simulator')}
          className={`cursor-pointer px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'simulator'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <GitBranch className="w-3.5 h-3.5" />
          <span>Decision Branches</span>
        </button>
        <button
          onClick={() => setActiveSection('citations')}
          className={`cursor-pointer px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeSection === 'citations'
              ? 'bg-stone-900 text-white shadow-xs'
              : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Literature & Sources</span>
        </button>
      </div>

      {/* SECTION: Overview (Executive Synthesis) */}
      {activeSection === 'overview' && (
        <div className="space-y-8">
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500 font-medium mb-1">Diagnostic Identified</div>
              <div className="text-xl font-bold text-stone-900">
                {analysis.cognitiveBiases.length} Cognitive Blindspots
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Key perceptual distortions that commonly cloud judgment in high-stakes dilemmas.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500 font-medium mb-1">Theoretical Foundations</div>
              <div className="text-xl font-bold text-stone-900">
                {analysis.groundedFrameworks.length} Peer-Reviewed Models
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Academic protocols from Harvard, Stanford, and cognitive psychology research.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-stone-200">
              <div className="text-xs text-stone-500 font-medium mb-1">Action Roadmap</div>
              <div className="text-xl font-bold text-stone-900">
                3-Tier Chronological Plan
              </div>
              <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                Concrete steps from the next 24 hours to 30-day structural resolution.
              </p>
            </div>
          </div>

          {/* Core Bias Spotlight */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-stone-900">Potential Cognitive Blindspots</h2>
              <button
                onClick={() => setActiveSection('biases')}
                className="cursor-pointer text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
              >
                <span>View All Diagnostics</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysis.cognitiveBiases.map((bias, i) => (
                <div key={i} className="p-4 bg-stone-50 rounded-lg border border-stone-200/80">
                  <div className="text-sm font-bold text-stone-900 mb-1">{bias.biasName}</div>
                  <p className="text-xs text-stone-600 mb-3 leading-relaxed">{bias.explanation}</p>
                  <div className="text-xs bg-white p-2.5 rounded border border-stone-200">
                    <span className="font-semibold text-emerald-900">Debiasing Strategy: </span>
                    <span className="text-stone-700">{bias.debiasingTechnique}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate 24-Hour Preview */}
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-lg font-bold text-stone-900">Immediate 24-Hour Horizon</h2>
                <p className="text-xs text-stone-500 mt-0.5">What to do before taking any reactive measures.</p>
              </div>
              <button
                onClick={() => setActiveSection('playbook')}
                className="cursor-pointer text-xs font-semibold text-emerald-800 hover:underline flex items-center gap-1"
              >
                <span>Full Playbook</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3">
              {analysis.tacticalPlaybook.immediate24Hours.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3.5 rounded-lg border border-stone-200/80 bg-stone-50/50"
                >
                  <button
                    onClick={() => toggleStep(`imm-${idx}`)}
                    className="cursor-pointer mt-0.5 text-stone-400 hover:text-emerald-700 transition-colors"
                  >
                    {completedSteps[`imm-${idx}`] ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    ) : (
                      <div className="w-4 h-4 rounded border border-stone-400 hover:border-stone-600" />
                    )}
                  </button>
                  <div className="flex-1 text-xs">
                    <div className={`font-semibold text-stone-900 ${completedSteps[`imm-${idx}`] ? 'line-through text-stone-400' : ''}`}>
                      {step.step}
                    </div>
                    <p className="text-stone-600 mt-0.5">{step.rationale}</p>
                    <div className="text-[11px] font-mono text-stone-500 mt-1">
                      Anchor: {step.provenPrinciple}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Cognitive Biases */}
      {activeSection === 'biases' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Cognitive Bias & Heuristic Diagnostic</h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              When navigating stressful dilemmas, our subconscious mind relies on evolutionary shortcuts designed for
              immediate survival. In complex human interactions, these heuristics frequently backfire. Here are the
              active distortions identified in your situation.
            </p>

            <div className="space-y-4">
              {analysis.cognitiveBiases.map((bias, idx) => (
                <div key={idx} className="p-5 rounded-lg border border-stone-200 bg-stone-50/60">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-stone-900">{bias.biasName}</h3>
                    <span className="text-xs font-mono text-stone-400">Diagnostic #{idx + 1}</span>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed mb-4">{bias.explanation}</p>
                  <div className="p-3.5 bg-white rounded-lg border border-stone-200/90 text-xs text-stone-800 leading-relaxed">
                    <span className="font-semibold text-emerald-900">Proven Debiasing Technique: </span>
                    <span>{bias.debiasingTechnique}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Proven Frameworks */}
      {activeSection === 'frameworks' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Grounded Behavioral & Psychological Frameworks</h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              These evidence-backed models from leading academic institutions and clinical researchers directly address the
              structural variables of your dilemma.
            </p>

            <div className="space-y-6">
              {analysis.groundedFrameworks.map((fw, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-stone-200 bg-stone-50/50">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <h3 className="text-lg font-bold text-stone-900">{fw.frameworkTitle}</h3>
                    <div className="text-xs text-stone-500 font-medium">
                      <span>{fw.pioneerOrAuthor}</span>
                      <span aria-hidden="true" className="mx-1.5">·</span>
                      <span>{fw.publicationOrInstitution}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider block mb-1">
                      Core Scientific Mechanism
                    </span>
                    <p className="text-sm text-stone-700 leading-relaxed">{fw.coreMechanism}</p>
                  </div>

                  <div className="p-4 bg-white rounded-lg border border-stone-200 text-xs text-stone-800">
                    <span className="font-semibold text-emerald-900 block mb-1">
                      Direct Application to Your Situation:
                    </span>
                    <p className="leading-relaxed">{fw.applicationToScenario}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Action Playbook */}
      {activeSection === 'playbook' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Chronological Tactical Playbook</h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              A sequenced roadmap engineered to prevent immediate emotional escalation, create strategic leverage, and
              build durable long-term stability.
            </p>

            {/* Phase 1: 24 Hours */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold text-stone-900">01. Immediate 24–48 Hour Horizon</span>
                <span className="text-xs text-stone-500 font-mono">De-escalation & Mental Grounding</span>
              </div>

              <div className="space-y-3">
                {analysis.tacticalPlaybook.immediate24Hours.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg border border-stone-200 bg-stone-50/50"
                  >
                    <button
                      onClick={() => toggleStep(`play-1-${idx}`)}
                      className="cursor-pointer mt-0.5 text-stone-400 hover:text-emerald-700 transition-colors"
                    >
                      {completedSteps[`play-1-${idx}`] ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <div className="w-4 h-4 rounded border border-stone-400 hover:border-stone-600" />
                      )}
                    </button>
                    <div className="flex-1 text-xs">
                      <div className={`text-sm font-semibold text-stone-900 mb-1 ${completedSteps[`play-1-${idx}`] ? 'line-through text-stone-400' : ''}`}>
                        {step.step}
                      </div>
                      <p className="text-stone-600 text-xs leading-relaxed mb-1.5">{step.rationale}</p>
                      <div className="text-[11px] font-mono text-stone-500">
                        Evidence Grounding: {step.provenPrinciple}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2: 7 Days */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold text-stone-900">02. 7-Day Tactical Protocol</span>
                <span className="text-xs text-stone-500 font-mono">Structured Dialogue & Reality Testing</span>
              </div>

              <div className="space-y-3">
                {analysis.tacticalPlaybook.tactical7Days.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg border border-stone-200 bg-stone-50/50"
                  >
                    <button
                      onClick={() => toggleStep(`play-2-${idx}`)}
                      className="cursor-pointer mt-0.5 text-stone-400 hover:text-emerald-700 transition-colors"
                    >
                      {completedSteps[`play-2-${idx}`] ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <div className="w-4 h-4 rounded border border-stone-400 hover:border-stone-600" />
                      )}
                    </button>
                    <div className="flex-1 text-xs">
                      <div className={`text-sm font-semibold text-stone-900 mb-1 ${completedSteps[`play-2-${idx}`] ? 'line-through text-stone-400' : ''}`}>
                        {step.step}
                      </div>
                      <p className="text-stone-600 text-xs leading-relaxed mb-1.5">{step.rationale}</p>
                      <div className="text-[11px] font-mono text-stone-500">
                        Evidence Grounding: {step.provenPrinciple}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 3: 30 Days */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-bold text-stone-900">03. 30-Day Structural Horizon</span>
                <span className="text-xs text-stone-500 font-mono">Systemic Alignment & Habitual Guardrails</span>
              </div>

              <div className="space-y-3">
                {analysis.tacticalPlaybook.strategic30Days.map((step, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-4 rounded-lg border border-stone-200 bg-stone-50/50"
                  >
                    <button
                      onClick={() => toggleStep(`play-3-${idx}`)}
                      className="cursor-pointer mt-0.5 text-stone-400 hover:text-emerald-700 transition-colors"
                    >
                      {completedSteps[`play-3-${idx}`] ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      ) : (
                        <div className="w-4 h-4 rounded border border-stone-400 hover:border-stone-600" />
                      )}
                    </button>
                    <div className="flex-1 text-xs">
                      <div className={`text-sm font-semibold text-stone-900 mb-1 ${completedSteps[`play-3-${idx}`] ? 'line-through text-stone-400' : ''}`}>
                        {step.step}
                      </div>
                      <p className="text-stone-600 text-xs leading-relaxed mb-1.5">{step.rationale}</p>
                      <div className="text-[11px] font-mono text-stone-500">
                        Evidence Grounding: {step.provenPrinciple}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Verbatim Scripts */}
      {activeSection === 'scripts' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Verbatim Dialogue & Negotiation Scripts</h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              When emotions run high, we often stumble on words or default to defensive accusations. These exact phrases are
              grounded in nonviolent communication and principled negotiation to keep boundaries firm while defusing defensiveness.
            </p>

            <div className="space-y-6">
              {analysis.dialogueScripts.map((script, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-stone-200 bg-stone-50/60">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-stone-600">
                      Context: {script.context}
                    </span>
                    <button
                      onClick={() => handleCopyScript(script.whatToSay, idx)}
                      className="cursor-pointer inline-flex items-center gap-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-white border border-stone-200 px-2.5 py-1 rounded-md shadow-2xs"
                    >
                      {copiedScriptIndex === idx ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span className="text-emerald-800">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Script</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Say This */}
                  <div className="p-4 bg-white rounded-lg border border-emerald-200/90 mb-4 shadow-2xs">
                    <div className="text-xs font-semibold text-emerald-900 mb-1.5 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Recommended Phrasing (Say This):</span>
                    </div>
                    <p className="text-sm text-stone-900 font-medium leading-relaxed italic">
                      {script.whatToSay}
                    </p>
                  </div>

                  {/* Why it works & What to avoid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-stone-100/80 rounded border border-stone-200/60">
                      <span className="font-semibold text-stone-900 block mb-1">Why This Works:</span>
                      <p className="text-stone-700 leading-relaxed">{script.whyItWorks}</p>
                    </div>

                    <div className="p-3 bg-stone-100/80 rounded border border-stone-200/60">
                      <span className="font-semibold text-stone-900 block mb-1">Phrasing to Avoid:</span>
                      <p className="text-stone-700 leading-relaxed line-through decoration-rose-400">
                        {script.whatToAvoid}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Decision Branches */}
      {activeSection === 'simulator' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Comparative Decision Branches & Risk Hedges</h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              Sound decision-making does not mean picking a risk-free option; it means understanding the probabilistic
              trade-offs of each branch and constructing deliberate downside hedges.
            </p>

            <div className="space-y-6">
              {analysis.decisionBranches.map((branch, idx) => (
                <div key={idx} className="p-6 rounded-lg border border-stone-200 bg-stone-50/50">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold text-stone-900">
                      Pathway {String.fromCharCode(65 + idx)}: {branch.optionName}
                    </h3>
                  </div>
                  <p className="text-sm text-stone-700 leading-relaxed mb-4">{branch.description}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 text-xs">
                    <div className="p-4 bg-white rounded-lg border border-stone-200">
                      <span className="font-semibold text-emerald-900 block mb-2">Evidence-Backed Upsides:</span>
                      <ul className="space-y-1.5 text-stone-700 list-disc list-inside">
                        {branch.prosBasedOnEvidence.map((pro, pIdx) => (
                          <li key={pIdx} className="leading-relaxed">
                            {pro}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-white rounded-lg border border-stone-200">
                      <span className="font-semibold text-stone-800 block mb-2">Downside Risks & Vulnerabilities:</span>
                      <ul className="space-y-1.5 text-stone-700 list-disc list-inside">
                        {branch.consAndDownsideRisk.map((con, cIdx) => (
                          <li key={cIdx} className="leading-relaxed">
                            {con}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3.5 bg-emerald-50/50 rounded-lg border border-emerald-200/80 text-xs text-stone-800">
                    <span className="font-semibold text-emerald-950">Recommended Downside Hedge: </span>
                    <span>{branch.hedgingStrategy}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION: Literature & Citations */}
      {activeSection === 'citations' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-stone-200 p-6">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Academic Literature & Empirical Studies</h2>
            <p className="text-sm text-stone-600 leading-relaxed mb-6">
              Every recommendation generated by Groundwork is anchored in verified behavioral science literature,
              controlled clinical trials, and foundational decision theory texts.
            </p>

            <div className="space-y-4">
              {analysis.literatureCitations.map((cit, idx) => (
                <div key={idx} className="p-5 rounded-lg border border-stone-200 bg-stone-50/60">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="text-sm font-bold text-stone-900">{cit.studyOrBook}</h3>
                    <span className="text-xs font-mono text-emerald-800">{cit.relevanceScore}</span>
                  </div>
                  <div className="text-xs text-stone-500 mb-3">{cit.authors}</div>
                  <p className="text-xs text-stone-700 leading-relaxed bg-white p-3 rounded border border-stone-200">
                    <span className="font-semibold text-stone-900">Key Finding: </span>
                    {cit.keyFinding}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
