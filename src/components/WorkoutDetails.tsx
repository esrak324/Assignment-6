import React, { useState } from 'react';
import {
  ArrowLeft,
  CalendarPlus,
  Bookmark,
  Check,
  Dumbbell,
  Clock,
  Flame,
  Star,
  Activity,
  Layers,
  Repeat
} from 'lucide-react';
import { Workout } from '../types/workout';
import { useWorkout } from '../context/WorkoutContext';

interface WorkoutDetailsProps {
  workout: Workout;
  onBack: () => void;
  onNavigateToPlan: (tab?: string) => void;
}

export const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({
  workout,
  onBack,
  onNavigateToPlan,
}) => {
  const [imageError, setImageError] = useState(false);
  const {
    addToTodayPlan,
    saveForLater,
    isInTodayPlan,
    isSaved,
    planCount,
  } = useWorkout();

  const isPlanned = isInTodayPlan(workout.id);
  const isWorkoutSaved = isSaved(workout.id);
  const isCapReached = planCount >= 5 && !isPlanned;

  const handleAddPlan = () => {
    const success = addToTodayPlan(workout);
    if (success) {
      // toast is dispatched inside context
    }
  };

  const handleSaveLater = () => {
    saveForLater(workout);
  };

  return (
    <div className="py-8 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      
      {/* Back button and breadcrumb */}
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-400 hover:text-white group px-3 py-2 rounded-lg hover:bg-zinc-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#ccff00] group-hover:-translate-x-1 transition-transform" />
          <span>Back to Library</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-zinc-500 font-mono">
          <span>EXERCISE #{workout.id.toString().padStart(2, '0')}</span>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Visual / Media (large image / illustration fills column) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="relative rounded-3xl overflow-hidden border border-zinc-800 bg-[#121418] shadow-2xl">
            {!imageError ? (
              <img
                src={workout.image}
                alt={workout.name}
                referrerPolicy="no-referrer"
                onError={() => setImageError(true)}
                className="w-full aspect-square sm:aspect-[4/3] lg:aspect-[4/4.2] object-cover object-center"
              />
            ) : (
              <div className="w-full aspect-square bg-zinc-900 flex flex-col items-center justify-center p-8 text-zinc-500">
                <Dumbbell className="w-16 h-16 text-zinc-700 mb-3" />
                <span className="font-display text-xl text-white uppercase">{workout.name}</span>
              </div>
            )}

            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e1013] via-transparent to-transparent opacity-80 pointer-events-none" />

            {/* Difficulty and Rating Pill Badges on image */}
            <div className="absolute top-4 left-4 flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/75 backdrop-blur-md text-white border border-zinc-700/80">
                {workout.difficulty}
              </span>
            </div>

            <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-black/75 backdrop-blur-md text-amber-400 border border-zinc-700/80">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-mono text-white">{workout.rating.toFixed(1)}</span>
            </div>

            {/* Bottom floating summary pill inside visual container */}
            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-zinc-950/85 backdrop-blur-md border border-zinc-800/90 flex items-center justify-between text-xs">
              <div className="flex items-center gap-4 text-zinc-300">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#ccff00]" />
                  <span>{workout.duration} min</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame className="w-4 h-4 text-orange-400" />
                  <span>{workout.caloriesBurned} kcal</span>
                </div>
              </div>

              {isPlanned && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#ccff00]/15 border border-[#ccff00]/40 text-[#ccff00] text-[11px] font-bold uppercase tracking-wider">
                  <Check className="w-3 h-3 stroke-[3]" />
                  <span>In Today's Plan</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right Side: Sections */}
        <div className="lg:col-span-6 space-y-7">
          
          {/* Header & Description */}
          <div className="space-y-3">
            {/* Category Tags */}
            <div className="flex flex-wrap gap-2">
              {workout.muscleGroups.map((group) => (
                <span
                  key={group}
                  className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider bg-zinc-900 text-[#ccff00] border border-zinc-700/80"
                >
                  {group}
                </span>
              ))}
            </div>

            {/* Title (e.g. BARBELL BENCH PRESS) */}
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-[1.05]">
              {workout.name}
            </h1>

            {/* Subtitle / Description */}
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {workout.description}
            </p>
          </div>

          {/* Key Specs Table/Panel with label + value rows */}
          <div className="rounded-2xl border border-zinc-800 bg-[#14161b] p-5 sm:p-6 space-y-3 shadow-lg">
            <div className="text-xs font-bold uppercase tracking-widest text-[#ccff00] flex items-center gap-2">
              <Activity className="w-3.5 h-3.5" />
              <span>KEY WORKOUT SPECIFICATIONS</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">EQUIPMENT</div>
                <div className="font-semibold text-white text-xs sm:text-sm mt-0.5 truncate" title={workout.equipment}>
                  {workout.equipment}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">DIFFICULTY</div>
                <div className="font-semibold text-white text-xs sm:text-sm mt-0.5">
                  {workout.difficulty}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">SETS</div>
                <div className="font-semibold text-white text-xs sm:text-sm mt-0.5 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-mono">{workout.sets} sets</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">REPS</div>
                <div className="font-semibold text-white text-xs sm:text-sm mt-0.5 flex items-center gap-1">
                  <Repeat className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-mono">{workout.reps}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">DURATION</div>
                <div className="font-semibold text-white text-xs sm:text-sm mt-0.5 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-mono">{workout.duration} min</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800">
                <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">CALORIES</div>
                <div className="font-semibold text-white text-xs sm:text-sm mt-0.5 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span className="font-mono">{workout.caloriesBurned} kcal</span>
                </div>
              </div>
            </div>
          </div>

          {/* INSTRUCTIONS Section: Ordered list of 4 steps (number + text) */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-lg uppercase tracking-wide text-white flex items-center gap-2">
              <span>EXECUTION INSTRUCTIONS</span>
              <span className="text-xs font-mono text-zinc-500 font-normal">({workout.instructions.length} steps)</span>
            </h3>

            <ol className="space-y-2.5">
              {workout.instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-3.5 p-3.5 rounded-xl bg-[#14161b] border border-zinc-800/80 hover:border-zinc-700/80 transition-colors"
                >
                  <span className="w-6 h-6 rounded-md bg-zinc-900 border border-zinc-700 flex items-center justify-center text-xs font-mono font-bold text-[#ccff00] shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Call-to-action buttons */}
          <div className="pt-2 space-y-3">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              
              {/* Primary button: "Add to today's plan" (with icon) */}
              <button
                onClick={handleAddPlan}
                disabled={isPlanned || isCapReached}
                className={`flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg ${
                  isPlanned
                    ? 'bg-zinc-800 text-zinc-400 cursor-not-allowed border border-zinc-700'
                    : isCapReached
                    ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed border border-zinc-700'
                    : 'bg-[#ccff00] text-black hover:bg-[#bbf000] active:scale-[0.98] shadow-[0_4px_20px_rgba(204,255,0,0.25)]'
                }`}
              >
                {isPlanned ? (
                  <>
                    <Check className="w-4 h-4 stroke-[3]" />
                    <span>In Today's Plan</span>
                  </>
                ) : (
                  <>
                    <CalendarPlus className="w-4 h-4 stroke-[2.5]" />
                    <span>Add to today's plan</span>
                  </>
                )}
              </button>

              {/* Secondary button: "Save for later" (with icon) */}
              <button
                onClick={handleSaveLater}
                className={`flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl border text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all ${
                  isWorkoutSaved
                    ? 'border-zinc-700 bg-zinc-800/80 text-zinc-400'
                    : 'border-zinc-700 hover:border-zinc-500 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isWorkoutSaved ? 'fill-current text-[#ccff00]' : ''}`} />
                <span>{isWorkoutSaved ? 'Saved in list' : 'Save for later'}</span>
              </button>

            </div>

            {/* Cap warning if limit reached */}
            {isCapReached && !isPlanned && (
              <p className="text-xs text-amber-400 font-medium">
                Today's plan is capped at 5 lifts. Complete or remove a lift in{' '}
                <button
                  onClick={() => onNavigateToPlan('today')}
                  className="underline font-bold hover:text-white"
                >
                  My Plan
                </button>{' '}
                to load more.
              </p>
            )}

            {isPlanned && (
              <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
                <span>Already in your active workout session.</span>
                <button
                  onClick={() => onNavigateToPlan('today')}
                  className="text-[#ccff00] font-bold hover:underline"
                >
                  View in My Plan &rarr;
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
