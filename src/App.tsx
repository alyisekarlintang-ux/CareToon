/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { MotionConfig } from 'motion/react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AdminFlowSection } from './components/AdminFlowSection';
import { JknSection } from './components/JknSection';
import { SafetyK3Section } from './components/SafetyK3Section';
import { VideoSection } from './components/VideoSection';
import { SubscribeAndFooter } from './components/SubscribeAndFooter';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LanguageProvider>
        <div className="min-h-screen flex flex-col bg-[#F7FAFD] text-[#1F3A70]">
          <Navbar />
          <main className="flex-1">
            <HeroSection />
            <AdminFlowSection />
            <JknSection />
            <SafetyK3Section />
            <VideoSection />
          </main>
          <SubscribeAndFooter />
        </div>
      </LanguageProvider>
    </MotionConfig>
  );
}
