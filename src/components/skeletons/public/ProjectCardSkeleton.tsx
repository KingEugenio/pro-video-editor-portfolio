import React from 'react';
import { Play, ArrowUpRight, Smartphone, Monitor } from 'lucide-react';
import { Skeleton, SkeletonBadge, SkeletonText } from '../core';

export interface ProjectCardSkeletonProps {
  layout?: 'grid' | 'masonry' | 'bento';
  index?: number;
  orientation?: 'landscape' | 'portrait';
}

export const ProjectCardSkeleton: React.FC<ProjectCardSkeletonProps> = ({
  layout = 'grid',
  index = 0,
  orientation = 'landscape',
}) => {
  const isPortrait = orientation === 'portrait';
  const isBentoHero = layout === 'bento' && index === 0;

  const aspectClass = isBentoHero
    ? 'aspect-video md:aspect-[21/9]'
    : isPortrait
    ? 'aspect-[9/15]'
    : 'aspect-video';

  return (
    <article
      className={`group relative rounded-2xl overflow-hidden bg-[#0e0e14]/80 border border-white/10 shadow-xl flex flex-col ${
        isBentoHero ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
      aria-hidden="true"
    >
      {/* Media Figure Placeholder */}
      <figure className={`relative w-full overflow-hidden bg-[#050508] m-0 ${aspectClass}`}>
        {/* Full Image Shimmer */}
        <div className="absolute inset-0 skeleton-base skeleton-shimmer-effect" />

        {/* Dark Vignette Overlay matching ProjectCard */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-black/40 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
          <div className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 flex items-center gap-1.5">
            <Skeleton rounded="sm" className="h-3 w-16" />
          </div>
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/75 border border-white/10 text-cyan-300 text-[10px] font-mono">
              {isPortrait ? <Smartphone className="w-3 h-3 text-cyan-400" /> : <Monitor className="w-3 h-3 text-cyan-400" />}
              <Skeleton rounded="sm" className="h-2.5 w-7" />
            </div>
          </div>
        </div>

        {/* Center Play Icon Indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-cyan-400/20 border border-cyan-400/30 flex items-center justify-center shadow-2xl backdrop-blur-md">
            <Play className="w-6 h-6 text-cyan-300 fill-cyan-400/40 ml-0.5" />
          </div>
        </div>

        {/* Bottom Multi-Cut Angle Badge */}
        <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-1">
          <Skeleton rounded="sm" className="h-2.5 w-20" />
        </div>
      </figure>

      {/* Card Figcaption & Article Info Content */}
      <figcaption className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 text-left">
        <div>
          {/* Client & Year Row */}
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
            <Skeleton rounded="sm" className="h-3.5 w-24" />
            <Skeleton rounded="sm" className="h-3.5 w-10" />
          </div>

          {/* Project Title */}
          <Skeleton rounded="lg" className="h-6 w-4/5 mb-2" />

          {/* 2-line brief */}
          <SkeletonText lines={2} size="sm" lastLineWidth="w-3/4" />
        </div>

        {/* Software Tags & Action Button */}
        <div className="pt-3 border-t border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            <Skeleton rounded="full" className="h-5 w-16" />
            <Skeleton rounded="full" className="h-5 w-20" />
          </div>

          <div className="flex items-center gap-1 text-cyan-400 font-button font-bold text-xs uppercase tracking-wider">
            <Skeleton rounded="sm" className="h-3.5 w-16 bg-cyan-500/20" />
            <ArrowUpRight className="w-3.5 h-3.5 text-cyan-400/60" />
          </div>
        </div>
      </figcaption>
    </article>
  );
};
