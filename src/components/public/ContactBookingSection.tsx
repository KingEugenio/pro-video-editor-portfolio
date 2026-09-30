import React, { useState, useEffect } from 'react';
import { Send, CheckCircle2, AlertCircle, Calendar, Clock, ShieldCheck, ArrowUpRight, Lock, MapPin, HelpCircle, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { usePortfolio } from '../../context/PortfolioContext';
import { KineticHeading } from '../ui/KineticHeading';
import { WhatsAppIcon } from '../icons/CustomSvgIcons';
import { FormRateLimiter, RateLimitStatus } from '../../services/rateLimiter';
import { SocialShareBar } from './SocialShareBar';

interface ContactBookingSectionProps {
  prefilledService?: string;
  onSuccessRedirect?: (submission: { id?: string; name?: string; email?: string; projectType?: string }) => void;
  onNavigateSection?: (sectionId: string) => void;
  onOpenPrivacyPolicy?: () => void;
}

export const ContactBookingSection: React.FC<ContactBookingSectionProps> = ({
  prefilledService,
  onSuccessRedirect,
  onNavigateSection,
  onOpenPrivacyPolicy,
}) => {
  const { formConfig, brandTheme, submitEnquiry } = usePortfolio();

  const [formData, setFormData] = useState<Record<string, any>>({
    projectType: prefilledService || 'Commercial / Brand Spot',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [rateLimitState, setRateLimitState] = useState<RateLimitStatus>(() => FormRateLimiter.checkLimit());

  useEffect(() => {
    setRateLimitState(FormRateLimiter.checkLimit());
    const interval = setInterval(() => {
      setRateLimitState(FormRateLimiter.checkLimit());
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleInputChange = (fieldName: string, value: any) => {
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
    setErrorMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    // Pre-check rate limits
    const currentLimit = FormRateLimiter.checkLimit();
    setRateLimitState(currentLimit);
    if (!currentLimit.allowed) {
      setErrorMessage(currentLimit.message);
      setIsSubmitting(false);
      return;
    }

    try {
      // Validate enabled required fields
      const missingRequired = formConfig.fields
        .filter((f) => f.enabled && f.required)
        .find((f) => !formData[f.name] || String(formData[f.name]).trim() === '');

      if (missingRequired) {
        setErrorMessage(`Please fill out the required field: "${missingRequired.label}"`);
        setIsSubmitting(false);
        return;
      }

      const res = await submitEnquiry(formData);
      setRateLimitState(FormRateLimiter.checkLimit());

      if (res.success) {
        if (onSuccessRedirect) {
          onSuccessRedirect({
            id: res.enquiry?.id,
            name: formData.name || formData.clientName,
            email: formData.email,
            projectType: formData.projectType,
          });
        } else {
          setSubmittedSuccess(true);
        }
      } else {
        setErrorMessage(res.message || 'Submission failed. Please try again.');
      }
    } catch (err) {
      setErrorMessage('An unexpected error occurred. Please try again or reach out via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppClick = () => {
    const rawNumber = formConfig.whatsappNumber?.replace(/[^0-9+]/g, '') || '';
    const text = encodeURIComponent(`Hi ${brandTheme.brandName}, I'm interested in discussing a video editing project.`);
    window.open(`https://wa.me/${rawNumber}?text=${text}`, '_blank');
  };

  const headline = brandTheme.kineticTypography?.contactHeadline || "LET'S MAKE SOMETHING WORTH WATCHING.";

  return (
    <section id="contact" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Direct Info & Value Proposition */}
        <div className="lg:col-span-5 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116]/80 border border-white/10 text-xs font-mono text-cyan-300 backdrop-blur-md">
            <Calendar className="w-3.5 h-3.5" />
            <span>Bookings & Commissions</span>
          </div>

          <KineticHeading
            as="h2"
            text={headline}
            highlightWords={['SOMETHING', 'WORTH', 'WATCHING.', 'PROJECT']}
            highlightColor={brandTheme.colors.primary}
            className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight"
          />

          <p className="text-base text-neutral-300 font-body leading-relaxed">
            {formConfig.subheading ||
              "Ready to elevate your timeline? Share your raw footage scope, target delivery date, and vision below."}
          </p>

          {/* Rate Limit Transparency Badge */}
          <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/8 space-y-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-400 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-cyan-400" />
                Anti-Spam Rate Limit
              </span>
              <span className={`font-bold ${rateLimitState.allowed ? 'text-cyan-300' : 'text-rose-400'}`}>
                {rateLimitState.remainingSubmissions} / {rateLimitState.maxSubmissions} briefs left this hr
              </span>
            </div>
            <p className="text-[11px] text-neutral-500">
              Form submissions are protected by Formspree TLS encryption and rate limited to 3 per hour.
            </p>
          </div>

          {/* Quick Perks */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300 font-body">
              <Clock className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Rapid 24-hour turnaround on project scoping and rate estimates</span>
            </div>
            <div className="flex items-center gap-3 text-xs sm:text-sm text-neutral-300 font-body">
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Full support for Google Drive, Frame.io, MASV & physical SSD workflows</span>
            </div>
          </div>

          {/* Internal Cross-Linking Navigation shortcuts */}
          <div className="pt-4 border-t border-white/8 flex flex-wrap gap-3 text-xs font-mono text-neutral-400">
            {onNavigateSection && (
              <>
                <button
                  type="button"
                  onClick={() => onNavigateSection('faq')}
                  className="flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer"
                >
                  <HelpCircle className="w-3 h-3" /> FAQ & Turnarounds
                </button>
                <span>•</span>
                <button
                  type="button"
                  onClick={() => onNavigateSection('map')}
                  className="flex items-center gap-1 text-cyan-400 hover:underline cursor-pointer"
                >
                  <MapPin className="w-3 h-3" /> Soho Studio Directions
                </button>
              </>
            )}
            {onOpenPrivacyPolicy && (
              <>
                <span>•</span>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="flex items-center gap-1 text-neutral-300 hover:text-white hover:underline cursor-pointer"
                >
                  <Shield className="w-3 h-3 text-emerald-400" /> Privacy Policy
                </button>
              </>
            )}
          </div>

          {/* WhatsApp Direct Option */}
          {formConfig.enableWhatsApp && formConfig.whatsappNumber && (
            <div className="pt-4 border-t border-white/8">
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2.5">
                Immediate Question?
              </span>
              <button
                type="button"
                onClick={handleWhatsAppClick}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/70 border border-emerald-500/30 text-emerald-300 font-button font-bold text-xs uppercase tracking-wider transition-all w-full sm:w-auto cursor-pointer shadow-lg"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                Chat on WhatsApp ({formConfig.whatsappNumber})
              </button>
            </div>
          )}
        </div>

        {/* Right Column: Dark Glass Booking Brief Form */}
        <div className="lg:col-span-7">
          <div className="relative rounded-3xl bg-[#0e0e14]/90 border border-white/10 backdrop-blur-2xl p-6 sm:p-10 shadow-2xl">
            {/* Subtle Aurora Rim inside form card */}
            <div
              className="absolute -inset-0.5 rounded-3xl opacity-30 blur-xl pointer-events-none -z-10"
              style={{
                background: `radial-gradient(circle at top right, ${brandTheme.colors.primary}44 0%, transparent 60%)`,
              }}
            />

            {submittedSuccess ? (
              <div className="py-12 px-6 text-center space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 flex items-center justify-center mx-auto shadow-xl">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-heading text-2xl font-bold text-white">Project Brief Received</h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto font-body leading-relaxed">
                  {formConfig.successMessage}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmittedSuccess(false);
                    setFormData({});
                  }}
                  className="mt-6 px-6 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors cursor-pointer"
                >
                  Send Another Brief
                </button>
              </div>
            ) : (
              <form id="project-booking-form" method="POST" onSubmit={handleSubmit} className="space-y-5">
                {errorMessage && (
                  <div role="alert" className="p-3.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {!rateLimitState.allowed && (
                  <div className="p-3.5 rounded-xl bg-amber-950/50 border border-amber-500/30 text-amber-200 text-xs flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>{rateLimitState.message}</span>
                  </div>
                )}

                {/* Render Dynamic Form Fields inside HTML5 Fieldset */}
                <fieldset className="border-0 p-0 m-0">
                  <legend className="sr-only">Project Inquiry & Commission Details</legend>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {formConfig.fields
                      .filter((f) => f.enabled)
                      .map((field) => {
                        const isFullWidth =
                          field.type === 'textarea' ||
                          field.name === 'projectDetails' ||
                          field.name === 'message';
                        const inputId = `field-${field.name}`;

                        return (
                          <div
                            key={field.id}
                            className={`${isFullWidth ? 'sm:col-span-2' : 'sm:col-span-1'} space-y-1.5`}
                          >
                            <label htmlFor={inputId} className="block text-xs font-mono font-medium text-neutral-300">
                              {field.label} {field.required && <span className="text-cyan-400" aria-hidden="true">*</span>}
                            </label>

                            {field.type === 'select' ? (
                              <select
                                id={inputId}
                                name={field.name}
                                required={field.required}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[#08080c]/80 border border-white/10 text-xs text-white focus:outline-none focus:border-cyan-400/60 transition-colors"
                              >
                                <option value="" disabled>Select an option</option>
                                {field.options?.map((opt) => (
                                   <option key={opt} value={opt} className="bg-[#0e0e14] text-white">
                                     {opt}
                                   </option>
                                ))}
                              </select>
                            ) : field.type === 'textarea' ? (
                              <textarea
                                id={inputId}
                                name={field.name}
                                rows={4}
                                required={field.required}
                                placeholder={field.placeholder || 'Describe footage, duration, vision, and deadlines...'}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[#08080c]/80 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/60 transition-colors font-body resize-none"
                              />
                            ) : (
                              <input
                                id={inputId}
                                name={field.name}
                                type={field.type}
                                required={field.required}
                                autoComplete={
                                  field.name === 'email'
                                    ? 'email'
                                    : field.name === 'name' || field.name === 'clientName'
                                    ? 'name'
                                    : field.name === 'phone'
                                    ? 'tel'
                                    : undefined
                                }
                                placeholder={field.placeholder || ''}
                                value={formData[field.name] || ''}
                                onChange={(e) => handleInputChange(field.name, e.target.value)}
                                className="w-full px-4 py-3 rounded-xl bg-[#08080c]/80 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/60 transition-colors font-body"
                              />
                            )}
                          </div>
                        );
                      })}
                  </div>
                </fieldset>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting || !rateLimitState.allowed}
                    className="w-full py-4 rounded-xl font-button font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer shadow-xl"
                    style={{
                      backgroundColor: brandTheme.colors.button || brandTheme.colors.primary,
                      color: brandTheme.colors.buttonText || '#000',
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Transmitting Brief...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        {formConfig.submitButtonText || 'Submit Project Brief'}
                        <ArrowUpRight className="w-4 h-4" />
                      </span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
