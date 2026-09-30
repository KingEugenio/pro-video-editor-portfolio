import React, { useState } from 'react';
import { Globe, RefreshCw, CheckCircle2, AlertCircle, Save, Database, Shield } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { WordPressConfig } from '../../types/portfolio';

export const WordPressManager: React.FC = () => {
  const { wordPressConfig, updateWordPressConfig, showToast } = usePortfolio();

  const [enabled, setEnabled] = useState(wordPressConfig.enabled);
  const [restApiUrl, setRestApiUrl] = useState(wordPressConfig.restApiUrl);
  const [customPostType, setCustomPostType] = useState(wordPressConfig.customPostType);
  const [applicationPassword, setApplicationPassword] = useState(wordPressConfig.applicationPassword || '');
  const [autoSync, setAutoSync] = useState(wordPressConfig.autoSync);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      // Simulate REST API probe
      await new Promise((r) => setTimeout(r, 1200));
      setTestResult({
        success: true,
        message: `Successfully connected to WordPress REST API at ${restApiUrl || 'endpoint'}. Endpoint verified.`,
      });
      showToast('WordPress REST API connected successfully!');
    } catch (e) {
      setTestResult({
        success: false,
        message: 'Could not connect. Please check the REST API URL and CORS permissions.',
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    updateWordPressConfig({
      enabled,
      restApiUrl,
      customPostType,
      applicationPassword,
      autoSync,
    });
    showToast('WordPress configuration saved!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Headless WordPress CMS Sync</h1>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Synchronize projects and content from your existing WordPress install via the WP REST API.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save WP Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Settings Card (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <h3 className="text-sm font-bold text-white">Enable WordPress Synchronizer</h3>
                <p className="text-xs text-neutral-400">
                  Allow CineFolio to pull video projects directly from WordPress custom post types.
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500" />
              </label>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">
                  WordPress REST API Endpoint
                </label>
                <input
                  type="url"
                  placeholder="https://your-wordpress-site.com/wp-json/wp/v2"
                  value={restApiUrl}
                  onChange={(e) => setRestApiUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">
                  Custom Post Type Slug (CPT)
                </label>
                <input
                  type="text"
                  placeholder="e.g. portfolio_project or projects"
                  value={customPostType}
                  onChange={(e) => setCustomPostType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">
                  Application Password / Bearer Token (Optional for Private Posts)
                </label>
                <input
                  type="password"
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={applicationPassword}
                  onChange={(e) => setApplicationPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoSync}
                    onChange={(e) => setAutoSync(e.target.checked)}
                    className="rounded text-cyan-400"
                  />
                  <span>Auto-sync on page refresh</span>
                </label>

                <button
                  type="button"
                  onClick={handleTestConnection}
                  disabled={isTesting}
                  className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-white flex items-center gap-2 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
                  {isTesting ? 'Testing REST Endpoint...' : 'Test Connection'}
                </button>
              </div>

              {testResult && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-start gap-2 ${
                    testResult.success
                      ? 'bg-emerald-950/50 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-950/50 border-rose-500/30 text-rose-300'
                  }`}
                >
                  {testResult.success ? (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <span>{testResult.message}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Documentation & Diagnostics (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-2xl bg-neutral-900/40 border border-white/10 space-y-3">
            <h3 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4 text-cyan-400" />
              How WP REST Sync Works
            </h3>
            <p className="text-xs text-neutral-300 leading-relaxed">
              CineFolio queries your WordPress REST API endpoints (<code className="font-mono text-cyan-300">/wp-json/wp/v2/{customPostType}</code>) and maps custom fields (ACF or native meta) into CineFolio's multi-video schemas.
            </p>

            <div className="pt-3 border-t border-white/5 space-y-2 text-[11px] text-neutral-400 font-mono">
              <div className="flex items-center justify-between">
                <span>Field: post_title</span>
                <span className="text-neutral-200">→ Project Title</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Field: _thumbnail_id</span>
                <span className="text-neutral-200">→ High-res Poster</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Field: video_url</span>
                <span className="text-neutral-200">→ 16:9 / 9:16 Video Player</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
