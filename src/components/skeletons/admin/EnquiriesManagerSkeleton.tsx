import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonCard, SkeletonBadge } from '../core';

export const EnquiriesManagerSkeleton: React.FC = () => {
  return (
    <div className="space-y-6" aria-label="Enquiries Manager Loading">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <SkeletonHeading level={2} width="w-44" />
          <Skeleton rounded="sm" className="h-3.5 w-60 mt-1 opacity-60" />
        </div>
        <div className="flex items-center gap-2">
          <SkeletonBadge width="w-20" className="bg-cyan-500/20" />
          <SkeletonBadge width="w-16" />
          <SkeletonBadge width="w-20" />
        </div>
      </div>

      {/* Enquiries List Cards */}
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} rounded="2xl" padding="md" className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/5">
              <div className="flex items-center gap-3">
                <Skeleton rounded="full" className="w-10 h-10 bg-cyan-500/15" />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Skeleton rounded="md" className="h-4 w-36" />
                    <Skeleton rounded="full" className="h-4 w-16" />
                  </div>
                  <Skeleton rounded="sm" className="h-3 w-48 opacity-60" />
                </div>
              </div>
              <Skeleton rounded="sm" className="h-3 w-28 opacity-50 font-mono" />
            </div>

            <div className="space-y-2">
              <Skeleton rounded="sm" className="h-3.5 w-40 opacity-70" />
              <Skeleton rounded="md" className="h-4 w-full opacity-80" />
              <Skeleton rounded="md" className="h-4 w-4/5 opacity-80" />
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <div className="flex items-center gap-2">
                <Skeleton rounded="full" className="h-6 w-24" />
                <Skeleton rounded="full" className="h-6 w-20" />
              </div>
              <Skeleton rounded="lg" className="h-8 w-24" />
            </div>
          </SkeletonCard>
        ))}
      </div>
    </div>
  );
};
