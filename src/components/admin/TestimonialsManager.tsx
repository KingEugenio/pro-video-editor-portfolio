import React, { useState } from 'react';
import { Quote, Plus, Trash2, Edit3, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { Testimonial } from '../../types/portfolio';
import { StarSvgIcon } from '../icons/CustomSvgIcons';

export const TestimonialsManager: React.FC = () => {
  const { testimonials, addTestimonial, updateTestimonial, deleteTestimonial, showToast } = usePortfolio();
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form
  const [clientName, setClientName] = useState('');
  const [clientTitle, setClientTitle] = useState('');
  const [company, setCompany] = useState('');
  const [quote, setQuote] = useState('');
  const [rating, setRating] = useState(5);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isPublished, setIsPublished] = useState(true);

  const handleOpenCreate = () => {
    setClientName('');
    setClientTitle('');
    setCompany('');
    setQuote('');
    setRating(5);
    setAvatarUrl('');
    setIsPublished(true);
    setEditingTestimonial(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Testimonial) => {
    setEditingTestimonial(t);
    setClientName(t.clientName);
    setClientTitle(t.clientTitle);
    setCompany(t.company);
    setQuote(t.quote);
    setRating(t.rating || 5);
    setAvatarUrl(t.avatarUrl || '');
    setIsPublished(Boolean(t.isPublished));
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !quote.trim()) return;

    if (editingTestimonial) {
      updateTestimonial(editingTestimonial.id, {
        clientName,
        clientTitle,
        company,
        quote,
        rating,
        avatarUrl,
        isPublished,
      });
      showToast(`Updated testimonial from ${clientName}`);
    } else {
      addTestimonial({
        clientName,
        clientTitle,
        company,
        quote,
        rating,
        avatarUrl,
        isPublished,
      });
      showToast(`Added testimonial from ${clientName}`);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white">Client Reviews & Testimonials</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Showcase director endorsements, brand quotes, and star ratings.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <StarSvgIcon key={i} filled={true} className="w-3.5 h-3.5 text-amber-400" />
                  ))}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(t)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      deleteTestimonial(t.id);
                      showToast('Testimonial deleted');
                    }}
                    className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-rose-300 hover:bg-rose-900"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-300 italic leading-relaxed">"{t.quote}"</p>
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center gap-3">
              {t.avatarUrl ? (
                <img
                  src={t.avatarUrl}
                  alt={`${t.clientName}, ${t.clientTitle || 'Client'} at ${t.company || 'Company'}`}
                  className="w-8 h-8 rounded-full object-cover"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-cyan-500 text-neutral-950 flex items-center justify-center font-bold text-xs">
                  {t.clientName.slice(0, 2).toUpperCase()}
                </div>
              )}
              <div>
                <span className="text-xs font-bold text-white block">{t.clientName}</span>
                <span className="text-[10px] text-neutral-400 block">{t.clientTitle}, {t.company}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">
                {editingTestimonial ? 'Edit Testimonial' : 'Add Client Endorsement'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 block">Client Name</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 block">Title & Company</label>
                  <input
                    type="text"
                    placeholder="Creative Director, Apex"
                    value={clientTitle}
                    onChange={(e) => setClientTitle(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs text-neutral-300 block">Quote / Feedback</label>
                <textarea
                  rows={3}
                  required
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 block">Avatar Photo URL</label>
                  <input
                    type="url"
                    value={avatarUrl}
                    onChange={(e) => setAvatarUrl(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs text-neutral-300 block">Star Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
                  >
                    <option value={5}>5 Stars - Top Tier Endorsement</option>
                    <option value={4}>4 Stars - High Recommendation</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-neutral-950 text-xs font-bold hover:bg-cyan-400"
                >
                  Save Testimonial
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
