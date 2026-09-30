import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonText, SkeletonButton } from '../core';

export const ServicesSectionSkeleton: React.FC = () => {
  return (
    <section id="services-skeleton" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Services Loading">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10">
          <Skeleton rounded="sm" className="h-3 w-28" />
        </div>
        <SkeletonHeading level={2} className="flex justify-center" width="w-80 sm:w-96" />
        <SkeletonText lines={2} size="base" className="max-w-xl mx-auto" />
      </div>

      {/* Services Grid (3 columns mirroring ServicesSection) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} rounded="3xl" padding="lg" className="space-y-6 bg-[#0e0e14]/90 border border-white/10">
            <div className="flex items-center justify-between">
              <Skeleton rounded="2xl" color="cyan" className="w-14 h-14 shadow-lg shadow-cyan-950/40" />
              <Skeleton rounded="full" className="h-7 w-24" />
            </div>

            <div className="space-y-2">
              <Skeleton rounded="lg" className="h-6 w-3/4" />
              <SkeletonText lines={3} size="sm" />
            </div>

            {/* Deliverables checklist */}
            <div className="pt-4 border-t border-white/10 space-y-2.5">
              {Array.from({ length: 4 }).map((_, j) => (
                <div key={j} className="flex items-center gap-2.5">
                  <span className="w-4 h-4 rounded-full bg-cyan-400/30 border border-cyan-400/50 flex items-center justify-center shrink-0" />
                  <Skeleton rounded="md" className="h-3.5 w-4/5" />
                </div>
              ))}
            </div>

            {/* Booking CTA Button */}
            <SkeletonButton variant="rounded" primary width="w-full" className="mt-4" />
          </SkeletonCard>
        ))}
      </div>
    </section>
  );
};
