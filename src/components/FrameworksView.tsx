import React, { useState } from 'react';
import { CURATED_FRAMEWORKS } from '../data/curatedFrameworks';
import { DomainType, FrameworkProfile } from '../types';
import { Search, BookOpen, Layers } from 'lucide-react';

interface FrameworksViewProps {
  onSelectDomainForScenario: (domain: DomainType) => void;
}

export const FrameworksView: React.FC<FrameworksViewProps> = ({ onSelectDomainForScenario }) => {
  const [filterDomain, setFilterDomain] = useState<DomainType | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFramework, setSelectedFramework] = useState<FrameworkProfile | null>(null);

  const filteredFrameworks = CURATED_FRAMEWORKS.filter((fw) => {
    const matchesDomain = filterDomain === 'all' || fw.domain === filterDomain;
    const matchesSearch =
      fw.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fw.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fw.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      fw.institution.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <span className="text-xs uppercase tracking-wider text-emerald-800 font-semibold">
          Scientific Knowledge Base
        </span>
        <h1 className="text-3xl font-bold tracking-tight text-stone-900 mt-1 mb-2">
          Curated Behavioral Science & Psychology Models
        </h1>
        <p className="text-stone-600 text-sm leading-relaxed max-w-3xl">
          The foundational theories, clinical methodologies, and empirical decision models that power
          Groundwork's feedback engine. Explore the science behind human decision-making and conflict resolution.
        </p>
      </div>

      {/* Search & Domain Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-stone-200">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by model, author, institution..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-700/20 focus:border-emerald-700"
          />
        </div>

        {/* Domain Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto p-1 bg-stone-200/60 rounded-lg text-xs">
          {[
            { id: 'all', label: 'All Frameworks' },
            { id: 'career', label: 'Career' },
            { id: 'relationship', label: 'Relationships' },
            { id: 'finance', label: 'Finance' },
            { id: 'wellness', label: 'Wellness' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterDomain(tab.id as any)}
              className={`cursor-pointer px-3 py-1.5 rounded-md whitespace-nowrap transition-colors font-medium ${
                filterDomain === tab.id
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Framework Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredFrameworks.map((fw) => (
          <div
            key={fw.id}
            className="bg-white rounded-xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-colors shadow-2xs"
          >
            <div>
              <div className="flex items-center justify-between gap-2 text-xs text-stone-500 mb-2">
                <span className="capitalize font-medium text-emerald-800">{fw.domain}</span>
                <span aria-hidden="true">·</span>
                <span>{fw.year}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{fw.institution}</span>
              </div>

              <h2 className="text-lg font-bold text-stone-900 mb-1">{fw.title}</h2>
              <div className="text-xs text-stone-600 font-medium mb-3">{fw.author}</div>

              <p className="text-xs text-stone-600 leading-relaxed mb-4">{fw.summary}</p>

              <div className="p-3 bg-stone-50 rounded-lg border border-stone-200/80 mb-4 text-xs">
                <span className="font-semibold text-stone-900 block mb-0.5">Core Takeaway:</span>
                <p className="text-stone-700 leading-relaxed">{fw.keyTakeaway}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs">
              <div className="flex items-center gap-1.5 text-stone-500">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="truncate max-w-[200px]" title={fw.recommendedReading}>
                  {fw.recommendedReading}
                </span>
              </div>
              <button
                onClick={() => onSelectDomainForScenario(fw.domain)}
                className="cursor-pointer text-emerald-800 font-semibold hover:underline"
              >
                Apply in Advisor →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
