import React from 'react';
import { Quote } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { StarSvgIcon } from '../icons/CustomSvgIcons';

export const TestimonialsSection: React.FC = () => {
  const { testimonials, brandTheme } = usePortfolio();

  const publishedTestimonials = testimonials.filter((t) => t.isPublished);
  if (publishedTestimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-white/5">
      <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-cyan-300">
          <Quote className="w-3.5 h-3.5" />
          <span>Client Endorsements</span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          What Directors & Brands Say
        </h2>
        <p className="text-sm sm:text-base text-neutral-400">
          Trusted by commercial creative directors, record labels, and agencies across the globe.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {publishedTestimonials.map((t) => (
          <figure
            key={t.id}
            id={`testimonial-${t.id}`}
            className="m-0 p-6 rounded-2xl bg-neutral-900/40 border border-white/10 flex flex-col justify-between space-y-6 shadow-xl relative"
          >
            <Quote className="w-8 h-8 text-cyan-500/20 absolute top-6 right-6" aria-hidden="true" />

            <div className="space-y-4">
              <div className="flex items-center gap-1" aria-label={`Rating: ${t.rating || 5} out of 5 stars`}>
                {Array.from({ length: t.rating || 5 }).map((_, i) => (
                  <StarSvgIcon key={i} filled={true} className="w-4 h-4 text-amber-400" />
                ))}
              </div>
              <blockquote className="m-0 text-sm text-neutral-300 leading-relaxed italic">
                "{t.quote}"
              </blockquote>
            </div>

            <figcaption className="pt-4 border-t border-white/5 flex items-center gap-3">
              {t.avatarUrl ? (
                <img
                  src={t.avatarUrl}
                  alt={`${t.clientName}, ${t.role} at ${t.company || 'Studio'}`}
                  className="w-10 h-10 rounded-full object-cover border border-white/10"
                  loading="lazy"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs"
                  style={{
                    backgroundColor: brandTheme.colors.primary,
                    color: brandTheme.colors.buttonText,
                  }}
                  aria-hidden="true"
                >
                  {t.clientName.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <cite className="text-xs font-bold text-white not-italic block">{t.clientName}</cite>
                <span className="text-[11px] text-neutral-400 block">
                  {t.clientTitle}, {t.company}
                </span>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
};
