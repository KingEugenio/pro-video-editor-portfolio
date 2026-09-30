import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonBadge, SkeletonTableRow } from '../core';

export const ProjectsManagerSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Projects Management Loading">
      {/* Top Header & New Project CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <SkeletonHeading level={2} width="w-48" />
          <Skeleton rounded="sm" className="h-3.5 w-60 mt-1 opacity-60" />
        </div>
        <SkeletonButton size="md" variant="rounded" width="w-36" className="bg-cyan-500/20" />
      </div>

      {/* Filter & Search Bar */}
      <SkeletonCard rounded="xl" padding="sm" className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <Skeleton rounded="xl" className="h-10 w-full max-w-sm bg-white/5" />
          <div className="hidden sm:flex items-center gap-2">
            <SkeletonBadge width="w-16" />
            <SkeletonBadge width="w-20" />
            <SkeletonBadge width="w-24" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton rounded="lg" className="w-9 h-9" />
          <Skeleton rounded="lg" className="w-9 h-9" />
        </div>
      </SkeletonCard>

      {/* Projects Table / Card List Skeleton */}
      <SkeletonCard rounded="2xl" padding="none" className="overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <Skeleton rounded="md" className="h-4 w-32" />
          <Skeleton rounded="md" className="h-4 w-20 opacity-60" />
        </div>

        <div className="divide-y divide-white/5">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </div>
      </SkeletonCard>
    </div>
  );
};
