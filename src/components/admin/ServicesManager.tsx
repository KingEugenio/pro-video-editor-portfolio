import React, { useState } from 'react';
import { Film, Plus, Trash2, Edit3, Check, Save, X, DollarSign } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ServiceOffering } from '../../types/portfolio';

export const ServicesManager: React.FC = () => {
  const { services, addService, updateService, deleteService, showToast } = usePortfolio();
  const [editingService, setEditingService] = useState<ServiceOffering | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startingPrice, setStartingPrice] = useState('$1,500 / project');
  const [showPricing, setShowPricing] = useState(true);
  const [deliverablesStr, setDeliverablesStr] = useState('Master 4K Export, 9:16 Vertical Reel, Web Proxy');

  const handleOpenCreate = () => {
    setTitle('');
    setDescription('');
    setStartingPrice('$1,500 / project');
    setShowPricing(true);
    setDeliverablesStr('Master 4K Export, 9:16 Vertical Reel, Web Proxy');
    setIsCreating(true);
    setEditingService(null);
  };

  const handleOpenEdit = (s: ServiceOffering) => {
    setEditingService(s);
    setTitle(s.title);
    setDescription(s.description);
    setStartingPrice(s.startingPrice || '');
    setShowPricing(Boolean(s.showPricing));
    setDeliverablesStr(s.deliverables?.join(', ') || '');
    setIsCreating(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const deliverables = deliverablesStr
      .split(',')
      .map((d) => d.trim())
      .filter(Boolean);

    if (editingService) {
      updateService(editingService.id, {
        title,
        description,
        startingPrice,
        showPricing,
        deliverables,
      });
      showToast(`Updated service "${title}"`);
    } else {
      addService({
        title,
        description,
        icon: 'Film',
        startingPrice,
        showPricing,
        deliverables,
      });
      showToast(`Added service "${title}"`);
    }

    setIsCreating(false);
    setEditingService(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h1 className="text-xl font-bold text-white">Services & Post-Production Rates</h1>
          <p className="text-xs text-neutral-400 mt-0.5">
            Manage your service offerings, deliverable packages, and starting rate tiers.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 shadow-md cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Add New Service
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((srv) => (
          <div
            key={srv.id}
            className="p-5 rounded-2xl bg-neutral-900/60 border border-white/10 space-y-4 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-white">{srv.title}</h3>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(srv)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-neutral-300"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      deleteService(srv.id);
                      showToast('Service deleted');
                    }}
                    className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-500/20 text-rose-300 hover:bg-rose-900"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <p className="text-xs text-neutral-400 leading-relaxed">{srv.description}</p>

              {srv.deliverables && (
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase">Deliverables:</span>
                  <ul className="text-xs text-neutral-300 space-y-1">
                    {srv.deliverables.map((del, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-cyan-400" />
                        <span>{del}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs">
              <span className="text-neutral-500 font-mono">Rate:</span>
              <span className="font-bold text-white font-mono">{srv.startingPrice || 'Custom'}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Service Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h3 className="text-base font-bold text-white">
                {editingService ? 'Edit Service' : 'Add New Service Offering'}
              </h3>
              <button onClick={() => setIsCreating(false)} className="text-neutral-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300 block">Service Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Commercial & Brand Editing"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300 block">Description</label>
                <textarea
                  rows={3}
                  placeholder="Explain scope, workflows, turnaround times..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-neutral-300 block">Starting Rate</label>
                  <input
                    type="text"
                    placeholder="$2,500 / spot"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white font-mono"
                  />
                </div>
                <div className="flex items-center pt-5">
                  <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={showPricing}
                      onChange={(e) => setShowPricing(e.target.checked)}
                      className="rounded text-cyan-400"
                    />
                    <span>Show rate publicly</span>
                  </label>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-neutral-300 block">
                  Deliverables (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="4K ProRes Master, 9:16 Social Reel, Sound Mix"
                  value={deliverablesStr}
                  onChange={(e) => setDeliverablesStr(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white"
                />
              </div>

              <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-xs text-neutral-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-neutral-950 text-xs font-bold hover:bg-cyan-400"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
