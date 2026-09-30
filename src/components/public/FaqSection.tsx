import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Search, ArrowUpRight, ShieldCheck, Clock, FileText, MapPin } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { KineticHeading } from '../ui/KineticHeading';

interface FaqItem {
  id: string;
  category: 'workflow' | 'tech' | 'revisions' | 'pricing';
  question: string;
  answer: string;
  linkText?: string;
  linkTarget?: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-turnaround',
    category: 'workflow',
    question: 'What is your typical turnaround time for a project?',
    answer:
      'Standard turnaround for commercial social reels and music videos is 3–5 business days from receiving raw media. High-complexity commercials, documentary cuts, and multi-cam broadcast edits typically take 7–14 business days. Rush 24–48 hour delivery is available upon request with dedicated timeline reservation.',
    linkText: 'Explore Service Timelines',
    linkTarget: 'services',
  },
  {
    id: 'faq-footage-transfer',
    category: 'tech',
    question: 'How do I transfer large RAW footage files (4K / 6K / 8K)?',
    answer:
      'We support direct cloud transfers via Frame.io, Google Drive, Dropbox, and MASV over our dedicated high-speed fiber connection. For large multi-terabyte shoots (RED RAW, ARRI ProRes, Blackmagic RAW), we also accept encrypted physical NVMe SSDs / RAID drives shipped to our Central London studio.',
    linkText: 'View Studio Shipping & Directions',
    linkTarget: 'map',
  },
  {
    id: 'faq-revisions',
    category: 'revisions',
    question: 'How many revision rounds are included in standard packages?',
    answer:
      'All commercial projects include 2 to 3 comprehensive revision rounds. We share interactive Frame.io / Vimeo review links allowing you and your team to leave frame-accurate, timecoded comments directly on the timeline.',
    linkText: 'Read Client Workflow Details',
    linkTarget: 'about',
  },
  {
    id: 'faq-color-audio',
    category: 'tech',
    question: 'Do you provide full color grading and sound design?',
    answer:
      'Yes. Every final delivery includes a custom color pass in DaVinci Resolve Studio (calibrated for Rec.709, HDR10, and Social Rec.2020) and cinematic audio mastering (dialogue cleaning, Foley sound design, licensed commercial soundtrack placement, and stereo/5.1 mix).',
    linkText: 'Check Color Grading Service',
    linkTarget: 'services',
  },
  {
    id: 'faq-deliverables',
    category: 'workflow',
    question: 'What final export formats and aspect ratios do you deliver?',
    answer:
      'You receive full-resolution Apple ProRes 422 HQ / 4444 masters alongside web-optimized H.264/H.265 MP4 files. We provide horizontal (16:9 4K/UHD), vertical (9:16 for Reels/TikTok/Shorts), and square (1:1 / 4:5) adaptations ready for immediate distribution.',
    linkText: 'Book a Project Brief',
    linkTarget: 'contact',
  },
  {
    id: 'faq-payments',
    category: 'pricing',
    question: 'What are your payment terms and deposit requirements?',
    answer:
      'We work on a 50% initial booking deposit to secure the editing calendar, with the remaining 50% balance due upon final sign-off before watermark-free master ProRes files are released. Monthly retainer packages are billed at the start of each production cycle.',
    linkText: 'Submit an Estimate Request',
    linkTarget: 'contact',
  },
  {
    id: 'faq-confidentiality',
    category: 'pricing',
    question: 'How is client privacy and unreleased footage protected?',
    answer:
      'We routinely sign Mutual Non-Disclosure Agreements (NDAs) prior to receiving unreleased artist footage, unannounced commercial products, and agency campaigns. All media is stored on encrypted, offline RAID storage arrays.',
    linkText: 'Review our Privacy Policy',
    linkTarget: 'privacy-policy',
  },
];

interface FaqSectionProps {
  onNavigate: (target: string) => void;
  onOpenPrivacyPolicy?: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onNavigate, onOpenPrivacyPolicy }) => {
  const { brandTheme } = usePortfolio();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<string | null>('faq-turnaround');

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLinkClick = (target: string) => {
    if (target === 'privacy-policy' && onOpenPrivacyPolicy) {
      onOpenPrivacyPolicy();
    } else {
      onNavigate(target);
    }
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116]/80 border border-white/10 text-xs font-mono text-cyan-300 backdrop-blur-md">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Frequently Asked Questions</span>
        </div>

        <KineticHeading
          as="h2"
          text="POST-PRODUCTION & WORKFLOW FAQ"
          highlightWords={['WORKFLOW', 'FAQ']}
          highlightColor={brandTheme.colors.primary}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        />

        <p className="text-sm sm:text-base text-neutral-300 font-body leading-relaxed max-w-2xl mx-auto">
          Everything you need to know about commissioning video editing, RAW footage transfer protocols, revision rounds, and master deliverables.
        </p>

        {/* Search & Category Filter Pills */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions & terms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full bg-[#0a0a0e]/90 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400 transition-colors"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono">
            {[
              { id: 'all', label: 'All' },
              { id: 'workflow', label: 'Workflow' },
              { id: 'tech', label: 'Tech Specs' },
              { id: 'revisions', label: 'Revisions' },
              { id: 'pricing', label: 'Billing' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-full uppercase text-[11px] font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-cyan-400 text-neutral-950 shadow-sm'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length === 0 ? (
          <div className="p-8 text-center rounded-2xl bg-white/5 border border-white/10 text-neutral-400 text-sm">
            No questions matching &ldquo;{searchQuery}&rdquo;. Try another term or{' '}
            <button
              onClick={() => onNavigate('contact')}
              className="text-cyan-400 underline font-semibold hover:text-cyan-300"
            >
              ask us directly via the booking form
            </button>
            .
          </div>
        ) : (
          filteredFaqs.map((faq) => {
            const isExpanded = expandedId === faq.id;
            return (
              <div
                key={faq.id}
                id={faq.id}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isExpanded
                    ? 'bg-[#0d0d14]/90 border-cyan-500/30 shadow-lg shadow-cyan-950/20'
                    : 'bg-[#0a0a0f]/60 border-white/8 hover:border-white/15'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setExpandedId(isExpanded ? null : faq.id)}
                  aria-expanded={isExpanded}
                  className="w-full px-6 py-4.5 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                >
                  <span className="font-heading text-sm sm:text-base font-bold text-white tracking-wide">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                      isExpanded
                        ? 'rotate-180 bg-cyan-400 text-neutral-950 border-cyan-400'
                        : 'bg-white/5 text-neutral-400 border-white/10'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-5 pt-1 space-y-3 animate-in fade-in duration-200">
                    <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed border-t border-white/6 pt-3">
                      {faq.answer}
                    </p>

                    {faq.linkText && faq.linkTarget && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={() => handleLinkClick(faq.linkTarget!)}
                          className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 font-bold uppercase tracking-wider transition-colors cursor-pointer hover:underline"
                        >
                          <span>{faq.linkText}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Cross-linking Action Banner */}
      <div className="mt-12 max-w-3xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-cyan-950/30 to-purple-950/30 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="space-y-1">
          <h4 className="font-heading text-sm font-bold text-white">Have a specific question about your timeline?</h4>
          <p className="text-xs text-neutral-300 font-body">Reach out directly for custom delivery specs and technical consults.</p>
        </div>
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-4 py-2 rounded-xl bg-cyan-400 text-neutral-950 font-button font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors cursor-pointer shadow-md"
          >
            Start Project Brief
          </button>
        </div>
      </div>
    </section>
  );
};
