import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonInput, SkeletonText } from '../core';

export const WordPressManagerSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="WordPress Sync Loading">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div className="space-y-1">
          <SkeletonHeading level={2} width="w-80" />
          <Skeleton rounded="sm" className="h-3.5 w-96 max-w-full opacity-60" />
        </div>
        <SkeletonButton size="md" variant="rounded" width="w-40" className="bg-cyan-500/20 shrink-0" />
      </div>

      {/* 2-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings Card (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <SkeletonCard rounded="2xl" padding="lg" className="space-y-6">
            {/* Toggle Enable row */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="space-y-1">
                <Skeleton rounded="md" className="h-4 w-48" />
                <Skeleton rounded="sm" className="h-3 w-72 opacity-60" />
              </div>
              <Skeleton rounded="full" className="w-11 h-6 bg-cyan-500/30" />
            </div>

            {/* Inputs */}
            <div className="space-y-4">
              <div className="space-y-1.5">
                <Skeleton rounded="sm" className="h-3 w-40 opacity-70" />
                <SkeletonInput rounded="xl" />
              </div>
              <div className="space-y-1.5">
                <Skeleton rounded="sm" className="h-3 w-36 opacity-70" />
                <SkeletonInput rounded="xl" />
              </div>
              <div className="space-y-1.5">
                <Skeleton rounded="sm" className="h-3 w-44 opacity-70" />
                <SkeletonInput rounded="xl" />
              </div>
            </div>
          </SkeletonCard>
        </div>

        {/* Sync Controls & Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <SkeletonCard rounded="2xl" padding="lg" className="space-y-5">
            <div className="flex items-center gap-3">
              <Skeleton rounded="xl" className="w-10 h-10 bg-cyan-500/20" />
              <div className="space-y-1">
                <Skeleton rounded="md" className="h-4 w-36" />
                <Skeleton rounded="sm" className="h-3 w-28 opacity-60" />
              </div>
            </div>
            <SkeletonText lines={3} size="sm" />
            <Skeleton rounded="xl" className="h-11 w-full bg-cyan-500/20" />
            <div className="pt-4 border-t border-white/5 space-y-2">
              <div className="flex justify-between">
                <Skeleton rounded="sm" className="h-3 w-24 opacity-60" />
                <Skeleton rounded="sm" className="h-3 w-20" />
              </div>
              <div className="flex justify-between">
                <Skeleton rounded="sm" className="h-3 w-28 opacity-60" />
                <Skeleton rounded="sm" className="h-3 w-16" />
              </div>
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
};
