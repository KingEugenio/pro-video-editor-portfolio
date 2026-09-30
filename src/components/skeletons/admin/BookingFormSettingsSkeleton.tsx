import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonButton, SkeletonInput } from '../core';

export const BookingFormSettingsSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Booking Form Settings Loading">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <SkeletonHeading level={2} width="w-56" />
          <Skeleton rounded="sm" className="h-3.5 w-72 mt-1 opacity-60" />
        </div>
        <SkeletonButton size="md" variant="rounded" width="w-36" className="bg-cyan-500/20" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form Settings */}
        <div className="lg:col-span-8 space-y-6">
          <SkeletonCard rounded="2xl" padding="lg" className="space-y-6">
            <Skeleton rounded="md" className="h-5 w-48" />

            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center justify-between">
                  <div className="space-y-1">
                    <Skeleton rounded="md" className="h-4 w-40" />
                    <Skeleton rounded="sm" className="h-3 w-56 opacity-60" />
                  </div>
                  <Skeleton rounded="full" className="w-11 h-6 bg-white/10" />
                </div>
              ))}
            </div>

            <SkeletonInput labelWidth="w-36" />
            <SkeletonInput type="textarea" labelWidth="w-48" />
          </SkeletonCard>
        </div>

        {/* Right Preview Card */}
        <div className="lg:col-span-4">
          <SkeletonCard rounded="2xl" padding="md" className="space-y-4">
            <Skeleton rounded="sm" className="h-3.5 w-32 opacity-70" />
            <div className="p-4 rounded-xl bg-black/40 border border-white/5 space-y-3">
              <Skeleton rounded="md" className="h-4 w-3/4" />
              <Skeleton rounded="xl" className="h-9 w-full bg-white/5" />
              <Skeleton rounded="xl" className="h-9 w-full bg-white/5" />
              <Skeleton rounded="xl" className="h-9 w-full bg-cyan-500/20" />
            </div>
          </SkeletonCard>
        </div>
      </div>
    </div>
  );
};
