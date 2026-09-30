import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton } from '../core';

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-8" aria-label="Dashboard Loading">
      {/* Top Banner with Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <SkeletonHeading level={2} width="w-56" />
          <Skeleton rounded="sm" className="h-3.5 w-64 mt-1 opacity-60" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonButton size="md" variant="rounded" width="w-36" />
          <SkeletonButton size="md" variant="rounded" width="w-40" className="bg-cyan-500/20" />
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} rounded="2xl" padding="md" className="space-y-3">
            <div className="flex items-center justify-between">
              <Skeleton rounded="sm" className="h-3.5 w-24 opacity-60" />
              <Skeleton rounded="xl" className="w-8 h-8 bg-white/5" />
            </div>
            <div className="flex items-baseline gap-2">
              <Skeleton rounded="lg" className="h-8 w-20" />
              <Skeleton rounded="sm" className="h-3.5 w-12 opacity-60" />
            </div>
            <Skeleton rounded="full" className="h-1.5 w-full bg-white/10" />
          </SkeletonCard>
        ))}
      </div>

      {/* Main Grid: Recent Projects + Google Drive Integration Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <SkeletonCard rounded="2xl" padding="md" className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-white/5">
              <Skeleton rounded="md" className="h-5 w-36" />
              <Skeleton rounded="md" className="h-4 w-20 opacity-60" />
            </div>

            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, idx) => (
                <div key={idx} className="flex items-center gap-3.5 p-2.5 rounded-xl bg-white/[0.02]">
                  <Skeleton rounded="lg" className="w-16 h-10 shrink-0" />
                  <div className="space-y-1 flex-1 min-w-0">
                    <Skeleton rounded="md" className="h-4 w-44" />
                    <Skeleton rounded="sm" className="h-3 w-28 opacity-60" />
                  </div>
                  <Skeleton rounded="full" className="h-5 w-16" />
                </div>
              ))}
            </div>
          </SkeletonCard>
        </div>

        {/* Cloud Storage & Health Card */}
        <div className="space-y-6">
          <SkeletonCard rounded="2xl" padding="md" className="space-y-4">
            <Skeleton rounded="md" className="h-5 w-40" />
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <Skeleton rounded="sm" className="h-3.5 w-28" />
                <Skeleton rounded="full" className="w-2.5 h-2.5 bg-emerald-400" />
              </div>
              <Skeleton rounded="full" className="h-2 w-full bg-white/10" />
              <div className="flex justify-between">
                <Skeleton rounded="sm" className="h-3 w-16 opacity-60" />
                <Skeleton rounded="sm" className="h-3 w-16 opacity-60" />
              </div>
            </div>
          </SkeletonCard>

          <SkeletonCard rounded="2xl" padding="md" className="space-y-3">
            <Skeleton rounded="md" className="h-5 w-32" />
            <div className="space-y-2">
              <Skeleton rounded="lg" className="h-12 w-full bg-white/[0.02]" />
              <Skeleton rounded="lg" className="h-12 w-full bg-white/[0.02]" />
            </div>
          </SkeletonCard>
        </div>

      </div>
    </div>
  );
};
