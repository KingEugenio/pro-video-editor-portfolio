import React, { useState, useEffect } from 'react';
import { Film, ArrowLeft, Home, Search, Play, HelpCircle, MapPin, Calendar, Compass, Shield, ArrowUpRight } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface NotFoundPageProps {
  onReturnHome: () => void;
  onNavigateSection: (sectionId: string) => void;
  onOpenPrivacyPolicy?: () => void;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({
  onReturnHome,
  onNavigateSection,
  onOpenPrivacyPolicy,
}) => {
  const { brandTheme, projects } = usePortfolio();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `404 - Sequence Not Found | ${brandTheme.brandName}`;
  }, [brandTheme.brandName]);

  const filteredProjects = projects
    .filter((p) => p.title.toLowerCase().includes(searchTerm.toLowerCase()) || p.category.toLowerCase().includes(searchTerm.toLowerCase()))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-[#06060a] text-neutral-100 py-16 px-4 sm:px-6 lg:px-8 relative selection:bg-cyan-500/30 selection:text-cyan-200 flex flex-col justify-between">
      {/* Background Aurora */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 blur-3xl z-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${brandTheme.colors.primary} 0%, ${brandTheme.colors.secondary} 40%, transparent 70%)`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 w-full space-y-10 my-auto">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs transition-colors cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>

          <span className="font-mono text-xs text-rose-400 font-bold tracking-widest uppercase">
            STATUS: 404 TIMELINE ERROR
          </span>
        </div>

        {/* Cinematic 404 Hero Banner */}
        <div className="rounded-3xl bg-[#0c0c12]/90 border border-rose-500/30 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden">
          {/* Film Leader / Missing Media Slate Graphic */}
          <div className="mx-auto w-24 h-24 rounded-2xl bg-neutral-900 border border-rose-500/40 flex flex-col items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(244,63,94,0.2)]">
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(244,63,94,0.1)_50%,transparent_75%)] bg-[size:16px_16px]" />
            <Film className="w-8 h-8 text-rose-400 mb-1" />
            <span className="font-mono font-bold text-rose-400 text-xs tracking-wider">MEDIA OFFLINE</span>
          </div>

          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/80 border border-rose-500/40 text-rose-300 font-mono text-xs">
              <span>TC 00:04:04:00 • SEQUENCE DISCONNECTED</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-white font-heading tracking-tight">
              404: Clip Not in Timeline
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-body leading-relaxed max-w-xl mx-auto">
              The cut or reel you are looking for has been moved, unlinked, or archived. Explore our active portfolio reels, commercial services, or book an enquiry below.
            </p>
          </div>

          {/* Quick Search on 404 */}
          <div className="max-w-md mx-auto relative pt-2">
            <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 translate-y-[-2px]" />
            <input
              type="text"
              placeholder="Search editing projects & styles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-black/60 border border-white/15 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          {searchTerm && filteredProjects.length > 0 && (
            <div className="max-w-md mx-auto text-left bg-black/80 rounded-2xl border border-white/10 p-3 space-y-2">
              <span className="text-[10px] font-mono uppercase text-neutral-400 px-2 block">Matching Works:</span>
              {filteredProjects.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => {
                    onReturnHome();
                    setTimeout(() => onNavigateSection('work'), 100);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl hover:bg-white/10 flex items-center justify-between text-xs text-neutral-200 transition-colors cursor-pointer"
                >
                  <span className="font-bold text-white truncate">{p.title}</span>
                  <span className="text-[10px] font-mono text-cyan-300">{p.category}</span>
                </button>
              ))}
            </div>
          )}

          {/* Main CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={onReturnHome}
              className="px-6 py-3 rounded-full bg-cyan-400 text-neutral-950 font-button font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-all cursor-pointer shadow-lg flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              <span>Return to Studio Home</span>
            </button>

            <button
              type="button"
              onClick={() => {
                onReturnHome();
                setTimeout(() => onNavigateSection('work'), 100);
              }}
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white font-button font-bold text-xs uppercase tracking-wider transition-all cursor-pointer border border-white/15 flex items-center gap-2"
            >
              <Play className="w-3.5 h-3.5" />
              <span>Browse Selected Work</span>
            </button>
          </div>
        </div>

        {/* Directory of Internal Links */}
        <div className="rounded-3xl bg-[#0c0c12]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <h2 className="text-base font-bold text-white font-heading flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400" />
            Navigate to Key Sections
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { id: 'work', label: 'Selected Work', desc: 'Case studies & reels' },
              { id: 'services', label: 'Services & Rates', desc: 'Editing, grading & audio' },
              { id: 'about', label: 'About & Suite', desc: 'Hardware & background' },
              { id: 'faq', label: 'Post-Prod FAQ', desc: 'Turnarounds & codecs' },
              { id: 'map', label: 'Studio Directions', desc: 'Soho London & SSD drop' },
              { id: 'testimonials', label: 'Client Reviews', desc: 'Director endorsements' },
              { id: 'contact', label: 'Book Project', desc: 'Commission brief' },
              { id: 'privacy', label: 'Privacy Policy', desc: 'GDPR & media NDAs' },
            ].map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => {
                  if (link.id === 'privacy' && onOpenPrivacyPolicy) {
                    onOpenPrivacyPolicy();
                  } else {
                    onReturnHome();
                    setTimeout(() => onNavigateSection(link.id), 100);
                  }
                }}
                className="p-3.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/8 hover:border-cyan-500/30 text-left transition-all group cursor-pointer"
              >
                <span className="font-heading text-xs font-bold text-white group-hover:text-cyan-300 block">
                  {link.label}
                </span>
                <span className="text-[11px] text-neutral-400 font-body block mt-0.5">
                  {link.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer copyright */}
      <div className="text-center text-xs text-neutral-500 font-mono pt-8">
        © {new Date().getFullYear()} {brandTheme.brandName}. All cuts and visual assets protected.
      </div>
    </div>
  );
};
