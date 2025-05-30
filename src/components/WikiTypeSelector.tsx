'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { FaBookOpen, FaList, FaBriefcase } from 'react-icons/fa';

export type WikiType = 'comprehensive' | 'concise' | 'business';

interface WikiTypeSelectorProps {
  wikiType: WikiType;
  setWikiType: (value: WikiType) => void;
}

const WikiTypeSelector: React.FC<WikiTypeSelectorProps> = ({
  wikiType,
  setWikiType,
}) => {
  const { messages: t } = useLanguage();

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-[var(--foreground)] mb-2">
        {t.form?.wikiType || 'Wiki Type'}
      </label>
      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => setWikiType('comprehensive')}
          className={`flex items-center justify-between p-3 rounded-md border transition-colors ${
            wikiType === 'comprehensive'
              ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/30 text-[var(--accent-primary)]'
              : 'bg-[var(--background)]/50 border-[var(--border-color)] text-[var(--foreground)] hover:bg-[var(--background)]'
          }`}
        >
          <div className="flex items-center">
            <FaBookOpen className="mr-2" />
            <div className="text-left">
              <div className="font-medium">{t.form?.comprehensive || 'Comprehensive'}</div>
              <div className="text-xs opacity-80">
                {t.form?.comprehensiveDescription || 'Detailed wiki with structured sections and more pages'}
              </div>
            </div>
          </div>
          {wikiType === 'comprehensive' && (
            <div className="ml-2 h-4 w-4 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[var(--accent-primary)]"></div>
            </div>
          )}
        </button>
        
        <button
          type="button"
          onClick={() => setWikiType('concise')}
          className={`flex items-center justify-between p-3 rounded-md border transition-colors ${
            wikiType === 'concise'
              ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/30 text-[var(--accent-primary)]'
              : 'bg-[var(--background)]/50 border-[var(--border-color)] text-[var(--foreground)] hover:bg-[var(--background)]'
          }`}
        >
          <div className="flex items-center">
            <FaList className="mr-2" />
            <div className="text-left">
              <div className="font-medium">{t.form?.concise || 'Concise'}</div>
              <div className="text-xs opacity-80">
                {t.form?.conciseDescription || 'Simplified wiki with fewer pages and essential information'}
              </div>
            </div>
          </div>
          {wikiType === 'concise' && (
            <div className="ml-2 h-4 w-4 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[var(--accent-primary)]"></div>
            </div>
          )}
        </button>

        <button
          type="button"
          onClick={() => setWikiType('business')}
          className={`flex items-center justify-between p-3 rounded-md border transition-colors ${
            wikiType === 'business'
              ? 'bg-[var(--accent-primary)]/10 border-[var(--accent-primary)]/30 text-[var(--accent-primary)]'
              : 'bg-[var(--background)]/50 border-[var(--border-color)] text-[var(--foreground)] hover:bg-[var(--background)]'
          }`}
        >
          <div className="flex items-center">
            <FaBriefcase className="mr-2" />
            <div className="text-left">
              <div className="font-medium">{t.form?.business || 'Business'}</div>
              <div className="text-xs opacity-80">
                {t.form?.businessDescription || 'Business-focused wiki with non-technical language for stakeholders'}
              </div>
            </div>
          </div>
          {wikiType === 'business' && (
            <div className="ml-2 h-4 w-4 rounded-full bg-[var(--accent-primary)]/20 flex items-center justify-center">
              <div className="h-2 w-2 rounded-full bg-[var(--accent-primary)]"></div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default WikiTypeSelector;
