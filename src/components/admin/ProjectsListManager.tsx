import React, { useState } from 'react';
import {
  Film,
  Plus,
  Search,
  Trash2,
  Edit3,
  Copy,
  Eye,
  Smartphone,
  Monitor,
  CheckCircle,
  ExternalLink,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';
import { StarSvgIcon } from '../icons/CustomSvgIcons';

interface ProjectsListManagerProps {
  onOpenCreate: () => void;
  onEditProject: (p: Project) => void;
}

export const ProjectsListManager: React.FC<ProjectsListManagerProps> = ({
  onOpenCreate,
  onEditProject,
}) => {
  const { projects, deleteProject, updateProject, addProject, showToast } = usePortfolio();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filtered = projects.filter((p) => {
    const matchSearch =
      searchQuery === '' ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.client.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCategory = categoryFilter === 'ALL' || p.category === categoryFilter;
    const matchStatus = statusFilter === 'ALL' || p.status === statusFilter;
    return matchSearch && matchCategory && matchStatus;
  });

  const handleDuplicate = (p: Project) => {
    const duplicated = addProject({
      ...p,
      title: `${p.title} (Copy)`,
      slug: `${p.slug}-copy`,
      status: 'draft',
    });
    showToast(`Duplicated project "${p.title}"`);
  };

  const handleToggleFeatured = (p: Project) => {
    updateProject(p.id, { isFeatured: !p.isFeatured });
    showToast(`Updated featured status for "${p.title}"`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Film className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Portfolio Projects Library</h1>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Unlimited projects management with multi-video orientations (16:9 & 9:16 cuts).
          </p>
        </div>

        <button
          onClick={onOpenCreate}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Project
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects by title or client..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none"
          >
            <option value="ALL">All Statuses</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
            <option value="archived">Archived</option>
          </select>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none"
          >
            <option value="ALL">All Categories</option>
            <option value="Commercial">Commercial</option>
            <option value="Music Video">Music Video</option>
            <option value="Social Media">Social Media</option>
            <option value="Documentary">Documentary</option>
          </select>
        </div>
      </div>

      {/* Projects Table / Cards Grid */}
      <div className="space-y-3">
        {filtered.map((project) => {
          const hasVertical = project.videos.some((v) => v.orientation === 'portrait');

          return (
            <div
              key={project.id}
              className="p-4 rounded-2xl bg-neutral-900/70 border border-white/10 hover:border-cyan-400/40 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-all"
            >
              {/* Left Details */}
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} - ${project.category} thumbnail preview for ${project.client}`}
                  className="w-20 h-14 object-cover rounded-xl border border-white/10 shrink-0"
                />

                <div className="min-w-0 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white truncate">{project.title}</span>
                    {project.isFeatured && (
                      <span className="px-2 py-0.5 rounded bg-amber-950/80 border border-amber-500/30 text-amber-300 text-[10px] font-mono flex items-center gap-1">
                        <StarSvgIcon filled={true} className="w-3 h-3 text-amber-400" /> Featured
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 text-xs text-neutral-400 font-mono">
                    <span>{project.client}</span>
                    <span>•</span>
                    <span>{project.year}</span>
                    <span>•</span>
                    <span className="text-cyan-300">{project.category}</span>
                  </div>

                  <div className="flex items-center gap-2 text-[11px] text-neutral-500 font-mono">
                    <span>{project.videos.length} videos</span>
                    {hasVertical && (
                      <span className="text-purple-400 flex items-center gap-0.5">
                        <Smartphone className="w-3 h-3" /> +9:16 Vertical Reel
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Action buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <button
                  onClick={() => handleToggleFeatured(project)}
                  className={`p-2 rounded-xl border text-xs transition-colors ${
                    project.isFeatured
                      ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                      : 'bg-white/5 border-white/10 text-neutral-400 hover:text-white'
                  }`}
                  title="Toggle Featured"
                >
                  <StarSvgIcon filled={project.isFeatured} className="w-4 h-4" />
                </button>

                <button
                  onClick={() => handleDuplicate(project)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white border border-white/10"
                  title="Duplicate Project"
                >
                  <Copy className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onEditProject(project)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-cyan-500 hover:text-neutral-950 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Edit3 className="w-3.5 h-3.5" /> Edit Project
                </button>

                <button
                  onClick={() => {
                    deleteProject(project.id);
                    showToast(`Deleted project "${project.title}"`);
                  }}
                  className="p-2 rounded-xl bg-rose-950/40 hover:bg-rose-900 border border-rose-500/30 text-rose-300 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
