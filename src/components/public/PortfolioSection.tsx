import React, { useState, useMemo, useEffect } from 'react';
import { Search, Film, Filter, Video } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectCard } from './ProjectCard';
import { KineticHeading } from '../ui/KineticHeading';
import { ProjectCardSkeleton } from '../skeletons/public/ProjectCardSkeleton';

interface PortfolioSectionProps {
  onSelectProject: (project: Project) => void;
  isLoading?: boolean;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onSelectProject, isLoading = false }) => {
  const { projects, brandTheme } = usePortfolio();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isFiltering, setIsFiltering] = useState(false);

  const handleCategoryChange = (category: string) => {
    if (category === selectedCategory) return;
    setIsFiltering(true);
    setSelectedCategory(category);
    setTimeout(() => {
      setIsFiltering(false);
    }, 450);
  };

  // Extract unique categories from published projects
  const publishedProjects = useMemo(() => {
    return projects.filter((p) => p.status === 'published');
  }, [projects]);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    cats.add('ALL');
    publishedProjects.forEach((p) => {
      if (p.category) cats.add(p.category);
    });
    return Array.from(cats);
  }, [publishedProjects]);

  // Filter projects by category and search term
  const filteredProjects = useMemo(() => {
    return publishedProjects.filter((p) => {
      const matchCategory = selectedCategory === 'ALL' || p.category === selectedCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        p.software.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchCategory && matchSearch;
    });
  }, [publishedProjects, selectedCategory, searchQuery]);

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header with Kinetic Typography */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116]/80 border border-white/10 text-xs font-mono font-medium text-cyan-300 backdrop-blur-md">
            <Film className="w-3.5 h-3.5" />
            <span>Curated Film & Commercial Showcase</span>
          </div>

          <KineticHeading
            as="h2"
            text="SELECTED WORK"
            highlightWords={['WORK', 'SELECTED']}
            highlightColor={brandTheme.colors.primary}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          />

          <p className="text-sm sm:text-base text-neutral-400 max-w-xl font-body">
            From high-budget commercial spots and music videos to viral short-form retention edits.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            id="portfolio-search-input"
            type="text"
            placeholder="Search client, style, software..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-full bg-[#0e0e14]/90 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50 backdrop-blur-xl transition-colors shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-5 py-2 rounded-full text-xs font-mono uppercase tracking-wider font-semibold whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive
                  ? 'bg-white text-[#050508] shadow-[0_0_20px_rgba(255,255,255,0.2)] font-bold'
                  : 'bg-[#0e0e14]/80 text-neutral-400 border border-white/8 hover:border-white/20 hover:text-white backdrop-blur-md'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Editorial Projects Grid or Skeleton Loading */}
      {isLoading || isFiltering ? (
        brandTheme.portfolioLayout === 'bento' ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ProjectCardSkeleton layout="bento" index={0} />
            <ProjectCardSkeleton layout="bento" index={1} />
            <ProjectCardSkeleton layout="bento" index={2} />
            <ProjectCardSkeleton layout="bento" index={3} />
            <ProjectCardSkeleton layout="bento" index={4} />
          </div>
        ) : brandTheme.portfolioLayout === 'masonry' ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            <ProjectCardSkeleton orientation="portrait" />
            <ProjectCardSkeleton orientation="landscape" />
            <ProjectCardSkeleton orientation="landscape" />
            <ProjectCardSkeleton orientation="portrait" />
            <ProjectCardSkeleton orientation="landscape" />
            <ProjectCardSkeleton orientation="portrait" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProjectCardSkeleton
                key={i}
                layout="grid"
                index={i}
                orientation={i % 3 === 1 ? 'portrait' : 'landscape'}
              />
            ))}
          </div>
        )
      ) : filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => {
            // First project in 'ALL' view can be highlighted featured
            const isFeatured = index === 0 && selectedCategory === 'ALL' && !searchQuery;
            return (
              <ProjectCard
                key={project.id}
                project={project}
                onSelectProject={onSelectProject}
                layoutStyle={brandTheme.portfolioLayout}
                isFeaturedItem={isFeatured}
              />
            );
          })}
        </div>
      ) : (
        <div className="py-20 text-center rounded-2xl border border-white/10 bg-[#0e0e14]/50 backdrop-blur-xl p-8">
          <Video className="w-12 h-12 text-neutral-500 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-white font-heading">No projects found</h3>
          <p className="text-xs text-neutral-400 mt-1 max-w-sm mx-auto font-body">
            {searchQuery
              ? `No projects match "${searchQuery}". Try searching for another keyword or discipline.`
              : 'Check back soon for new case studies.'}
          </p>
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL');
              }}
              className="mt-5 px-5 py-2 rounded-full bg-white/10 text-xs font-semibold text-white hover:bg-white/20 transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      )}
    </section>
  );
};
