import { Languages } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface LanguageSwitcherProps {
  variant?: 'light' | 'dark';
}

export function LanguageSwitcher({ variant = 'light' }: LanguageSwitcherProps) {
  const { lang, setLang, t } = useLanguage();
  const isDark = variant === 'dark';

  return (
    <div
      role="group"
      aria-label={t.languageSwitch.label}
      className={`inline-flex items-center gap-1 p-1 rounded-2xl border ${
        isDark
          ? 'bg-white/10 border-white/20 text-white'
          : 'bg-[#F7FAFD] border-[#C6DCF4] text-[#1F3A70] shadow-xs'
      }`}
    >
      <span
        className={`pl-2.5 pr-1 inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap ${
          isDark ? 'text-[#DCEBFA]' : 'text-[#2F5FB3]'
        }`}
      >
        <Languages className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">{t.languageSwitch.label}:</span>
      </span>

      <button
        type="button"
        onClick={() => setLang('en')}
        aria-pressed={lang === 'en'}
        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
          lang === 'en'
            ? isDark
              ? 'bg-[#FFC93C] text-[#1F3A70]'
              : 'bg-[#2F5FB3] text-white'
            : isDark
            ? 'text-[#DCEBFA] hover:text-white hover:bg-white/10'
            : 'text-[#364F7B] hover:text-[#1F3A70] hover:bg-[#DCEBFA]/60'
        }`}
      >
        EN · {t.languageSwitch.english}
      </button>

      <button
        type="button"
        onClick={() => setLang('id')}
        aria-pressed={lang === 'id'}
        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
          lang === 'id'
            ? isDark
              ? 'bg-[#FFC93C] text-[#1F3A70]'
              : 'bg-[#2F5FB3] text-white'
            : isDark
            ? 'text-[#DCEBFA] hover:text-white hover:bg-white/10'
            : 'text-[#364F7B] hover:text-[#1F3A70] hover:bg-[#DCEBFA]/60'
        }`}
      >
        ID · {t.languageSwitch.indonesian}
      </button>
    </div>
  );
}
