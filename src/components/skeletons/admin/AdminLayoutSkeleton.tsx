import React from 'react';
import { Skeleton, SkeletonAvatar } from '../core';

export interface AdminLayoutSkeletonProps {
  children?: React.ReactNode;
}

export const AdminLayoutSkeleton: React.FC<AdminLayoutSkeletonProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-100 flex" aria-label="Admin Shell Loading">
      {/* Admin Sidebar Skeleton */}
      <aside className="w-64 border-r border-white/10 bg-[#09090e] p-6 hidden lg:flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          {/* Logo / Studio Brand */}
          <div className="flex items-center gap-3">
            <Skeleton rounded="xl" className="w-9 h-9 bg-cyan-500/20" />
            <div className="space-y-1">
              <Skeleton rounded="md" className="h-4 w-24" />
              <Skeleton rounded="sm" className="h-3 w-16 opacity-60" />
            </div>
          </div>

          {/* Navigation links list */}
          <div className="space-y-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-xl">
                <Skeleton rounded="lg" className="w-5 h-5 opacity-70" />
                <Skeleton rounded="md" className={`h-4 ${i === 0 ? 'w-24 bg-cyan-500/20' : 'w-28'}`} />
              </div>
            ))}
          </div>
        </div>

        {/* User Account / Exit Footer */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SkeletonAvatar size="sm" />
            <div className="space-y-1">
              <Skeleton rounded="sm" className="h-3.5 w-20" />
              <Skeleton rounded="sm" className="h-2.5 w-14 opacity-50" />
            </div>
          </div>
          <Skeleton rounded="lg" className="w-6 h-6" />
        </div>
      </aside>

      {/* Main Content Area Skeleton */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header Bar */}
        <header className="h-16 border-b border-white/10 bg-[#09090e]/80 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Skeleton rounded="lg" className="w-8 h-8 lg:hidden" />
            <Skeleton rounded="md" className="h-5 w-40" />
          </div>
          <div className="flex items-center gap-4">
            <Skeleton rounded="full" className="h-8 w-28 bg-white/5" />
            <Skeleton rounded="full" className="w-9 h-9" />
          </div>
        </header>

        {/* Page Inner Container */}
        <main className="p-6 sm:p-8 flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
