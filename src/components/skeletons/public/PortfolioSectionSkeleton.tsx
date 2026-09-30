import React from 'react';
import { Skeleton, SkeletonHeading, SkeletonBadge } from '../core';
import { ProjectCardSkeleton } from './ProjectCardSkeleton';

export interface PortfolioSectionSkeletonProps {
  layout?: 'grid' | 'masonry' | 'bento';
}

export const PortfolioSectionSkeleton: React.FC<PortfolioSectionSkeletonProps> = ({
  layout = 'grid',
}) => {
  return (
    <section
      id="work-skeleton"
      className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
      aria-label="Portfolio Loading"
    >
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Skeleton rounded="full" className="w-2 h-2 bg-cyan-400" />
            <Skeleton rounded="sm" className="h-3.5 w-24 opacity-80" />
          </div>
          <SkeletonHeading level={2} width="w-72 sm:w-96" />
        </div>

        {/* Layout Switcher & View toggles */}
        <div className="flex items-center gap-2 p-1.5 rounded-xl bg-white/[0.04] border border-white/10 self-start md:self-auto">
          <Skeleton rounded="lg" className="w-8 h-8" />
          <Skeleton rounded="lg" className="w-8 h-8" />
          <Skeleton rounded="lg" className="w-8 h-8" />
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-10 pb-2 overflow-x-auto">
        <SkeletonBadge width="w-20" size="md" className="bg-cyan-500/20" />
        <SkeletonBadge width="w-28" size="md" />
        <SkeletonBadge width="w-24" size="md" />
        <SkeletonBadge width="w-32" size="md" />
        <SkeletonBadge width="w-24" size="md" />
        <SkeletonBadge width="w-20" size="md" />
      </div>

      {/* Responsive Projects Grid / Bento / Masonry */}
      {layout === 'bento' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ProjectCardSkeleton layout="bento" index={0} />
          <ProjectCardSkeleton layout="bento" index={1} />
          <ProjectCardSkeleton layout="bento" index={2} />
          <ProjectCardSkeleton layout="bento" index={3} />
          <ProjectCardSkeleton layout="bento" index={4} />
        </div>
      ) : layout === 'masonry' ? (
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
          <ProjectCardSkeleton orientation="portrait" />
          <ProjectCardSkeleton orientation="landscape" />
          <ProjectCardSkeleton orientation="landscape" />
          <ProjectCardSkeleton orientation="portrait" />
          <ProjectCardSkeleton orientation="landscape" />
          <ProjectCardSkeleton orientation="portrait" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProjectCardSkeleton key={i} index={i} orientation={i % 4 === 1 ? 'portrait' : 'landscape'} />
          ))}
        </div>
      )}
    </section>
  );
};
