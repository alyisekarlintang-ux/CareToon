import { useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, ChevronDown, Circle, ClipboardCheck, HelpCircle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  getJknDocumentsChecklist,
  getJknFaqs,
  getJknFlowSteps,
} from '../data/careToonData';

export function JknSection() {
  const { lang, t } = useLanguage();
  const flowSteps = getJknFlowSteps(lang);
  const checklist = getJknDocumentsChecklist(lang);
  const faqs = getJknFaqs(lang);

  const [checkedDocs, setCheckedDocs] = useState<Record<string, boolean>>({
    'jkn-card': true,
    ktp: true,
  });
  const [openFaqId, setOpenFaqId] = useState<string>(faqs[0].id);

  const toggleDoc = (id: string) => {
    setCheckedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const checkedCount = checklist.filter((d) => checkedDocs[d.id]).length;
  const requiredComplete = checklist.filter((d) => d.required).every((d) => checkedDocs[d.id]);

  const progressText = t.jkn.checklistProgress
    .replace('{done}', String(checkedCount))
    .replace('{total}', String(checklist.length));

  return (
    <section
      id="jkn-registration"
      className="py-20 sm:py-24 bg-[#DCEBFA]/45 border-y border-[#D4E3F5]"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mb-12"
        >
          <p className="text-sm font-bold text-[#1B6E54] mb-2">{t.jkn.kicker}</p>
          <h2
            className="font-display text-3xl sm:text-4xl font-extrabold text-[#1F3A70] tracking-tight mb-3"
            style={{ textWrap: 'balance' }}
          >
            {t.jkn.title}
          </h2>
          <p className="text-base text-[#364F7B] leading-relaxed">{t.jkn.subtitle}</p>
        </motion.div>

        {/* 5-Step Infographic Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-14">
          {flowSteps.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 26, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl bg-[#F7FAFD] p-6 border border-[#CFE0F5] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#BFE8D6] font-mono text-sm font-bold tabular-nums text-[#1F3A70]">
                    {item.step}
                  </span>
                  {idx < flowSteps.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden lg:inline-block text-[#2F5FB3]/40 font-bold text-lg"
                    >
                      →
                    </span>
                  )}
                </div>
                <h3 className="font-display text-lg font-extrabold text-[#1F3A70] mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-[#364F7B] leading-relaxed">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Interactive Checklist + FAQ Accordion */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Documents You Need Interactive Checklist */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 rounded-3xl bg-[#F7FAFD] border border-[#CFE0F5] p-6 sm:p-8 shadow-sm"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
              <div className="flex items-center gap-2.5">
                <ClipboardCheck className="h-6 w-6 text-[#2F5FB3]" aria-hidden="true" />
                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#1F3A70]">
                  {t.jkn.checklistTitle}
                </h3>
              </div>
              <span className="font-mono text-xs font-bold tabular-nums text-[#2F5FB3]">
                {progressText}
              </span>
            </div>

            <p className="text-sm text-[#364F7B] mb-5">{t.jkn.checklistHint}</p>

            {/* Status Banner (Icon + Explicit Text, never color alone) */}
            <div
              className={`mb-5 rounded-2xl px-4 py-3 text-sm font-semibold flex items-center gap-2.5 border ${
                requiredComplete
                  ? 'bg-[#BFE8D6]/55 border-[#87D1B2] text-[#14533D]'
                  : 'bg-[#FFE8A3]/55 border-[#F2C955] text-[#614200]'
              }`}
            >
              <CheckCircle2 className="h-5 w-5 shrink-0" aria-hidden="true" />
              <span>{requiredComplete ? t.jkn.readyBanner : t.jkn.pendingBanner}</span>
            </div>

            <div className="space-y-3">
              {checklist.map((doc) => {
                const isChecked = !!checkedDocs[doc.id];
                return (
                  <button
                    key={doc.id}
                    type="button"
                    onClick={() => toggleDoc(doc.id)}
                    aria-pressed={isChecked}
                    className={`w-full text-left rounded-2xl p-4 border transition-all cursor-pointer flex items-start gap-3.5 ${
                      isChecked
                        ? 'bg-[#EEF5FC] border-[#2F5FB3]/45'
                        : 'bg-white border-[#DDE8F6] hover:border-[#2F5FB3]/35'
                    }`}
                  >
                    <span className="mt-0.5 shrink-0 text-[#2F5FB3]">
                      {isChecked ? (
                        <CheckCircle2 className="h-5 w-5 text-[#1B6E54]" aria-hidden="true" />
                      ) : (
                        <Circle className="h-5 w-5 text-[#94AED1]" aria-hidden="true" />
                      )}
                    </span>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-baseline gap-2">
                        <span className="text-sm sm:text-base font-bold text-[#1F3A70]">
                          {doc.label}
                        </span>
                        <span className="text-xs font-semibold text-[#2F5FB3]">
                          · {doc.required ? t.jkn.requiredLabel : t.jkn.optionalLabel}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-[#4A628D] mt-1 leading-relaxed">
                        {doc.detail}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* JKN FAQ Accordion */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: 0.08 }}
            className="lg:col-span-6 rounded-3xl bg-[#F7FAFD] border border-[#CFE0F5] p-6 sm:p-8 shadow-sm"
          >
            <div className="flex items-center gap-2.5 mb-2">
              <HelpCircle className="h-6 w-6 text-[#2F5FB3]" aria-hidden="true" />
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[#1F3A70]">
                {t.jkn.faqTitle}
              </h3>
            </div>
            <p className="text-sm text-[#364F7B] mb-6">{t.jkn.faqSubtitle}</p>

            <div className="divide-y divide-[#DCE8F6]">
              {faqs.map((faq) => {
                const isOpen = openFaqId === faq.id;
                return (
                  <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                    <button
                      type="button"
                      onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                      aria-expanded={isOpen}
                      className="w-full flex items-start justify-between gap-4 text-left cursor-pointer group py-1"
                    >
                      <span className="font-display text-base font-bold text-[#1F3A70] group-hover:text-[#2F5FB3] transition-colors">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 text-[#2F5FB3] shrink-0 mt-0.5 transition-transform duration-200 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.18 }}
                        className="mt-2.5 text-sm sm:text-base text-[#364F7B] leading-relaxed pr-6"
                      >
                        {faq.answer}
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
