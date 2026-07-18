import { useState } from 'react';
import { Globe, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { languageNames } from '../../utils';
import type { Language } from '../../types';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  const languages: Language[] = ['en', 'es', 'fr', 'ar', 'de'];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-navy-800/60 border border-white/5 text-sm text-navy-200 hover:border-primary-500/30 transition-all"
      >
        <Globe size={16} className="text-primary-400" />
        <span className="hidden sm:inline">{languageNames[language]}</span>
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 mt-2 w-44 glass-strong rounded-xl shadow-glass overflow-hidden z-50 animate-fade-in">
            {languages.map((lang) => (
              <button
                key={lang}
                onClick={() => {
                  setLanguage(lang);
                  setOpen(false);
                }}
                className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-white/5 ${
                  language === lang ? 'text-primary-400' : 'text-navy-200'
                }`}
              >
                {languageNames[lang]}
                {language === lang && <Check size={14} />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
