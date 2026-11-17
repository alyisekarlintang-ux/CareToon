import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Clock, FileCheck2, Lightbulb } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getAdminFlowSteps, MASCOT_IMAGES } from '../data/careToonData';
import { MascotImage } from './MascotImage';

export function AdminFlowSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang, t } = useLanguage();
  const steps = getAdminFlowSteps(lang);
  const activeStep = steps[activeIndex];

  const handlePrev = () => {
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
  };

  const stepOfText = t.admin.stepOf
    .replace('{current}', String(activeStep.stepNumber))
    .replace('{total}', String(steps.length));

  const timeText = t.admin.typicalTime.replace('{time}', activeStep.estimatedTime);

  return (
    <section id="administration-flow" className="py-20 sm:py-24 bg-[#F7FAFD]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-bold text-[#2F5FB3] mb-2">{t.admin.kicker}</p>
          <h2
            className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F3A70] tracking-tight mb-3"
            style={{ textWrap: 'balance' }}
          >
            {t.admin.title}
          </h2>
          <p className="text-base text-[#364F7B] leading-relaxed">{t.admin.subtitle}</p>
        </motion.div>

        {/* Interactive Timeline Selector */}
        <div
          role="tablist"
          aria-label={t.admin.tabListLabel}
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8"
        >
          {steps.map((step, index) => {
            const isSelected = index === activeIndex;
            const isVisited = index < activeIndex;
            return (
              <motion.button
                key={step.stepNumber}
                role="tab"
                type="button"
                aria-selected={isSelected}
                aria-controls="admin-step-panel"
                onClick={() => setActiveIndex(index)}
                initial={{ opacity: 0, y: 22, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.12 }}
                transition={{
                  duration: 0.4,
                  delay: index * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`flex flex-col items-start p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#2F5FB3] text-white border-[#2F5FB3] shadow-md -translate-y-0.5'
                    : isVisited
                    ? 'bg-[#DCEBFA]/70 text-[#1F3A70] border-[#BBD4F2] hover:border-[#2F5FB3]/60'
                    : 'bg-white/80 text-[#1F3A70] border-[#D6E4F5] hover:bg-[#DCEBFA]/45 hover:border-[#2F5FB3]/50'
                }`}
              >
                <span
                  className={`font-mono text-xs font-bold tabular-nums mb-1.5 px-2 py-0.5 rounded-lg ${
                    isSelected ? 'bg-[#FFC93C] text-[#1F3A70]' : 'bg-[#DCEBFA] text-[#2F5FB3]'
                  }`}
                >
                  0{step.stepNumber}
                </span>
                <span className="font-display text-sm font-bold leading-snug">
                  {step.shortTitle}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Expanded Step Panel + Mascot Tip */}
        <motion.div
          id="admin-step-panel"
          role="tabpanel"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl bg-[#EEF5FC] border border-[#CFE0F5] p-6 sm:p-8 lg:p-10 shadow-sm"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${lang}-${activeStep.stepNumber}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* Left Detail Explanation */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-3 text-sm text-[#2F5FB3] font-semibold">
                  <span className="font-mono tabular-nums">{stepOfText}</span>
                  <span aria-hidden="true">·</span>
                  <span className="inline-flex items-center gap-1.5 tabular-nums">
                    <Clock className="h-4 w-4" aria-hidden="true" />
                    {timeText}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F3A70]">
                  {activeStep.fullTitle}
                </h3>

                <p className="text-base sm:text-lg font-medium text-[#1F3A70]">
                  {activeStep.summary}
                </p>

                <p className="text-sm sm:text-base text-[#364F7B] leading-relaxed">
                  {activeStep.details}
                </p>

                <div className="rounded-2xl bg-[#F7FAFD] border border-[#D4E3F5] p-4 flex items-start gap-3">
                  <FileCheck2
                    className="h-5 w-5 text-[#2F5FB3] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div className="text-sm text-[#1F3A70]">
                    <span className="font-bold">{t.admin.helpfulToPrepare} </span>
                    <span className="text-[#364F7B]">{activeStep.whatYouNeed}</span>
                  </div>
                </div>

                {/* Step Navigation Controls */}
                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handlePrev}
                    disabled={activeIndex === 0}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#F7FAFD] border border-[#C6DAF2] text-sm font-bold text-[#1F3A70] hover:bg-[#DCEBFA] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                    {t.admin.previous}
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    disabled={activeIndex === steps.length - 1}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#FFC93C] text-sm font-extrabold text-[#1F3A70] hover:bg-[#FFD35C] disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer shadow-sm"
                  >
                    {t.admin.next}
                    <ChevronRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Right Mascot Tip Card */}
              <div className="lg:col-span-5">
                <div className="rounded-3xl bg-[#F7FAFD] border border-[#D4E3F5] p-6 flex flex-col items-center text-center shadow-sm">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-44 h-44 sm:w-48 sm:h-48 rounded-2xl overflow-hidden bg-[#F7FAFD] mb-4"
                  >
                    <MascotImage
                      src={MASCOT_IMAGES.clipboardGuide}
                      alt={t.admin.mascotAlt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>

                  <div className="inline-flex items-center gap-1.5 text-sm font-extrabold text-[#1F3A70] mb-2">
                    <Lightbulb className="h-4 w-4 text-[#D97706]" aria-hidden="true" />
                    <span>{t.admin.mascotTipTitle}</span>
                  </div>

                  <p className="text-sm sm:text-base text-[#364F7B] leading-relaxed">
                    “{activeStep.mascotTip}”
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
