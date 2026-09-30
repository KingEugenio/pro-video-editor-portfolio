import React from 'react';
import {
  Film,
  Smartphone,
  Cloud,
  Inbox,
  ListChecks,
  Plus,
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  Palette,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Project } from '../../types/portfolio';

interface AdminDashboardOverviewProps {
  onNavigateTab: (tab: string) => void;
  onOpenNewProject: () => void;
  onEditProject: (project: Project) => void;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  onNavigateTab,
  onOpenNewProject,
  onEditProject,
}) => {
  const { projects, driveFiles, isDriveConnected, enquiries, brandTheme } = usePortfolio();

  const totalVideos = projects.reduce((acc, p) => acc + p.videos.length, 0);
  const verticalCuts = projects.reduce(
    (acc, p) => acc + p.videos.filter((v) => v.orientation === 'portrait').length,
    0
  );
  const newEnquiriesCount = enquiries.filter((e) => e.status === 'new').length;

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Banner */}
      <div className="p-6 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Film className="w-3.5 h-3.5" />
            <span>CineFolio Management Engine • v2.6</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">
            Welcome back, {brandTheme.brandName}
          </h1>
          <p className="text-xs text-neutral-400 max-w-xl">
            Manage your high-resolution film masters, 9:16 vertical TikTok cuts, Google Drive sync, and client commission briefs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenNewProject}
            className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Project
          </button>
          <button
            onClick={() => onNavigateTab('wizard')}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer border border-white/10"
          >
            <ListChecks className="w-3.5 h-3.5 text-cyan-400" /> Guided Setup
          </button>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>SHOWCASE PROJECTS</span>
            <Film className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{projects.length}</div>
          <span className="text-[11px] text-neutral-400 block">
            {projects.filter((p) => p.status === 'published').length} published in showcase
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>DELIVERABLE CUTS</span>
            <Smartphone className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{totalVideos}</div>
          <span className="text-[11px] text-purple-300 font-mono block">
            Includes {verticalCuts} vertical 9:16 cuts
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>GOOGLE DRIVE HUB</span>
            <Cloud className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{driveFiles.length}</div>
          <span className="text-[11px] text-blue-300 font-mono block">
            {isDriveConnected ? 'Drive Connected & Synced' : 'Ready to Connect'}
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-2">
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
            <span>CLIENT ENQUIRIES</span>
            <Inbox className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-extrabold text-white font-mono">{enquiries.length}</div>
          <span className="text-[11px] text-emerald-300 font-mono block">
            {newEnquiriesCount} new brief{newEnquiriesCount === 1 ? '' : 's'} pending
          </span>
        </div>
      </div>

      {/* Flagship Projects & Recent Enquiries Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Projects Table Preview (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Flagship Portfolio Projects
            </h2>
            <button
              onClick={() => onNavigateTab('projects')}
              className="text-xs text-cyan-400 hover:underline font-mono"
            >
              View All ({projects.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {projects.slice(0, 4).map((project) => (
              <div
                key={project.id}
                onClick={() => onEditProject(project)}
                className="p-3.5 rounded-2xl bg-neutral-900/60 border border-white/10 hover:border-cyan-400/40 flex items-center justify-between gap-4 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={project.thumbnail}
                    alt={`${project.title} - ${project.category} thumbnail preview for ${project.client}`}
                    className="w-14 h-10 object-cover rounded-lg border border-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-white block truncate group-hover:text-cyan-300">
                      {project.title}
                    </span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      {project.client} • {project.category} ({project.videos.length} videos)
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded ${
                      project.status === 'published'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {project.status.toUpperCase()}
                  </span>
                  <span className="text-xs text-neutral-400 group-hover:text-white">Edit →</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Client Briefs (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Latest Project Briefs
            </h2>
            <button
              onClick={() => onNavigateTab('enquiries')}
              className="text-xs text-cyan-400 hover:underline font-mono"
            >
              Inbox ({enquiries.length}) →
            </button>
          </div>

          <div className="space-y-3">
            {enquiries.slice(0, 3).map((enquiry) => (
              <div
                key={enquiry.id}
                onClick={() => onNavigateTab('enquiries')}
                className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1.5 cursor-pointer hover:border-white/20 transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{enquiry.name}</span>
                  <span className="text-[10px] font-mono text-cyan-400">{enquiry.budget}</span>
                </div>
                <p className="text-xs text-neutral-300 line-clamp-1">{enquiry.projectType}</p>
                <span className="text-[10px] font-mono text-neutral-500 block">
                  {new Date(enquiry.createdAt).toLocaleDateString()} • {enquiry.email}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
