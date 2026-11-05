import React from 'react';
import { Wind } from 'lucide-react';

export type ActiveTabType =
  | 'advisor'
  | 'presets'
  | 'rehearsal'
  | 'reframer'
  | 'simulator'
  | 'library'
  | 'vault';

interface NavbarProps {
  activeTab: ActiveTabType;
  setActiveTab: (tab: ActiveTabType) => void;
  onNewScenario: () => void;
  onOpenSomaticModal: () => void;
  savedCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNewScenario,
  onOpenSomaticModal,
  savedCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-stone-50/95 backdrop-blur-md border-b border-stone-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Zone 1: Wordmark */}
        <button
          onClick={() => setActiveTab('advisor')}
          className="text-left group cursor-pointer focus:outline-none shrink-0"
        >
          <span className="text-xl font-bold tracking-tight text-stone-900 group-hover:text-emerald-800 transition-colors whitespace-nowrap">
            Groundwork
          </span>
        </button>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-medium text-stone-600 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab('advisor')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'advisor'
                ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-emerald-700 decoration-2'
                : 'hover:text-stone-900'
            }`}
          >
            Advisor Console
          </button>
          <button
            onClick={() => setActiveTab('presets')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'presets'
                ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-emerald-700 decoration-2'
                : 'hover:text-stone-900'
            }`}
          >
            Case Presets
          </button>
          <button
            onClick={() => setActiveTab('rehearsal')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'rehearsal'
                ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-emerald-700 decoration-2'
                : 'hover:text-stone-900'
            }`}
          >
            Conversation Lab
          </button>
          <button
            onClick={() => setActiveTab('reframer')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'reframer'
                ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-emerald-700 decoration-2'
                : 'hover:text-stone-900'
            }`}
          >
            CBT Reframer
          </button>
          <button
            onClick={() => setActiveTab('simulator')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'simulator'
                ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-emerald-700 decoration-2'
                : 'hover:text-stone-900'
            }`}
          >
            Decision Simulator
          </button>
          <button
            onClick={() => setActiveTab('library')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
              activeTab === 'library'
                ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-emerald-700 decoration-2'
                : 'hover:text-stone-900'
            }`}
          >
            Frameworks
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`cursor-pointer transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 ${
              activeTab === 'vault'
                ? 'text-stone-900 font-semibold underline underline-offset-8 decoration-emerald-700 decoration-2'
                : 'hover:text-stone-900'
            }`}
          >
            <span>My Cases</span>
            {savedCount > 0 && (
              <span className="font-mono text-xs text-stone-500">
                ({savedCount})
              </span>
            )}
          </button>
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onOpenSomaticModal}
            className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-100/80 hover:bg-stone-200/70 border border-stone-200 rounded-lg transition-colors"
            title="Open Somatic Grounding & Breathing Reset"
          >
            <Wind className="w-3.5 h-3.5 text-emerald-800" />
            <span className="hidden sm:inline">Grounding</span>
          </button>
          <button
            onClick={onNewScenario}
            className="cursor-pointer px-4 py-2 text-xs font-semibold text-white bg-stone-900 rounded-lg hover:bg-emerald-900 active:scale-[0.98] transition-all whitespace-nowrap shrink-0 shadow-xs"
          >
            Analyze Situation
          </button>
        </div>
      </div>
    </header>
  );
};
