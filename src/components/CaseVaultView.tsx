import React, { useState } from 'react';
import { SavedCase } from '../types';
import { Trash2, ExternalLink, Calendar, FileText, CheckCircle2 } from 'lucide-react';

interface CaseVaultViewProps {
  cases: SavedCase[];
  onOpenCase: (savedCase: SavedCase) => void;
  onDeleteCase: (id: string) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onNewScenario: () => void;
}

export const CaseVaultView: React.FC<CaseVaultViewProps> = ({
  cases,
  onOpenCase,
  onDeleteCase,
  onUpdateNotes,
  onNewScenario,
}) => {
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [noteContent, setNoteContent] = useState('');

  const handleStartNotes = (c: SavedCase) => {
    setEditingNotesId(c.id);
    setNoteContent(c.userNotes || '');
  };

  const handleSaveNotes = (id: string) => {
    onUpdateNotes(id, noteContent);
    setEditingNotesId(null);
  };

  if (cases.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="w-12 h-12 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center mx-auto mb-4 text-stone-400">
          <FileText className="w-5 h-5" />
        </div>
        <h2 className="text-xl font-bold text-stone-900 mb-2">No Saved Cases Yet</h2>
        <p className="text-stone-500 text-sm max-w-md mx-auto mb-6">
          When you analyze a dilemma in the Advisor, click "Save Case" to store your diagnosis,
          scripts, and action steps in your private local vault.
        </p>
        <button
          onClick={onNewScenario}
          className="cursor-pointer inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-emerald-900 rounded-lg transition-colors shadow-xs"
        >
          Analyze a Situation Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
          Private Case Vault
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mt-1 mb-2">
          Your Saved Scenarios & Reflections
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
          Track the evolution of your decisions, update reflective notes as situations develop, and review your
          empirical playbooks. All data is saved exclusively on your local device.
        </p>
      </div>

      {/* Cases List */}
      <div className="space-y-6">
        {cases.map((c) => {
          const dateStr = new Date(c.timestamp).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          });

          return (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-stone-200 p-6 hover:border-stone-300 transition-all shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-2 text-xs text-stone-500">
                  <span className="capitalize font-semibold text-emerald-800">{c.input.domain}</span>
                  <span aria-hidden="true">·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-stone-400" />
                    <span>{dateStr}</span>
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCase(c)}
                    className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-stone-700 hover:text-stone-900 bg-stone-50 hover:bg-stone-100 rounded-md border border-stone-200 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Open Analysis</span>
                  </button>

                  <button
                    onClick={() => onDeleteCase(c.id)}
                    className="cursor-pointer p-1.5 text-stone-400 hover:text-rose-600 rounded-md transition-colors"
                    title="Delete Case"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <h2 className="text-lg font-bold text-stone-900 mb-2">{c.input.title}</h2>
              <p className="text-xs text-stone-600 leading-relaxed mb-4 line-clamp-2">
                {c.input.description}
              </p>

              {/* Private Notes Section */}
              <div className="pt-4 border-t border-stone-100">
                {editingNotesId === c.id ? (
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold text-stone-800">
                      Private Reflection Notes
                    </label>
                    <textarea
                      rows={3}
                      value={noteContent}
                      onChange={(e) => setNoteContent(e.target.value)}
                      placeholder="Add reflections, counterparty responses, or outcome milestones..."
                      className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-1 focus:ring-emerald-700"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditingNotesId(null)}
                        className="cursor-pointer px-3 py-1 text-xs text-stone-600 hover:text-stone-900"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleSaveNotes(c.id)}
                        className="cursor-pointer px-3 py-1 text-xs font-semibold text-white bg-stone-900 rounded-md hover:bg-stone-800"
                      >
                        Save Notes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start justify-between gap-4">
                    <div className="text-xs">
                      <span className="font-semibold text-stone-700">Reflection Journal: </span>
                      <span className="text-stone-600 italic">
                        {c.userNotes || 'No notes added yet.'}
                      </span>
                    </div>
                    <button
                      onClick={() => handleStartNotes(c)}
                      className="cursor-pointer text-xs text-emerald-800 font-semibold hover:underline shrink-0"
                    >
                      {c.userNotes ? 'Edit Notes' : '+ Add Notes'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
