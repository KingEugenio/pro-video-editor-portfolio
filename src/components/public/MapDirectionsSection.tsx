import React, { useState } from 'react';
import { MapPin, Navigation, Compass, Copy, Check, ExternalLink, Clock, Truck, Train, Globe2, Shield } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { KineticHeading } from '../ui/KineticHeading';

interface MapDirectionsSectionProps {
  onNavigate: (sectionId: string) => void;
}

export const MapDirectionsSection: React.FC<MapDirectionsSectionProps> = ({ onNavigate }) => {
  const { brandTheme } = usePortfolio();
  const [copied, setCopied] = useState(false);
  const [activeTransitTab, setActiveTransitTab] = useState<'metro' | 'courier' | 'remote' | 'suite'>('metro');

  const studioAddress = {
    street: '48 Wardour Street, Suite 4B',
    district: 'Soho Post-Production Hub',
    city: 'London',
    postcode: 'W1D 6PZ',
    country: 'United Kingdom',
    coordinates: '51.5126° N, 0.1332° W',
    fullFormatted: '48 Wardour Street, Suite 4B, Soho, London W1D 6PZ, United Kingdom',
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(studioAddress.fullFormatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(studioAddress.fullFormatted)}`;
  const appleMapsUrl = `https://maps.apple.com/?q=${encodeURIComponent(studioAddress.fullFormatted)}`;

  return (
    <section id="map" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#111116]/80 border border-white/10 text-xs font-mono text-cyan-300 backdrop-blur-md">
          <MapPin className="w-3.5 h-3.5" />
          <span>Studio Location & Physical Media Delivery</span>
        </div>

        <KineticHeading
          as="h2"
          text="POST-PRODUCTION SUITE & DIRECTIONS"
          highlightWords={['SUITE', 'DIRECTIONS']}
          highlightColor={brandTheme.colors.primary}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight"
        />

        <p className="text-sm sm:text-base text-neutral-300 font-body leading-relaxed max-w-2xl mx-auto">
          Located in the heart of London’s film and advertising post-production district. Drop off physical RAW drives or visit our calibrated grading suite.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Vector Map & Location Card */}
        <div className="lg:col-span-6 space-y-6">
          <div className="relative rounded-3xl bg-[#0c0c12]/90 border border-white/10 overflow-hidden shadow-2xl p-6 sm:p-8 backdrop-blur-2xl">
            {/* Ambient Aurora Glow */}
            <div
              className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
              style={{ backgroundColor: brandTheme.colors.primary }}
            />

            {/* Simulated Vector Studio Map Graphic */}
            <div className="relative h-60 sm:h-72 w-full rounded-2xl bg-[#060609] border border-white/10 overflow-hidden mb-6 flex items-center justify-center">
              {/* Grid Lines */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Map Road Vectors */}
              <svg className="absolute inset-0 w-full h-full opacity-40 pointer-events-none" viewBox="0 0 400 300">
                {/* Major streets */}
                <path d="M 0 120 Q 200 140 400 130" stroke="#38bdf8" strokeWidth="4" fill="none" opacity="0.6" />
                <path d="M 160 0 Q 180 150 200 300" stroke="#a855f7" strokeWidth="4" fill="none" opacity="0.6" />
                <path d="M 50 0 L 350 300" stroke="#475569" strokeWidth="2" strokeDasharray="4 4" fill="none" />
                <path d="M 0 240 L 400 200" stroke="#475569" strokeWidth="2" fill="none" />
                {/* Metro Line */}
                <path d="M 40 300 C 120 200 280 100 380 20" stroke="#ef4444" strokeWidth="3" fill="none" opacity="0.7" />
              </svg>

              {/* Station Indicators */}
              <div className="absolute top-10 left-12 px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-[10px] font-mono text-neutral-300">
                Tottenham Court Rd (3 min)
              </div>
              <div className="absolute bottom-10 right-10 px-2.5 py-1 rounded-md bg-black/80 border border-white/15 text-[10px] font-mono text-neutral-300">
                Piccadilly Circus (4 min)
              </div>

              {/* Central Studio Pinpoint Marker */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="w-12 h-12 rounded-full bg-cyan-500/20 border border-cyan-400/50 flex items-center justify-center">
                    <span className="w-6 h-6 rounded-full bg-cyan-400 text-neutral-950 flex items-center justify-center shadow-[0_0_20px_#22d3ee]">
                      <MapPin className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  </span>
                </div>
                <div className="mt-2 px-3 py-1 rounded-full bg-neutral-900/95 border border-cyan-400/40 text-cyan-300 text-xs font-mono font-bold shadow-xl flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  {brandTheme.brandName} Studio Suite
                </div>
              </div>

              {/* Live Coordinates Label */}
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-neutral-500">
                GPS: {studioAddress.coordinates}
              </div>
            </div>

            {/* Address Details */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {brandTheme.brandName} Post-Production Studios
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed mt-0.5">
                    {studioAddress.street}, {studioAddress.district}
                  </p>
                  <p className="text-xs text-neutral-400 font-mono">
                    {studioAddress.city}, {studioAddress.postcode}, {studioAddress.country}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono border transition-all cursor-pointer ${
                    copied
                      ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10 hover:text-white'
                  }`}
                  title="Copy full address to clipboard"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-cyan-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              {/* Open in Map Links */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>

                <a
                  href={appleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-neutral-200 font-mono text-xs font-bold transition-all cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Apple Maps</span>
                  <ExternalLink className="w-3 h-3 opacity-60" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Directions, Transit & Physical Drop-off Guide */}
        <div className="lg:col-span-6 space-y-6">
          {/* Transit Selection Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-2xl bg-[#0c0c12] border border-white/10">
            {[
              { id: 'metro', label: 'Underground / Rail', icon: <Train className="w-3.5 h-3.5" /> },
              { id: 'courier', label: 'Hard Drive Courier', icon: <Truck className="w-3.5 h-3.5" /> },
              { id: 'remote', label: 'Cloud Pipeline', icon: <Globe2 className="w-3.5 h-3.5" /> },
              { id: 'suite', label: 'Grading Visits', icon: <Clock className="w-3.5 h-3.5" /> },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTransitTab(tab.id as any)}
                className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                  activeTransitTab === tab.id
                    ? 'bg-cyan-400 text-neutral-950 shadow-md font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content Cards */}
          <div className="rounded-3xl bg-[#0c0c12]/90 border border-white/10 p-6 sm:p-8 backdrop-blur-xl space-y-6">
            {activeTransitTab === 'metro' && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Train className="w-4 h-4 text-cyan-400" />
                  London Underground & Elizabeth Line
                </h4>
                <div className="space-y-3 text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/6 space-y-1">
                    <span className="font-bold text-white font-mono block text-xs">
                      🚇 Tottenham Court Road (Central, Northern & Elizabeth Lines)
                    </span>
                    <p className="text-neutral-400 text-xs">
                      Take Dean Street exit, walk south along Wardour Street. Approx. 3 minutes walking distance.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/6 space-y-1">
                    <span className="font-bold text-white font-mono block text-xs">
                      🚇 Piccadilly Circus (Bakerloo & Piccadilly Lines)
                    </span>
                    <p className="text-neutral-400 text-xs">
                      Walk north along Shaftesbury Avenue into Wardour Street. Approx. 4 minutes walking distance.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/6 space-y-1">
                    <span className="font-bold text-white font-mono block text-xs">
                      🚇 Oxford Circus (Victoria, Central & Bakerloo Lines)
                    </span>
                    <p className="text-neutral-400 text-xs">
                      Walk east on Oxford Street, turn south on Wardour Street. Approx. 6 minutes walking distance.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTransitTab === 'courier' && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-400" />
                  Physical Media, SSD & RAID Receiving
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                  For large multi-terabyte camera master transfers (RED, ARRI RAW, Venice, Komodo), our facility features a secure 24/7 reception desk for courier deliveries (FedEx, DHL, Royal Mail Special Delivery, Addison Lee).
                </p>
                <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-xs space-y-2 text-neutral-300">
                  <span className="font-mono font-bold text-emerald-300 block">
                    📦 Courier Label Instructions (UK & Global):
                  </span>
                  <p className="font-mono text-neutral-300 text-[11px] bg-black/40 p-2.5 rounded-lg border border-white/5">
                    ATTN: {brandTheme.brandName} Post-Production Suite 4B<br />
                    REF: [Your Project Name / Commission ID]<br />
                    48 Wardour Street, Soho, London W1D 6PZ
                  </p>
                  <span className="font-mono font-bold text-cyan-300 block pt-1">
                    🇬🇭 West Africa Dispatch / GhanaPost GPS:
                  </span>
                  <p className="font-mono text-neutral-300 text-[11px] bg-black/40 p-2.5 rounded-lg border border-white/5">
                    ATTN: {brandTheme.brandName} Media Intake (EKO Hub)<br />
                    GhanaPost GPS: <strong className="text-white">GA-543-0125</strong><br />
                    Airport Residential / Osu Delivery Hub, Accra, Ghana
                  </p>
                  <p className="text-neutral-400 text-[11px]">
                    Same-day motorcycle couriers (Ghana Post Courier, DHL, Bolt) can deliver directly to the digital address code with receipt sign-off.
                  </p>
                </div>
              </div>
            )}

            {activeTransitTab === 'remote' && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Globe2 className="w-4 h-4 text-purple-400" />
                  Global Remote Post-Production Pipeline
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                  Over 70% of our editorial clients are based internationally in New York, Los Angeles, Tokyo, and across Europe.
                </p>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/8 space-y-1">
                    <span className="font-mono font-bold text-cyan-300 block">10 Gbps</span>
                    <p className="text-neutral-400 text-[11px]">Dedicated symmetrical fiber-optic pipeline.</p>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/8 space-y-1">
                    <span className="font-mono font-bold text-purple-300 block">Frame.io & MASV</span>
                    <p className="text-neutral-400 text-[11px]">Accelerated browser & app upload portals.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTransitTab === 'suite' && (
              <div className="space-y-4 animate-in fade-in">
                <h4 className="text-base font-bold text-white font-heading flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  In-Person Grading Suite Sessions
                </h4>
                <p className="text-xs sm:text-sm text-neutral-300 font-body leading-relaxed">
                  Directors, DPs, and agency creatives are welcome to attend final supervised color grading and audio mastering sessions in our Soho suite.
                </p>
                <ul className="space-y-2 text-xs text-neutral-300 font-body">
                  <li className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Calibrated Sony BVM OLED 4K HDR Reference Monitor</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Genelec 5.1 Surround Studio Monitoring</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Shield className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>Espresso bar, private Wi-Fi, and client lounge</span>
                  </li>
                </ul>
              </div>
            )}

            {/* Quick Action Link to Booking */}
            <div className="pt-4 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-neutral-400">
                Planning a shoot or drop-off?
              </span>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-mono text-xs font-semibold transition-colors cursor-pointer"
              >
                Schedule Suite Visit →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
