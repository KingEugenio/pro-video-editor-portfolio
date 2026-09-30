import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonInput } from '../core';

export const SettingsManagerSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Settings Loading">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <SkeletonHeading level={2} width="w-44" />
          <Skeleton rounded="sm" className="h-3.5 w-64 mt-1 opacity-60" />
        </div>
        <SkeletonButton size="md" variant="rounded" width="w-32" className="bg-cyan-500/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <SkeletonCard rounded="2xl" padding="lg" className="space-y-6">
            <Skeleton rounded="md" className="h-5 w-40" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonInput labelWidth="w-24" />
              <SkeletonInput labelWidth="w-28" />
            </div>

            <SkeletonInput labelWidth="w-36" />
            <SkeletonInput type="textarea" labelWidth="w-40" />

            <div className="space-y-3 pt-4 border-t border-white/5">
              <Skeleton rounded="sm" className="h-3.5 w-32 opacity-70" />
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton rounded="md" className="h-4 w-32" />
                  <Skeleton rounded="sm" className="h-3 w-48 opacity-60" />
                </div>
                <Skeleton rounded="full" className="w-11 h-6 bg-white/10" />
              </div>
            </div>
          </SkeletonCard>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <SkeletonCard rounded="2xl" padding="md" className="space-y-4">
            <Skeleton rounded="sm" className="h-3.5 w-28 opacity-70" />
            <div className="space-y-2">
              <Skeleton rounded="lg" className="h-9 w-full bg-white/5" />
              <Skeleton rounded="lg" className="h-9 w-full bg-white/5" />
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
};
