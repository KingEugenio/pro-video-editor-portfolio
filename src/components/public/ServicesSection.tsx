import React, { useState } from 'react';
import { Film, Palette, Smartphone, Music, Check, ArrowUpRight, Layers, Box, Cpu } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { KineticHeading } from '../ui/KineticHeading';

interface ServicesSectionProps {
  onBookService: (serviceTitle: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onBookService }) => {
  const { services, brandTheme } = usePortfolio();
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const iconMap: Record<string, React.ReactNode> = {
    Film: <Film className="w-5 h-5" />,
    Palette: <Palette className="w-5 h-5" />,
    Smartphone: <Smartphone className="w-5 h-5" />,
    Music: <Music className="w-5 h-5" />,
    Layers: <Layers className="w-5 h-5" />,
    Box: <Box className="w-5 h-5" />,
    Cpu: <Cpu className="w-5 h-5" />,
  };

  return (
    <section id="services" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116]/80 border border-white/10 text-xs font-mono text-cyan-300 backdrop-blur-md">
          <Layers className="w-3.5 h-3.5" />
          <span>Post-Production Disciplines</span>
        </div>

        <KineticHeading
          as="h2"
          text="SERVICES & EXPERTISE"
          highlightWords={['SERVICES', 'EXPERTISE']}
          highlightColor={brandTheme.colors.primary}
          className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight justify-center"
        />

        <p className="text-sm sm:text-base text-neutral-400 font-body">
          End-to-end post-production pipelines engineered for broadcast commercials, indie cinema, and viral brand campaigns.
        </p>
      </div>

      {/* Services Grid with Aurora Glow & Kinetic Indices */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => {
          const indexNum = String(index + 1).padStart(2, '0');
          const isHovered = hoveredId === service.id;

          return (
            <motion.article
              key={service.id}
              id={`service-card-${service.id}`}
              aria-labelledby={`service-title-${service.id}`}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative rounded-2xl p-7 bg-[#0e0e14]/85 border border-white/8 hover:border-cyan-500/40 transition-all duration-500 flex flex-col justify-between group shadow-xl backdrop-blur-xl"
            >
              {/* Subtle Aurora Backdrop on Hover */}
              <div
                className="absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none -z-10"
                style={{
                  background: `radial-gradient(circle at top left, ${brandTheme.colors.primary}44 0%, ${brandTheme.colors.secondary}22 60%, transparent 80%)`,
                }}
              />

              <div className="space-y-5">
                {/* Header with Kinetic Index Number */}
                <header className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-bold text-neutral-600 group-hover:text-cyan-400 transition-colors">
                    {indexNum}
                  </span>
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-md transition-transform duration-300 group-hover:scale-110"
                    style={{
                      backgroundColor: `${brandTheme.colors.primary}20`,
                      color: brandTheme.colors.primary,
                      border: `1px solid ${brandTheme.colors.primary}40`,
                    }}
                  >
                    {iconMap[service.icon] || <Film className="w-4 h-4" />}
                  </div>
                </header>

                <div>
                  <h3 id={`service-title-${service.id}`} className="font-heading text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-body leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {service.deliverables && service.deliverables.length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest block">
                      Deliverables:
                    </span>
                    <ul className="space-y-1.5">
                      {service.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300 font-body">
                          <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <footer className="pt-6 mt-6 border-t border-white/6 flex items-center justify-between">
                {service.showPricing && service.startingPrice ? (
                  <div>
                    <span className="text-[10px] font-mono text-neutral-500 block uppercase tracking-wider">Starting at</span>
                    <span className="text-sm font-bold text-white font-mono">{service.startingPrice}</span>
                  </div>
                ) : (
                  <span className="text-xs text-neutral-400 font-mono">Custom Scope</span>
                )}

                <button
                  onClick={() => onBookService(service.title)}
                  className="px-4 py-1.5 rounded-full font-button text-xs font-bold uppercase tracking-wider text-neutral-200 bg-white/10 hover:bg-cyan-400 hover:text-neutral-950 transition-all flex items-center gap-1 cursor-pointer shadow-md"
                >
                  Book <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </footer>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
