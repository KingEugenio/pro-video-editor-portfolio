import React from 'react';
import { Skeleton } from '../core/Skeleton';

export const PublicNavbarSkeleton: React.FC = () => {
  return (
    <nav
      className="fixed top-0 inset-x-0 z-50 px-4 sm:px-6 lg:px-8 pt-4 pb-2"
      aria-label="Navigation Loading"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-5 py-3 rounded-full bg-[#08080a]/80 border border-white/10 backdrop-blur-2xl shadow-2xl">
        {/* Brand Mark & Title */}
        <div className="flex items-center gap-3">
          <Skeleton rounded="full" className="w-8 h-8 bg-cyan-500/20" />
          <Skeleton rounded="md" className="h-5 w-28 bg-white/20" />
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-7">
          <Skeleton rounded="md" className="h-4 w-12" />
          <Skeleton rounded="md" className="h-4 w-16" />
          <Skeleton rounded="md" className="h-4 w-12" />
          <Skeleton rounded="md" className="h-4 w-20" />
          <Skeleton rounded="md" className="h-4 w-14" />
        </div>

        {/* Right Action Buttons */}
        <div className="flex items-center gap-3">
          <Skeleton rounded="full" className="h-9 w-28 bg-cyan-500/20" />
          <Skeleton rounded="full" className="h-9 w-9" />
        </div>
      </div>
    </nav>
  );
};
