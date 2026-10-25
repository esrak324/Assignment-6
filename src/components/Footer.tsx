import React from 'react';
import { Dumbbell } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-[#0c0d10] py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Left: Brand logo icon + FITLOG */}
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center text-[#ccff00]">
            <Dumbbell className="w-4 h-4 -rotate-45" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-display font-bold text-xl tracking-wider text-white">
              FITLOG
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
          </div>
        </div>

        {/* Right: copyright line */}
        <p className="text-xs text-zinc-500 font-medium text-center sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>

      </div>
    </footer>
  );
};
