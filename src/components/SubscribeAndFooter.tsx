import { FormEvent, useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  ArrowUp,
  CheckCircle2,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MASCOT_IMAGES } from '../data/careToonData';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MascotImage } from './MascotImage';

export function SubscribeAndFooter() {
  const { t } = useLanguage();
  const [email, setEmail] = useState('');
  const [hasValidationError, setHasValidationError] = useState(false);
  const [subscribedEmail, setSubscribedEmail] = useState('');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 420);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmed)) {
      setHasValidationError(true);
      return;
    }
    setHasValidationError(false);
    setSubscribedEmail(trimmed);
    setEmail('');
  };

  const copyrightText = t.footer.copyright.replace(
    '{year}',
    String(new Date().getFullYear())
  );

  return (
    <>
      {/* Email Subscription Section */}
      <section className="py-20 sm:py-24 bg-[#F7FAFD]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="rounded-3xl bg-[#DCEBFA]/70 border border-[#C6DCF5] p-8 sm:p-12 text-center shadow-sm"
          >
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFC93C] text-[#1F3A70] mb-4 shadow-xs">
              <Mail className="h-6 w-6" aria-hidden="true" />
            </div>

            <h2
              className="font-display text-2xl sm:text-3xl font-extrabold text-[#1F3A70] tracking-tight mb-2.5"
              style={{ textWrap: 'balance' }}
            >
              {t.subscribe.title}
            </h2>
            <p className="text-base text-[#2C4470] max-w-xl mx-auto mb-8 leading-relaxed">
              {t.subscribe.subtitle}
            </p>

            {subscribedEmail ? (
              <div
                role="status"
                className="max-w-lg mx-auto rounded-2xl bg-[#BFE8D6] border border-[#84CFB0] px-5 py-4 text-[#14533D] flex flex-col sm:flex-row items-center justify-center gap-3"
              >
                <CheckCircle2 className="h-6 w-6 shrink-0" aria-hidden="true" />
                <div className="text-sm sm:text-base font-semibold text-center sm:text-left">
                  {t.subscribe.successPrefix}{' '}
                  <span className="font-bold">{subscribedEmail}</span>{' '}
                  {t.subscribe.successSuffix}
                </div>
                <button
                  type="button"
                  onClick={() => setSubscribedEmail('')}
                  className="text-xs font-extrabold underline hover:no-underline shrink-0 cursor-pointer"
                >
                  {t.subscribe.addAnother}
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubscribe}
                noValidate
                className="max-w-lg mx-auto space-y-3"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <label htmlFor="newsletter-email" className="sr-only">
                    {t.subscribe.emailLabel}
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (hasValidationError) setHasValidationError(false);
                    }}
                    placeholder={t.subscribe.placeholder}
                    className="flex-1 rounded-2xl bg-[#F7FAFD] border border-[#B8D1EE] px-4 py-3.5 text-base text-[#1F3A70] placeholder:text-[#5F78A0] focus:border-[#2F5FB3]"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3.5 rounded-2xl bg-[#FFC93C] text-[#1F3A70] font-extrabold text-base hover:bg-[#FFD35C] transition-colors shadow-sm cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {t.subscribe.button}
                  </button>
                </div>

                {hasValidationError && (
                  <p role="alert" className="text-sm font-semibold text-[#B42318] text-left px-1">
                    {t.subscribe.invalidEmail}
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* Deep Navy Contact & Footer */}
      <footer id="contact" className="bg-[#1F3A70] text-[#F7FAFD] pt-16 pb-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/15 items-center"
          >
            {/* Brand & Socials */}
            <div className="md:col-span-5 space-y-4">
              <span className="font-display text-3xl font-extrabold tracking-tight text-white block">
                Care-Toon
              </span>
              <p className="text-sm sm:text-base text-[#DCEBFA] leading-relaxed max-w-md">
                {t.footer.description}
              </p>

              <div className="pt-1">
                <LanguageSwitcher variant="dark" />
              </div>

              <div className="flex items-center gap-3 pt-1">
                <a
                  href="#videos"
                  aria-label={t.footer.youtubeLabel}
                  className="h-10 w-10 rounded-xl bg-white/10 hover:bg-[#FFC93C] hover:text-[#1F3A70] flex items-center justify-center transition-colors"
                >
                  <Youtube className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#home"
                  aria-label={t.footer.instagramLabel}
                  className="h-10 w-10 rounded-xl bg-white/10 hover:bg-[#FFC93C] hover:text-[#1F3A70] flex items-center justify-center transition-colors"
                >
                  <Instagram className="h-5 w-5" aria-hidden="true" />
                </a>
                <a
                  href="#home"
                  aria-label={t.footer.facebookLabel}
                  className="h-10 w-10 rounded-xl bg-white/10 hover:bg-[#FFC93C] hover:text-[#1F3A70] flex items-center justify-center transition-colors"
                >
                  <Facebook className="h-5 w-5" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Puskesmas Contact Details */}
            <div className="md:col-span-4 space-y-3.5 text-sm text-[#DCEBFA]">
              <h3 className="font-display text-lg font-extrabold text-white mb-2">
                {t.footer.deskTitle}
              </h3>

              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#FFC93C] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{t.footer.address}</span>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-[#FFC93C] shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <p>{t.footer.hoursLine1}</p>
                  <p>{t.footer.hoursLine2}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#FFC93C] shrink-0" aria-hidden="true" />
                <span className="font-mono tabular-nums">(0274) 555-0192</span>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#FFC93C] shrink-0" aria-hidden="true" />
                <span>info@puskesmas-caretoon.id</span>
              </div>
            </div>

            {/* Small Waving Goodbye Mascot */}
            <div className="md:col-span-3 flex flex-col items-center md:items-end text-center md:text-right">
              <motion.div
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
                className="w-36 h-36 rounded-3xl overflow-hidden bg-[#1F3A70] border border-white/20 shadow-md mb-2.5"
              >
                <MascotImage
                  src={MASCOT_IMAGES.footerGoodbye}
                  alt={t.footer.mascotAlt}
                  className="w-full h-full object-cover"
                  fallbackBg="bg-[#2F5FB3]"
                />
              </motion.div>
              <p className="text-xs font-semibold text-[#BFE8D6]">{t.footer.goodbyeNote}</p>
            </div>
          </motion.div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#DCEBFA]/80">
            <p>{copyrightText}</p>
            <div className="flex items-center gap-4">
              <a href="#administration-flow" className="hover:text-white transition-colors">
                {t.footer.linkAdmin}
              </a>
              <a href="#jkn-registration" className="hover:text-white transition-colors">
                {t.footer.linkJkn}
              </a>
              <a href="#safety-k3" className="hover:text-white transition-colors">
                {t.footer.linkSafety}
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back-to-Top Floating Button */}
      {showBackToTop && (
        <button
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={t.footer.backToTop}
          className="fixed bottom-5 right-5 z-40 h-12 w-12 rounded-2xl bg-[#FFC93C] text-[#1F3A70] shadow-lg border border-[#E5B024] flex items-center justify-center hover:bg-[#FFD35C] hover:-translate-y-0.5 transition-all cursor-pointer"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  );
}
