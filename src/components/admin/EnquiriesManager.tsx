import React, { useState } from 'react';
import {
  Inbox,
  Mail,
  Clock,
  CheckCircle,
  Archive,
  DollarSign,
  Calendar,
  HardDrive,
  Trash2,
  Filter,
  Eye,
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { ClientEnquiry } from '../../types/portfolio';
import { WhatsAppIcon } from '../icons/CustomSvgIcons';

export const EnquiriesManager: React.FC = () => {
  const { enquiries, updateEnquiryStatus, deleteEnquiry, showToast } = usePortfolio();
  const [selectedEnquiry, setSelectedEnquiry] = useState<ClientEnquiry | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  const filtered = enquiries.filter((e) => {
    if (filterStatus === 'ALL') return true;
    return e.status === filterStatus;
  });

  const getStatusBadge = (status: ClientEnquiry['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-300 text-[10px] font-mono">NEW BRIEF</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full bg-amber-950 border border-amber-500/40 text-amber-300 text-[10px] font-mono">CONTACTED</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-mono">IN PROGRESS</span>;
      case 'archived':
        return <span className="px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-400 text-[10px] font-mono">ARCHIVED</span>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Inbox className="w-5 h-5 text-cyan-400" />
            <h1 className="text-xl font-bold text-white">Client Project Briefs & Enquiries</h1>
          </div>
          <p className="text-xs text-neutral-400 mt-0.5">
            Incoming commission requests, budget tiers, footage locations, and project specifications.
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-2">
          {['ALL', 'new', 'contacted', 'in_progress', 'archived'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                filterStatus === st
                  ? 'bg-cyan-500 text-neutral-950'
                  : 'bg-neutral-900 border border-white/10 text-neutral-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Enquiries Grid / List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Enquiries List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          {filtered.length > 0 ? (
            filtered.map((enquiry) => {
              const isSelected = selectedEnquiry?.id === enquiry.id;
              return (
                <div
                  key={enquiry.id}
                  onClick={() => setSelectedEnquiry(enquiry)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer space-y-2 ${
                    isSelected
                      ? 'bg-cyan-950/40 border-cyan-400 shadow-xl'
                      : 'bg-neutral-900/60 border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{enquiry.name}</span>
                    {getStatusBadge(enquiry.status)}
                  </div>

                  <div className="text-xs text-neutral-300 font-medium line-clamp-1">
                    {enquiry.projectType} • {enquiry.budget || 'Custom Budget'}
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono pt-1">
                    <span>{enquiry.email}</span>
                    <span>{new Date(enquiry.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 rounded-2xl bg-neutral-900/40 border border-white/10 text-center text-xs text-neutral-400">
              No enquiries match the current filter.
            </div>
          )}
        </div>

        {/* Selected Enquiry Detailed Brief View (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedEnquiry ? (
            <div className="p-6 rounded-3xl bg-neutral-900/80 border border-white/10 space-y-6 shadow-2xl">
              {/* Header Details */}
              <div className="flex items-start justify-between pb-4 border-b border-white/10">
                <div>
                  <h2 className="text-lg font-bold text-white">{selectedEnquiry.name}</h2>
                  <span className="text-xs text-neutral-400 font-mono">
                    {selectedEnquiry.company ? `${selectedEnquiry.company} • ` : ''}
                    {selectedEnquiry.email}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => {
                      updateEnquiryStatus(selectedEnquiry.id, e.target.value as any);
                      setSelectedEnquiry({ ...selectedEnquiry, status: e.target.value as any });
                    }}
                    className="px-3 py-1.5 rounded-lg bg-neutral-950 border border-white/10 text-xs font-semibold text-white focus:outline-none"
                  >
                    <option value="new">Status: New Brief</option>
                    <option value="contacted">Status: Contacted</option>
                    <option value="in_progress">Status: In Progress</option>
                    <option value="archived">Status: Archived</option>
                  </select>

                  <button
                    onClick={() => {
                      deleteEnquiry(selectedEnquiry.id);
                      setSelectedEnquiry(null);
                      showToast('Enquiry removed');
                    }}
                    className="p-1.5 rounded-lg bg-rose-950/40 border border-rose-500/30 text-rose-300 hover:bg-rose-900"
                    title="Delete Enquiry"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Core Project Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Project Type</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{selectedEnquiry.projectType}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Budget Tier</span>
                  <span className="text-xs font-bold text-cyan-400 mt-0.5 block">{selectedEnquiry.budget || 'Custom'}</span>
                </div>
                <div className="p-3 rounded-xl bg-neutral-950 border border-white/5">
                  <span className="text-[10px] font-mono text-neutral-500 uppercase block">Deadline</span>
                  <span className="text-xs font-bold text-white mt-0.5 block">{selectedEnquiry.deadline || 'Flexible'}</span>
                </div>
              </div>

              {/* Footage & Storage Location */}
              <div className="p-4 rounded-xl bg-neutral-950 border border-white/5 space-y-2">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                  Raw Footage Status & Storage
                </span>
                <p className="text-xs text-neutral-300">
                  {selectedEnquiry.footageDetails || 'Footage status not specified by client.'}
                </p>
                {selectedEnquiry.footageStorageLink && (
                  <a
                    href={selectedEnquiry.footageStorageLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:underline pt-1"
                  >
                    Open Media Storage Folder →
                  </a>
                )}
              </div>

              {/* Project Brief Description */}
              <div className="space-y-1.5">
                <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block">
                  Project Description / Creative Goals:
                </span>
                <div className="p-4 rounded-xl bg-neutral-950 border border-white/5 text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap">
                  {selectedEnquiry.description || 'No detailed description provided.'}
                </div>
              </div>

              {/* Quick Actions Bar */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                <a
                  href={`mailto:${selectedEnquiry.email}?subject=${encodeURIComponent(
                    `Regarding your ${selectedEnquiry.projectType} inquiry`
                  )}`}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-neutral-950 text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <Mail className="w-4 h-4" /> Reply via Email
                </a>

                {selectedEnquiry.phone && (
                  <a
                    href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9+]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5"
                  >
                    <WhatsAppIcon className="w-4 h-4" /> Chat on WhatsApp
                  </a>
                )}
              </div>
            </div>
          ) : (
            <div className="p-12 rounded-3xl bg-neutral-900/40 border border-white/10 text-center space-y-2">
              <Eye className="w-8 h-8 text-neutral-500 mx-auto" />
              <h3 className="text-sm font-bold text-white">No enquiry selected</h3>
              <p className="text-xs text-neutral-400">Click on an enquiry from the list to view full specifications and reply.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
