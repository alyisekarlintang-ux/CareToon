import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  const navLinks = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.admin, href: '#administration-flow' },
    { label: t.nav.jkn, href: '#jkn-registration' },
    { label: t.nav.safety, href: '#safety-k3' },
    { label: t.nav.videos, href: '#videos' },
  ];

  const handleLinkClick = () => {
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#F7FAFD]/95 backdrop-blur-md border-b border-[#D6E4F5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <a
          href="#home"
          className="font-display text-2xl font-extrabold tracking-tight text-[#1F3A70] whitespace-nowrap shrink-0 hover:text-[#2F5FB3] transition-colors"
        >
          Care-Toon
        </a>

        {/* Zone 2: Clean single-line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#1F3A70]/85"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#2F5FB3] transition-colors after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-[#FFC93C] after:transition-all hover:after:w-full"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action + Mobile Menu Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center justify-center px-4 py-2 text-sm font-bold rounded-xl bg-[#2F5FB3] text-white hover:bg-[#1F3A70] transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            {t.nav.contact}
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-menu"
            aria-label={mobileOpen ? t.nav.closeMenu : t.nav.openMenu}
            className="lg:hidden inline-flex items-center justify-center h-11 w-11 rounded-xl text-[#1F3A70] hover:bg-[#DCEBFA] transition-colors"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Smooth Scroll Progress Indicator */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[3px] w-full origin-left bg-gradient-to-r from-[#2F5FB3] via-[#FFC93C] to-[#2F5FB3]"
      />

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <nav
          id="mobile-nav-menu"
          aria-label="Mobile navigation"
          className="lg:hidden border-t border-[#D6E4F5] bg-[#F7FAFD] px-4 py-4 space-y-2 shadow-md"
        >
          <div className="pb-2 flex justify-center">
            <LanguageSwitcher />
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleLinkClick}
              className="block px-4 py-3 rounded-xl text-base font-semibold text-[#1F3A70] hover:bg-[#DCEBFA] transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={handleLinkClick}
            className="block px-4 py-3 mt-2 rounded-xl text-base font-bold text-center bg-[#2F5FB3] text-white hover:bg-[#1F3A70] transition-colors"
          >
            {t.nav.contact}
          </a>
        </nav>
      )}
    </header>
  );
}
