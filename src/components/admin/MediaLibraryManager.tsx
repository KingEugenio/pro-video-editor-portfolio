import React, { useState, useMemo, useRef } from 'react';
import {
  Film,
  Upload,
  Cloud,
  Youtube,
  Video,
  Search,
  Filter,
  Activity,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Play,
  Copy,
  Trash2,
  RefreshCw,
  Edit3,
  ExternalLink,
  Layers,
  Smartphone,
  Monitor,
  Square,
  ShieldCheck,
  Plus,
  X,
  FileVideo,
  HardDrive,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { MediaAsset, MediaProviderType, VideoOrientation, AspectRatioType, MediaHealthStatus } from '../../types/media';
import { UniversalVideoPlayer } from '../ui/UniversalVideoPlayer';
import { MediaResolver } from '../../services/mediaResolver';

export const MediaLibraryManager: React.FC = () => {
  const { mediaAssets, addMediaAsset, updateMediaAsset, deleteMediaAsset, replaceMediaAsset, runMediaHealthCheck, projects, isDriveConnected, showToast } =
    usePortfolio();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvider, setSelectedProvider] = useState<string>('all');
  const [selectedOrientation, setSelectedOrientation] = useState<string>('all');
  const [selectedHealth, setSelectedHealth] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isAddUrlModalOpen, setIsAddUrlModalOpen] = useState(false);
  const [previewingAsset, setPreviewingAsset] = useState<MediaAsset | null>(null);
  const [replacingAsset, setReplacingAsset] = useState<MediaAsset | null>(null);
  const [isHealthCheckModalOpen, setIsHealthCheckModalOpen] = useState(false);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  // Upload modal state
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadAspectRatio, setUploadAspectRatio] = useState<AspectRatioType>('16:9');
  const [uploadOrientation, setUploadOrientation] = useState<VideoOrientation>('landscape');
  const [uploadTags, setUploadTags] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Replace modal state
  const [replaceSourceUrl, setReplaceSourceUrl] = useState('');
  const [replaceProvider, setReplaceProvider] = useState<MediaProviderType>('direct_upload');
  const [replaceTitle, setReplaceTitle] = useState('');

  // Add by URL modal state
  const [newUrl, setNewUrl] = useState('');
  const [newUrlTitle, setNewUrlTitle] = useState('');
  const [newUrlProvider, setNewUrlProvider] = useState<MediaProviderType>('youtube');
  const [newUrlAspect, setNewUrlAspect] = useState<AspectRatioType>('16:9');

  // Metrics
  const metrics = useMemo(() => {
    const total = mediaAssets.length;
    const healthy = mediaAssets.filter((a) => a.healthStatus === 'healthy').length;
    const issues = mediaAssets.filter((a) => a.healthStatus === 'broken' || a.healthStatus === 'warning' || a.healthStatus === 'missing').length;
    const vertical = mediaAssets.filter((a) => a.orientation === 'portrait').length;
    const googleDrive = mediaAssets.filter((a) => a.provider === 'google_drive').length;
    return { total, healthy, issues, vertical, googleDrive };
  }, [mediaAssets]);

  // Filtered Assets
  const filteredAssets = useMemo(() => {
    return mediaAssets.filter((asset) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        asset.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.tags?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchProvider = selectedProvider === 'all' || asset.provider === selectedProvider;
      const matchOrientation = selectedOrientation === 'all' || asset.orientation === selectedOrientation;
      const matchHealth = selectedHealth === 'all' || asset.healthStatus === selectedHealth;

      return matchSearch && matchProvider && matchOrientation && matchHealth;
    });
  }, [mediaAssets, searchQuery, selectedProvider, selectedOrientation, selectedHealth]);

  // Handle Drag and Drop for Upload
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setUploadFile(file);
      setUploadTitle(file.name.replace(/\.[^/.]+$/, '').replace(/_/g, ' '));
    }
  };

  // Simulate file upload with progress bar
  const startUpload = () => {
    if (!uploadFile && !uploadTitle) return;
    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Create the asset
          const fileSizeMB = uploadFile ? `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB` : '120 MB';
          const isVert = uploadAspectRatio === '9:16';

          addMediaAsset({
            title: uploadTitle || 'Uploaded Master Video',
            filename: uploadFile ? uploadFile.name : `video_${Date.now()}.mp4`,
            provider: 'direct_upload',
            sourceUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            playbackUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            thumbnailUrl: isVert
              ? 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
              : 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1200&q=80',
            mimeType: uploadFile ? uploadFile.type || 'video/mp4' : 'video/mp4',
            fileSize: fileSizeMB,
            duration: '01:30',
            width: isVert ? 1080 : 1920,
            height: isVert ? 1920 : 1080,
            aspectRatio: uploadAspectRatio,
            orientation: isVert ? 'portrait' : 'landscape',
            status: 'ready',
            healthStatus: 'healthy',
            visibility: 'public',
            attachedProjectIds: [],
            tags: uploadTags ? uploadTags.split(',').map((t) => t.trim()) : ['Upload', 'Raw Master'],
          });

          setIsUploadModalOpen(false);
          setUploadFile(null);
          setUploadProgress(0);
          setUploadTitle('');
          return 100;
        }
        return prev + 15;
      });
    }, 200);
  };

  // Add External Stream / Embed
  const handleAddExternalUrl = () => {
    if (!newUrl) return;
    const provider = MediaResolver.detectProvider(newUrl, newUrlProvider);
    const isPortrait = newUrlAspect === '9:16';

    addMediaAsset({
      title: newUrlTitle || `${provider.toUpperCase()} Stream Asset`,
      filename: `${provider}_stream_${Date.now()}`,
      provider,
      sourceUrl: newUrl,
      playbackUrl: newUrl,
      thumbnailUrl:
        provider === 'youtube'
          ? MediaResolver.buildYouTubeThumbnailUrl(newUrl)
          : 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80',
      mimeType: 'video/mp4',
      fileSize: 'Streaming Provider',
      duration: '02:00',
      width: isPortrait ? 1080 : 1920,
      height: isPortrait ? 1920 : 1080,
      aspectRatio: newUrlAspect,
      orientation: isPortrait ? 'portrait' : 'landscape',
      status: 'ready',
      healthStatus: 'healthy',
      visibility: 'public',
      attachedProjectIds: [],
      tags: [provider, 'Stream'],
    });

    setIsAddUrlModalOpen(false);
    setNewUrl('');
    setNewUrlTitle('');
  };

  // Handle Replace Media
  const handleConfirmReplace = () => {
    if (!replacingAsset) return;
    replaceMediaAsset(replacingAsset.id, {
      sourceUrl: replaceSourceUrl || replacingAsset.sourceUrl,
      playbackUrl: replaceSourceUrl || replacingAsset.playbackUrl,
      title: replaceTitle || replacingAsset.title,
      provider: replaceProvider,
    });
    setReplacingAsset(null);
    setReplaceSourceUrl('');
  };

  // Trigger Diagnostics
  const handleRunDiagnostics = async () => {
    setIsDiagnosing(true);
    await runMediaHealthCheck();
    setIsDiagnosing(false);
    setIsHealthCheckModalOpen(true);
  };

  // Copy playback URL helper
  const handleCopyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    showToast('Playback URL copied to clipboard');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Top Banner & Header */}
      <div className="p-6 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300">
            <Film className="w-3.5 h-3.5" />
            <span>Universal Media Hub & Provider Engine</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white">Central Media Library</h1>
          <p className="text-xs text-neutral-400 max-w-xl">
            Manage your master video files, Google Drive links, YouTube/Vimeo streams, and vertical TikTok cuts with automatic health validation and unified playback normalization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer transition-all hover:scale-105"
          >
            <Upload className="w-4 h-4" /> Upload Video
          </button>
          <button
            onClick={() => setIsAddUrlModalOpen(true)}
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs flex items-center gap-2 border border-white/10 cursor-pointer transition-all"
          >
            <Plus className="w-4 h-4 text-cyan-400" /> Add Stream / URL
          </button>
          <button
            onClick={handleRunDiagnostics}
            disabled={isDiagnosing}
            className="px-4 py-2.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 font-semibold text-xs flex items-center gap-2 border border-emerald-500/30 cursor-pointer transition-all"
          >
            <Activity className={`w-4 h-4 ${isDiagnosing ? 'animate-spin' : ''}`} />
            {isDiagnosing ? 'Scanning...' : 'Health Diagnostic'}
          </button>
        </div>
      </div>

      {/* KPI Metrics Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Total Media Assets</span>
          <div className="text-2xl font-extrabold text-white font-mono">{metrics.total}</div>
          <span className="text-[11px] text-neutral-400">In unified library</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Health Status</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono flex items-center gap-2">
            {metrics.healthy} / {metrics.total}
            <CheckCircle2 className="w-4 h-4" />
          </div>
          <span className="text-[11px] text-emerald-300 font-mono">{metrics.issues > 0 ? `${metrics.issues} need review` : '100% operational'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Vertical Formats</span>
          <div className="text-2xl font-extrabold text-purple-400 font-mono">{metrics.vertical}</div>
          <span className="text-[11px] text-purple-300 font-mono">9:16 Reels / TikTok</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Google Drive Synced</span>
          <div className="text-2xl font-extrabold text-blue-400 font-mono">{metrics.googleDrive}</div>
          <span className="text-[11px] text-blue-300 font-mono">{isDriveConnected ? 'Drive Connected' : 'Ready to link'}</span>
        </div>

        <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider block">Provider Channels</span>
          <div className="text-2xl font-extrabold text-cyan-400 font-mono">5</div>
          <span className="text-[11px] text-cyan-300 font-mono">Upload, Drive, YT, Vimeo</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-neutral-900/60 border border-white/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search assets by title, filename, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/50"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Provider Filter */}
          <select
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Providers</option>
            <option value="direct_upload">Direct Upload</option>
            <option value="google_drive">Google Drive</option>
            <option value="youtube">YouTube</option>
            <option value="vimeo">Vimeo</option>
          </select>

          {/* Orientation Filter */}
          <select
            value={selectedOrientation}
            onChange={(e) => setSelectedOrientation(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Formats</option>
            <option value="landscape">16:9 Landscape</option>
            <option value="portrait">9:16 Vertical Reel</option>
            <option value="square">1:1 Square</option>
          </select>

          {/* Health Filter */}
          <select
            value={selectedHealth}
            onChange={(e) => setSelectedHealth(e.target.value)}
            className="px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-xs text-neutral-300 focus:outline-none focus:border-cyan-400"
          >
            <option value="all">All Health States</option>
            <option value="healthy">Healthy Only</option>
            <option value="warning">Warnings / Needs Review</option>
            <option value="broken">Broken / Disconnected</option>
          </select>

          {/* View Mode Switcher */}
          <div className="flex items-center rounded-xl bg-black/50 border border-white/10 p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'grid' ? 'bg-cyan-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <Layers className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                viewMode === 'table' ? 'bg-cyan-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
              }`}
              title="Table View"
            >
              <FileVideo className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Media Assets Display */}
      {filteredAssets.length > 0 ? (
        viewMode === 'grid' ? (
          /* Grid View Cards */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAssets.map((asset) => {
              const isPortrait = asset.orientation === 'portrait';
              const attachedProjects = projects.filter((p) => asset.attachedProjectIds?.includes(p.id));

              return (
                <div
                  key={asset.id}
                  className="rounded-2xl bg-neutral-900/70 border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-cyan-400/40 transition-all shadow-xl"
                >
                  {/* Card Thumbnail & Overlay */}
                  <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                    <img
                      src={asset.thumbnailUrl}
                      alt={`${asset.title} - Video asset media thumbnail (${asset.provider})`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Top Badges */}
                    <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between pointer-events-none">
                      <span className="px-2.5 py-1 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-cyan-300 flex items-center gap-1.5">
                        {isPortrait ? <Smartphone className="w-3 h-3" /> : <Monitor className="w-3 h-3" />}
                        {asset.aspectRatio || (isPortrait ? '9:16' : '16:9')}
                      </span>

                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                          asset.provider === 'google_drive'
                            ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                            : asset.provider === 'youtube'
                            ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                            : 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                        }`}
                      >
                        {asset.provider === 'google_drive' && <Cloud className="w-3 h-3" />}
                        {asset.provider === 'youtube' && <Youtube className="w-3 h-3" />}
                        {asset.provider.replace('_', ' ')}
                      </span>
                    </div>

                    {/* Center Play Preview Button */}
                    <button
                      onClick={() => setPreviewingAsset(asset)}
                      className="absolute inset-0 m-auto w-12 h-12 rounded-full bg-cyan-500/90 text-neutral-950 flex items-center justify-center backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110 cursor-pointer shadow-lg shadow-cyan-500/40"
                    >
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </button>

                    {/* Bottom Duration & Size */}
                    <div className="absolute bottom-2 inset-x-2 flex items-center justify-between text-[10px] font-mono text-neutral-300 bg-black/70 backdrop-blur-md px-2 py-1 rounded-md border border-white/5">
                      <span>{asset.duration || '01:30'}</span>
                      <span>{asset.fileSize || 'HD Stream'}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xs font-bold text-white truncate max-w-[200px]" title={asset.title}>
                          {asset.title}
                        </h3>
                        {asset.healthStatus === 'healthy' ? (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                            <CheckCircle2 className="w-3 h-3" /> Ready
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-[10px] font-mono text-amber-400">
                            <AlertTriangle className="w-3 h-3" /> Check
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] font-mono text-neutral-400 truncate max-w-full">
                        {asset.filename}
                      </p>
                    </div>

                    {/* Attached Projects Info */}
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] text-neutral-400">
                      <span>Attached Projects:</span>
                      <span className="font-mono text-cyan-300 font-bold">
                        {attachedProjects.length > 0 ? `${attachedProjects.length} projects` : 'Unassigned'}
                      </span>
                    </div>

                    {/* Action Buttons Row */}
                    <div className="pt-2 flex items-center justify-between gap-2">
                      <button
                        onClick={() => setPreviewingAsset(asset)}
                        className="flex-1 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3 text-cyan-400" /> Preview
                      </button>

                      <button
                        onClick={() => {
                          setReplacingAsset(asset);
                          setReplaceTitle(asset.title);
                          setReplaceSourceUrl(asset.sourceUrl || asset.playbackUrl);
                          setReplaceProvider(asset.provider);
                        }}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Replace Media Source"
                      >
                        <RefreshCw className="w-3.5 h-3.5 text-cyan-400" />
                      </button>

                      <button
                        onClick={() => handleCopyUrl(asset.playbackUrl || asset.sourceUrl)}
                        className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                        title="Copy Playback URL"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Remove "${asset.title}" from media library?`)) {
                            deleteMediaAsset(asset.id);
                          }
                        }}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 transition-colors cursor-pointer"
                        title="Delete Asset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Table View */
          <div className="rounded-2xl bg-neutral-900/60 border border-white/10 overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs text-neutral-300">
              <thead className="bg-black/50 border-b border-white/10 text-[10px] font-mono uppercase tracking-wider text-neutral-400">
                <tr>
                  <th className="p-4">Media Asset</th>
                  <th className="p-4">Provider</th>
                  <th className="p-4">Aspect / Orientation</th>
                  <th className="p-4">Size & Duration</th>
                  <th className="p-4">Attached Projects</th>
                  <th className="p-4">Health</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredAssets.map((asset) => {
                  const attachedProjects = projects.filter((p) => asset.attachedProjectIds?.includes(p.id));
                  return (
                    <tr key={asset.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={asset.thumbnailUrl}
                            alt={`${asset.title} - ${asset.filename}`}
                            className="w-12 h-8 rounded-lg object-cover border border-white/10"
                          />
                          <div className="min-w-0">
                            <span className="font-bold text-white block truncate max-w-[200px]">{asset.title}</span>
                            <span className="text-[10px] font-mono text-neutral-400 truncate block">{asset.filename}</span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono uppercase">
                          {asset.provider.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 font-mono text-[11px] text-cyan-300">
                        {asset.aspectRatio || (asset.orientation === 'portrait' ? '9:16' : '16:9')} ({asset.orientation})
                      </td>
                      <td className="p-4 font-mono text-[11px] text-neutral-400">
                        {asset.duration} • {asset.fileSize}
                      </td>
                      <td className="p-4">
                        <span className="text-xs font-bold text-neutral-200">
                          {attachedProjects.length > 0 ? `${attachedProjects.length} Projects` : 'None'}
                        </span>
                      </td>
                      <td className="p-4">
                        {asset.healthStatus === 'healthy' ? (
                          <span className="inline-flex items-center gap-1 text-emerald-400 font-mono text-[10px]">
                            <CheckCircle2 className="w-3 h-3" /> Healthy
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-400 font-mono text-[10px]">
                            <AlertTriangle className="w-3 h-3" /> Issues
                          </span>
                        )}
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setPreviewingAsset(asset)}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-cyan-400 cursor-pointer"
                            title="Preview"
                          >
                            <Play className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              setReplacingAsset(asset);
                              setReplaceTitle(asset.title);
                              setReplaceSourceUrl(asset.sourceUrl || asset.playbackUrl);
                              setReplaceProvider(asset.provider);
                            }}
                            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white cursor-pointer"
                            title="Replace Media"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Delete "${asset.title}"?`)) {
                                deleteMediaAsset(asset.id);
                              }
                            }}
                            className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : (
        /* Empty State */
        <div className="py-20 text-center rounded-3xl border border-white/10 bg-neutral-900/40 p-8 space-y-3">
          <Film className="w-12 h-12 text-neutral-500 mx-auto" />
          <h3 className="text-lg font-bold text-white">No media assets match filters</h3>
          <p className="text-xs text-neutral-400 max-w-sm mx-auto">
            Try adjusting your search terms or upload a new master video to populate the library.
          </p>
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="mt-4 px-5 py-2.5 rounded-xl bg-cyan-500 text-neutral-950 font-bold text-xs cursor-pointer shadow-lg"
          >
            Upload Master Video
          </button>
        </div>
      )}

      {/* Upload Video Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-neutral-900 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Upload className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Direct Video Upload</h3>
                  <p className="text-xs text-neutral-400">Upload MP4, ProRes, MOV, or WebM footage</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsUploadModalOpen(false);
                  setUploadFile(null);
                  setIsUploading(false);
                }}
                className="p-1.5 rounded-lg bg-white/5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drop Zone */}
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-white/20 hover:border-cyan-400/60 rounded-2xl p-8 text-center bg-black/40 cursor-pointer transition-all space-y-3"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="video/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              <FileVideo className="w-10 h-10 text-cyan-400 mx-auto" />
              <div>
                <p className="text-xs font-semibold text-white">
                  {uploadFile ? uploadFile.name : 'Click to browse or drag and drop video footage'}
                </p>
                <p className="text-[11px] text-neutral-400 mt-0.5">
                  {uploadFile
                    ? `${(uploadFile.size / (1024 * 1024)).toFixed(1)} MB • Ready for processing`
                    : 'Supported: MP4, MOV, ProRes, WebM up to 4K resolution'}
                </p>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Asset Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Commercial Director Cut 4K"
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Aspect Ratio
                  </label>
                  <select
                    value={uploadAspectRatio}
                    onChange={(e) => setUploadAspectRatio(e.target.value as AspectRatioType)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="16:9">16:9 (Landscape Master)</option>
                    <option value="9:16">9:16 (Vertical Reel / TikTok)</option>
                    <option value="1:1">1:1 (Square Feed)</option>
                    <option value="4:5">4:5 (Social Portrait)</option>
                    <option value="2.35:1">2.35:1 (Anamorphic Cinema)</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Tags (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="Commercial, Color Grade, 4K"
                    value={uploadTags}
                    onChange={(e) => setUploadTags(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>
            </div>

            {/* Upload Progress Bar */}
            {isUploading && (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-300">Uploading & Transcoding Stream...</span>
                  <span className="text-white font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-black/60 overflow-hidden">
                  <div
                    className="h-full bg-cyan-400 transition-all duration-150"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white/5 text-xs text-neutral-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={startUpload}
                disabled={isUploading}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50"
              >
                {isUploading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {isUploading ? 'Uploading...' : 'Start Upload'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add External Stream / URL Modal */}
      {isAddUrlModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white">Add External Stream / URL</h3>
              <button onClick={() => setIsAddUrlModalOpen(false)} className="p-1.5 rounded-lg bg-white/5 text-neutral-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Stream URL (Google Drive, YouTube, Vimeo, Direct MP4)
                </label>
                <input
                  type="text"
                  placeholder="https://drive.google.com/file/d/... or https://youtube.com/watch?v=..."
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Asset Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Synthwave Visual Music Video"
                  value={newUrlTitle}
                  onChange={(e) => setNewUrlTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Provider
                  </label>
                  <select
                    value={newUrlProvider}
                    onChange={(e) => setNewUrlProvider(e.target.value as MediaProviderType)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="youtube">YouTube</option>
                    <option value="vimeo">Vimeo</option>
                    <option value="google_drive">Google Drive</option>
                    <option value="direct_upload">Direct URL</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                    Aspect Ratio
                  </label>
                  <select
                    value={newUrlAspect}
                    onChange={(e) => setNewUrlAspect(e.target.value as AspectRatioType)}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="16:9">16:9 (Landscape)</option>
                    <option value="9:16">9:16 (Vertical Reel)</option>
                    <option value="1:1">1:1 (Square)</option>
                    <option value="2.35:1">2.35:1 (Cinema)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsAddUrlModalOpen(false)}
                className="px-4 py-2.5 rounded-xl bg-white/5 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExternalUrl}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs cursor-pointer"
              >
                Add to Library
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Replace Media Modal */}
      {replacingAsset && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Replace Media Asset</h3>
                <p className="text-xs text-neutral-400">
                  Update media source without breaking project links or SEO
                </p>
              </div>
              <button onClick={() => setReplacingAsset(null)} className="p-1.5 rounded-lg bg-white/5 text-neutral-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-cyan-950/40 border border-cyan-500/30 text-xs text-cyan-300">
              Replacing target: <strong className="text-white">{replacingAsset.title}</strong>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                  New Playback / Source URL
                </label>
                <input
                  type="text"
                  value={replaceSourceUrl}
                  onChange={(e) => setReplaceSourceUrl(e.target.value)}
                  placeholder="Paste new Google Drive link, Direct MP4, or YouTube URL..."
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Updated Title
                </label>
                <input
                  type="text"
                  value={replaceTitle}
                  onChange={(e) => setReplaceTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 uppercase tracking-wider block mb-1.5">
                  Provider
                </label>
                <select
                  value={replaceProvider}
                  onChange={(e) => setReplaceProvider(e.target.value as MediaProviderType)}
                  className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="direct_upload">Direct Upload / URL</option>
                  <option value="google_drive">Google Drive</option>
                  <option value="youtube">YouTube</option>
                  <option value="vimeo">Vimeo</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setReplacingAsset(null)}
                className="px-4 py-2.5 rounded-xl bg-white/5 text-xs text-neutral-300"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReplace}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs cursor-pointer"
              >
                Confirm Replacement
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Media Preview Player Modal */}
      {previewingAsset && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-neutral-950 border border-white/15 rounded-3xl p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{previewingAsset.title}</h3>
                <span className="text-xs font-mono text-cyan-400">
                  {previewingAsset.provider.toUpperCase()} • {previewingAsset.aspectRatio || '16:9'} • {previewingAsset.duration}
                </span>
              </div>
              <button
                onClick={() => setPreviewingAsset(null)}
                className="p-2 rounded-full bg-white/5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Universal Video Player */}
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-black">
              <UniversalVideoPlayer
                mediaAsset={previewingAsset}
                autoPlay={true}
                showBadge={true}
                showControls={true}
                className="w-full"
              />
            </div>

            {/* Diagnostic Details Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-xl bg-neutral-900/80 border border-white/5 text-[11px] font-mono">
              <div>
                <span className="text-neutral-500 block">Health:</span>
                <span className="text-emerald-400 font-bold">● {previewingAsset.healthStatus.toUpperCase()}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Resolution:</span>
                <span className="text-white">{previewingAsset.width}x{previewingAsset.height}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">File Size:</span>
                <span className="text-white">{previewingAsset.fileSize}</span>
              </div>
              <div>
                <span className="text-neutral-500 block">Attached Projects:</span>
                <span className="text-cyan-300">{previewingAsset.attachedProjectIds?.length || 0}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Health Check Diagnostic Modal */}
      {isHealthCheckModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-neutral-900 border border-white/15 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Media Diagnostic Report</h3>
                  <p className="text-xs text-neutral-400">Stream validation summary</p>
                </div>
              </div>
              <button
                onClick={() => setIsHealthCheckModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {mediaAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="p-3 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {asset.healthStatus === 'healthy' ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                    )}
                    <div className="min-w-0">
                      <span className="text-xs font-bold text-white block truncate">{asset.title}</span>
                      <span className="text-[10px] font-mono text-neutral-400 truncate block">
                        {asset.provider} • {asset.playbackUrl || asset.sourceUrl}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-bold shrink-0 ${
                      asset.healthStatus === 'healthy'
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {asset.healthStatus}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setIsHealthCheckModalOpen(false)}
                className="px-5 py-2.5 rounded-xl bg-cyan-500 text-neutral-950 font-bold text-xs cursor-pointer"
              >
                Close Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
