import React, { useState } from 'react';
import { Play, ArrowRight, Film, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { VideoPlayer } from '../ui/VideoPlayer';
import { KineticHeading } from '../ui/KineticHeading';

interface HeroSectionProps {
  onExploreWork: () => void;
  onBookProject: () => void;
  onOpenShowreel: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreWork,
  onBookProject,
  onOpenShowreel,
}) => {
  const { brandTheme } = usePortfolio();
  const kinetic = brandTheme.kineticTypography || {
    enabled: true,
    heroHeadline: 'TURNING FOOTAGE INTO IMPACT.',
    heroSubheadline: brandTheme.bio,
  };

  const heroVideoData = {
    id: 'hero-showreel-video',
    title: `${brandTheme.brandName} 2026 Showreel`,
    url: brandTheme.heroVideoUrl,
    provider: brandTheme.heroVideoType,
    orientation: 'landscape' as const,
    aspectRatio: '16:9',
    thumbnail: brandTheme.heroPosterUrl,
  };

  const headline = kinetic.heroHeadline || 'TURNING FOOTAGE INTO IMPACT.';
  const subheadline = kinetic.heroSubheadline || brandTheme.bio;

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Kinetic Typography & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Kinetic Hero Headline */}
            <KineticHeading
              as="h1"
              text={headline}
              splitBy="words"
              highlightWords={['IMPACT.', 'STORIES.', 'FOOTAGE', 'VISION']}
              highlightColor={brandTheme.colors.primary}
              className="text-4xl sm:text-6xl xl:text-7xl font-extrabold tracking-tight text-white leading-[1.05]"
            />

            {/* Editor Subheadline / Bio */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-neutral-300 max-w-xl font-body leading-relaxed"
            >
              {subheadline}
            </motion.p>

            {/* Action Buttons with subtle Aurora glow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <button
                id="hero-book-btn"
                onClick={onBookProject}
                className="group relative px-8 py-3.5 rounded-full font-button font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl cursor-pointer overflow-hidden"
                style={{
                  backgroundColor: brandTheme.colors.button || brandTheme.colors.primary,
                  color: brandTheme.colors.buttonText || '#050508',
                }}
              >
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md pointer-events-none"
                  style={{
                    background: `linear-gradient(90deg, ${brandTheme.colors.primary}, ${brandTheme.colors.secondary})`,
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  Start a Project
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </button>

              <button
                id="hero-explore-work-btn"
                onClick={onExploreWork}
                className="flex items-center gap-2 px-7 py-3.5 rounded-full font-button font-bold text-xs uppercase tracking-wider text-neutral-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 backdrop-blur-xl transition-all duration-200 cursor-pointer"
              >
                Selected Work
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>

            {/* Editor Stats Ticker */}
            {brandTheme.showStats && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="grid grid-cols-3 gap-6 pt-6 border-t border-white/10 max-w-lg"
              >
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    {brandTheme.yearsExperience}
                  </span>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-mono">
                    Experience
                  </span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    {brandTheme.projectsCompleted}
                  </span>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-mono">
                    Cuts Delivered
                  </span>
                </div>
                <div>
                  <span className="block text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                    {brandTheme.happyClients}
                  </span>
                  <span className="text-[11px] text-neutral-400 uppercase tracking-widest font-mono">
                    Global Clients
                  </span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column: Cinematic Showreel Centerpiece */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="relative group"
            >
              {/* Subtle Aurora Rim Lighting */}
              <div
                className="absolute -inset-1 rounded-3xl opacity-40 group-hover:opacity-80 transition-opacity duration-700 blur-xl pointer-events-none"
                style={{
                  background: `linear-gradient(135deg, ${brandTheme.colors.primary}66, ${brandTheme.colors.secondary}44, transparent 70%)`,
                }}
              />

              {/* Showcase Container */}
              <div className="relative rounded-2xl overflow-hidden border border-white/12 bg-[#0d0d12]/90 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-2">
                <VideoPlayer
                  video={heroVideoData}
                  poster={brandTheme.heroPosterUrl}
                  autoPlay={false}
                  showBadge={true}
                  className="w-full rounded-xl aspect-video object-cover"
                />

                {/* Showreel Footer Bar */}
                <div className="p-3.5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-mono font-medium text-neutral-300">
                      SHOWREEL 2026 • 4K DCI
                    </span>
                  </div>
                  <button
                    onClick={onOpenShowreel}
                    className="text-xs font-semibold uppercase tracking-wider text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    Theater View
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};
