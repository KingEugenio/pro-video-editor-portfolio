import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonInput, SkeletonBadge } from '../core';

export const ProjectEditorSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Project Editor Loading">
      {/* Top Header & Publishing Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <SkeletonHeading level={2} width="w-56" />
          <Skeleton rounded="sm" className="h-3.5 w-64 mt-1 opacity-60" />
        </div>
        <div className="flex items-center gap-3">
          <SkeletonButton size="md" variant="rounded" width="w-28" />
          <SkeletonButton size="md" variant="rounded" width="w-36" className="bg-cyan-500/20" />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 w-fit">
        <Skeleton rounded="xl" className="h-9 w-32 bg-cyan-500/20" />
        <Skeleton rounded="xl" className="h-9 w-28" />
        <Skeleton rounded="xl" className="h-9 w-32" />
        <Skeleton rounded="xl" className="h-9 w-24" />
      </div>

      {/* Editor Body Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-6">
          <SkeletonCard rounded="2xl" padding="lg" className="space-y-6">
            <SkeletonInput labelWidth="w-28" />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <SkeletonInput labelWidth="w-20" />
              <SkeletonInput labelWidth="w-20" />
            </div>

            <SkeletonInput type="textarea" labelWidth="w-32" />

            {/* Video cuts list */}
            <div className="space-y-3 pt-4 border-t border-white/5">
              <div className="flex items-center justify-between">
                <Skeleton rounded="md" className="h-4 w-36" />
                <Skeleton rounded="lg" className="h-8 w-28 bg-cyan-500/20" />
              </div>
              <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <Skeleton rounded="sm" className="h-3.5 w-24" />
                  <Skeleton rounded="sm" className="h-3.5 w-16 opacity-60" />
                </div>
                <SkeletonInput labelWidth="w-20" />
              </div>
            </div>
          </SkeletonCard>
        </div>

        {/* Sidebar Project Settings */}
        <div className="lg:col-span-4 space-y-6">
          <SkeletonCard rounded="2xl" padding="md" className="space-y-4">
            <Skeleton rounded="sm" className="h-3.5 w-28 opacity-70" />
            <Skeleton rounded="2xl" aspectRatio="16/9" className="w-full shadow-lg" />
            <SkeletonButton size="sm" variant="rounded" width="w-full" />
          </SkeletonCard>

          <SkeletonCard rounded="2xl" padding="md" className="space-y-3">
            <Skeleton rounded="sm" className="h-3.5 w-24 opacity-70" />
            <div className="space-y-2">
              <Skeleton rounded="md" className="h-8 w-full bg-white/5" />
              <Skeleton rounded="md" className="h-8 w-full bg-white/5" />
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
};
