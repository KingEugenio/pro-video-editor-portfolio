import React, { useState } from 'react';
import { MapPin, Award, CheckCircle2, Cpu, Wrench, Film, Sliders } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { KineticHeading } from '../ui/KineticHeading';
import {
  DaVinciResolveIcon,
  PremiereProIcon,
  AfterEffectsIcon,
  FinalCutIcon,
} from '../icons/CustomSvgIcons';

export const AboutSection: React.FC = () => {
  const { brandTheme } = usePortfolio();
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const headline = brandTheme.kineticTypography?.aboutHeadline || 'I TURN RAW FOOTAGE INTO VISUAL STORIES.';

  const getSoftwareIcon = (name: string) => {
    const lower = name.toLowerCase();
    if (lower.includes('davinci') || lower.includes('resolve')) {
      return <DaVinciResolveIcon className="w-3.5 h-3.5" />;
    }
    if (lower.includes('premiere')) {
      return <PremiereProIcon className="w-3.5 h-3.5" />;
    }
    if (lower.includes('after effects') || lower.includes('ae')) {
      return <AfterEffectsIcon className="w-3.5 h-3.5" />;
    }
    if (lower.includes('final cut') || lower.includes('fcp')) {
      return <FinalCutIcon className="w-3.5 h-3.5" />;
    }
    return <Cpu className="w-3.5 h-3.5 text-cyan-400" />;
  };

  return (
    <section id="about" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Column - Profile Portrait with Aurora Rim */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 relative"
        >
          {/* Aurora Rim Light */}
          <div
            className="absolute -inset-2 rounded-3xl opacity-50 blur-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${brandTheme.colors.primary}66 0%, ${brandTheme.colors.secondary}44 50%, transparent 80%)`,
            }}
          />

          <figure className="m-0 relative rounded-3xl overflow-hidden border border-white/12 bg-[#0e0e14]/90 shadow-2xl p-2.5 max-w-md mx-auto backdrop-blur-2xl">
            <img
              src={brandTheme.profilePhotoUrl}
              alt={`${brandTheme.brandName} - ${brandTheme.professionalTitle} in ${brandTheme.location}`}
              className="w-full aspect-[4/5] object-cover rounded-2xl"
              loading="lazy"
            />
            {/* Overlay Location Pill */}
            <figcaption className="absolute bottom-6 inset-x-6 p-4 rounded-xl bg-[#08080c]/85 backdrop-blur-xl border border-white/10 flex items-center justify-between shadow-xl">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono text-neutral-200">{brandTheme.location}</span>
              </div>
              <span className="text-xs font-bold text-cyan-300 font-mono">
                {brandTheme.yearsExperience} Exp
              </span>
            </figcaption>
          </figure>
        </motion.div>

        {/* Right Column - Narrative Bio, Skills & Software */}
        <div className="lg:col-span-7 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116]/80 border border-white/10 text-xs font-mono text-cyan-300 backdrop-blur-md">
              <Sliders className="w-3.5 h-3.5" />
              <span>Behind the Timeline</span>
            </div>

            <KineticHeading
              as="h2"
              text={headline}
              highlightWords={['RAW', 'FOOTAGE', 'VISUAL', 'STORIES.']}
              highlightColor={brandTheme.colors.primary}
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
            />

            <p className="text-base sm:text-lg text-neutral-300 font-body leading-relaxed pt-1">
              {brandTheme.bio}
            </p>
          </div>

          {/* Software Stack */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Software & NLE Studio Suite</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {brandTheme.softwareList.map((software) => (
                <span
                  key={software}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0e0e14]/90 border border-white/8 text-xs font-mono text-neutral-200 hover:border-cyan-400/40 hover:text-cyan-300 transition-colors shadow-sm backdrop-blur-md"
                >
                  {getSoftwareIcon(software)}
                  <span>{software}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Core Post-Production Disciplines */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400">
              <Wrench className="w-4 h-4 text-cyan-400" />
              <span>Core Editing Disciplines</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {brandTheme.skills.map((skill) => (
                <div
                  key={skill}
                  onMouseEnter={() => setActiveSkill(skill)}
                  onMouseLeave={() => setActiveSkill(null)}
                  className={`p-3 rounded-xl border transition-all duration-200 flex items-center gap-2.5 cursor-default ${
                    activeSkill === skill
                      ? 'bg-white/10 border-cyan-400/50 text-white'
                      : 'bg-[#0e0e14]/60 border-white/6 text-neutral-300 hover:border-white/20'
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium font-body">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
