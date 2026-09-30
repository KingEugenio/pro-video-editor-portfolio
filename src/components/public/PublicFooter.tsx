import React from 'react';
import { ExternalLink, Film, Globe, Shield, MapPin, HelpCircle, Share2 } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import {
  WhatsAppIcon,
  YouTubeIcon,
  InstagramIcon,
  TwitterXIcon,
  LinkedInIcon,
} from '../icons/CustomSvgIcons';
import { SocialShareBar } from './SocialShareBar';

interface PublicFooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenPrivacyPolicy?: () => void;
  onOpenClientReview?: () => void;
  onOpen404?: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  onNavigate,
  onOpenPrivacyPolicy,
  onOpenClientReview,
  onOpen404,
}) => {
  const { brandTheme, socialLinks } = usePortfolio();

  return (
    <footer className="border-t border-white/8 bg-[#050508]/95 backdrop-blur-xl pt-16 pb-12 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Top Tier */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand Info */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2.5">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs"
                style={{
                  backgroundColor: brandTheme.colors.primary,
                  color: brandTheme.colors.buttonText,
                }}
              >
                <Film className="w-4 h-4" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white">
                {brandTheme.brandName}
              </span>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm font-body leading-relaxed">
              {brandTheme.professionalTitle} • Based in {brandTheme.location}. Dedicated to high-retention commercial cuts, narrative pacing, and ACES color science.
            </p>

            {/* Social Icons with Real SVGs */}
            <div className="flex items-center gap-2.5 pt-2">
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a
                  href={socialLinks.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <YouTubeIcon className="w-4 h-4" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  aria-label="Twitter / X"
                >
                  <TwitterXIcon className="w-4 h-4" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>
              )}
              {socialLinks.whatsapp && (
                <a
                  href={`https://wa.me/${socialLinks.whatsapp.replace(/[^0-9+]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-400 hover:text-emerald-300 transition-colors"
                  aria-label="WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links Navigation Column 1 */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block font-bold">
              Portfolio Navigation
            </span>
            <nav aria-label="Primary Footer Navigation" className="flex flex-col space-y-2 text-xs text-neutral-400 font-nav">
              <button
                onClick={() => onNavigate('work')}
                className="text-left hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Selected Commercial & Music Video Work
              </button>
              <button
                onClick={() => onNavigate('services')}
                className="text-left hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Post-Production Services & Rates
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left hover:text-cyan-300 transition-colors cursor-pointer"
              >
                About Editor & Soho Suite
              </button>
              <button
                onClick={() => onNavigate('testimonials')}
                className="text-left hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Director & Client Endorsements
              </button>
            </nav>
          </div>

          {/* Quick Links Navigation Column 2 */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block font-bold">
              Resources & Physical Studio
            </span>
            <nav aria-label="Secondary Footer Navigation" className="flex flex-col space-y-2 text-xs text-neutral-400 font-nav">
              <button
                onClick={() => onNavigate('faq')}
                className="text-left hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>Frequently Asked Questions</span>
              </button>
              <button
                onClick={() => onNavigate('map')}
                className="text-left hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Studio Map & Courier Directions</span>
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-cyan-300 transition-colors cursor-pointer"
              >
                Submit Project Brief & Rates
              </button>
              {onOpenClientReview && (
                <button
                  onClick={onOpenClientReview}
                  className="text-left text-neutral-400 hover:text-cyan-300 transition-colors cursor-pointer flex items-center gap-1.5 font-mono"
                >
                  <Film className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Client Review & Cut Approval</span>
                </button>
              )}
              {onOpenPrivacyPolicy && (
                <button
                  onClick={onOpenPrivacyPolicy}
                  className="text-left text-neutral-400 hover:text-white transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Shield className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Privacy Policy & NDAs</span>
                </button>
              )}
              {onOpen404 && (
                <button
                  onClick={onOpen404}
                  className="text-left text-neutral-500 hover:text-neutral-300 transition-colors cursor-pointer text-[11px] font-mono"
                >
                  <span>404 Missing Clip Preview</span>
                </button>
              )}
            </nav>
          </div>

          {/* Social Share Column */}
          <div className="md:col-span-2 space-y-2">
            <SocialShareBar layout="compact" />
          </div>
        </div>

        {/* Bottom Tier & Permanent Developer Attribution */}
        <div className="pt-8 border-t border-white/6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-mono">
          <p>© {new Date().getFullYear()} {brandTheme.brandName}. All cuts and visual assets protected.</p>

          {/* Permanent Core Developer Attribution */}
          <div className="flex items-center gap-1.5">
            <a
              id="ekopixels-developer-attribution-link"
              href="https://www.instagram.com/ekopixels?stkn=OGRwdmdleWd4Y282&utm_source=qr"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold tracking-widest text-neutral-400 hover:text-cyan-400 transition-colors uppercase inline-flex items-center gap-1 hover:underline"
            >
              BUILT BY EKO PIXELS
              <ExternalLink className="w-3 h-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
