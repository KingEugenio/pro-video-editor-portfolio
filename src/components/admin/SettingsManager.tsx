import React, { useState } from 'react';
import {
  Settings,
  Share2,
  Download,
  Upload,
  RotateCcw,
  Save,
  Globe,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
  CheckCircle2,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const SettingsManager: React.FC = () => {
  const {
    socialLinks,
    updateSocialLinks,
    brandTheme,
    projects,
    services,
    testimonials,
    formConfig,
    showToast,
  } = usePortfolio();

  const [instagram, setInstagram] = useState(socialLinks.instagram || '');
  const [youtube, setYoutube] = useState(socialLinks.youtube || '');
  const [twitter, setTwitter] = useState(socialLinks.twitter || '');
  const [linkedin, setLinkedin] = useState(socialLinks.linkedin || '');
  const [vimeo, setVimeo] = useState(socialLinks.vimeo || '');
  const [tiktok, setTiktok] = useState(socialLinks.tiktok || '');

  const handleSaveSocials = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialLinks({
      instagram,
      youtube,
      twitter,
      linkedin,
      vimeo,
      tiktok,
    });
    showToast('Social links updated successfully!');
  };

  const handleExportJSON = () => {
    const fullBackup = {
      version: '2.6',
      exportedAt: new Date().toISOString(),
      brandTheme,
      projects,
      services,
      testimonials,
      formConfig,
      socialLinks: { instagram, youtube, twitter, linkedin, vimeo, tiktok },
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(fullBackup, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${brandTheme.brandName.toLowerCase().replace(/\s+/g, '_')}_cinefolio_backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Full portfolio backup JSON exported!');
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Platform Settings & Social Channels</h1>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure public social profiles, SEO indexing, and download complete offline JSON backups.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Social Links Form (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-5 shadow-xl">
            <h3 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider flex items-center gap-2">
              <Share2 className="w-4 h-4 text-cyan-400" />
              Public Social Media Channels
            </h3>

            <form onSubmit={handleSaveSocials} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-pink-400" /> Instagram Profile URL
                </label>
                <input
                  type="url"
                  placeholder="https://instagram.com/..."
                  value={instagram}
                  onChange={(e) => setInstagram(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 flex items-center gap-2">
                  <Youtube className="w-3.5 h-3.5 text-red-400" /> YouTube Channel URL
                </label>
                <input
                  type="url"
                  placeholder="https://youtube.com/@..."
                  value={youtube}
                  onChange={(e) => setYoutube(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 flex items-center gap-2">
                  <Twitter className="w-3.5 h-3.5 text-cyan-400" /> X / Twitter Profile URL
                </label>
                <input
                  type="url"
                  placeholder="https://twitter.com/..."
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-neutral-300 flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-blue-400" /> LinkedIn Profile URL
                </label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/in/..."
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400"
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save Social Links
              </button>
            </form>
          </div>
        </div>

        {/* Export & Data Management (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider flex items-center gap-2">
              <Download className="w-4 h-4 text-cyan-400" />
              Backup & Data Portability
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Export your entire portfolio state (all projects, multi-video configs, brand tokens, services, and enquiries) to a single portable JSON file.
            </p>

            <button
              type="button"
              onClick={handleExportJSON}
              className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold flex items-center justify-center gap-2 border border-white/10 transition-colors"
            >
              <Download className="w-4 h-4" /> Download Complete JSON Backup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
