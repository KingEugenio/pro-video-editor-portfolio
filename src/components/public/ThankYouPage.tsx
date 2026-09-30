import React, { useEffect } from 'react';
import { CheckCircle2, ArrowRight, Calendar, Clock, Film, MessageSquare, ArrowLeft, ShieldCheck, Share2, Download } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { WhatsAppIcon } from '../icons/CustomSvgIcons';
import { SocialShareBar } from './SocialShareBar';
import { generateGoogleCalendarUrl, downloadICS, type CalendarBooking } from '../../utils/calendarUtils';

interface ThankYouPageProps {
  submissionDetails?: {
    id?: string;
    name?: string;
    email?: string;
    projectType?: string;
    service?: string;
  };
  onReturnHome: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const ThankYouPage: React.FC<ThankYouPageProps> = ({
  submissionDetails,
  onReturnHome,
  onNavigateSection,
}) => {
  const { brandTheme, formConfig } = usePortfolio();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `Thank You for Your Enquiry | ${brandTheme.brandName}`;
  }, [brandTheme.brandName]);

  const submissionId = submissionDetails?.id || `ENQ-${Math.floor(100000 + Math.random() * 900000)}`;
  const clientName = submissionDetails?.name || 'Valued Creator';
  const projectType = submissionDetails?.projectType || submissionDetails?.service || 'Commercial Post-Production';

  const handleWhatsApp = () => {
    const rawNumber = formConfig.whatsappNumber?.replace(/[^0-9+]/g, '') || '';
    const text = encodeURIComponent(`Hi ${brandTheme.brandName}, I just submitted project brief #${submissionId} and would like to confirm receipt.`);
    window.open(`https://wa.me/${rawNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#06060a] text-neutral-100 py-16 px-4 sm:px-6 lg:px-8 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Aurora Ambient Glow */}
      <div
        className="fixed inset-0 pointer-events-none opacity-25 blur-3xl z-0"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${brandTheme.colors.primary} 0%, ${brandTheme.colors.secondary} 40%, transparent 70%)`,
        }}
      />

      <div className="max-w-3xl mx-auto relative z-10 space-y-10">
        {/* Back navigation */}
        <div>
          <button
            type="button"
            onClick={onReturnHome}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs transition-colors cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>
        </div>

        {/* Hero Confirmation Card */}
        <div className="rounded-3xl bg-[#0c0c12]/90 border border-cyan-500/30 p-8 sm:p-12 text-center backdrop-blur-2xl shadow-2xl space-y-6 relative overflow-hidden">
          {/* Animated Accent Checkmark Vector */}
          <div className="relative mx-auto w-20 h-20 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <CheckCircle2 className="w-10 h-10 animate-in zoom-in-50 duration-500" />
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-semibold">
              <span>Receipt Ref: #{submissionId}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Brief Received, {clientName}!
            </h1>
            <p className="text-sm sm:text-base text-neutral-300 font-body leading-relaxed max-w-lg mx-auto">
              Your video editing and color grading brief has landed in our Soho studio queue. We will review your media scope and reply within 24 hours.
            </p>
          </div>

          {/* Submission Summary Ticket */}
          <div className="p-4 sm:p-6 rounded-2xl bg-black/50 border border-white/8 text-left grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
            <div>
              <span className="text-neutral-500 block uppercase text-[10px]">Project Commission</span>
              <span className="font-bold text-white text-xs sm:text-sm">{projectType}</span>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase text-[10px]">Turnaround Estimate</span>
              <span className="font-bold text-cyan-300 text-xs sm:text-sm">24h Scoping Window</span>
            </div>
            <div>
              <span className="text-neutral-500 block uppercase text-[10px]">Review Portal</span>
              <span className="font-bold text-neutral-200 text-xs sm:text-sm">Frame.io & ProRes Master</span>
            </div>
          </div>

          {/* Add tentative booking to calendar */}
          {(() => {
            const booking: CalendarBooking = {
              title: `${brandTheme.brandName}: ${projectType}`,
              details: `Booking reference #${submissionId}\nProject: ${projectType}\nClient: ${clientName}\n\nTentative hold — ${brandTheme.brandName} will confirm the schedule after reviewing your brief.`,
              studioName: brandTheme.brandName,
            };
            return (
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={generateGoogleCalendarUrl(booking)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-950/60 hover:bg-cyan-900/70 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-bold transition-all cursor-pointer shadow-md"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                </a>
                <button
                  type="button"
                  onClick={() => downloadICS(booking)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 text-xs font-mono font-bold transition-all cursor-pointer"
                >
                  <Download className="w-4 h-4 text-cyan-400" />
                  <span>Download .ics</span>
                </button>
              </div>
            );
          })()}

          {/* Urgent WhatsApp Direct Line */}
          {formConfig.enableWhatsApp && formConfig.whatsappNumber && (
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <span className="text-xs text-neutral-400 font-body">Have urgent footage or tight broadcast deadline?</span>
              <button
                type="button"
                onClick={handleWhatsApp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold transition-all cursor-pointer shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>Confirm on WhatsApp</span>
              </button>
            </div>
          )}
        </div>

        {/* 3-Step What Happens Next Workflow */}
        <div className="rounded-3xl bg-[#0c0c12]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl space-y-6">
          <h2 className="text-lg font-bold text-white font-heading flex items-center gap-2">
            <Clock className="w-5 h-5 text-cyan-400" />
            What Happens Next on the Timeline
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/6 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold text-xs flex items-center justify-center">
                01
              </div>
              <h3 className="text-sm font-bold text-white font-heading">Brief & Media Audit</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-body">
                We inspect your raw camera codecs, audio tracks, and reference cuts to gauge timeline hours.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/6 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-300 font-mono font-bold text-xs flex items-center justify-center">
                02
              </div>
              <h3 className="text-sm font-bold text-white font-heading">Quote & Timeline Lock</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-body">
                We provide a comprehensive fixed-rate quote, milestone schedule, and secure deposit link.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/6 space-y-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs flex items-center justify-center">
                03
              </div>
              <h3 className="text-sm font-bold text-white font-heading">Frame.io Assembly Cut</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-body">
                First rough cut assembled with initial color grade shared for frame-accurate timecoded review.
              </p>
            </div>
          </div>
        </div>

        {/* Social Sharing & Tell a Colleague */}
        <div className="rounded-3xl bg-[#0c0c12]/80 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
          <SocialShareBar
            title={`Check out ${brandTheme.brandName} - Video Editor & Colorist Portfolio`}
            text={`Just booked a video editing commission with ${brandTheme.brandName}. Explore their cinematic work and grading case studies.`}
          />
        </div>

        {/* Internal Cross-Linking Navigation Links */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
            <span>Explore:</span>
            <button
              type="button"
              onClick={() => {
                onReturnHome();
                setTimeout(() => onNavigateSection('work'), 100);
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Browse Works
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                onReturnHome();
                setTimeout(() => onNavigateSection('faq'), 100);
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Post-Production FAQ
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                onReturnHome();
                setTimeout(() => onNavigateSection('map'), 100);
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Studio Directions
            </button>
          </div>

          <button
            type="button"
            onClick={onReturnHome}
            className="px-6 py-2.5 rounded-full bg-cyan-400 text-neutral-950 font-button font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            Return to Studio Home
          </button>
        </div>
      </div>
    </div>
  );
};
