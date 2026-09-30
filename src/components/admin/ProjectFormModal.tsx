import React, { useState, useEffect } from 'react';
import {
  X,
  Plus,
  Trash2,
  Film,
  Smartphone,
  Monitor,
  SlidersHorizontal,
  Cloud,
  Check,
  Save,
  HelpCircle,
  Copy,
} from 'lucide-react';
import { Project, VideoItem, VideoOrientation, VideoSourceType } from '../../types/portfolio';
import { usePortfolio } from '../../context/PortfolioContext';
import { ProjectEditorSkeleton } from '../skeletons/admin/ProjectEditorSkeleton';

interface ProjectFormModalProps {
  project?: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onSaved: (p: Project) => void;
}

export const ProjectFormModal: React.FC<ProjectFormModalProps> = ({
  project,
  isOpen,
  onClose,
  onSaved,
}) => {
  const { addProject, updateProject, driveFiles, isDriveConnected, mediaAssets } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'details' | 'videos' | 'before_after' | 'seo'>('details');
  const [isEditorLoading, setIsEditorLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      setIsEditorLoading(true);
      const timer = setTimeout(() => {
        setIsEditorLoading(false);
      }, 220);
      return () => clearTimeout(timer);
    }
  }, [isOpen, project?.id]);

  // Form states
  const [title, setTitle] = useState(project?.title || '');
  const [slug, setSlug] = useState(project?.slug || '');
  const [client, setClient] = useState(project?.client || '');
  const [year, setYear] = useState(project?.year || new Date().getFullYear().toString());
  const [category, setCategory] = useState(project?.category || 'Commercial');
  const [role, setRole] = useState(project?.role || 'Lead Video Editor');
  const [thumbnail, setThumbnail] = useState(
    project?.thumbnail || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
  );
  const [brief, setBrief] = useState(project?.brief || '');
  const [approach, setApproach] = useState(project?.approach || '');
  const [resultStory, setResultStory] = useState(project?.resultStory || '');
  const [isFeatured, setIsFeatured] = useState(project?.isFeatured || false);
  const [status, setStatus] = useState<'draft' | 'published' | 'archived'>(project?.status || 'published');
  const [seoTitle, setSeoTitle] = useState(project?.seoTitle || '');
  const [seoDescription, setSeoDescription] = useState(project?.seoDescription || '');

  // Tags & Skills
  const [services, setServices] = useState<string[]>(
    project?.services || ['Commercial Editing', 'Color Grading', 'Sound Design']
  );
  const [newServiceInput, setNewServiceInput] = useState('');

  const [software, setSoftware] = useState<string[]>(
    project?.software || ['DaVinci Resolve Studio', 'Adobe Premiere Pro', 'After Effects']
  );
  const [newSoftwareInput, setNewSoftwareInput] = useState('');

  const [tags, setTags] = useState<string[]>(
    project?.tags || ['Commercial', 'Color Grade', 'Premiere Pro']
  );
  const [newTagInput, setNewTagInput] = useState('');

  // Videos List
  const [videos, setVideos] = useState<VideoItem[]>(
    project?.videos || [
      {
        id: `v-main-${Date.now()}`,
        title: 'Master Director Cut (16:9)',
        provider: 'direct_url',
        url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        orientation: 'landscape',
        aspectRatio: '16:9',
        type: 'main',
        isFeatured: true,
      },
    ]
  );

  // Before & After Videos
  const [beforeThumb, setBeforeThumb] = useState(
    project?.beforeVideo?.thumbnail || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80'
  );
  const [afterThumb, setAfterThumb] = useState(
    project?.afterVideo?.thumbnail || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1200&q=80'
  );

  // Quick Drive picker modal state inside project form
  const [drivePickerForVideoIndex, setDrivePickerForVideoIndex] = useState<number | null>(null);
  const [mediaPickerForVideoIndex, setMediaPickerForVideoIndex] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!project) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleAddVideo = (orientation: VideoOrientation = 'landscape') => {
    const isVert = orientation === 'portrait';
    const newVideo: VideoItem = {
      id: `v-extra-${Date.now()}`,
      title: isVert ? 'Vertical Social Cut (9:16)' : `Additional Cut ${videos.length + 1}`,
      provider: 'direct_url',
      url: isVert
        ? 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
        : 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      orientation,
      aspectRatio: isVert ? '9:16' : '16:9',
      type: isVert ? 'vertical_cut' : 'supporting',
    };
    setVideos([...videos, newVideo]);
  };

  const handleUpdateVideo = (index: number, updates: Partial<VideoItem>) => {
    setVideos((prev) => prev.map((v, i) => (i === index ? { ...v, ...updates } : v)));
  };

  const handleRemoveVideo = (index: number) => {
    if (videos.length === 1) return;
    setVideos((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSelectDriveFileForVideo = (index: number, driveFile: any) => {
    handleUpdateVideo(index, {
      provider: 'google_drive',
      url: driveFile.embedLink,
      driveFileId: driveFile.id,
      title: driveFile.name.replace(/\.[^/.]+$/, ''),
      orientation: driveFile.orientation || 'landscape',
      aspectRatio: driveFile.orientation === 'portrait' ? '9:16' : '16:9',
      thumbnail: driveFile.thumbnailLink || thumbnail,
    });
    setDrivePickerForVideoIndex(null);
  };

  const handleSelectMediaAssetForVideo = (index: number, asset: any) => {
    handleUpdateVideo(index, {
      provider: (asset.provider === 'google_drive' ? 'google_drive' : asset.provider === 'youtube' ? 'youtube' : asset.provider === 'vimeo' ? 'vimeo' : 'direct_url') as VideoSourceType,
      url: asset.playbackUrl || asset.sourceUrl,
      title: asset.title,
      orientation: asset.orientation || 'landscape',
      aspectRatio: asset.aspectRatio || (asset.orientation === 'portrait' ? '9:16' : '16:9'),
      thumbnail: asset.thumbnailUrl || thumbnail,
    });
    setMediaPickerForVideoIndex(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const projectPayload = {
      title,
      slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      client: client || 'Private Client',
      year: year || '2026',
      category: category || 'Commercial',
      services,
      role: role || 'Lead Editor',
      software,
      thumbnail: thumbnail || 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=80',
      videos,
      beforeVideo: beforeThumb
        ? {
            id: 'before-vid',
            title: 'Raw Sensor Footage',
            provider: 'direct_url' as VideoSourceType,
            url: videos[0]?.url || '',
            orientation: 'landscape' as VideoOrientation,
            thumbnail: beforeThumb,
          }
        : undefined,
      afterVideo: afterThumb
        ? {
            id: 'after-vid',
            title: 'Master Color Grade',
            provider: 'direct_url' as VideoSourceType,
            url: videos[0]?.url || '',
            orientation: 'landscape' as VideoOrientation,
            thumbnail: afterThumb,
          }
        : undefined,
      brief,
      approach,
      resultStory,
      tags,
      isFeatured,
      status,
      seoTitle,
      seoDescription,
    };

    if (project?.id) {
      updateProject(project.id, projectPayload);
      onSaved({ ...project, ...projectPayload, updatedAt: new Date().toISOString() });
    } else {
      const created = addProject(projectPayload);
      onSaved(created);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-xl flex justify-center p-2 sm:p-4 md:p-6 animate-in fade-in">
      <div className="relative w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-neutral-900/90 border-b border-white/10 flex items-center justify-between shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">
              {project ? 'Edit Project' : 'Add New Portfolio Project'}
            </h2>
            <p className="text-xs text-neutral-400">
              Configure video orientations (16:9 landscape & 9:16 portrait), metadata, and showcase details.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation & Form Content OR Skeleton */}
        {isEditorLoading ? (
          <div className="p-6 overflow-y-auto">
            <ProjectEditorSkeleton />
          </div>
        ) : (
          <>
            {/* Tab Navigation */}
            <div className="flex items-center gap-2 px-6 py-2.5 bg-neutral-950 border-b border-white/5 shrink-0 overflow-x-auto">
          <button
            type="button"
            onClick={() => setActiveTab('details')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'details' ? 'bg-cyan-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
          >
            1. Project Details
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('videos')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'videos' ? 'bg-cyan-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            2. Videos & Orientations ({videos.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('before_after')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              activeTab === 'before_after' ? 'bg-cyan-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            3. Before/After Color Grade
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`px-4 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
              activeTab === 'seo' ? 'bg-cyan-500 text-neutral-950' : 'text-neutral-400 hover:text-white'
            }`}
          >
            4. Publishing & SEO
          </button>
        </div>

        {/* Form Body Scrollable */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: DETAILS */}
          {activeTab === 'details' && (
            <div className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300">
                    Project Title <span className="text-cyan-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Athletics: Quantum Speed Commercial"
                    value={title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-300">Client / Brand</label>
                  <input
                    type="text"
                    placeholder="e.g. Nike, Universal Music, Apex"
                    value={client}
                    onChange={(e) => setClient(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-300">Release Year</label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-300">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Music Video">Music Video</option>
                    <option value="Social Media">Social Media</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Color Grading">Color Grading</option>
                    <option value="Corporate">Corporate</option>
                    <option value="Narrative Film">Narrative Film</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-300">My Role</label>
                  <input
                    type="text"
                    placeholder="e.g. Lead Video Editor & Colorist"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Thumbnail URL */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">
                  Thumbnail Image URL (High Resolution Poster)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://..."
                    value={thumbnail}
                    onChange={(e) => setThumbnail(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  {thumbnail && (
                    <img
                      src={thumbnail}
                      alt="Preview"
                      className="w-10 h-10 object-cover rounded-lg border border-white/10"
                    />
                  )}
                </div>
              </div>

              {/* Case Study Narrative Fields */}
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">The Brief</label>
                <textarea
                  rows={2}
                  placeholder="What was the client's goal or creative mandate?"
                  value={brief}
                  onChange={(e) => setBrief(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">The Creative Approach</label>
                <textarea
                  rows={2}
                  placeholder="Explain pacing, sound architecture, grading LUTs, or VFX compositing..."
                  value={approach}
                  onChange={(e) => setApproach(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">Impact & Results</label>
                <textarea
                  rows={2}
                  placeholder="Views, festival awards, streaming milestones, ROI..."
                  value={resultStory}
                  onChange={(e) => setResultStory(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              {/* Software Tags */}
              <div className="space-y-2">
                <label className="block text-xs font-medium text-neutral-300">Software Used</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {software.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-white/10 text-xs text-neutral-200 flex items-center gap-1.5"
                    >
                      {s}
                      <button
                        type="button"
                        onClick={() => setSoftware(software.filter((_, i) => i !== idx))}
                        className="hover:text-rose-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Add software (e.g. DaVinci Resolve, Premiere, CapCut)..."
                    value={newSoftwareInput}
                    onChange={(e) => setNewSoftwareInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-lg bg-neutral-950 border border-white/10 text-xs text-white"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      if (newSoftwareInput.trim()) {
                        setSoftware([...software, newSoftwareInput.trim()]);
                        setNewSoftwareInput('');
                      }
                    }}
                    className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-xs font-semibold text-white"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEOS & ORIENTATIONS */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-bold text-white">Project Deliverable Videos</h3>
                  <p className="text-xs text-neutral-400">
                    Add horizontal (16:9), vertical (9:16 TikTok/Reels), square (1:1), and Google Drive videos.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleAddVideo('landscape')}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 text-neutral-950 text-xs font-bold flex items-center gap-1 hover:bg-cyan-400"
                  >
                    <Monitor className="w-3.5 h-3.5" /> + 16:9 Landscape Video
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddVideo('portrait')}
                    className="px-3 py-1.5 rounded-lg bg-purple-500 text-white text-xs font-bold flex items-center gap-1 hover:bg-purple-400"
                  >
                    <Smartphone className="w-3.5 h-3.5" /> + 9:16 Vertical Reel
                  </button>
                </div>
              </div>

              {/* Videos list editor */}
              <div className="space-y-4">
                {videos.map((vid, idx) => (
                  <div
                    key={vid.id || idx}
                    className="p-4 rounded-2xl bg-neutral-950 border border-white/10 space-y-3 relative"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-full bg-white/10 text-xs font-mono flex items-center justify-center font-bold text-cyan-300">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold text-white">{vid.title || 'Video Cut'}</span>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                            vid.orientation === 'portrait'
                              ? 'bg-purple-950 text-purple-300 border border-purple-500/30'
                              : 'bg-cyan-950 text-cyan-300 border border-cyan-500/30'
                          }`}
                        >
                          {vid.orientation === 'portrait' ? '9:16 Vertical Reel' : '16:9 Landscape'}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setMediaPickerForVideoIndex(idx)}
                          className="px-2.5 py-1 rounded bg-cyan-950/60 hover:bg-cyan-900/80 border border-cyan-500/30 text-cyan-300 text-xs flex items-center gap-1"
                        >
                          <Film className="w-3 h-3" /> Pick from Media Library
                        </button>
                        {isDriveConnected && (
                          <button
                            type="button"
                            onClick={() => setDrivePickerForVideoIndex(idx)}
                            className="px-2.5 py-1 rounded bg-blue-950/60 hover:bg-blue-900/80 border border-blue-500/30 text-blue-300 text-xs flex items-center gap-1"
                          >
                            <Cloud className="w-3 h-3" /> Select from Google Drive
                          </button>
                        )}
                        {videos.length > 1 && (
                          <button
                            type="button"
                            onClick={() => handleRemoveVideo(idx)}
                            className="p-1 rounded text-neutral-400 hover:text-rose-400"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-neutral-400 block">Video Cut Title</label>
                        <input
                          type="text"
                          value={vid.title}
                          onChange={(e) => handleUpdateVideo(idx, { title: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-neutral-400 block">Provider Source</label>
                        <select
                          value={vid.provider}
                          onChange={(e) =>
                            handleUpdateVideo(idx, { provider: e.target.value as VideoSourceType })
                          }
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="direct_url">Direct Video URL (MP4 / WebM)</option>
                          <option value="google_drive">Google Drive Video</option>
                          <option value="youtube">YouTube (URL or ID)</option>
                          <option value="vimeo">Vimeo (URL or ID)</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[11px] text-neutral-400 block">Orientation / Aspect</label>
                        <select
                          value={vid.orientation}
                          onChange={(e) => {
                            const newOri = e.target.value as VideoOrientation;
                            handleUpdateVideo(idx, {
                              orientation: newOri,
                              aspectRatio: newOri === 'portrait' ? '9:16' : newOri === 'square' ? '1:1' : '16:9',
                            });
                          }}
                          className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                        >
                          <option value="landscape">Landscape (16:9 Cinema)</option>
                          <option value="portrait">Portrait (9:16 TikTok/Reel/Short)</option>
                          <option value="square">Square (1:1)</option>
                          <option value="custom">Custom</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] text-neutral-400 block">Video URL or Embed Source</label>
                      <input
                        type="text"
                        placeholder="Paste MP4 URL, YouTube link, or Google Drive embed link..."
                        value={vid.url}
                        onChange={(e) => handleUpdateVideo(idx, { url: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: BEFORE / AFTER COLOR GRADE */}
          {activeTab === 'before_after' && (
            <div className="space-y-4">
              <div className="pb-2 border-b border-white/10">
                <h3 className="text-sm font-bold text-white">Interactive Before & After Color Slider</h3>
                <p className="text-xs text-neutral-400">
                  Provide high-resolution snapshot URLs for RAW Log footage versus the final graded ACES master.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5 p-4 rounded-xl bg-neutral-950 border border-white/10">
                  <label className="block text-xs font-semibold text-neutral-300">
                    RAW Log / Ungraded Frame URL
                  </label>
                  <input
                    type="url"
                    value={beforeThumb}
                    onChange={(e) => setBeforeThumb(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  {beforeThumb && (
                    <img
                      src={beforeThumb}
                      alt="Ungraded RAW camera log snapshot preview"
                      className="w-full aspect-video object-cover rounded-lg mt-2 border border-white/10"
                    />
                  )}
                </div>

                <div className="space-y-1.5 p-4 rounded-xl bg-neutral-950 border border-white/10">
                  <label className="block text-xs font-semibold text-neutral-300">
                    Final ACES Graded Frame URL
                  </label>
                  <input
                    type="url"
                    value={afterThumb}
                    onChange={(e) => setAfterThumb(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                  {afterThumb && (
                    <img
                      src={afterThumb}
                      alt="Final color-graded master video frame preview"
                      className="w-full aspect-video object-cover rounded-lg mt-2 border border-white/10"
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PUBLISHING & SEO */}
          {activeTab === 'seo' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-neutral-300">Publication Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as any)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="published">Published (Visible on Portfolio)</option>
                    <option value="draft">Draft (Hidden from Public)</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <div className="space-y-1.5 flex items-center pt-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={(e) => setIsFeatured(e.target.checked)}
                      className="w-4 h-4 rounded text-cyan-400 focus:ring-0 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-neutral-200">
                      Feature on Homepage Highlights
                    </span>
                  </label>
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300">Custom URL Slug</label>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300">SEO Meta Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Athletics Commercial | Video Editing Case Study"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div className="space-y-1.5 sm:col-span-2">
                  <label className="block text-xs font-medium text-neutral-300">
                    SEO Meta Description
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Short description for Google and social previews..."
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Footer Submit Button Bar */}
          <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-3 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-semibold text-neutral-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {project ? 'Save Changes' : 'Create & Publish Project'}
            </button>
          </div>
        </form>
        </>
        )}

        {/* Quick Media Library Picker Overlay */}
        {mediaPickerForVideoIndex !== null && (
          <div className="absolute inset-0 z-50 bg-black/95 p-6 flex flex-col animate-in fade-in">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Film className="w-5 h-5 text-cyan-400" />
                <div>
                  <h3 className="text-sm font-bold text-white">Select from Central Media Library</h3>
                  <p className="text-[11px] text-neutral-400">Choose an existing media asset, master upload, or external stream</p>
                </div>
              </div>
              <button
                onClick={() => setMediaPickerForVideoIndex(null)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 overflow-y-auto flex-1">
              {mediaAssets.map((asset) => (
                <div
                  key={asset.id}
                  onClick={() => handleSelectMediaAssetForVideo(mediaPickerForVideoIndex, asset)}
                  className="p-3 rounded-xl bg-neutral-900 border border-white/10 hover:border-cyan-400 flex items-center gap-3 cursor-pointer group transition-all"
                >
                  <img
                    src={asset.thumbnailUrl}
                    alt={asset.title}
                    className="w-16 h-10 object-cover rounded-lg border border-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-white block truncate group-hover:text-cyan-300">
                      {asset.title}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block truncate">
                      {asset.provider} • {asset.aspectRatio || (asset.orientation === 'portrait' ? '9:16' : '16:9')} • {asset.duration}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                    Select
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Google Drive File Picker Overlay */}
        {drivePickerForVideoIndex !== null && (
          <div className="absolute inset-0 z-50 bg-black/95 p-6 flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Cloud className="w-5 h-5 text-cyan-400" />
                <h3 className="text-sm font-bold text-white">Select Video from Google Drive</h3>
              </div>
              <button
                onClick={() => setDrivePickerForVideoIndex(null)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 py-4 overflow-y-auto flex-1">
              {driveFiles.map((file) => (
                <div
                  key={file.id}
                  onClick={() => handleSelectDriveFileForVideo(drivePickerForVideoIndex, file)}
                  className="p-3 rounded-xl bg-neutral-900 border border-white/10 hover:border-cyan-400 flex items-center gap-3 cursor-pointer group"
                >
                  <img
                    src={file.thumbnailLink}
                    alt={file.name}
                    className="w-14 h-10 object-cover rounded"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-white block truncate group-hover:text-cyan-300">
                      {file.name}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {file.size} • {file.orientation === 'portrait' ? '9:16 Vertical' : '16:9'}
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                    Select
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
