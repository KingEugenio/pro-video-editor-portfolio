import React, { useState } from 'react';
import { Lock, Film, ArrowRight, ShieldCheck, KeyRound, AlertCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import { AdminLoginSkeleton } from '../skeletons/admin/AdminLoginSkeleton';

interface AdminLoginProps {
  onSuccess: () => void;
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onBackToPublic }) => {
  const { login, brandTheme } = usePortfolio();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Please enter your admin password.');
      return;
    }
    setIsVerifying(true);
    setTimeout(() => {
      const success = login(password);
      if (success) {
        onSuccess();
      } else {
        setIsVerifying(false);
        setError('Incorrect password. Default access password is "admin123"');
      }
    }, 450);
  };

  if (isVerifying) {
    return <AdminLoginSkeleton />;
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col justify-center items-center p-4 sm:p-6 text-neutral-100 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10 space-y-8">
        {/* Brand identity badge */}
        <div className="text-center space-y-2">
          <div
            className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center shadow-2xl shadow-cyan-500/20 mb-3"
            style={{
              backgroundColor: brandTheme.colors.primary,
              color: brandTheme.colors.buttonText,
            }}
          >
            <Film className="w-7 h-7" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {brandTheme.brandName} Studio
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400">
            Private Portfolio Content Management & Video Engine
          </p>
        </div>

        {/* Login Card */}
        <div className="p-8 rounded-3xl bg-neutral-900/80 border border-white/10 backdrop-blur-xl shadow-2xl space-y-6">
          <div className="flex items-center gap-2 pb-4 border-b border-white/10 text-xs font-mono text-cyan-300">
            <Lock className="w-4 h-4" />
            <span>AUTHENTICATED ACCESS REQUIRED</span>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-500/30 text-rose-200 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-neutral-300">
                Administrator Password
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password-input"
                  type="password"
                  required
                  placeholder="Enter administrator password..."
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950 border border-white/10 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-cyan-400/60 transition-colors"
                />
              </div>
            </div>

            <button
              id="admin-login-submit-btn"
              type="submit"
              className="w-full py-3.5 rounded-xl font-bold text-xs tracking-wider uppercase flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              style={{
                backgroundColor: brandTheme.colors.primary,
                color: brandTheme.colors.buttonText,
              }}
            >
              Enter Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Credential Hint */}
          <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-neutral-400 space-y-1">
            <span className="font-semibold text-neutral-300 block">Default Credentials:</span>
            <span>Use password: <code className="font-mono text-cyan-300 bg-black/40 px-1.5 py-0.5 rounded">admin123</code></span>
          </div>
        </div>

        {/* Public Back link */}
        <div className="text-center">
          <button
            onClick={onBackToPublic}
            className="text-xs text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            ← Return to Public Portfolio Website
          </button>
        </div>
      </div>
    </div>
  );
};
