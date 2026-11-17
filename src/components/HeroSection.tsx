import { motion } from 'motion/react';
import { ArrowRight, ClipboardList, PlayCircle, ShieldCheck, HeartPulse } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import {
  getServiceOverviewCards,
  MASCOT_IMAGES,
  ServiceOverviewCard,
} from '../data/careToonData';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MascotImage } from './MascotImage';

function ServiceCardIcon({ iconName }: { iconName: ServiceOverviewCard['iconName'] }) {
  switch (iconName) {
    case 'clipboard':
      return <ClipboardList className="h-7 w-7 text-[#2F5FB3]" aria-hidden="true" />;
    case 'shield-card':
      return <ShieldCheck className="h-7 w-7 text-[#1B6E54]" aria-hidden="true" />;
    case 'heart-safety':
      return <HeartPulse className="h-7 w-7 text-[#D95D39]" aria-hidden="true" />;
  }
}

export function HeroSection() {
  const { lang, t } = useLanguage();
  const serviceCards = getServiceOverviewCards(lang);

  return (
    <section
      id="home"
      className="relative overflow-hidden bg-gradient-to-b from-[#DCEBFA]/70 via-[#EEF5FC] to-[#F7FAFD] pt-8 pb-20 sm:pt-12 sm:pb-24"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero Language Switcher Toolbar */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 flex justify-start sm:justify-end"
        >
          <LanguageSwitcher />
        </motion.div>

        {/* Hero Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-6"
          >
            <p className="text-sm font-bold tracking-wide text-[#2F5FB3]">{t.hero.kicker}</p>

            <h1
              className="font-display font-extrabold text-[#1F3A70] tracking-tight leading-[1.12]"
              style={{
                fontSize: 'clamp(2.25rem, 4vw, 3.35rem)',
                textWrap: 'balance',
              }}
            >
              {t.hero.headline}
            </h1>

            <p className="text-base sm:text-lg text-[#2C4470] leading-relaxed max-w-xl">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#administration-flow"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#FFC93C] text-[#1F3A70] font-extrabold text-base shadow-sm hover:bg-[#FFD35C] hover:-translate-y-0.5 transition-all whitespace-nowrap shrink-0"
              >
                {t.hero.startBtn}
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>

              <a
                href="#videos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-[#F7FAFD] text-[#2F5FB3] border-2 border-[#2F5FB3]/25 font-bold text-base hover:bg-[#DCEBFA]/70 hover:border-[#2F5FB3] transition-all whitespace-nowrap shrink-0"
              >
                <PlayCircle className="h-5 w-5" aria-hidden="true" />
                {t.hero.watchBtn}
              </a>
            </div>
          </motion.div>

          {/* Hero Waving Mascot Showcase */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <div className="relative rounded-3xl bg-[#F7FAFD] p-3 sm:p-4 border border-[#C8DCF4] shadow-[0_20px_50px_-20px_rgba(31,58,112,0.22)]">
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                className="overflow-hidden rounded-2xl bg-[#DCEBFA]"
              >
                <MascotImage
                  src={MASCOT_IMAGES.heroWaving}
                  alt={t.hero.mascotAlt}
                  className="w-full h-auto aspect-[4/3] object-cover"
                />
              </motion.div>

              <div className="mt-3 px-2 py-1.5 flex flex-wrap items-center justify-between gap-2 text-sm text-[#1F3A70]">
                <span className="font-bold">{t.hero.mascotName}</span>
                <span className="text-[#2F5FB3] font-medium">{t.hero.mascotRole}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 3 Clickable Service Cards with Staggered Scroll Reveal */}
        <div className="mt-16 sm:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {serviceCards.map((card, idx) => (
            <motion.a
              key={card.id}
              href={`#${card.targetId}`}
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.45, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col justify-between rounded-3xl bg-[#F7FAFD] p-7 border border-[#D4E3F5] shadow-sm transition-all duration-200 hover:-translate-y-1.5 hover:border-[#2F5FB3]/50 hover:shadow-[0_18px_38px_-14px_rgba(47,95,179,0.28)]"
            >
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div
                    className={`h-14 w-14 rounded-2xl flex items-center justify-center ${card.accentBg} transition-transform duration-200 group-hover:scale-105`}
                  >
                    <ServiceCardIcon iconName={card.iconName} />
                  </div>
                  <span className="font-mono text-sm font-semibold tabular-nums text-[#2F5FB3]/70">
                    {card.index}
                  </span>
                </div>

                <h2 className="font-display text-xl font-extrabold text-[#1F3A70] mb-2.5">
                  {card.title}
                </h2>

                <p className="text-sm sm:text-base text-[#364F7B] leading-relaxed">
                  {card.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#E4EEF9] flex items-center justify-between text-sm font-bold text-[#2F5FB3] group-hover:text-[#1F3A70] transition-colors">
                <span>{t.hero.learnMore}</span>
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
