import React, { useEffect } from 'react';
import { Shield, ArrowLeft, Lock, FileText, CheckCircle2, Eye, Server, Cookie, HelpCircle, Mail, MapPin } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

interface PrivacyPolicyPageProps {
  onBack: () => void;
  onNavigateSection: (sectionId: string) => void;
}

export const PrivacyPolicyPage: React.FC<PrivacyPolicyPageProps> = ({ onBack, onNavigateSection }) => {
  const { brandTheme } = usePortfolio();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.title = `Privacy Policy & Data Security | ${brandTheme.brandName}`;
  }, [brandTheme.brandName]);

  return (
    <div className="min-h-screen bg-[#06060a] text-neutral-100 py-16 px-4 sm:px-6 lg:px-8 relative selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Aurora */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20 blur-3xl z-0"
        style={{
          background: `radial-gradient(circle at 50% 20%, ${brandTheme.colors.primary} 0%, ${brandTheme.colors.secondary} 40%, transparent 70%)`,
        }}
      />

      <div className="max-w-4xl mx-auto relative z-10 space-y-12">
        {/* Top Header & Breadcrumb */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white font-mono text-xs transition-colors cursor-pointer border border-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Portfolio</span>
          </button>

          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
            <span>Last Updated: September 2026</span>
          </div>
        </div>

        {/* Hero Title */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
            <Shield className="w-3.5 h-3.5" />
            <span>Data Protection & Client Media Confidentiality</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-heading tracking-tight">
            Privacy Policy & Security Standards
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-body leading-relaxed max-w-2xl">
            At {brandTheme.brandName}, we prioritize the confidentiality of client projects, unreleased raw footage, commercial campaign assets, and personal information.
          </p>
        </div>

        {/* Quick Summary Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 space-y-2">
            <Lock className="w-5 h-5 text-cyan-400" />
            <h2 className="text-sm font-bold text-white font-heading">Encrypted Storage</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-body">
              All raw footage is transferred via encrypted protocols and stored on offline RAID partitions.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 space-y-2">
            <Shield className="w-5 h-5 text-purple-400" />
            <h2 className="text-sm font-bold text-white font-heading">Strict NDAs Honored</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-body">
              Mutual Non-Disclosure Agreements are executed before receiving unannounced brand campaigns.
            </p>
          </div>
          <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/8 space-y-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            <h2 className="text-sm font-bold text-white font-heading">Zero Data Resale</h2>
            <p className="text-xs text-neutral-400 leading-relaxed font-body">
              Your contact info and creative briefs are never sold, rented, or utilized for AI training.
            </p>
          </div>
        </div>

        {/* Policy Body Sections */}
        <div className="space-y-10 rounded-3xl bg-[#0c0c12]/90 border border-white/10 p-6 sm:p-10 backdrop-blur-xl text-sm leading-relaxed text-neutral-300 font-body">
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">1.0</span> Information We Collect
            </h2>
            <p>
              When you submit a project brief via our booking form (powered by Formspree and our direct studio inbox), we collect:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-300 text-xs sm:text-sm">
              <li><strong>Contact Information:</strong> Full name, professional email address, phone number, and company or agency name.</li>
              <li><strong>Project Commission Details:</strong> Desired deliverable formats, budget range, target delivery dates, and editorial style references.</li>
              <li><strong>Media Storage Links:</strong> Cloud storage URLs provided by you (such as Google Drive, Frame.io, Dropbox, MASV, or WeTransfer links) for quoting and timeline scoping.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-white/8">
            <h2 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">2.0</span> Formspree & Form Rate Limiting
            </h2>
            <p>
              Our website uses Formspree to securely transmit client booking briefs to our studio management workflow. To protect our infrastructure from automated spam, brute-force requests, and abuse, we employ client-side rate limiting (restricting submissions to 3 requests per hour with an enforced cooldown period).
            </p>
            <p className="text-xs text-neutral-400">
              Formspree complies with GDPR, CCPA, and standard TLS 1.3 data-in-transit encryption protocols.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-white/8">
            <h2 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">3.0</span> Client Footage & Media Retention
            </h2>
            <p>
              Raw camera files, audio stems, project files (.prproj, .drp), and motion graphics assets remain your exclusive intellectual property.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-300 text-xs sm:text-sm">
              <li><strong>Active Production:</strong> Assets reside on high-speed NVMe scratch disks and 10GbE network-attached storage.</li>
              <li><strong>Post-Delivery Archive:</strong> Upon project sign-off and master ProRes handoff, project timelines are backed up to LTO/cold storage for 6 months to accommodate future revisions, after which raw camera media is securely scrubbed unless an extended archive retainer is active.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-white/8">
            <h2 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">4.0</span> Cookies & Local Browser Storage
            </h2>
            <p>
              This website does not deploy invasive third-party advertising tracking cookies. We utilize standard modern browser LocalStorage strictly for:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-300 text-xs sm:text-sm">
              <li>Remembering your visual theme and layout preference.</li>
              <li>Maintaining your secure studio administrator session if authenticated.</li>
              <li>Recording enquiry form rate-limit timestamps to prevent duplicate submissions.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-6 border-t border-white/8">
            <h2 className="text-lg sm:text-xl font-bold text-white font-heading flex items-center gap-2">
              <span className="text-cyan-400 font-mono text-sm">5.0</span> Statutory Rights & Regulatory Compliance
            </h2>
            <p>
              In accordance with Ghana&apos;s <strong>Data Protection Act, 2012 (Act 843)</strong>, the General Data Protection Regulation (GDPR), and the California Consumer Privacy Act (CCPA), our studio operates as a registered data controller adhering to strict processing principles:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-neutral-300 text-xs sm:text-sm">
              <li><strong>Right of Access & Portability:</strong> You may request an export of all production notes, brief submissions, or billing metadata retained by our studio.</li>
              <li><strong>Right to Erasure / Purge:</strong> Once a post-production project has closed and final masters have been delivered, you may request the immediate deletion of raw project archives and personal contact logs.</li>
              <li><strong>Non-Disclosure Compliance:</strong> Unreleased cuts, client trade secrets, and celebrity likenesses are governed by mutual Non-Disclosure Agreements (NDAs).</li>
            </ul>
            <div className="pt-2">
              <p className="text-xs text-neutral-400">
                To submit a data access or deletion request, please email: <span className="text-cyan-400 font-mono">eugeneokyere540@gmail.com</span> or contact us through our studio address.
              </p>
            </div>
          </section>
        </div>

        {/* Cross-linking Internal Navigation */}
        <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-neutral-400">
            <span>Quick Links:</span>
            <button
              type="button"
              onClick={() => {
                onBack();
                setTimeout(() => onNavigateSection('work'), 100);
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Portfolio Works
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                onBack();
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
                onBack();
                setTimeout(() => onNavigateSection('map'), 100);
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Studio Directions
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                onBack();
                setTimeout(() => onNavigateSection('contact'), 100);
              }}
              className="text-cyan-400 hover:underline cursor-pointer"
            >
              Booking Form
            </button>
          </div>

          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2.5 rounded-full bg-cyan-400 text-neutral-950 font-button font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 transition-colors cursor-pointer"
          >
            Back to Studio Home
          </button>
        </div>
      </div>
    </div>
  );
};
