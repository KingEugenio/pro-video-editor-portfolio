import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonAvatar, SkeletonText } from '../core';

export const TestimonialsManagerSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Testimonials Manager Loading">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <SkeletonHeading level={2} width="w-64" />
          <Skeleton rounded="sm" className="h-3.5 w-80 max-w-full opacity-60" />
        </div>
        <SkeletonButton size="md" variant="rounded" width="w-36" className="bg-cyan-500/20 shrink-0" />
      </div>

      {/* Testimonials Grid matching TestimonialsManager */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} rounded="2xl" padding="md" className="space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              {/* Stars and Action buttons */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Skeleton key={s} rounded="full" className="w-3.5 h-3.5 bg-amber-400/20" />
                  ))}
                </div>
                <div className="flex items-center gap-1.5">
                  <Skeleton rounded="lg" className="w-7 h-7" />
                  <Skeleton rounded="lg" className="w-7 h-7" />
                </div>
              </div>

              {/* Quote Text */}
              <SkeletonText lines={3} size="sm" />
            </div>

            {/* Author / Client Info */}
            <div className="flex items-center gap-3 pt-3 border-t border-white/5">
              <SkeletonAvatar size="sm" />
              <div className="space-y-1 flex-1 min-w-0">
                <Skeleton rounded="md" className="h-4 w-28" />
                <Skeleton rounded="sm" className="h-3 w-20 opacity-60" />
              </div>
              <Skeleton rounded="full" className="h-5 w-14" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  );
};
