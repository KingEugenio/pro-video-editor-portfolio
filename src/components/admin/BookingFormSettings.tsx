import React, { useState } from 'react';
import {
  FileSpreadsheet,
  CheckCircle,
  Save,
  Sliders,
  ToggleLeft,
  ToggleRight,
  Plus,
  Trash2,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { FormFieldConfig } from '../../types/portfolio';
import { WhatsAppIcon } from '../icons/CustomSvgIcons';

export const BookingFormSettings: React.FC = () => {
  const { formConfig, updateFormConfig, showToast } = usePortfolio();

  const [heading, setHeading] = useState(formConfig.heading);
  const [subheading, setSubheading] = useState(formConfig.subheading);
  const [buttonText, setButtonText] = useState(formConfig.buttonText);
  const [successMessage, setSuccessMessage] = useState(formConfig.successMessage);
  const [formspreeEndpoint, setFormspreeEndpoint] = useState(formConfig.formspreeEndpoint || '');
  const [enableWhatsApp, setEnableWhatsApp] = useState(formConfig.enableWhatsApp);
  const [whatsappNumber, setWhatsappNumber] = useState(formConfig.whatsappNumber || '');
  const [fields, setFields] = useState<FormFieldConfig[]>(formConfig.fields);

  const handleToggleFieldEnabled = (fieldId: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, enabled: !f.enabled } : f))
    );
  };

  const handleToggleFieldRequired = (fieldId: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, required: !f.required } : f))
    );
  };

  const handleUpdateFieldLabel = (fieldId: string, label: string) => {
    setFields((prev) =>
      prev.map((f) => (f.id === fieldId ? { ...f, label } : f))
    );
  };

  const handleSave = () => {
    updateFormConfig({
      heading,
      subheading,
      buttonText,
      successMessage,
      formspreeEndpoint,
      enableWhatsApp,
      whatsappNumber,
      fields,
    });
    showToast('Booking form settings updated!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Booking Form & Commission Briefs</h1>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Configure Formspree endpoints, custom form fields, questions, copy, and WhatsApp integration.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 cursor-pointer"
        >
          <Save className="w-4 h-4" /> Save Form Settings
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Endpoints & Copy (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Formspree & Backend Integration */}
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider">
              Integration & Delivery Endpoint
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-300">
                Formspree Endpoint URL / Form ID
              </label>
              <input
                type="text"
                placeholder="https://formspree.io/f/xv... or your custom API"
                value={formspreeEndpoint}
                onChange={(e) => setFormspreeEndpoint(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white font-mono placeholder-neutral-500 focus:outline-none focus:border-cyan-400"
              />
              <p className="text-[11px] text-neutral-400">
                Submissions automatically arrive in your local inbox AND send email alerts via your Formspree endpoint.
              </p>
            </div>

            {/* WhatsApp Integration */}
            <div className="pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-neutral-200 flex items-center gap-2">
                  <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                  Enable Direct WhatsApp Button
                </label>
                <button
                  type="button"
                  onClick={() => setEnableWhatsApp(!enableWhatsApp)}
                  className={`text-xl ${enableWhatsApp ? 'text-emerald-400' : 'text-neutral-500'}`}
                >
                  {enableWhatsApp ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                </button>
              </div>

              {enableWhatsApp && (
                <div className="space-y-1.5 animate-in fade-in">
                  <label className="block text-xs font-medium text-neutral-400">
                    WhatsApp Phone Number (with Country Code)
                  </label>
                  <input
                    type="text"
                    placeholder="+14155552671"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Copywriting & Headings */}
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-4 shadow-xl">
            <h3 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider">
              Section Copywriting
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-300">Main Heading</label>
              <input
                type="text"
                value={heading}
                onChange={(e) => setHeading(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-300">Subheading</label>
              <textarea
                rows={2}
                value={subheading}
                onChange={(e) => setSubheading(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-300">Submit Button Text</label>
              <input
                type="text"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-300">Success Confirmation Message</label>
              <textarea
                rows={2}
                value={successMessage}
                onChange={(e) => setSuccessMessage(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Dynamic Form Fields Manager (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-neutral-900/80 border border-white/10 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-white/10">
              <div>
                <h3 className="text-xs font-mono uppercase text-cyan-300 font-bold tracking-wider">
                  Field Configuration Matrix
                </h3>
                <p className="text-xs text-neutral-400">
                  Control which questions appear on your booking form and whether they are required.
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {fields.map((field) => (
                <div
                  key={field.id}
                  className={`p-4 rounded-xl border transition-all ${
                    field.enabled
                      ? 'bg-neutral-950 border-white/10'
                      : 'bg-neutral-950/30 border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 space-y-1">
                      <input
                        type="text"
                        value={field.label}
                        onChange={(e) => handleUpdateFieldLabel(field.id, e.target.value)}
                        className="text-xs font-bold text-white bg-transparent border-b border-white/10 hover:border-cyan-400 focus:border-cyan-400 focus:outline-none w-full py-0.5"
                      />
                      <div className="flex items-center gap-2 text-[10px] font-mono text-neutral-400">
                        <span>Variable: <code>{field.name}</code></span>
                        <span>•</span>
                        <span>Type: {field.type}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <label className="flex items-center gap-1.5 cursor-pointer text-xs text-neutral-300">
                        <input
                          type="checkbox"
                          checked={field.required}
                          disabled={!field.enabled}
                          onChange={() => handleToggleFieldRequired(field.id)}
                          className="rounded text-cyan-400 focus:ring-0"
                        />
                        <span>Required</span>
                      </label>

                      <button
                        type="button"
                        onClick={() => handleToggleFieldEnabled(field.id)}
                        className={`text-lg ${field.enabled ? 'text-cyan-400' : 'text-neutral-600'}`}
                      >
                        {field.enabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6" />}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
