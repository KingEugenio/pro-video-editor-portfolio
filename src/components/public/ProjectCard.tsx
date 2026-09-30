import React, { useState } from 'react';
import { Play, ArrowUpRight, Smartphone, Monitor, Film } from 'lucide-react';
import { motion } from 'motion/react';
import { Project, VideoItem } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';

interface ProjectCardProps {
  project: Project;
  onSelectProject: (project: Project) => void;
  layoutStyle?: string;
  isFeaturedItem?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onSelectProject,
  layoutStyle = 'mixed',
  isFeaturedItem = false,
}) => {
  const { brandTheme } = usePortfolio();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const mainVideo: VideoItem | undefined = project.videos.find((v) => v.type === 'main') || project.videos[0];
  const verticalCut: VideoItem | undefined = project.videos.find((v) => v.orientation === 'portrait' || v.type === 'vertical_cut');
  const isVertical = mainVideo?.orientation === 'portrait';

  return (
    <motion.article
      id={`project-card-${project.id}`}
      aria-labelledby={`project-title-${project.id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelectProject(project)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl overflow-hidden bg-[#0e0e14]/80 border border-white/8 hover:border-cyan-500/40 transition-all duration-500 shadow-xl cursor-pointer flex flex-col ${
        isFeaturedItem ? 'md:col-span-2 lg:col-span-2' : ''
      }`}
    >
      {/* Subtle Aurora Ambient Glow on Hover */}
      <div
        className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none -z-10"
        style={{
          background: `radial-gradient(circle at center, ${brandTheme.colors.primary}44 0%, ${brandTheme.colors.secondary}22 60%, transparent 80%)`,
        }}
      />

      {/* Media Figure Container */}
      <figure
        className={`relative w-full overflow-hidden bg-[#050508] m-0 ${
          isFeaturedItem ? 'aspect-video md:aspect-[21/9]' : isVertical ? 'aspect-[9/15]' : 'aspect-video'
        }`}
      >
        {/* Skeleton placeholder before image load */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-white/[0.04] skeleton-shimmer-effect" aria-hidden="true" />
        )}

        <img
          src={project.thumbnail}
          alt={`${project.title} - ${project.category} editorial case study for ${project.client}`}
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          loading="lazy"
        />

        {/* Dark Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e14] via-transparent to-black/30 pointer-events-none" />

        {/* Top Floating Badges */}
        <div className="absolute top-3.5 inset-x-3.5 flex items-center justify-between z-10">
          <span className="px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/10 text-[11px] font-mono font-medium text-neutral-200">
            {project.category}
          </span>
          <div className="flex items-center gap-1.5">
            {verticalCut && !isVertical && (
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-950/80 border border-purple-500/30 text-purple-300 text-[10px] font-mono">
                <Smartphone className="w-3 h-3" /> 9:16 Cut
              </span>
            )}
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-black/75 border border-white/10 text-cyan-300 text-[10px] font-mono">
              {isVertical ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
              {isVertical ? '9:16' : '16:9'}
            </span>
          </div>
        </div>

        {/* Play Icon Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-300"
            style={{
              backgroundColor: brandTheme.colors.button || brandTheme.colors.primary,
              color: brandTheme.colors.buttonText || '#000',
            }}
          >
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
        </div>

        {/* Video stream count indicator */}
        {project.videos.length > 1 && (
          <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-neutral-300">
            {project.videos.length} Angles & Cuts
          </div>
        )}
      </figure>

      {/* Card Figcaption & Article Info Content */}
      <figcaption className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4 text-left">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 mb-1.5 font-mono">
            <span>{project.client}</span>
            <time dateTime={String(project.year)}>{project.year}</time>
          </div>
          <h3
            id={`project-title-${project.id}`}
            className="font-heading text-lg sm:text-xl font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1"
          >
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1.5 line-clamp-2 font-body leading-relaxed">
            {project.brief || project.resultStory || 'Cinematic post-production, sound design, and color grading.'}
          </p>
        </div>

        {/* Tags / Software & Action */}
        <div className="pt-3 border-t border-white/6 flex items-center justify-between">
          <div className="flex items-center gap-1.5 flex-wrap">
            {project.software.slice(0, 2).map((soft) => (
              <span
                key={soft}
                className="text-[10px] px-2.5 py-0.5 rounded-full bg-white/5 text-neutral-300 border border-white/5 font-mono"
              >
                {soft}
              </span>
            ))}
          </div>

          <span className="text-xs font-button font-bold tracking-wider uppercase text-cyan-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            Case Study <ArrowUpRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </figcaption>
    </motion.article>
  );
};
