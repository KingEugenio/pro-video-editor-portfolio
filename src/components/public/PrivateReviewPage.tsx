import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  MessageSquare,
  Send,
  AlertCircle,
  Play,
  ArrowLeft,
  Shield,
  Film,
  Download,
  Share2,
  Check,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';

interface PrivateReviewPageProps {
  onBack: () => void;
}

interface ReviewComment {
  id: string;
  timecode: string;
  author: string;
  comment: string;
  createdAt: string;
  resolved: boolean;
}

export const PrivateReviewPage: React.FC<PrivateReviewPageProps> = ({ onBack }) => {
  const { brandTheme, projects } = usePortfolio();

  // Selected project for review (default to first commercial project or URL param)
  const defaultProject = projects[0] || {
    id: 'proj-review',
    title: 'Kinetic Fashion Film: Neon Genesis',
    client: 'Vogue Studios / Sony Music',
    category: 'Commercial / Fashion',
    videoUrl: 'https://player.vimeo.com/video/76979871',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=1600&q=80',
    description: 'Private director cut v2.1 with sound design pass and preliminary DaVinci Resolve color grade.',
  };

  // Access Gate
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessError, setAccessError] = useState<string | null>(null);

  // Review states
  const [selectedCut, setSelectedCut] = useState<'v1' | 'v2' | 'v3'>('v2');
  const [currentTimecode, setCurrentTimecode] = useState('00:01:24:12');
  const [authorName, setAuthorName] = useState('');
  const [newComment, setNewComment] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [comments, setComments] = useState<ReviewComment[]>([
    {
      id: 'c1',
      timecode: '00:00:14:08',
      author: 'Elena Rostova (Executive Producer)',
      comment: 'The transition into the neon alleyway hits perfectly. Let’s hold on the wide shot for 8 more frames.',
      createdAt: 'Yesterday, 4:20 PM',
      resolved: true,
    },
    {
      id: 'c2',
      timecode: '00:00:48:19',
      author: 'Marcus Vance (Creative Director)',
      comment: 'Audio riser might be clipping slightly during the bass drop. Color grade contrast on actor skin is immaculate.',
      createdAt: 'Today, 10:15 AM',
      resolved: false,
    },
  ]);

  // Check URL query parameters for direct token access
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token') || params.get('key');
    if (token === 'cine-review' || token === 'client' || token === 'demo') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim().toLowerCase() === 'cine2026' || passcode.trim().toLowerCase() === 'client' || passcode.trim().toLowerCase() === 'review') {
      setIsAuthenticated(true);
      setAccessError(null);
    } else {
      setAccessError('Invalid client access token. Check the private review email link or use demo passcode: "cine2026".');
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const item: ReviewComment = {
      id: `comm-${Date.now()}`,
      timecode: currentTimecode,
      author: authorName.trim() || 'Agency Reviewer',
      comment: newComment.trim(),
      createdAt: 'Just now',
      resolved: false,
    };

    setComments((prev) => [item, ...prev]);
    setNewComment('');
  };

  const toggleResolved = (id: string) => {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, resolved: !c.resolved } : c))
    );
  };

  return (
    <div className="min-h-screen bg-[#07070b] text-neutral-100 py-12 px-4 sm:px-6 lg:px-8 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background ambient lighting */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 blur-3xl z-0"
        style={{
          background: `radial-gradient(circle at 50% 10%, ${brandTheme.colors.primary} 0%, transparent 65%)`,
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10 space-y-8">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs transition-colors cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
              <Shield className="w-3.5 h-3.5" />
              Confidential Client Portal (NDA Active)
            </span>
          </div>
        </div>

        {/* 1. ACCESS GATE IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-16 text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-2xl">
              <Lock className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading">
                Private Client Review Room
              </h1>
              <p className="text-xs sm:text-sm text-neutral-400 font-body leading-relaxed">
                Enter your private client access passcode provided in your delivery dispatch email.
              </p>
            </div>

            <form onSubmit={handleUnlock} className="space-y-4">
              {accessError && (
                <div role="alert" className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{accessError}</span>
                </div>
              )}

              <input
                type="password"
                placeholder="Enter client access passcode (e.g. cine2026)"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/15 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 font-mono text-center tracking-wider"
              />

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl transition-transform hover:scale-[1.01]"
                style={{
                  backgroundColor: brandTheme.colors.button || brandTheme.colors.primary,
                  color: brandTheme.colors.buttonText || '#000',
                }}
              >
                <Unlock className="w-4 h-4" />
                Unlock Client Cut
              </button>

              <p className="text-[11px] font-mono text-neutral-500">
                Demo review passcode: <code className="text-cyan-400">cine2026</code>
              </p>
            </form>
          </div>
        ) : (
          /* 2. AUTHENTICATED REVIEW ROOM INTERFACE */
          <div className="space-y-8 animate-in fade-in duration-300">
            {/* Project Overview Bar */}
            <div className="p-6 rounded-3xl bg-[#0d0d14]/90 border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-6 backdrop-blur-2xl shadow-2xl">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono font-bold">
                    {defaultProject.category}
                  </span>
                  <span className="text-xs font-mono text-neutral-400">
                    Client: <strong className="text-neutral-200">{defaultProject.client}</strong>
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading">
                  {defaultProject.title}
                </h1>
                <p className="text-xs text-neutral-400 max-w-2xl font-body">
                  {defaultProject.description}
                </p>
              </div>

              {/* Approval status banner / action */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                {isApproved ? (
                  <div className="px-4 py-2.5 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Cut Approved by Client • In Final Conforming</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsApproved(true)}
                    className="w-full sm:w-auto px-5 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-transform hover:scale-[1.02]"
                  >
                    <Check className="w-4 h-4" />
                    Approve Cut for Master Delivery
                  </button>
                )}
              </div>
            </div>

            {/* Video Cut Player + Cut Selector */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                {/* Cut Version Selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-neutral-400 mr-1">Version:</span>
                  <button
                    onClick={() => setSelectedCut('v1')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      selectedCut === 'v1'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Cut v1.0 (Rough)
                  </button>
                  <button
                    onClick={() => setSelectedCut('v2')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      selectedCut === 'v2'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Cut v2.1 (Fine Cut)
                  </button>
                  <button
                    onClick={() => setSelectedCut('v3')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      selectedCut === 'v3'
                        ? 'bg-cyan-500 text-black font-bold'
                        : 'bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    Cut v3.0 (Master Grade)
                  </button>
                </div>

                <span className="text-xs font-mono text-cyan-400">
                  Timecode: {currentTimecode}
                </span>
              </div>

              {/* 16:9 Video Canvas */}
              <div className="relative aspect-video rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
                <iframe
                  src="https://player.vimeo.com/video/76979871?autoplay=0&title=0&byline=0&portrait=0"
                  className="w-full h-full object-cover"
                  allow="autoplay; fullscreen; picture-in-picture"
                  title="Private Client Review Cut"
                />

                {/* Watermark notice */}
                <div className="absolute top-4 right-4 pointer-events-none px-2.5 py-1 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-white/60 uppercase tracking-widest backdrop-blur-md">
                  CONFIDENTIAL • PROPERTY OF {defaultProject.client.toUpperCase()}
                </div>
              </div>
            </div>

            {/* Timecoded Review Comments Engine */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
              {/* Left Form: Add Timecoded Note */}
              <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0c0c12]/80 border border-white/10 space-y-4">
                <h3 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  Leave Frame-Accurate Note
                </h3>

                <form onSubmit={handleAddComment} className="space-y-3.5">
                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">
                      Your Name / Role
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Elena Rostova (Producer)"
                      value={authorName}
                      onChange={(e) => setAuthorName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 font-body"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-mono text-neutral-400">
                        Target Timecode
                      </label>
                      <button
                        type="button"
                        onClick={() => setCurrentTimecode('00:01:42:08')}
                        className="text-[11px] font-mono text-cyan-400 hover:underline"
                      >
                        Capture Current Frame
                      </button>
                    </div>
                    <input
                      type="text"
                      value={currentTimecode}
                      onChange={(e) => setCurrentTimecode(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs font-mono text-cyan-300 focus:outline-none focus:border-cyan-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1">
                      Feedback / Edit Instruction
                    </label>
                    <textarea
                      rows={3}
                      required
                      placeholder="Describe what to trim, re-grade, re-time, or sound fix..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 font-body resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors border border-white/10"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Timecoded Note
                  </button>
                </form>
              </div>

              {/* Right List: Review Notes Stream */}
              <div className="lg:col-span-7 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <h3 className="text-base font-bold text-white font-heading">
                    Review Notes ({comments.length})
                  </h3>
                  <span className="text-xs font-mono text-neutral-400">
                    {comments.filter((c) => c.resolved).length} resolved
                  </span>
                </div>

                <div className="space-y-3">
                  {comments.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border transition-all ${
                        item.resolved
                          ? 'bg-white/[0.02] border-white/5 opacity-60'
                          : 'bg-[#101018]/90 border-white/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded bg-cyan-950/70 border border-cyan-500/30 text-cyan-300 font-mono text-[11px] font-bold">
                              {item.timecode}
                            </span>
                            <span className="font-heading font-semibold text-xs text-white">
                              {item.author}
                            </span>
                            <span className="text-[10px] text-neutral-500 font-mono">
                              • {item.createdAt}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-300 font-body leading-relaxed pt-1">
                            {item.comment}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => toggleResolved(item.id)}
                          className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer shrink-0 ${
                            item.resolved
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                              : 'bg-white/5 text-neutral-400 hover:text-white border-white/10'
                          }`}
                          title={item.resolved ? 'Mark unresolved' : 'Mark resolved'}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
