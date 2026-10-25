import React, { useState } from 'react';
import { ChevronDown, ArrowDownRight, Flame, Shield, Trophy } from 'lucide-react';
import heroImage from '../assets/images/fitlog_hero_athlete_1792940514852.jpg';

export const Hero: React.FC = () => {
  const [imageError, setImageError] = useState(false);

  const handleScrollToLibrary = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('library');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-zinc-800/80 bg-gradient-to-b from-[#111317] via-[#0e1013] to-[#0e1013]">
      {/* Background atmospheric grid / glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f222b15_1px,transparent_1px),linear-gradient(to_bottom,#1f222b15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#ccff00]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900/90 border border-zinc-700/60 text-[#ccff00] text-xs font-bold tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ccff00] animate-pulse" />
              <span>WORKOUT LIBRARY</span>
            </div>

            {/* Main Heading (uppercase, bold display font Oswald) */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[0.95] tracking-tight text-white uppercase text-balance">
              TRAIN WITH INTENT.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ccff00] via-[#ddff44] to-white">
                LOG EVERY SET.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-zinc-400 text-base sm:text-lg max-w-2xl leading-relaxed">
              FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today's plan, and watch the week's work add up.
            </p>

            {/* Primary CTA button with icon */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#library"
                onClick={handleScrollToLibrary}
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-sm uppercase tracking-wider hover:bg-[#bbf000] active:scale-[0.98] transition-all shadow-[0_4px_24px_rgba(204,255,0,0.22)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00]"
              >
                <span>BROWSE WORKOUTS</span>
                <ChevronDown className="w-4 h-4 stroke-[3] animate-bounce" />
              </a>

              <a
                href="#library"
                onClick={handleScrollToLibrary}
                className="hidden sm:inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-zinc-400 hover:text-white transition-colors py-3"
              >
                <span>12 COMPOUND & ISOLATION LIFTS</span>
                <ArrowDownRight className="w-4 h-4 text-[#ccff00]" />
              </a>
            </div>

            {/* Value Highlights */}
            <div className="pt-6 border-t border-zinc-800/80 grid grid-cols-3 gap-4 max-w-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold uppercase">
                  <Shield className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Targeted</span>
                </div>
                <div className="font-display text-xl font-bold text-white">12 LIFTS</div>
                <div className="text-[11px] text-zinc-500">Every muscle group</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold uppercase">
                  <Flame className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Daily Cap</span>
                </div>
                <div className="font-display text-xl font-bold text-white">5 EXERCISES</div>
                <div className="text-[11px] text-zinc-500">Focus on quality</div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-1.5 text-zinc-400 text-xs font-semibold uppercase">
                  <Trophy className="w-3.5 h-3.5 text-[#ccff00]" />
                  <span>Telemetry</span>
                </div>
                <div className="font-display text-xl font-bold text-white">LIVE STATS</div>
                <div className="text-[11px] text-zinc-500">Minutes & Calories</div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Image with athletic border and lighting */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-zinc-700/70 bg-zinc-900 shadow-2xl group">
              
              {!imageError ? (
                <img
                  src={heroImage}
                  alt="FitLog athlete lifting barbell in dark gym"
                  referrerPolicy="no-referrer"
                  onError={() => setImageError(true)}
                  className="w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3] object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />
              ) : (
                <div className="w-full aspect-[4/3] bg-zinc-900 flex flex-col items-center justify-center p-8 text-center border border-zinc-800">
                  <Flame className="w-12 h-12 text-[#ccff00] mb-3" />
                  <span className="font-display text-xl font-bold text-white uppercase">TRAIN WITH INTENT</span>
                  <span className="text-xs text-zinc-500 mt-1">High Intensity Strength Training</span>
                </div>
              )}

              {/* Gradient scrim for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e1013] via-transparent to-transparent opacity-80 pointer-events-none" />

              {/* Floating Live Badge inside image */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between p-3.5 rounded-xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-[#ccff00] animate-ping" />
                  <div>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">TODAY'S WORKOUT GOAL</div>
                    <div className="text-[11px] text-zinc-400">Lock in your compound movement first</div>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#ccff00] bg-zinc-900 px-2 py-1 rounded border border-zinc-700">
                  5/5 CAP
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
