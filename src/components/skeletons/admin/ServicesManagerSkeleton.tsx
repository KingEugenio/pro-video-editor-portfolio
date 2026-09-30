import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonText, SkeletonBadge } from '../core';

export const ServicesManagerSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Services Manager Loading">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <SkeletonHeading level={2} width="w-72" />
          <Skeleton rounded="sm" className="h-3.5 w-96 max-w-full opacity-60" />
        </div>
        <SkeletonButton size="md" variant="rounded" width="w-40" className="bg-cyan-500/20 shrink-0" />
      </div>

      {/* Services Grid matching ServicesManager */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} rounded="2xl" padding="md" className="space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              {/* Card Header: Title and Action icons */}
              <div className="flex items-center justify-between">
                <Skeleton rounded="md" className="h-5 w-44" />
                <div className="flex items-center gap-1.5">
                  <Skeleton rounded="lg" className="w-7 h-7" />
                  <Skeleton rounded="lg" className="w-7 h-7" />
                </div>
              </div>

              {/* Rate and Turnaround Badges */}
              <div className="flex items-center gap-2">
                <SkeletonBadge width="w-24" className="bg-cyan-500/20" />
                <SkeletonBadge width="w-20" />
              </div>

              {/* Description */}
              <SkeletonText lines={2} size="sm" />

              {/* Deliverables Checklist */}
              <div className="space-y-2 pt-3 border-t border-white/5">
                <Skeleton rounded="sm" className="h-3 w-28 opacity-60" />
                <div className="space-y-1.5">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="flex items-center gap-2">
                      <Skeleton rounded="full" className="w-1.5 h-1.5 bg-cyan-400/40" />
                      <Skeleton rounded="md" className="h-3 w-4/5" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom edit CTA */}
            <Skeleton rounded="xl" className="h-9 w-full bg-white/[0.04] mt-2" />
          </SkeletonCard>
        ))}
      </div>
    </div>
  );
};
