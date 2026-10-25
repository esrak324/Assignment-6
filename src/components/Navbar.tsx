import React, { useState } from 'react';
import { Dumbbell, Bookmark, Calendar, Menu, X } from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string, searchParams?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { planCount, savedCount } = useWorkout();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isWorkoutActive = currentPath === '/' || currentPath.startsWith('/workout');
  const isMyPlanActive = currentPath === '/my-plan';

  const handleLinkClick = (path: string, param?: string) => {
    onNavigate(path, param);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-[#0e1013]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleLinkClick('/')}
            className="flex items-center gap-2.5 text-left group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] rounded-lg p-1"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-[#ccff00] group-hover:scale-105 transition-transform duration-200 shadow-sm">
              <Dumbbell className="w-5 h-5 -rotate-45" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-display font-bold text-2xl tracking-wider text-white">
                FITLOG
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00]" />
            </div>
          </button>
        </div>

        {/* Center: Navigation Links */}
        <nav className="hidden md:flex items-center gap-2">
          <button
            onClick={() => handleLinkClick('/')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-150 ${
              isWorkoutActive
                ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            Workout
          </button>
          <button
            onClick={() => handleLinkClick('/my-plan')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all duration-150 ${
              isMyPlanActive
                ? 'bg-zinc-800 text-white shadow-sm ring-1 ring-zinc-700'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            My Plan
          </button>
        </nav>

        {/* Right Side: Status Badges (Plan badge = filled accent pill, Saved badge = outline pill) */}
        <div className="hidden sm:flex items-center gap-3">
          {/* Plan Badge: Filled pill with accent background (#ccff00) */}
          <button
            onClick={() => handleLinkClick('/my-plan', 'tab=today')}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#ccff00] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#bbf000] active:scale-95 transition-all shadow-[0_2px_12px_rgba(204,255,0,0.25)]"
            title="View Today's Plan"
          >
            <Calendar className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Plan</span>
            <span className="w-5 h-5 rounded-full bg-black text-[#ccff00] text-[11px] font-mono flex items-center justify-center font-black">
              {planCount}
            </span>
          </button>

          {/* Saved Badge: Pill with outline/border only */}
          <button
            onClick={() => handleLinkClick('/my-plan', 'tab=saved')}
            className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-zinc-700 hover:border-zinc-500 bg-zinc-900/60 text-zinc-300 hover:text-white font-medium text-xs uppercase tracking-wider hover:bg-zinc-800 active:scale-95 transition-all"
            title="View Saved Workouts"
          >
            <Bookmark className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
            <span>Saved</span>
            <span className="w-5 h-5 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-200 text-[11px] font-mono flex items-center justify-center font-bold">
              {savedCount}
            </span>
          </button>
        </div>

        {/* Mobile Hamburger / Quick Counter */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => handleLinkClick('/my-plan', 'tab=today')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#ccff00] text-black font-bold text-xs"
          >
            <span>Plan</span>
            <span className="w-4.5 h-4.5 rounded-full bg-black text-[#ccff00] text-[10px] font-mono flex items-center justify-center font-black">
              {planCount}
            </span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-zinc-800 bg-[#121418] px-4 pt-3 pb-4 space-y-2 animate-in fade-in duration-150">
          <button
            onClick={() => handleLinkClick('/')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
              isWorkoutActive
                ? 'bg-zinc-800 text-[#ccff00] font-bold'
                : 'text-zinc-300 hover:bg-zinc-800/60'
            }`}
          >
            Workout Library
          </button>
          <button
            onClick={() => handleLinkClick('/my-plan')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold ${
              isMyPlanActive
                ? 'bg-zinc-800 text-[#ccff00] font-bold'
                : 'text-zinc-300 hover:bg-zinc-800/60'
            }`}
          >
            My Plan (Log)
          </button>

          <div className="pt-2 border-t border-zinc-800 flex items-center gap-2">
            <button
              onClick={() => handleLinkClick('/my-plan', 'tab=today')}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-[#ccff00] text-black font-bold text-xs uppercase"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Today's Plan ({planCount})</span>
            </button>
            <button
              onClick={() => handleLinkClick('/my-plan', 'tab=saved')}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-200 font-semibold text-xs uppercase"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Saved ({savedCount})</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
