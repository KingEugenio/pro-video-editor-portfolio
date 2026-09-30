import React, { useState } from 'react';
import {
  Cloud,
  Folder,
  Film,
  Smartphone,
  Monitor,
  Search,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Copy,
  Plus,
  Play,
  SlidersHorizontal,
  HardDrive,
  Link,
  X,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { GoogleDriveFile, VideoItem } from '../../types/portfolio';
import { VideoPlayer } from '../ui/VideoPlayer';

export const GoogleDriveManager: React.FC = () => {
  const {
    driveFiles,
    isDriveConnected,
    connectDrive,
    disconnectDrive,
    addProject,
    updateBrandTheme,
    brandTheme,
    showToast,
  } = usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState<string>('ALL');
  const [previewingFile, setPreviewingFile] = useState<GoogleDriveFile | null>(null);
  const [showAddCustomLinkModal, setShowAddCustomLinkModal] = useState(false);
  const [customFileName, setCustomFileName] = useState('');
  const [customFileUrl, setCustomFileUrl] = useState('');
  const [customOrientation, setCustomOrientation] = useState<'landscape' | 'portrait'>('landscape');

  const folders = ['ALL', 'Commercials 2026', 'Music Videos', 'Social Media 9:16', 'RAW Grading'];

  const filteredFiles = driveFiles.filter((file) => {
    const matchesSearch =
      searchQuery === '' ||
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesFolder =
      selectedFolder === 'ALL' ||
      (selectedFolder === 'Social Media 9:16' && file.orientation === 'portrait') ||
      (selectedFolder === 'RAW Grading' && file.name.toLowerCase().includes('raw')) ||
      (selectedFolder === 'Commercials 2026' && !file.name.toLowerCase().includes('raw') && file.orientation === 'landscape');

    return matchesSearch && matchesFolder;
  });

  const handleSetAsShowreel = (file: GoogleDriveFile) => {
    updateBrandTheme({
      heroVideoUrl: file.embedLink,
      heroVideoType: 'google_drive',
      heroPosterUrl: file.thumbnailLink,
    });
    showToast(`Set "${file.name}" as official Master Showreel!`);
  };

  const handleCreateProjectFromDrive = (file: GoogleDriveFile) => {
    const isVert = file.orientation === 'portrait';
    const newProj = addProject({
      title: file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '),
      client: 'Drive Import',
      year: '2026',
      category: isVert ? 'Social Media' : 'Commercial',
      role: 'Lead Video Editor',
      thumbnail: file.thumbnailLink,
      services: ['Video Editing', 'Post-Production'],
      software: ['DaVinci Resolve', 'Premiere Pro'],
      tags: [isVert ? 'Vertical' : 'Commercial', 'Google Drive'],
      isFeatured: true,
      status: 'published',
      videos: [
        {
          id: `v-drive-${file.id}`,
          title: file.name,
          provider: 'google_drive',
          url: file.embedLink,
          driveFileId: file.id,
          orientation: file.orientation || 'landscape',
          aspectRatio: isVert ? '9:16' : '16:9',
          thumbnail: file.thumbnailLink,
          type: 'main',
        },
      ],
    });
    showToast(`Created project "${newProj.title}" from Google Drive!`);
  };

  return (
    <div className="space-y-8">
      {/* Header & Connection Bar */}
      <div className="p-6 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
            <Cloud className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white">Google Drive Video Hub</h1>
              {isDriveConnected ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connected
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-950 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Not Connected
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-400 max-w-xl">
              Seamlessly stream 4K landscape masters and 9:16 vertical TikTok/Reels cuts directly from your Google Drive without re-rendering or compression loss.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          {isDriveConnected ? (
            <button
              onClick={disconnectDrive}
              className="px-4 py-2 rounded-xl bg-white/5 hover:bg-rose-950/40 hover:text-rose-300 border border-white/10 text-xs font-semibold text-neutral-300 transition-colors w-full md:w-auto cursor-pointer"
            >
              Disconnect Drive
            </button>
          ) : (
            <button
              onClick={connectDrive}
              className="px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all w-full md:w-auto cursor-pointer"
            >
              <Cloud className="w-4 h-4" />
              Connect Google Workspace / Drive
            </button>
          )}

          <button
            onClick={() => setShowAddCustomLinkModal(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Add Drive Link
          </button>
        </div>
      </div>

      {/* Drive Browser Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Folder Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {folders.map((f) => (
            <button
              key={f}
              onClick={() => setSelectedFolder(f)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors cursor-pointer ${
                selectedFolder === f
                  ? 'bg-blue-500 text-white'
                  : 'bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {f === 'ALL' ? 'All Drive Files' : f}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search Drive files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-blue-400"
          />
        </div>
      </div>

      {/* Files Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {filteredFiles.map((file) => {
          const isVert = file.orientation === 'portrait';

          return (
            <div
              key={file.id}
              className="rounded-2xl bg-neutral-900/60 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-blue-400/40 transition-all shadow-lg"
            >
              {/* Media Thumbnail */}
              <div
                onClick={() => setPreviewingFile(file)}
                className="relative aspect-video bg-neutral-950 cursor-pointer overflow-hidden"
              >
                <img
                  src={file.thumbnailLink}
                  alt={`${file.name} - Google Drive video asset thumbnail preview`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Orientation & Format Pill */}
                <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono flex items-center gap-1 ${
                      isVert
                        ? 'bg-purple-950/80 border border-purple-500/30 text-purple-300'
                        : 'bg-black/70 border border-white/10 text-cyan-300'
                    }`}
                  >
                    {isVert ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                    {isVert ? '9:16 Vertical Cut' : '16:9 Landscape'}
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-black/80 text-[10px] font-mono text-neutral-300">
                    {file.size}
                  </span>
                </div>

                {/* Hover Play button */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Info Body */}
              <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xs font-bold text-white line-clamp-1 group-hover:text-blue-300 transition-colors">
                    {file.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[11px] text-neutral-400 mt-1">
                    <span className="font-mono">{file.duration}</span>
                    <span>•</span>
                    <span className="font-mono">
                      {file.modifiedTime ? new Date(file.modifiedTime).toLocaleDateString() : 'Active'}
                    </span>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleCreateProjectFromDrive(file)}
                    className="px-2 py-1.5 rounded-lg bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 text-blue-300 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Plus className="w-3 h-3" /> New Project
                  </button>
                  <button
                    onClick={() => handleSetAsShowreel(file)}
                    className="px-2 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300 text-[11px] font-semibold flex items-center justify-center gap-1 transition-colors"
                  >
                    <Film className="w-3 h-3" /> Set Showreel
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Video Preview Modal */}
      {previewingFile && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{previewingFile.name}</h3>
                <span className="text-xs font-mono text-neutral-400">
                  {previewingFile.orientation === 'portrait' ? '9:16 Reel Cut' : '16:9 Landscape'} • {previewingFile.duration}
                </span>
              </div>
              <button
                onClick={() => setPreviewingFile(null)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-xl overflow-hidden bg-black p-1">
              <VideoPlayer
                video={{
                  id: previewingFile.id,
                  title: previewingFile.name,
                  url: previewingFile.embedLink,
                  provider: 'google_drive',
                  orientation: previewingFile.orientation || 'landscape',
                  aspectRatio: previewingFile.orientation === 'portrait' ? '9:16' : '16:9',
                  thumbnail: previewingFile.thumbnailLink,
                }}
                autoPlay={true}
              />
            </div>
          </div>
        </div>
      )}

      {/* Manual Google Drive File Link Modal */}
      {showAddCustomLinkModal && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <h3 className="text-sm font-bold text-white">Add Direct Google Drive Video Link</h3>
              <button
                onClick={() => setShowAddCustomLinkModal(false)}
                className="p-1 rounded text-neutral-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs text-neutral-300 block">Video Title</label>
                <input
                  type="text"
                  placeholder="e.g. BMW M4 Commercial_4K_Final.mp4"
                  value={customFileName}
                  onChange={(e) => setCustomFileName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-300 block">Google Drive Share / Embed URL</label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/file/d/.../preview"
                  value={customFileUrl}
                  onChange={(e) => setCustomFileUrl(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-300 block">Video Orientation</label>
                <select
                  value={customOrientation}
                  onChange={(e) => setCustomOrientation(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-lg bg-neutral-950 border border-white/10 text-xs text-white"
                >
                  <option value="landscape">16:9 Landscape (Cinema / YouTube)</option>
                  <option value="portrait">9:16 Portrait (TikTok / Reels)</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (customFileName && customFileUrl) {
                    showToast(`Linked "${customFileName}" from Google Drive!`);
                    setShowAddCustomLinkModal(false);
                  }
                }}
                className="w-full py-2.5 rounded-xl bg-blue-500 text-white font-bold text-xs hover:bg-blue-400 transition-colors"
              >
                Link Video File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
