import React, { useState } from 'react';
import {
  ListChecks,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Film,
  Palette,
  Cloud,
  Layers,
  Send,
  Sliders,
  Check,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { WhatsAppIcon } from '../icons/CustomSvgIcons';

interface OnboardingWizardProps {
  onComplete: () => void;
}

export const OnboardingWizard: React.FC<OnboardingWizardProps> = ({ onComplete }) => {
  const { brandTheme, updateBrandTheme, formConfig, updateFormConfig, socialLinks, updateSocialLinks, showToast } =
    usePortfolio();

  const [currentStep, setCurrentStep] = useState(1);
  const TOTAL_STEPS = 12;

  // Step state buffers
  const [brandName, setBrandName] = useState(brandTheme.brandName);
  const [title, setTitle] = useState(brandTheme.professionalTitle);
  const [location, setLocation] = useState(brandTheme.location);
  const [bio, setBio] = useState(brandTheme.bio);
  const [selectedSoftware, setSelectedSoftware] = useState<string[]>(brandTheme.softwareList);
  const [selectedSkills, setSelectedSkills] = useState<string[]>(brandTheme.skills);
  const [heroVideoUrl, setHeroVideoUrl] = useState(brandTheme.heroVideoUrl);
  const [heroPosterUrl, setHeroPosterUrl] = useState(brandTheme.heroPosterUrl);
  const [primaryColor, setPrimaryColor] = useState(brandTheme.colors.primary);
  const [formHeading, setFormHeading] = useState(formConfig.heading);
  const [whatsappNumber, setWhatsappNumber] = useState(formConfig.whatsappNumber || '');
  const [instagram, setInstagram] = useState(socialLinks.instagram || '');
  const [youtube, setYoutube] = useState(socialLinks.youtube || '');

  const softwareOptions = [
    'DaVinci Resolve Studio',
    'Adobe Premiere Pro',
    'Adobe After Effects',
    'Final Cut Pro',
    'Avid Media Composer',
    'CapCut Pro',
    'Blender 3D',
    'Pro Tools',
  ];

  const skillOptions = [
    'Commercial Narrative Editing',
    'ACES Color Grading & LUT Development',
    'High-Retention 9:16 Vertical Storytelling',
    'Cinematic Sound Design & Foley Mixing',
    '2D/3D Motion Graphics & Typography',
    'Multicam Concert & Live Performance Cuts',
  ];

  const handleNext = () => {
    // Save progress incrementally
    updateBrandTheme({
      brandName,
      professionalTitle: title,
      location,
      bio,
      softwareList: selectedSoftware,
      skills: selectedSkills,
      heroVideoUrl,
      heroPosterUrl,
      colors: {
        ...brandTheme.colors,
        primary: primaryColor,
        button: primaryColor,
      },
    });

    updateFormConfig({
      heading: formHeading,
      whatsappNumber,
      enableWhatsApp: Boolean(whatsappNumber),
    });

    updateSocialLinks({
      instagram,
      youtube,
    });

    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    } else {
      showToast('Portfolio setup completed successfully!');
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleSoftware = (item: string) => {
    setSelectedSoftware((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  const toggleSkill = (item: string) => {
    setSelectedSkills((prev) =>
      prev.includes(item) ? prev.filter((s) => s !== item) : [...prev, item]
    );
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-in fade-in">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-neutral-400">
          <span className="text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
            <ListChecks className="w-3.5 h-3.5" />
            Step {currentStep} of {TOTAL_STEPS}
          </span>
          <span>{Math.round((currentStep / TOTAL_STEPS) * 100)}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-neutral-900 overflow-hidden border border-white/5">
          <div
            className="h-full bg-cyan-400 transition-all duration-300 rounded-full"
            style={{ width: `${(currentStep / TOTAL_STEPS) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Wizard Card */}
      <div className="p-8 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
        {/* STEP 1: Brand Name */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">What is your Editor or Studio Name?</h2>
            <p className="text-xs text-neutral-400">
              This will appear in the navigation bar, footer, and browser title.
            </p>
            <input
              type="text"
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              placeholder="e.g. Alex Rivera, CineForge, Lumina Post"
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* STEP 2: Title */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">What is your primary professional title?</h2>
            <p className="text-xs text-neutral-400">
              Used in the hero headline and client introductions.
            </p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Commercial Video Editor & ACES Colorist"
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* STEP 3: Location */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">Where are you based?</h2>
            <p className="text-xs text-neutral-400">
              Clients love knowing your primary time zone and whether you work globally remote.
            </p>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Los Angeles, CA & London"
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* STEP 4: Bio */}
        {currentStep === 4 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">Share a short creative bio</h2>
            <p className="text-xs text-neutral-400">
              Highlight your storytelling style, turnaround speeds, and passion for the craft.
            </p>
            <textarea
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* STEP 5: Software Stack */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">What editing tools do you specialize in?</h2>
            <p className="text-xs text-neutral-400">Select all that apply:</p>
            <div className="grid grid-cols-2 gap-2.5">
              {softwareOptions.map((tool) => {
                const isSelected = selectedSoftware.includes(tool);
                return (
                  <button
                    key={tool}
                    type="button"
                    onClick={() => toggleSoftware(tool)}
                    className={`p-3 rounded-xl text-left text-xs font-semibold border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-400 text-white'
                        : 'bg-neutral-950 border-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <span>{tool}</span>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 6: Core Disciplines */}
        {currentStep === 6 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">What are your core post-production skills?</h2>
            <div className="space-y-2">
              {skillOptions.map((skill) => {
                const isSelected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`w-full p-3 rounded-xl text-left text-xs font-semibold border flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-cyan-950/50 border-cyan-400 text-white'
                        : 'bg-neutral-950 border-white/5 text-neutral-400 hover:border-white/20'
                    }`}
                  >
                    <span>{skill}</span>
                    {isSelected && <Check className="w-4 h-4 text-cyan-400" />}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 7: Showreel */}
        {currentStep === 7 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">Attach your Master Showreel video</h2>
            <p className="text-xs text-neutral-400">
              Provide a direct MP4, YouTube link, or Google Drive embed URL.
            </p>
            <input
              type="text"
              value={heroVideoUrl}
              onChange={(e) => setHeroVideoUrl(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* STEP 8: Accent Color */}
        {currentStep === 8 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">Pick your primary brand accent color</h2>
            <p className="text-xs text-neutral-400">
              This accent will highlight play buttons, badges, and primary action links.
            </p>
            <div className="flex items-center gap-4">
              <input
                type="color"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="w-14 h-14 rounded-2xl cursor-pointer bg-transparent border-0"
              />
              <input
                type="text"
                value={primaryColor}
                onChange={(e) => setPrimaryColor(e.target.value)}
                className="px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white font-mono"
              />
            </div>
          </div>
        )}

        {/* STEP 9: Booking Header */}
        {currentStep === 9 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">Customize your Booking Section title</h2>
            <input
              type="text"
              value={formHeading}
              onChange={(e) => setFormHeading(e.target.value)}
              placeholder="HAVE A PROJECT IN MIND?"
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-sm text-white focus:outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* STEP 10: WhatsApp Direct */}
        {currentStep === 10 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <h2 className="text-2xl font-extrabold text-white">Add WhatsApp for instant client chats</h2>
            </div>
            <p className="text-xs text-neutral-400">
              Optional, but recommended for high-priority commercial enquiries.
            </p>
            <input
              type="text"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              placeholder="+14155552671"
              className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-sm text-white font-mono focus:outline-none focus:border-cyan-400"
            />
          </div>
        )}

        {/* STEP 11: Social Channels */}
        {currentStep === 11 && (
          <div className="space-y-4">
            <h2 className="text-2xl font-extrabold text-white">Connect your public social channels</h2>
            <div className="space-y-3">
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                placeholder="Instagram URL (https://instagram.com/...)"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
              />
              <input
                type="url"
                value={youtube}
                onChange={(e) => setYoutube(e.target.value)}
                placeholder="YouTube Channel URL (https://youtube.com/@...)"
                className="w-full px-4 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
              />
            </div>
          </div>
        )}

        {/* STEP 12: Ready to Launch */}
        {currentStep === 12 && (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mx-auto shadow-2xl">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">You're All Set to Launch!</h2>
            <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
              Your custom Video Editor Portfolio is styled and loaded with video management, Google Drive sync, and client commission booking tools.
            </p>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="pt-6 border-t border-white/10 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-semibold flex items-center gap-1.5 disabled:opacity-30 disabled:pointer-events-none"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
          >
            {currentStep === TOTAL_STEPS ? 'Launch Portfolio' : 'Continue'}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
