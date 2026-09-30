import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Film, Lock, MapPin, HelpCircle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';

interface PublicNavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection?: string;
  onOpenShowreel?: () => void;
  onOpenAdmin?: () => void;
}

export const PublicNavbar: React.FC<PublicNavbarProps> = ({
  onNavigate,
  activeSection = 'hero',
  onOpenShowreel,
  onOpenAdmin,
}) => {
  const { brandTheme } = usePortfolio();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'work', label: 'Work' },
    { id: 'services', label: 'Services' },
    { id: 'about', label: 'About' },
    { id: 'faq', label: 'FAQ' },
    { id: 'map', label: 'Studio Map' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'contact', label: 'Book Brief' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 pointer-events-none transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 sm:pt-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className={`pointer-events-auto flex items-center justify-between mx-auto transition-all duration-300 rounded-full px-4 sm:px-6 py-2.5 sm:py-3 ${
            isScrolled
              ? 'bg-[#0a0a0e]/90 backdrop-blur-2xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.6)] max-w-5xl'
              : 'bg-[#0e0e14]/50 backdrop-blur-xl border border-white/8 max-w-6xl'
          }`}
        >
          {/* Brand Logo & Identifier */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2.5 group cursor-pointer text-left focus:outline-none"
          >
            {brandTheme.logoUrl ? (
              <img
                src={brandTheme.logoUrl}
                alt={`${brandTheme.brandName} - Video Editing & Post-Production Studio Logo`}
                className="h-8 w-auto object-contain rounded"
              />
            ) : (
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-lg transition-transform group-hover:scale-105"
                style={{
                  backgroundColor: brandTheme.colors.primary,
                  color: brandTheme.colors.buttonText,
                }}
              >
                <Film className="w-4 h-4" />
              </div>
            )}
            <div className="flex flex-col">
              <span className="font-display text-sm sm:text-base font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
                {brandTheme.brandName}
              </span>
            </div>
          </button>

          {/* Desktop Floating Navigation Pills */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-3.5 py-1.5 rounded-full text-xs font-nav uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-neutral-100 hover:bg-white/5'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-white/10 border border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.08)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleLinkClick('contact')}
              className="relative group hidden sm:flex items-center gap-2 px-5 py-2 rounded-full font-button font-bold text-xs uppercase tracking-wider transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer overflow-hidden shadow-lg"
              style={{
                backgroundColor: brandTheme.colors.button || brandTheme.colors.primary,
                color: brandTheme.colors.buttonText || '#000',
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none"
                style={{
                  background: `linear-gradient(90deg, ${brandTheme.colors.primary}, ${brandTheme.colors.secondary})`,
                }}
              />
              <span className="relative z-10 flex items-center gap-1.5">
                Start a Project
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </button>

            {/* Studio CMS Admin Access Button */}
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white text-xs font-mono border border-white/10 transition-colors cursor-pointer"
                title="Open Studio Admin CMS"
                aria-label="Studio Admin CMS"
              >
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                <span className="hidden xl:inline">Admin</span>
              </button>
            )}

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-full text-neutral-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto lg:hidden fixed inset-x-4 top-20 bg-[#0c0c12]/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 shadow-2xl z-50 max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`text-left px-4 py-3 rounded-xl font-heading text-base font-semibold tracking-wide transition-all ${
                    activeSection === link.id
                      ? 'bg-white/10 text-white'
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}

              <div className="pt-3 border-t border-white/10 space-y-2">
                <button
                  onClick={() => handleLinkClick('contact')}
                  className="w-full py-3.5 rounded-xl font-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                  style={{
                    backgroundColor: brandTheme.colors.button || brandTheme.colors.primary,
                    color: brandTheme.colors.buttonText || '#000',
                  }}
                >
                  Start a Project
                  <ArrowUpRight className="w-4 h-4" />
                </button>

                {onOpenAdmin && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenAdmin();
                    }}
                    className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-mono border border-white/10 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Lock className="w-3.5 h-3.5 text-cyan-400" />
                    Open Studio CMS Admin
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
