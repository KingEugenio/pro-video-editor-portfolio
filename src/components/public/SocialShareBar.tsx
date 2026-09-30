import React, { useState } from 'react';
import { Share2, Check, Copy, Mail } from 'lucide-react';
import {
  WhatsAppIcon,
  TwitterXIcon,
  LinkedInIcon,
} from '../icons/CustomSvgIcons';

interface SocialShareBarProps {
  url?: string;
  title?: string;
  text?: string;
  className?: string;
  layout?: 'compact' | 'expanded' | 'pills';
  onShareSuccess?: () => void;
}

export const SocialShareBar: React.FC<SocialShareBarProps> = ({
  url,
  title = 'EKO Pixels — Video Editor & Colorist Portfolio',
  text = 'Explore cinematic video editing, color grading case studies, and commercial post-production work by EKO Pixels.',
  className = '',
  layout = 'pills',
  onShareSuccess,
}) => {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== 'undefined' ? window.location.href : 'https://cinefolio.portfolio');
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedText = encodeURIComponent(text);

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url: shareUrl,
        });
        if (onShareSuccess) onShareSuccess();
      } catch (err) {
        // User cancelled or share failed
      }
    } else {
      handleCopyLink();
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
    if (onShareSuccess) onShareSuccess();
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <WhatsAppIcon className="w-4 h-4 text-emerald-400" />,
      colorClass: 'hover:border-emerald-500/40 hover:bg-emerald-950/40 text-emerald-300',
    },
    {
      name: 'X (Twitter)',
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      icon: <TwitterXIcon className="w-4 h-4 text-neutral-200" />,
      colorClass: 'hover:border-white/40 hover:bg-white/10 text-white',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedInIcon className="w-4 h-4 text-blue-400" />,
      colorClass: 'hover:border-blue-500/40 hover:bg-blue-950/40 text-blue-300',
    },
    {
      name: 'Email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedText}%0A%0A${encodedUrl}`,
      icon: <Mail className="w-4 h-4 text-amber-300" />,
      colorClass: 'hover:border-amber-500/40 hover:bg-amber-950/40 text-amber-200',
    },
  ];

  if (layout === 'compact') {
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button
            type="button"
            onClick={handleNativeShare}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            title="Share"
            aria-label="Share via system dialog"
          >
            <Share2 className="w-4 h-4" />
          </button>
        )}
        <button
          type="button"
          onClick={handleCopyLink}
          className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          title={copied ? 'Link Copied!' : 'Copy Link'}
          aria-label="Copy link to clipboard"
        >
          {copied ? <Check className="w-4 h-4 text-cyan-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
          <Share2 className="w-3.5 h-3.5 text-cyan-400" />
          Share Studio / Case Study
        </span>
        {copied && (
          <span className="text-[11px] font-mono text-cyan-400 flex items-center gap-1 animate-in fade-in">
            <Check className="w-3 h-3" /> Copied Link!
          </span>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {/* Copy Link Button */}
        <button
          type="button"
          onClick={handleCopyLink}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border text-xs font-mono transition-all cursor-pointer ${
            copied
              ? 'border-cyan-500/50 bg-cyan-950/40 text-cyan-300'
              : 'border-white/10 text-neutral-300 hover:border-white/20 hover:text-white hover:bg-white/10'
          }`}
        >
          {copied ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
          <span>{copied ? 'Link Copied' : 'Copy Link'}</span>
        </button>

        {/* Social Share Buttons */}
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono transition-all cursor-pointer ${link.colorClass}`}
            aria-label={`Share on ${link.name}`}
          >
            {link.icon}
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};
