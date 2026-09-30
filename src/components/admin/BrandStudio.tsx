import React, { useState } from 'react';
import {
  Palette,
  Type,
  Layout,
  Layers,
  Smartphone,
  Tablet,
  Monitor,
  RotateCcw,
  Check,
  Eye,
  Sliders,
  Image as ImageIcon,
  Save,
  Play,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { BrandColors, BrandTheme } from '../../types/portfolio';
import { CustomTuningIcon } from '../icons/CustomSvgIcons';

export const BrandStudio: React.FC = () => {
  const { brandTheme, updateBrandTheme, resetBrandTheme, showToast } = usePortfolio();

  const [activeTab, setActiveTab] = useState<'colors' | 'aurora' | 'kinetic' | 'typography' | 'identity' | 'glass' | 'templates'>('colors');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving'>('saved');

  // Palette Presets
  const PALETTE_PRESETS: { name: string; colors: BrandColors }[] = [
    {
      name: 'Electric Cyan & Dark Cinema',
      colors: {
        primary: '#00D4FF',
        secondary: '#7C3AED',
        accent: '#FF5E3A',
        background: '#050508',
        surface: '#0e0e14',
        surfaceElevated: '#161622',
        textPrimary: '#F4F4F5',
        textSecondary: '#A1A1AA',
        border: 'rgba(255, 255, 255, 0.08)',
        button: '#00D4FF',
        buttonText: '#050508',
      },
    },
    {
      name: 'Neon Violet & Cyber Dream',
      colors: {
        primary: '#A855F7',
        secondary: '#06B6D4',
        accent: '#EC4899',
        background: '#08060f',
        surface: '#110d1f',
        surfaceElevated: '#1b1433',
        textPrimary: '#FAF5FF',
        textSecondary: '#C084FC',
        border: 'rgba(168, 85, 247, 0.15)',
        button: '#A855F7',
        buttonText: '#09080E',
      },
    },
    {
      name: 'Obsidian & Gold Luxury',
      colors: {
        primary: '#EAB308',
        secondary: '#D97706',
        accent: '#F59E0B',
        background: '#080808',
        surface: '#121212',
        surfaceElevated: '#1C1C1C',
        textPrimary: '#FEFCE8',
        textSecondary: '#A3A3A3',
        border: 'rgba(234, 179, 8, 0.15)',
        button: '#EAB308',
        buttonText: '#080808',
      },
    },
    {
      name: 'Emerald Cinema & Forest Deep',
      colors: {
        primary: '#10B981',
        secondary: '#06B6D4',
        accent: '#34D399',
        background: '#050a08',
        surface: '#0c1712',
        surfaceElevated: '#14261e',
        textPrimary: '#ECFDF5',
        textSecondary: '#6EE7B7',
        border: 'rgba(16, 185, 129, 0.15)',
        button: '#10B981',
        buttonText: '#050a08',
      },
    },
    {
      name: 'Monochrome High-Fashion Studio',
      colors: {
        primary: '#FFFFFF',
        secondary: '#71717A',
        accent: '#A1A1AA',
        background: '#050505',
        surface: '#121212',
        surfaceElevated: '#1F1F1F',
        textPrimary: '#FFFFFF',
        textSecondary: '#A1A1AA',
        border: 'rgba(255, 255, 255, 0.12)',
        button: '#FFFFFF',
        buttonText: '#050505',
      },
    },
  ];

  const FONT_PRESETS = [
    { name: 'Sora & Inter (Futuristic Tech)', heading: 'Sora', body: 'Inter' },
    { name: 'Syne & Plus Jakarta Sans (Cinematic Modern)', heading: 'Syne', body: 'Plus Jakarta Sans' },
    { name: 'Playfair Display & Manrope (Editorial Luxury)', heading: 'Playfair Display', body: 'Manrope' },
    { name: 'Space Grotesk & DM Sans (Electronic & Raw)', heading: 'Space Grotesk', body: 'DM Sans' },
    { name: 'Cinzel & Inter (Dramatic Prestige)', heading: 'Cinzel', body: 'Inter' },
    { name: 'Bebas Neue & Montserrat (Bold Commercial)', heading: 'Bebas Neue', body: 'Montserrat' },
  ];

  const handleColorChange = (key: keyof BrandColors, value: string) => {
    setSaveStatus('saving');
    updateBrandTheme({
      colors: {
        ...brandTheme.colors,
        [key]: value,
      },
    });
    setTimeout(() => setSaveStatus('saved'), 300);
  };

  const handleApplyPalette = (preset: typeof PALETTE_PRESETS[0]) => {
    setSaveStatus('saving');
    updateBrandTheme({
      colors: preset.colors,
    });
    setTimeout(() => setSaveStatus('saved'), 300);
    showToast(`Applied "${preset.name}" palette`);
  };

  const handleFontChange = (heading: string, body: string) => {
    updateBrandTheme({
      typography: {
        ...brandTheme.typography,
        headingFont: heading,
        bodyFont: body,
      },
    });
  };

  const aurora = brandTheme.aurora || {
    enabled: true,
    intensity: 'medium',
    speed: 'medium',
    blur: 100,
    scale: 1.2,
    opacity: 0.45,
    colors: ['#00D4FF', '#7C3AED', '#FF5E3A'],
    interactiveMouse: true,
  };

  const kinetic = brandTheme.kineticTypography || {
    enabled: true,
    revealStyle: 'stagger',
    scrollParallax: true,
    cursorDistortion: false,
    heroTitle: 'CRAFTING CINEMATIC VISUAL EXPERIENCES',
    workHeadline: 'SELECTED WORK',
    aboutHeadline: 'I TURN RAW FOOTAGE INTO VISUAL STORIES.',
    contactHeadline: "LET'S MAKE SOMETHING WORTH WATCHING.",
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Palette className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Brand Studio • Dark Aurora & Kinetic Engine</h1>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5 font-body">
            Real-time customization of the Dark Aurora atmospheric light fields, kinetic typography, and design tokens.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 border border-emerald-500/20 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            {saveStatus === 'saved' ? 'Auto-Saved' : 'Applying tokens...'}
          </span>
          <button
            onClick={resetBrandTheme}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white transition-colors cursor-pointer"
            title="Reset to default theme"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Split Screen Studio Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Left Column: Brand Controls Panel (5 Cols) */}
        <div className="xl:col-span-5 space-y-5">
          {/* Sub-tab Navigation */}
          <div className="flex items-center gap-1 p-1 bg-[#09090e] border border-white/10 rounded-xl text-center text-xs overflow-x-auto no-scrollbar">
            {[
              { id: 'colors', label: 'Colors' },
              { id: 'aurora', label: 'Dark Aurora' },
              { id: 'kinetic', label: 'Kinetic Type' },
              { id: 'typography', label: 'Fonts' },
              { id: 'identity', label: 'Identity' },
              { id: 'glass', label: 'Glass/FX' },
              { id: 'templates', label: 'Layout' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-2 px-3 rounded-lg font-mono uppercase text-[11px] tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-cyan-500 text-neutral-950 font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB: COLORS */}
          {activeTab === 'colors' && (
            <div className="p-6 rounded-2xl bg-[#0e0e14]/90 border border-white/10 space-y-6 shadow-xl backdrop-blur-xl">
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider block">
                  Curated Brand Palettes
                </span>
                <div className="grid grid-cols-1 gap-2">
                  {PALETTE_PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      onClick={() => handleApplyPalette(preset)}
                      className="p-3.5 rounded-xl bg-[#08080c] border border-white/5 hover:border-cyan-400/50 flex items-center justify-between text-left transition-all cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-white block">{preset.name}</span>
                        <div className="flex items-center gap-1.5">
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: preset.colors.primary }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: preset.colors.secondary }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: preset.colors.background }}
                          />
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-white/20"
                            style={{ backgroundColor: preset.colors.surface }}
                          />
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-cyan-400">Apply</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Token Pickers */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs font-mono uppercase text-neutral-300 tracking-wider">
                  <CustomTuningIcon className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Custom Color Tokens & Overrides</span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-300 font-medium block">Primary Accent</label>
                    <div className="flex items-center gap-2 bg-[#08080c] p-2 rounded-xl border border-white/10">
                      <input
                        type="color"
                        value={brandTheme.colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={brandTheme.colors.primary}
                        onChange={(e) => handleColorChange('primary', e.target.value)}
                        className="w-full text-xs font-mono text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-300 font-medium block">Secondary Accent</label>
                    <div className="flex items-center gap-2 bg-[#08080c] p-2 rounded-xl border border-white/10">
                      <input
                        type="color"
                        value={brandTheme.colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={brandTheme.colors.secondary}
                        onChange={(e) => handleColorChange('secondary', e.target.value)}
                        className="w-full text-xs font-mono text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-300 font-medium block">Dark Background</label>
                    <div className="flex items-center gap-2 bg-[#08080c] p-2 rounded-xl border border-white/10">
                      <input
                        type="color"
                        value={brandTheme.colors.background}
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={brandTheme.colors.background}
                        onChange={(e) => handleColorChange('background', e.target.value)}
                        className="w-full text-xs font-mono text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-neutral-300 font-medium block">Surface Card</label>
                    <div className="flex items-center gap-2 bg-[#08080c] p-2 rounded-xl border border-white/10">
                      <input
                        type="color"
                        value={brandTheme.colors.surface}
                        onChange={(e) => handleColorChange('surface', e.target.value)}
                        className="w-6 h-6 rounded cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={brandTheme.colors.surface}
                        onChange={(e) => handleColorChange('surface', e.target.value)}
                        className="w-full text-xs font-mono text-white bg-transparent focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: DARK AURORA */}
          {activeTab === 'aurora' && (
            <div className="p-6 rounded-2xl bg-[#0e0e14]/90 border border-white/10 space-y-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">Dark Aurora Atmospheric System</span>
                  <span className="text-[11px] text-neutral-400">Ambient organic light field simulation</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={aurora.enabled}
                    onChange={(e) =>
                      updateBrandTheme({
                        aurora: { ...aurora, enabled: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500" />
                </label>
              </div>

              {/* Intensity & Speed */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">Atmospheric Intensity</label>
                  <select
                    value={aurora.intensity}
                    onChange={(e) =>
                      updateBrandTheme({
                        aurora: { ...aurora, intensity: e.target.value as any },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white"
                  >
                    <option value="subtle">Subtle (Quiet Cinematic)</option>
                    <option value="medium">Medium (Balanced)</option>
                    <option value="intense">Intense (High Energy)</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">Orbital Motion Speed</label>
                  <select
                    value={aurora.speed}
                    onChange={(e) =>
                      updateBrandTheme({
                        aurora: { ...aurora, speed: e.target.value as any },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white"
                  >
                    <option value="slow">Slow & Hypnotic (30s+)</option>
                    <option value="medium">Medium Ambient (20s)</option>
                    <option value="fast">Dynamic (12s)</option>
                  </select>
                </div>
              </div>

              {/* Opacity Slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>Aurora Light Opacity</span>
                  <span className="font-mono">{Math.round(aurora.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={0.8}
                  step={0.05}
                  value={aurora.opacity}
                  onChange={(e) =>
                    updateBrandTheme({
                      aurora: { ...aurora, opacity: Number(e.target.value) },
                    })
                  }
                  className="w-full"
                />
              </div>

              {/* Blur Intensity */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>Dispersion Gaussian Blur</span>
                  <span className="font-mono">{aurora.blur}px</span>
                </div>
                <input
                  type="range"
                  min={40}
                  max={180}
                  step={5}
                  value={aurora.blur}
                  onChange={(e) =>
                    updateBrandTheme({
                      aurora: { ...aurora, blur: Number(e.target.value) },
                    })
                  }
                  className="w-full"
                />
              </div>

              {/* Interactive Mouse Reactive Toggle */}
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <div>
                  <span className="text-xs text-neutral-300 block font-medium">Reactive Cursor Glow</span>
                  <span className="text-[10px] text-neutral-500">Subtle spotlight follows cursor across page</span>
                </div>
                <input
                  type="checkbox"
                  checked={aurora.interactiveMouse}
                  onChange={(e) =>
                    updateBrandTheme({
                      aurora: { ...aurora, interactiveMouse: e.target.checked },
                    })
                  }
                  className="rounded bg-neutral-900 border-white/10 text-cyan-500 focus:ring-0"
                />
              </div>
            </div>
          )}

          {/* TAB: KINETIC TYPOGRAPHY */}
          {activeTab === 'kinetic' && (
            <div className="p-6 rounded-2xl bg-[#0e0e14]/90 border border-white/10 space-y-5 shadow-xl backdrop-blur-xl">
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div>
                  <span className="text-xs font-bold text-white block">Kinetic Typography Engine</span>
                  <span className="text-[11px] text-neutral-400">Motion-driven editorial titles</span>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={kinetic.enabled}
                    onChange={(e) =>
                      updateBrandTheme({
                        kineticTypography: { ...kinetic, enabled: e.target.checked },
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5 bg-neutral-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-500" />
                </label>
              </div>

              {/* Kinetic Headlines */}
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300 block">Hero Kinetic Statement</label>
                  <input
                    type="text"
                    value={kinetic.heroTitle}
                    onChange={(e) =>
                      updateBrandTheme({
                        kineticTypography: { ...kinetic, heroTitle: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300 block">About Statement Headline</label>
                  <input
                    type="text"
                    value={kinetic.aboutHeadline}
                    onChange={(e) =>
                      updateBrandTheme({
                        kineticTypography: { ...kinetic, aboutHeadline: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300 block">Contact Call-to-Action</label>
                  <input
                    type="text"
                    value={kinetic.contactHeadline}
                    onChange={(e) =>
                      updateBrandTheme({
                        kineticTypography: { ...kinetic, contactHeadline: e.target.value },
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              </div>

              {/* Motion Options */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-neutral-300 block">Reveal Style</label>
                  <select
                    value={kinetic.revealStyle}
                    onChange={(e) =>
                      updateBrandTheme({
                        kineticTypography: { ...kinetic, revealStyle: e.target.value as any },
                      })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white"
                  >
                    <option value="stagger">Word Stagger Cascade</option>
                    <option value="clip">Vertical Clip Mask</option>
                    <option value="fade_slide">Smooth Fade & Slide</option>
                  </select>
                </div>

                <div className="space-y-1.5 flex flex-col justify-end">
                  <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer pb-2">
                    <input
                      type="checkbox"
                      checked={kinetic.scrollParallax}
                      onChange={(e) =>
                        updateBrandTheme({
                          kineticTypography: { ...kinetic, scrollParallax: e.target.checked },
                        })
                      }
                      className="rounded bg-neutral-900 border-white/10 text-cyan-500"
                    />
                    <span>Scroll Parallax Float</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* TAB: TYPOGRAPHY */}
          {activeTab === 'typography' && (
            <div className="p-6 rounded-2xl bg-[#0e0e14]/90 border border-white/10 space-y-5 shadow-xl backdrop-blur-xl">
              <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider block">
                Typography Studio Pairings
              </span>

              <div className="space-y-2.5">
                {FONT_PRESETS.map((fontPair) => (
                  <button
                    key={fontPair.name}
                    onClick={() => handleFontChange(fontPair.heading, fontPair.body)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      brandTheme.typography.headingFont === fontPair.heading
                        ? 'bg-cyan-950/40 border-cyan-400 text-white'
                        : 'bg-[#08080c] border-white/5 text-neutral-300 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs font-bold block">{fontPair.name}</span>
                    <span className="text-[11px] text-neutral-400 font-mono">
                      Heading: {fontPair.heading} • Body: {fontPair.body}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* TAB: IDENTITY */}
          {activeTab === 'identity' && (
            <div className="p-6 rounded-2xl bg-[#0e0e14]/90 border border-white/10 space-y-4 shadow-xl backdrop-blur-xl">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">Brand Name</label>
                <input
                  type="text"
                  value={brandTheme.brandName}
                  onChange={(e) => updateBrandTheme({ brandName: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">Professional Title</label>
                <input
                  type="text"
                  value={brandTheme.professionalTitle}
                  onChange={(e) => updateBrandTheme({ professionalTitle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">Bio Narrative</label>
                <textarea
                  rows={3}
                  value={brandTheme.bio}
                  onChange={(e) => updateBrandTheme({ bio: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">Profile Photo URL</label>
                <input
                  type="url"
                  value={brandTheme.profilePhotoUrl}
                  onChange={(e) => updateBrandTheme({ profilePhotoUrl: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2">
                <div>
                  <label className="text-[10px] text-neutral-400 block font-mono">Experience</label>
                  <input
                    type="text"
                    value={brandTheme.yearsExperience}
                    onChange={(e) => updateBrandTheme({ yearsExperience: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-[#08080c] border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 block font-mono">Projects</label>
                  <input
                    type="text"
                    value={brandTheme.projectsCompleted}
                    onChange={(e) => updateBrandTheme({ projectsCompleted: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-[#08080c] border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-neutral-400 block font-mono">Clients</label>
                  <input
                    type="text"
                    value={brandTheme.happyClients}
                    onChange={(e) => updateBrandTheme({ happyClients: e.target.value })}
                    className="w-full px-2 py-1.5 rounded-lg bg-[#08080c] border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              </div>
            </div>
          )}

          {/* TAB: GLASS / FX */}
          {activeTab === 'glass' && (
            <div className="p-6 rounded-2xl bg-[#0e0e14]/90 border border-white/10 space-y-5 shadow-xl backdrop-blur-xl">
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>Backdrop Blur Intensity</span>
                  <span className="font-mono">{brandTheme.glassSettings.blur}px</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={32}
                  value={brandTheme.glassSettings.blur}
                  onChange={(e) =>
                    updateBrandTheme({
                      glassSettings: { ...brandTheme.glassSettings, blur: Number(e.target.value) },
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>Glass Opacity</span>
                  <span className="font-mono">
                    {Math.round(brandTheme.glassSettings.opacity * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min={0.1}
                  max={1.0}
                  step={0.05}
                  value={brandTheme.glassSettings.opacity}
                  onChange={(e) =>
                    updateBrandTheme({
                      glassSettings: {
                        ...brandTheme.glassSettings,
                        opacity: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs text-neutral-300">
                  <span>Border Corner Radius</span>
                  <span className="font-mono">{brandTheme.glassSettings.borderRadius}px</span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={28}
                  value={brandTheme.glassSettings.borderRadius}
                  onChange={(e) =>
                    updateBrandTheme({
                      glassSettings: {
                        ...brandTheme.glassSettings,
                        borderRadius: Number(e.target.value),
                      },
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* TAB: TEMPLATES / LAYOUT */}
          {activeTab === 'templates' && (
            <div className="p-6 rounded-2xl bg-[#0e0e14]/90 border border-white/10 space-y-4 shadow-xl backdrop-blur-xl">
              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">Hero Section Layout</label>
                <select
                  value={brandTheme.heroLayout}
                  onChange={(e) => updateBrandTheme({ heroLayout: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white"
                >
                  <option value="cinematic_split">Cinematic Split (Headline + Showreel Box)</option>
                  <option value="fullscreen_showreel">Fullscreen Centered Showreel Focus</option>
                  <option value="large_typography">Large High-Impact Typography</option>
                  <option value="minimal_editorial">Minimal Editorial Composition</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-medium text-neutral-300">Portfolio Grid Layout</label>
                <select
                  value={brandTheme.portfolioLayout}
                  onChange={(e) => updateBrandTheme({ portfolioLayout: e.target.value as any })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#08080c] border border-white/10 text-xs text-white"
                >
                  <option value="mixed">Mixed Responsive Grid (16:9 & 9:16)</option>
                  <option value="cinematic">Cinematic Large Feature Cards</option>
                  <option value="social_reels">Social Reels Focus (9:16 Vertical Cards)</option>
                  <option value="masonry">Dynamic Masonry Layout</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Live Interactive Device Preview Frame (7 Cols) */}
        <div className="xl:col-span-7 space-y-3 sticky top-6">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Interactive Website Preview
              </span>
            </div>

            {/* Device Switcher */}
            <div className="flex items-center gap-1 bg-[#09090e] p-1 rounded-xl border border-white/10">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  previewDevice === 'desktop' ? 'bg-cyan-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Desktop View (100%)"
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  previewDevice === 'tablet' ? 'bg-cyan-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Tablet View (768px)"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                  previewDevice === 'mobile' ? 'bg-cyan-500 text-neutral-950 font-bold' : 'text-neutral-400 hover:text-white'
                }`}
                title="Mobile View (375px)"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Responsive Preview Canvas Container */}
          <div className="rounded-3xl border border-white/15 bg-[#050508] p-3 shadow-2xl flex justify-center overflow-hidden relative">
            {/* Live Aurora Glow in preview */}
            <div
              className="absolute -inset-2 opacity-40 blur-3xl pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 20%, ${brandTheme.colors.primary} 0%, ${brandTheme.colors.secondary} 40%, transparent 70%)`,
              }}
            />

            <div
              className={`transition-all duration-300 rounded-2xl overflow-y-auto max-h-[620px] bg-[#0a0a0f]/90 border border-white/10 p-6 relative z-10 backdrop-blur-xl ${
                previewDevice === 'desktop'
                  ? 'w-full'
                  : previewDevice === 'tablet'
                  ? 'w-[480px]'
                  : 'w-[320px]'
              }`}
            >
              {/* Mini Brand Mock Preview */}
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs"
                      style={{
                        backgroundColor: brandTheme.colors.primary,
                        color: brandTheme.colors.buttonText,
                      }}
                    >
                      EP
                    </div>
                    <span className="text-xs font-bold text-white font-heading">{brandTheme.brandName}</span>
                  </div>
                  <div
                    className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                    style={{
                      backgroundColor: brandTheme.colors.button || brandTheme.colors.primary,
                      color: brandTheme.colors.buttonText || '#000',
                    }}
                  >
                    Book Project
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-extrabold text-white font-heading leading-tight">
                    {brandTheme.kineticTypography?.heroTitle?.slice(0, 30) || 'CRAFTING CINEMATIC VISUALS'}
                    <span style={{ color: brandTheme.colors.primary }} className="block">
                      & HIGH-RETENTION CUTS
                    </span>
                  </h2>
                  <p className="text-xs text-neutral-400 line-clamp-2 font-body">{brandTheme.bio}</p>
                </div>

                <div className="aspect-video rounded-xl overflow-hidden bg-black border border-white/10 relative flex items-center justify-center">
                  <img
                    src={brandTheme.heroPosterUrl}
                    alt={`${brandTheme.brandName} - Hero showreel video poster preview`}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div
                    className="absolute w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs shadow-xl"
                    style={{
                      backgroundColor: brandTheme.colors.button || brandTheme.colors.primary,
                      color: brandTheme.colors.buttonText || '#000',
                    }}
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 rounded-xl bg-[#0e0e14] border border-white/8">
                    <span className="text-[10px] text-neutral-400 block font-mono">Deliverables</span>
                    <span className="text-xs font-bold text-white">16:9 & 9:16 Cuts</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#0e0e14] border border-white/8">
                    <span className="text-[10px] text-neutral-400 block font-mono">Location</span>
                    <span className="text-xs font-bold text-white">{brandTheme.location.split('&')[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
