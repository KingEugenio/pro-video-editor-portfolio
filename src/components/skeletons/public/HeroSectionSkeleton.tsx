import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonText, SkeletonButton, SkeletonVideo } from '../core';

export const HeroSectionSkeleton: React.FC = () => {
  return (
    <section
      id="hero-skeleton"
      className="relative min-h-[92vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="Hero Loading"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Kinetic Headline & CTAs */}
          <div className="lg:col-span-7 space-y-7 text-left">
            {/* Kinetic Hero Headline */}
            <div className="space-y-3">
              <Skeleton rounded="xl" className="h-12 sm:h-16 xl:h-20 w-full" />
              <div className="flex items-center gap-3">
                <Skeleton rounded="xl" className="h-12 sm:h-16 xl:h-20 w-1/2" />
                <Skeleton rounded="xl" color="cyan" className="h-12 sm:h-16 xl:h-20 w-1/3" />
              </div>
            </div>

            {/* Subheadline / Bio */}
            <SkeletonText lines={3} size="lg" lastLineWidth="w-3/4" className="max-w-xl" />

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <SkeletonButton size="lg" variant="pill" primary width="w-44" />
              <SkeletonButton size="lg" variant="pill" width="w-40" />
            </div>

            {/* Stats Ticker */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-6 max-w-lg">
              <div className="space-y-1.5">
                <Skeleton rounded="md" className="h-8 w-16" />
                <span className="block text-[11px] text-neutral-500 uppercase tracking-widest font-mono font-semibold">
                  Experience
                </span>
              </div>
              <div className="space-y-1.5">
                <Skeleton rounded="md" className="h-8 w-16" />
                <span className="block text-[11px] text-neutral-500 uppercase tracking-widest font-mono font-semibold">
                  Cuts Delivered
                </span>
              </div>
              <div className="space-y-1.5">
                <Skeleton rounded="md" className="h-8 w-16" />
                <span className="block text-[11px] text-neutral-500 uppercase tracking-widest font-mono font-semibold">
                  Global Clients
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Video Player Container */}
          <div className="lg:col-span-5 relative">
            {/* Ambient Aurora glow */}
            <div className="absolute -inset-4 rounded-3xl bg-cyan-500/10 blur-3xl pointer-events-none" />
            <SkeletonVideo aspectRatio="16/9" rounded="3xl" className="shadow-2xl" />
          </div>

        </div>
      </div>
    </section>
  );
};
