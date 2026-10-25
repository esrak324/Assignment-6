import React from 'react';
import { useWorkout } from '../context/WorkoutContext';
import { CheckCircle2, AlertTriangle, Info, X, AlertCircle } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useWorkout();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        let borderClass = 'border-zinc-800 bg-[#16181e] text-zinc-100';
        let icon = <CheckCircle2 className="w-5 h-5 text-[#ccff00] shrink-0" />;

        if (toast.type === 'warning') {
          borderClass = 'border-amber-500/40 bg-[#1f1a10] text-amber-100';
          icon = <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />;
        } else if (toast.type === 'error') {
          borderClass = 'border-rose-500/40 bg-[#1f1214] text-rose-100';
          icon = <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />;
        } else if (toast.type === 'info') {
          borderClass = 'border-sky-500/30 bg-[#121924] text-sky-100';
          icon = <Info className="w-5 h-5 text-sky-400 shrink-0" />;
        } else {
          // success
          borderClass = 'border-[#ccff00]/30 bg-[#16191c] text-zinc-100 shadow-[0_4px_24px_rgba(204,255,0,0.08)]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between gap-3 p-3.5 rounded-xl border shadow-xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-2 ${borderClass}`}
          >
            <div className="flex items-center gap-3 text-sm font-medium">
              {icon}
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 rounded-md text-zinc-400 hover:text-zinc-100 hover:bg-white/10 transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
