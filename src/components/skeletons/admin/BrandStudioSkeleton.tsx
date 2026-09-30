import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonInput, SkeletonAvatar } from '../core';

export const BrandStudioSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Brand Studio Loading">
      {/* Top Header & Save Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <SkeletonHeading level={2} width="w-48" />
          <Skeleton rounded="sm" className="h-3.5 w-64 mt-1 opacity-60" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonButton size="md" variant="rounded" width="w-32" />
          <SkeletonButton size="md" variant="rounded" width="w-36" className="bg-cyan-500/20" />
        </div>
      </div>

      {/* Tabs navigation pill bar */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit">
        <Skeleton rounded="xl" className="h-9 w-28 bg-cyan-500/20" />
        <Skeleton rounded="xl" className="h-9 w-24" />
        <Skeleton rounded="xl" className="h-9 w-24" />
        <Skeleton rounded="xl" className="h-9 w-24" />
      </div>

      {/* 2-Column Editor + Live Brand Preview Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Controls */}
        <div className="lg:col-span-7 space-y-6">
          <SkeletonCard rounded="2xl" padding="lg" className="space-y-6">
            <Skeleton rounded="md" className="h-5 w-36" />

            {/* Avatar upload row */}
            <div className="flex items-center gap-4">
              <SkeletonAvatar size="xl" />
              <div className="space-y-2 flex-1">
                <Skeleton rounded="sm" className="h-3.5 w-32" />
                <SkeletonButton size="sm" variant="rounded" width="w-28" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonInput labelWidth="w-24" />
              <SkeletonInput labelWidth="w-28" />
            </div>

            <SkeletonInput type="textarea" labelWidth="w-32" />

            {/* Color Palette Swatches */}
            <div className="space-y-3 pt-2">
              <Skeleton rounded="sm" className="h-3.5 w-28 opacity-70" />
              <div className="flex items-center gap-3">
                <Skeleton rounded="xl" className="w-12 h-12" />
                <Skeleton rounded="xl" className="w-12 h-12" />
                <Skeleton rounded="xl" className="w-12 h-12" />
                <Skeleton rounded="xl" className="w-12 h-12" />
              </div>
            </div>
          </SkeletonCard>
        </div>

        {/* Right Live Visual Preview */}
        <div className="lg:col-span-5">
          <SkeletonCard rounded="2xl" padding="md" className="space-y-4 border-cyan-500/20">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <Skeleton rounded="sm" className="h-3.5 w-28 opacity-70" />
              <Skeleton rounded="full" className="h-4 w-12 bg-cyan-500/20" />
            </div>
            
            {/* Live Portfolio Card Simulation */}
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-4">
              <div className="flex items-center gap-3">
                <SkeletonAvatar size="md" />
                <div className="space-y-1">
                  <Skeleton rounded="md" className="h-4 w-28" />
                  <Skeleton rounded="sm" className="h-3 w-36 opacity-60" />
                </div>
              </div>
              <Skeleton rounded="xl" aspectRatio="16/9" className="w-full" />
              <Skeleton rounded="md" className="h-4 w-4/5" />
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
};
