import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonAvatar, SkeletonText } from '../core';
import { StarSvgIcon } from '../../icons/CustomSvgIcons';

export const TestimonialsSectionSkeleton: React.FC = () => {
  return (
    <section id="testimonials-skeleton" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto" aria-label="Testimonials Loading">
      <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.06] border border-white/10">
          <Skeleton rounded="sm" className="h-3 w-32" />
        </div>
        <SkeletonHeading level={2} className="flex justify-center" width="w-80 sm:w-96" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} rounded="2xl" padding="lg" className="space-y-6 bg-[#0e0e14]/90 border border-white/10">
            {/* Real SVG Star Ratings */}
            <div className="flex items-center gap-1.5 opacity-60">
              {Array.from({ length: 5 }).map((_, s) => (
                <StarSvgIcon key={s} filled={true} className="w-4 h-4 text-amber-400/70" />
              ))}
            </div>

            <SkeletonText lines={3} size="base" />

            <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
              <SkeletonAvatar size="md" />
              <div className="space-y-1.5 flex-1 min-w-0">
                <Skeleton rounded="md" className="h-4 w-32" />
                <Skeleton rounded="sm" className="h-3 w-24 opacity-60" />
              </div>
            </div>
          </SkeletonCard>
        ))}
      </div>
    </section>
  );
};
