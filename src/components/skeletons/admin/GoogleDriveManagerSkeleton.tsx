import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonTableRow } from '../core';

export const GoogleDriveManagerSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Google Drive Manager Loading">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <SkeletonHeading level={2} width="w-56" />
          <Skeleton rounded="sm" className="h-3.5 w-72 mt-1 opacity-60" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonButton size="md" variant="rounded" width="w-32" />
          <SkeletonButton size="md" variant="rounded" width="w-36" className="bg-cyan-500/20" />
        </div>
      </div>

      {/* Cloud Account Status & Quota Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <SkeletonCard rounded="2xl" padding="md" className="md:col-span-2 space-y-4 border-cyan-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton rounded="xl" className="w-10 h-10 bg-cyan-500/20" />
              <div className="space-y-1">
                <Skeleton rounded="md" className="h-4 w-36" />
                <Skeleton rounded="sm" className="h-3 w-48 opacity-60" />
              </div>
            </div>
            <Skeleton rounded="full" className="h-6 w-24 bg-emerald-500/20" />
          </div>
          <div className="space-y-2 pt-2 border-t border-white/5">
            <div className="flex justify-between">
              <Skeleton rounded="sm" className="h-3 w-28 opacity-60" />
              <Skeleton rounded="sm" className="h-3 w-20 opacity-60 font-mono" />
            </div>
            <Skeleton rounded="full" className="h-2.5 w-full bg-white/10" />
          </div>
        </SkeletonCard>

        <SkeletonCard rounded="2xl" padding="md" className="space-y-3 flex flex-col justify-between">
          <Skeleton rounded="md" className="h-4 w-32" />
          <div className="space-y-2">
            <Skeleton rounded="xl" className="h-8 w-full bg-white/5" />
            <Skeleton rounded="xl" className="h-8 w-full bg-white/5" />
          </div>
        </SkeletonCard>
      </div>

      {/* Sync File List Table */}
      <SkeletonCard rounded="2xl" padding="none" className="overflow-hidden">
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <Skeleton rounded="md" className="h-4 w-36" />
          <Skeleton rounded="sm" className="h-3 w-24 opacity-60" />
        </div>
        <div className="divide-y divide-white/5">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonTableRow key={i} />
          ))}
        </div>
      </SkeletonCard>
    </div>
  );
};
