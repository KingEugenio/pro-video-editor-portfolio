import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonBadge } from '../core';

export const MediaLibrarySkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Media Library Loading">
      {/* Top Header & Upload CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <SkeletonHeading level={2} width="w-52" />
          <Skeleton rounded="sm" className="h-3.5 w-72 mt-1 opacity-60" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonButton size="md" variant="rounded" width="w-32" />
          <SkeletonButton size="md" variant="rounded" width="w-36" className="bg-cyan-500/20" />
        </div>
      </div>

      {/* Storage & Asset Diagnostics Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} rounded="xl" padding="sm" className="space-y-2">
            <div className="flex items-center justify-between">
              <Skeleton rounded="sm" className="h-3 w-20 opacity-60" />
              <Skeleton rounded="full" className="w-2 h-2 bg-cyan-400" />
            </div>
            <Skeleton rounded="md" className="h-6 w-24" />
          </SkeletonCard>
        ))}
      </div>

      {/* Filter / Format / Search Controls Bar */}
      <SkeletonCard rounded="xl" padding="sm" className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-[260px]">
          <Skeleton rounded="xl" className="h-10 w-full max-w-sm bg-white/5" />
          <div className="hidden md:flex items-center gap-2">
            <SkeletonBadge width="w-16" />
            <SkeletonBadge width="w-20" />
            <SkeletonBadge width="w-16" />
            <SkeletonBadge width="w-20" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Skeleton rounded="lg" className="w-9 h-9" />
          <Skeleton rounded="lg" className="w-9 h-9" />
        </div>
      </SkeletonCard>

      {/* Media Grid Showcase (mixing 16:9 and 9:16 portrait assets) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: 8 }).map((_, idx) => {
          const isPortrait = idx % 4 === 1;
          return (
            <div
              key={idx}
              className="rounded-2xl bg-[#0c0c12] border border-white/10 overflow-hidden shadow-lg space-y-3 p-3"
            >
              {/* Media Aspect container */}
              <div
                className={`relative w-full ${
                  isPortrait ? 'aspect-[9/16]' : 'aspect-video'
                } rounded-xl bg-white/[0.04] skeleton-shimmer-effect overflow-hidden`}
              >
                <div className="absolute top-2 inset-x-2 flex items-center justify-between">
                  <Skeleton rounded="full" className="h-5 w-14 bg-black/60" />
                  <Skeleton rounded="full" className="h-5 w-12 bg-black/60" />
                </div>
              </div>

              {/* Title & Metadata */}
              <div className="space-y-1.5 px-1">
                <Skeleton rounded="md" className="h-4 w-4/5" />
                <div className="flex items-center justify-between">
                  <Skeleton rounded="sm" className="h-3 w-16 opacity-60" />
                  <Skeleton rounded="sm" className="h-3 w-12 opacity-50 font-mono" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
