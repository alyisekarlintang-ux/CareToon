import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { Language, UI_TRANSLATIONS, UiTranslations } from '../data/translations';

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: UiTranslations;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

const STORAGE_KEY = 'caretoon_language';

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === 'en' || saved === 'id') {
        return saved;
      }
    }
    return 'en';
  });

  const setLang = (nextLang: Language) => {
    setLangState(nextLang);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, nextLang);
    }
  };

  const t = UI_TRANSLATIONS[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = t.pageTitle;
  }, [lang, t.pageTitle]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
