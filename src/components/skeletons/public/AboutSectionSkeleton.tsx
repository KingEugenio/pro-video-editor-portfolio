import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonText, SkeletonCard } from '../core';

export const AboutSectionSkeleton: React.FC = () => {
  return (
    <section id="about-skeleton" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="About Loading">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Creator Visual & Experience Badge */}
        <div className="lg:col-span-5 relative">
          <div className="relative mx-auto max-w-md">
            <Skeleton rounded="3xl" aspectRatio="4/5" className="w-full shadow-2xl border border-white/10" />
            
            {/* Experience Floating Pill */}
            <div className="absolute -bottom-6 -right-6 p-4 rounded-2xl bg-[#0d0d12] border border-white/10 shadow-2xl space-y-1">
              <Skeleton rounded="md" className="h-6 w-20 bg-cyan-500/20" />
              <Skeleton rounded="sm" className="h-3 w-28 opacity-60" />
            </div>
          </div>
        </div>

        {/* Right Column: Bio, Philosophy & Equipment / Tools */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10">
              <Skeleton rounded="sm" className="h-3 w-24" />
            </div>
            <SkeletonHeading level={2} width="w-4/5" />
          </div>

          <SkeletonText lines={4} size="base" lastLineWidth="w-4/5" />
          <SkeletonText lines={3} size="base" lastLineWidth="w-2/3" />

          {/* Software & Gear Badges */}
          <div className="space-y-3 pt-2">
            <Skeleton rounded="sm" className="h-3.5 w-36 opacity-80 font-mono" />
            <div className="flex flex-wrap gap-2.5">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} rounded="xl" className="h-9 w-28 bg-white/[0.08] border border-white/10" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
