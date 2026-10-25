import React from 'react';
import { Dumbbell, ArrowLeft } from 'lucide-react';

interface NotFoundProps {
  onBackToHome: () => void;
}

export const NotFound: React.FC<NotFoundProps> = ({ onBackToHome }) => {
  return (
    <div className="py-24 sm:py-32 max-w-3xl mx-auto px-4 text-center space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00] mx-auto shadow-xl">
        <Dumbbell className="w-10 h-10 -rotate-45" />
      </div>

      <div className="space-y-2">
        <span className="font-mono text-xs font-bold text-[#ccff00] uppercase tracking-widest bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
          ERROR 404
        </span>
        <h1 className="font-display font-extrabold text-4xl sm:text-6xl uppercase tracking-tight text-white pt-2">
          MISSED YOUR SET?
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto">
          The lift or page you requested could not be found in the FitLog catalog.
        </p>
      </div>

      <div>
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#bbf000] active:scale-95 transition-all shadow-[0_4px_18px_rgba(204,255,0,0.2)]"
        >
          <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
          <span>Return to Workouts</span>
        </button>
      </div>
    </div>
  );
};
