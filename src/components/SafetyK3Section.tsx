import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  DoorOpen,
  Footprints,
  Hand,
  ShieldAlert,
  Sparkles,
  Trash2,
  X,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  getK3SafetyGuidelines,
  MASCOT_IMAGES,
  SafetyGuideline,
} from '../data/careToonData';
import { MascotImage } from './MascotImage';

function SafetyIcon({
  iconName,
  className = 'h-7 w-7',
}: {
  iconName: SafetyGuideline['iconName'];
  className?: string;
}) {
  switch (iconName) {
    case 'hand-wash':
      return <Hand className={className} aria-hidden="true" />;
    case 'mask':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'trash':
      return <Trash2 className={className} aria-hidden="true" />;
    case 'exit':
      return <DoorOpen className={className} aria-hidden="true" />;
    case 'walk-safe':
      return <Footprints className={className} aria-hidden="true" />;
    case 'shield-alert':
      return <ShieldAlert className={className} aria-hidden="true" />;
  }
}

export function SafetyK3Section() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const { lang, t } = useLanguage();
  const guidelines = getK3SafetyGuidelines(lang);

  const selectedItem = selectedIndex !== null ? guidelines[selectedIndex] : null;

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedIndex(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIndex((prev) => (prev === null ? null : (prev + 1) % guidelines.length));
      } else if (e.key === 'ArrowLeft') {
        setSelectedIndex((prev) =>
          prev === null ? null : (prev - 1 + guidelines.length) % guidelines.length
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, guidelines.length]);

  return (
    <section id="safety-k3" className="py-20 sm:py-24 bg-[#F7FAFD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-bold text-[#2F5FB3] mb-2">{t.safety.kicker}</p>
          <h2
            className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F3A70] tracking-tight mb-3"
            style={{ textWrap: 'balance' }}
          >
            {t.safety.title}
          </h2>
          <p className="text-base text-[#364F7B] leading-relaxed">{t.safety.subtitle}</p>
        </motion.div>

        {/* Clickable Icon Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {guidelines.map((item, idx) => (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => setSelectedIndex(idx)}
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.45, delay: idx * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group text-left rounded-3xl bg-white p-6 border border-[#D4E3F5] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-[#2F5FB3]/60 hover:shadow-[0_16px_34px_-14px_rgba(47,95,179,0.25)] cursor-pointer flex items-start gap-4"
            >
              <div
                className={`h-14 w-14 rounded-2xl shrink-0 flex items-center justify-center ${item.accentClass} transition-transform duration-200 group-hover:scale-105`}
              >
                <SafetyIcon iconName={item.iconName} />
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-display text-lg font-extrabold text-[#1F3A70] group-hover:text-[#2F5FB3] transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-[#4A628D] mt-1">{item.shortTag}</p>
                <span className="inline-block mt-3 text-xs font-bold text-[#2F5FB3] group-hover:underline">
                  {t.safety.openCard}
                </span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Pop-Up Modal Card */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setSelectedIndex(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#1F3A70]/55 backdrop-blur-xs p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="k3-modal-title"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-[#F7FAFD] border border-[#C8DCF4] shadow-2xl p-6 sm:p-8"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 mb-5">
                <div className="flex items-center gap-3.5">
                  <div
                    className={`h-12 w-12 rounded-2xl flex items-center justify-center shrink-0 ${selectedItem.accentClass}`}
                  >
                    <SafetyIcon iconName={selectedItem.iconName} className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#2F5FB3]">
                      {t.safety.modalKicker} · {selectedItem.title}
                    </p>
                    <h3
                      id="k3-modal-title"
                      className="font-display text-xl sm:text-2xl font-extrabold text-[#1F3A70]"
                    >
                      {selectedItem.headline}
                    </h3>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedIndex(null)}
                  aria-label={t.safety.closeModalLabel}
                  className="h-10 w-10 rounded-xl bg-[#DCEBFA]/70 text-[#1F3A70] hover:bg-[#DCEBFA] flex items-center justify-center shrink-0 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="text-sm sm:text-base text-[#364F7B] leading-relaxed mb-6">
                {selectedItem.explanation}
              </p>

              {/* Do's and Avoids */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl bg-[#BFE8D6]/35 border border-[#96D5BA] p-4">
                  <h4 className="font-display text-sm font-extrabold text-[#14533D] mb-2.5 flex items-center gap-1.5">
                    <Check className="h-4 w-4" aria-hidden="true" />
                    {t.safety.doTitle}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#1F3A70]">
                    {selectedItem.doItems.map((doItem, i) => (
                      <li key={i} className="leading-snug">
                        • {doItem}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl bg-[#FFE5D6]/50 border border-[#F6BFA1] p-4">
                  <h4 className="font-display text-sm font-extrabold text-[#8A3412] mb-2.5 flex items-center gap-1.5">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    {t.safety.avoidTitle}
                  </h4>
                  <ul className="space-y-2 text-sm text-[#1F3A70]">
                    {selectedItem.avoidItems.map((avoidItem, i) => (
                      <li key={i} className="leading-snug">
                        • {avoidItem}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Mascot Thumbs-up Tip */}
              <div className="rounded-2xl bg-[#EEF5FC] border border-[#CFE0F5] p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 mb-6">
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 bg-[#F7FAFD] border border-[#D4E3F5]">
                  <MascotImage
                    src={MASCOT_IMAGES.thumbsUpSafety}
                    alt={t.safety.mascotAlt}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center sm:text-left">
                  <p className="text-xs font-extrabold text-[#2F5FB3] mb-1">
                    {t.safety.mascotTipTitle}
                  </p>
                  <p className="text-sm sm:text-base text-[#1F3A70] font-medium leading-relaxed">
                    “{selectedItem.mascotTip}”
                  </p>
                </div>
              </div>

              {/* Modal Footer Navigation */}
              <div className="flex items-center justify-between pt-2 border-t border-[#DCE8F6]">
                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev === null ? 0 : (prev - 1 + guidelines.length) % guidelines.length
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-[#1F3A70] hover:bg-[#DCEBFA] transition-colors cursor-pointer"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  {t.safety.prevTopic}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedIndex((prev) =>
                      prev === null ? 0 : (prev + 1) % guidelines.length
                    )
                  }
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#FFC93C] text-sm font-extrabold text-[#1F3A70] hover:bg-[#FFD35C] transition-colors cursor-pointer"
                >
                  {t.safety.nextTopic}
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
