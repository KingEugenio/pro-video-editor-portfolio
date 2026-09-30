import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';

export const Toast: React.FC = () => {
  const { toast } = usePortfolio();

  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-cyan-400 shrink-0" />,
  };

  return (
    <div
      id="cinefolio-global-toast"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5 max-w-md bg-neutral-900/95 text-neutral-100"
      style={{
        borderColor:
          toast.type === 'success'
            ? 'rgba(16, 185, 129, 0.4)'
            : toast.type === 'error'
            ? 'rgba(244, 63, 94, 0.4)'
            : 'rgba(6, 182, 212, 0.4)',
      }}
    >
      {icons[toast.type]}
      <p className="text-xs font-semibold text-neutral-100">{toast.message}</p>
    </div>
  );
};

export const ToastContainer: React.FC<{ toasts?: any[]; onDismiss?: (id: string) => void }> = () => {
  return <Toast />;
};
