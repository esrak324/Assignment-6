import React, { useState } from 'react';
import { Clock, Flame, Star, Plus, Check, Dumbbell } from 'lucide-react';
import { Workout } from '../types/workout';
import { useWorkout } from '../context/WorkoutContext';

interface WorkoutCardProps {
  workout: Workout;
  onSelect: (id: number) => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const { isInTodayPlan, addToTodayPlan } = useWorkout();

  const isPlanned = isInTodayPlan(workout.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToTodayPlan(workout);
  };

  return (
    <div
      onClick={() => onSelect(workout.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(workout.id);
        }
      }}
      className="group flex flex-col justify-between rounded-2xl bg-[#14161b] hover:bg-[#181a21] border border-zinc-800/90 hover:border-zinc-700 transition-all duration-200 overflow-hidden text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ccff00] cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-1"
    >
      <div>
        {/* Top Media / Thumbnail */}
        <div className="relative aspect-[16/10] bg-zinc-900 overflow-hidden">
          {!imageError ? (
            <img
              src={workout.image}
              alt={workout.name}
              referrerPolicy="no-referrer"
              onError={() => setImageError(true)}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-900 text-zinc-600">
              <Dumbbell className="w-10 h-10 text-zinc-700 mb-2" />
              <span className="text-xs uppercase font-mono tracking-wider">{workout.name}</span>
            </div>
          )}

          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14161b] via-transparent to-transparent opacity-90 pointer-events-none" />

          {/* Quick Add Pill in Corner */}
          <button
            onClick={handleQuickAdd}
            aria-label={isPlanned ? 'Already in plan' : `Add ${workout.name} to plan`}
            className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all shadow-md ${
              isPlanned
                ? 'bg-[#ccff00] text-black ring-1 ring-black/10'
                : 'bg-black/60 text-white hover:bg-[#ccff00] hover:text-black hover:scale-110'
            }`}
            title={isPlanned ? 'In Plan' : 'Quick Add to Plan'}
          >
            {isPlanned ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
          </button>

          {/* Difficulty pill */}
          <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-zinc-300 border border-zinc-700/60">
            {workout.difficulty}
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          {/* Category Tag Pills (e.g. CHEST, ARMS) */}
          <div className="flex flex-wrap gap-1.5">
            {workout.muscleGroups.map((group) => (
              <span
                key={group}
                className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-zinc-800/90 text-[#ccff00] border border-zinc-700/50"
              >
                {group}
              </span>
            ))}
          </div>

          {/* Workout Name (Oswald display uppercase) */}
          <h3 className="font-display font-bold text-xl uppercase tracking-wide text-white group-hover:text-[#ccff00] transition-colors leading-tight">
            {workout.name}
          </h3>

          {/* Equipment line */}
          <p className="text-xs text-zinc-400 flex items-center gap-1.5">
            <span className="text-zinc-500 font-medium">EQUIPMENT:</span>
            <span className="text-zinc-300 font-semibold">{workout.equipment}</span>
          </p>
        </div>
      </div>

      {/* Stats Row with icons: duration (25 min), calories (180 kcal), rating (4.8) */}
      <div className="px-5 py-3.5 border-t border-zinc-800/80 bg-zinc-950/40 flex items-center justify-between text-xs text-zinc-400">
        
        {/* Duration */}
        <div className="flex items-center gap-1.5 font-medium" title="Duration">
          <Clock className="w-3.5 h-3.5 text-zinc-400" />
          <span>{workout.duration} min</span>
        </div>

        <span className="text-zinc-700">·</span>

        {/* Calories */}
        <div className="flex items-center gap-1.5 font-medium" title="Calories Burned">
          <Flame className="w-3.5 h-3.5 text-orange-400" />
          <span>{workout.caloriesBurned} kcal</span>
        </div>

        <span className="text-zinc-700">·</span>

        {/* Rating */}
        <div className="flex items-center gap-1.5 font-semibold text-zinc-200" title="Rating">
          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          <span className="font-mono">{workout.rating.toFixed(1)}</span>
        </div>

      </div>
    </div>
  );
};
