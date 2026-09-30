import React from 'react';
import { PublicNavbarSkeleton } from './PublicNavbarSkeleton';
import { HeroSectionSkeleton } from './HeroSectionSkeleton';
import { PortfolioSectionSkeleton } from './PortfolioSectionSkeleton';
import { ServicesSectionSkeleton } from './ServicesSectionSkeleton';
import { AboutSectionSkeleton } from './AboutSectionSkeleton';
import { TestimonialsSectionSkeleton } from './TestimonialsSectionSkeleton';
import { ContactBookingSectionSkeleton } from './ContactBookingSectionSkeleton';
import { PublicFooterSkeleton } from './PublicFooterSkeleton';

export interface PublicPageSkeletonProps {
  layout?: 'grid' | 'masonry' | 'bento';
}

export const PublicPageSkeleton: React.FC<PublicPageSkeletonProps> = ({
  layout = 'grid',
}) => {
  return (
    <div className="min-h-screen bg-[#07070a] text-neutral-100 selection:bg-cyan-500/30">
      <PublicNavbarSkeleton />
      <main>
        <HeroSectionSkeleton />
        <PortfolioSectionSkeleton layout={layout} />
        <ServicesSectionSkeleton />
        <AboutSectionSkeleton />
        <TestimonialsSectionSkeleton />
        <ContactBookingSectionSkeleton />
      </main>
      <PublicFooterSkeleton />
    </div>
  );
};
