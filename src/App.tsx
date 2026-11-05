import React, { useState, useEffect } from 'react';
import { DomainType, ScenarioInput, AnalysisResult, SavedCase } from './types';
import { generateCuratedFallbackAnalysis } from './data/curatedFrameworks';
import { Navbar, ActiveTabType } from './components/Navbar';
import { IntakeWizard } from './components/IntakeWizard';
import { AnalysisReport } from './components/AnalysisReport';
import { FrameworksView } from './components/FrameworksView';
import { SampleScenariosView } from './components/SampleScenariosView';
import { CaseVaultView } from './components/CaseVaultView';
import { SomaticResetModal } from './components/SomaticResetModal';
import { RoleplaySandbox } from './components/RoleplaySandbox';
import { CognitiveReframer } from './components/CognitiveReframer';
import { DecisionSimulator } from './components/DecisionSimulator';

const STORAGE_KEY = 'groundwork_saved_cases_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTabType>('advisor');
  const [currentScenario, setCurrentScenario] = useState<ScenarioInput | null>(null);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [savedCases, setSavedCases] = useState<SavedCase[]>([]);
  const [isSomaticOpen, setIsSomaticOpen] = useState(false);

  // Load saved cases from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedCases(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load saved cases from storage', e);
    }
  }, []);

  // Save to localStorage whenever savedCases updates
  const persistCases = (updated: SavedCase[]) => {
    setSavedCases(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Failed to persist cases to storage', e);
    }
  };

  const handleAnalyzeScenario = async (input: ScenarioInput) => {
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentScenario(input);
    setActiveTab('advisor');

    try {
      const res = await fetch('/api/analyze-scenario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      if (data.fallback || !data.summary) {
        const fallbackResult = generateCuratedFallbackAnalysis(input);
        setCurrentAnalysis(fallbackResult);
      } else {
        setCurrentAnalysis(data);
      }
    } catch (err: any) {
      console.warn('API call unsuccessful, switching to calibrated offline evidence engine:', err);
      const fallbackResult = generateCuratedFallbackAnalysis(input);
      setCurrentAnalysis(fallbackResult);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveCurrentCase = () => {
    if (!currentScenario || !currentAnalysis) return;

    const caseId = currentScenario.id || `case-${Date.now()}`;
    const existingIndex = savedCases.findIndex((c) => c.id === caseId);

    const newCase: SavedCase = {
      id: caseId,
      timestamp: Date.now(),
      input: currentScenario,
      analysis: currentAnalysis,
    };

    if (existingIndex >= 0) {
      const updated = [...savedCases];
      updated[existingIndex] = { ...updated[existingIndex], ...newCase };
      persistCases(updated);
    } else {
      persistCases([newCase, ...savedCases]);
    }
  };

  const handleDeleteCase = (id: string) => {
    const updated = savedCases.filter((c) => c.id !== id);
    persistCases(updated);
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = savedCases.map((c) => (c.id === id ? { ...c, userNotes: notes } : c));
    persistCases(updated);
  };

  const handleOpenSavedCase = (savedCase: SavedCase) => {
    setCurrentScenario(savedCase.input);
    setCurrentAnalysis(savedCase.analysis);
    setActiveTab('advisor');
  };

  const handleNewScenario = () => {
    setCurrentScenario(null);
    setCurrentAnalysis(null);
    setActiveTab('advisor');
  };

  const handleSelectDomainForScenario = (domain: DomainType) => {
    setCurrentScenario({
      title: '',
      domain,
      description: '',
    });
    setCurrentAnalysis(null);
    setActiveTab('advisor');
  };

  const isCurrentCaseSaved = Boolean(
    currentScenario &&
      savedCases.some(
        (c) =>
          c.input.title === currentScenario.title &&
          c.input.description === currentScenario.description
      )
  );

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col text-stone-900">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewScenario={handleNewScenario}
        onOpenSomaticModal={() => setIsSomaticOpen(true)}
        savedCount={savedCases.length}
      />

      <main className="flex-1 pb-16">
        {errorMessage && (
          <div className="max-w-4xl mx-auto px-4 mt-6">
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center justify-between">
              <span>{errorMessage}</span>
              <button
                onClick={() => setErrorMessage(null)}
                className="cursor-pointer text-amber-700 font-semibold hover:underline ml-4"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* Tab 1: Advisor Console */}
        {activeTab === 'advisor' && (
          <>
            {currentAnalysis && currentScenario ? (
              <AnalysisReport
                scenario={currentScenario}
                analysis={currentAnalysis}
                onBackToEdit={() => setCurrentAnalysis(null)}
                onSaveCase={handleSaveCurrentCase}
                isSaved={isCurrentCaseSaved}
              />
            ) : (
              <IntakeWizard
                onSubmit={handleAnalyzeScenario}
                isLoading={isLoading}
                initialData={currentScenario}
              />
            )}
          </>
        )}

        {/* Tab 2: Sample Scenarios Presets */}
        {activeTab === 'presets' && (
          <SampleScenariosView
            onSelectScenario={(sample) => {
              handleAnalyzeScenario(sample);
            }}
          />
        )}

        {/* Tab 3: Conversation Rehearsal Sandbox */}
        {activeTab === 'rehearsal' && <RoleplaySandbox />}

        {/* Tab 4: CBT Thought Reframing Studio */}
        {activeTab === 'reframer' && <CognitiveReframer />}

        {/* Tab 5: Multi-Criteria Decision Simulator */}
        {activeTab === 'simulator' && <DecisionSimulator />}

        {/* Tab 6: Proven Scientific Frameworks */}
        {activeTab === 'library' && (
          <FrameworksView onSelectDomainForScenario={handleSelectDomainForScenario} />
        )}

        {/* Tab 7: Saved Cases Vault */}
        {activeTab === 'vault' && (
          <CaseVaultView
            cases={savedCases}
            onOpenCase={handleOpenSavedCase}
            onDeleteCase={handleDeleteCase}
            onUpdateNotes={handleUpdateNotes}
            onNewScenario={handleNewScenario}
          />
        )}
      </main>

      {/* Somatic Nervous System Reset Modal */}
      <SomaticResetModal isOpen={isSomaticOpen} onClose={() => setIsSomaticOpen(false)} />

      {/* Groundwork Footer */}
      <footer className="border-t border-stone-200 bg-stone-100/60 py-8 px-4 text-center text-xs text-stone-500">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-700">Groundwork</span>
            <span>·</span>
            <span>Evidence-Based Decision Support System</span>
          </div>
          <div>
            Grounded in research from Harvard Negotiation Project, Princeton, Stanford & The Gottman Institute.
          </div>
        </div>
      </footer>
    </div>
  );
}
