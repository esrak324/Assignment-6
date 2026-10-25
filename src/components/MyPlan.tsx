import React, { useState } from 'react';
import {
  Calendar,
  Bookmark,
  CheckCircle2,
  Trash2,
  ExternalLink,
  Flame,
  Clock,
  Star,
  Plus,
  Dumbbell,
  ArrowRight,
  Activity,
  Layers,
  Sparkles
} from 'lucide-react';
import { useWorkout } from '../context/WorkoutContext';
import { PlannedWorkout, SavedWorkout } from '../types/workout';

interface MyPlanProps {
  initialTab?: 'today' | 'saved';
  onNavigateToWorkout: (id: number) => void;
  onNavigateToLibrary: () => void;
}

export const MyPlan: React.FC<MyPlanProps> = ({
  initialTab = 'today',
  onNavigateToWorkout,
  onNavigateToLibrary,
}) => {
  const [activeTab, setActiveTab] = useState<'today' | 'saved'>(initialTab);
  const {
    todayPlan,
    savedWorkouts,
    planCount,
    savedCount,
    metrics,
    removeFromTodayPlan,
    toggleWorkoutCompleted,
    removeFromSaved,
    moveToTodayPlan,
    clearCompletedFromPlan,
  } = useWorkout();

  return (
    <div className="py-8 lg:py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 animate-in fade-in duration-200">
      
      {/* Title & Subtitle */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ccff00]">
          <span className="w-2 h-0.5 bg-[#ccff00]" />
          <span>DAILY WORKOUT LOG</span>
        </div>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl uppercase tracking-tight text-white">
          MY PLAN
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row (3 stat cards): Exercises, Minutes, Calories */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        
        {/* Stat Card 1: Exercises */}
        <div className="rounded-2xl border border-zinc-800 bg-[#14161b] p-5 lg:p-6 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">EXERCISES</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display font-black text-4xl lg:text-5xl text-white font-mono">
              {metrics.exercises}
            </span>
            <span className="text-xs text-zinc-500 font-semibold font-mono">
              / 5 CAP
            </span>
          </div>
          <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-400">
            <span>{metrics.completed} of {metrics.exercises} completed</span>
            {metrics.exercises > 0 && (
              <span className="text-[#ccff00] font-mono font-bold">
                {Math.round((metrics.completed / (metrics.exercises || 1)) * 100)}%
              </span>
            )}
          </div>
          {/* Progress bar line */}
          <div className="mt-2.5 w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#ccff00] transition-all duration-300"
              style={{
                width: `${Math.min(100, (metrics.exercises / 5) * 100)}%`,
              }}
            />
          </div>
        </div>

        {/* Stat Card 2: Minutes */}
        <div className="rounded-2xl border border-zinc-800 bg-[#14161b] p-5 lg:p-6 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">TOTAL MINUTES</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-cyan-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display font-black text-4xl lg:text-5xl text-white font-mono">
              {metrics.minutes}
            </span>
            <span className="text-xs text-zinc-500 font-semibold">MINUTES</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Estimated time under gym tension
          </div>
        </div>

        {/* Stat Card 3: Calories */}
        <div className="rounded-2xl border border-zinc-800 bg-[#14161b] p-5 lg:p-6 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between text-zinc-400">
            <span className="text-xs font-bold uppercase tracking-wider">ESTIMATED CALORIES</span>
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-display font-black text-4xl lg:text-5xl text-white font-mono">
              {metrics.calories}
            </span>
            <span className="text-xs text-zinc-500 font-semibold">KCAL</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Energy output based on sets & reps
          </div>
        </div>

      </div>

      {/* Tabs Row: Today's Plan / Saved */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
        <div className="flex items-center gap-2 p-1 bg-[#121418] border border-zinc-800 rounded-xl w-fit">
          <button
            onClick={() => setActiveTab('today')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'today'
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Today's Plan</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'today'
                  ? 'bg-black text-[#ccff00]'
                  : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              {planCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
              activeTab === 'saved'
                ? 'bg-[#ccff00] text-black shadow-md'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span>Saved Lifts</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono ${
                activeTab === 'saved'
                  ? 'bg-black text-[#ccff00]'
                  : 'bg-zinc-800 text-zinc-300'
              }`}
            >
              {savedCount}
            </span>
          </button>
        </div>

        {/* Tab contextual controls */}
        {activeTab === 'today' && todayPlan.length > 0 && (
          <div className="flex items-center gap-3">
            {metrics.completed > 0 && (
              <button
                onClick={clearCompletedFromPlan}
                className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                Clear finished ({metrics.completed})
              </button>
            )}
            <span className="text-xs text-zinc-500 font-mono">
              Slots: {todayPlan.length}/5 used
            </span>
          </div>
        )}
      </div>

      {/* Tab 1 Content: Today's Plan */}
      {activeTab === 'today' && (
        <div className="space-y-4">
          {todayPlan.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {todayPlan.map((plannedWorkout) => (
                <PlanWorkoutRow
                  key={plannedWorkout.id}
                  workout={plannedWorkout}
                  onViewDetails={() => onNavigateToWorkout(plannedWorkout.id)}
                  onToggleDone={() => toggleWorkoutCompleted(plannedWorkout.id)}
                  onRemove={() => removeFromTodayPlan(plannedWorkout.id)}
                />
              ))}
            </div>
          ) : (
            /* Empty State for Today's Plan */
            <EmptyPlanState onGoToWorkouts={onNavigateToLibrary} />
          )}
        </div>
      )}

      {/* Tab 2 Content: Saved Workouts */}
      {activeTab === 'saved' && (
        <div className="space-y-4">
          {savedWorkouts.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {savedWorkouts.map((savedWorkout) => (
                <SavedWorkoutRow
                  key={savedWorkout.id}
                  workout={savedWorkout}
                  onViewDetails={() => onNavigateToWorkout(savedWorkout.id)}
                  onMoveToPlan={() => moveToTodayPlan(savedWorkout)}
                  onRemove={() => removeFromSaved(savedWorkout.id)}
                />
              ))}
            </div>
          ) : (
            /* Empty State for Saved List */
            <div className="py-20 text-center rounded-3xl border border-zinc-800 bg-[#121418] p-8 max-w-xl mx-auto space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 mx-auto">
                <Bookmark className="w-6 h-6" />
              </div>
              <h3 className="font-display font-bold text-2xl uppercase text-white">
                NO SAVED WORKOUTS
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Bookmark lifts from the library or details page to train them later.
              </p>
              <button
                onClick={onNavigateToLibrary}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>Browse All Lifts</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

/* Individual Planned Workout Card Row */
interface PlanWorkoutRowProps {
  workout: PlannedWorkout;
  onViewDetails: () => void;
  onToggleDone: () => void;
  onRemove: () => void;
}

const PlanWorkoutRow: React.FC<PlanWorkoutRowProps> = ({
  workout,
  onViewDetails,
  onToggleDone,
  onRemove,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 ${
        workout.completed
          ? 'bg-[#101216]/80 border-zinc-800/60 opacity-80'
          : 'bg-[#15171c] hover:bg-[#181a21] border-zinc-800 shadow-md'
      }`}
    >
      {/* Left: Thumbnail & Core Info */}
      <div className="flex items-center gap-4 min-w-0">
        
        {/* Thumbnail */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0 relative">
          {!imgError ? (
            <img
              src={workout.image}
              alt={workout.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className={`w-full h-full object-cover ${workout.completed ? 'grayscale contrast-125' : ''}`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">
              <Dumbbell className="w-6 h-6" />
            </div>
          )}
          {workout.completed && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-[#ccff00]" />
            </div>
          )}
        </div>

        {/* Text Info */}
        <div className="min-w-0 space-y-1">
          <div className="flex items-center gap-2">
            <h3
              className={`font-display font-bold text-lg sm:text-xl uppercase tracking-wide truncate ${
                workout.completed ? 'line-through text-zinc-500' : 'text-white'
              }`}
            >
              {workout.name}
            </h3>
            {workout.completed && (
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-[#ccff00]/15 text-[#ccff00] border border-[#ccff00]/30 shrink-0">
                DONE
              </span>
            )}
          </div>

          <p className="text-xs text-zinc-400 flex items-center gap-1.5 truncate">
            <span className="text-zinc-500 font-medium">Equipment:</span>
            <span className="text-zinc-300 font-medium">{workout.equipment}</span>
          </p>

          {/* Stats row with duration / calories / rating */}
          <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-zinc-500" />
              <span>{workout.duration}m</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{workout.caloriesBurned} kcal</span>
            </div>
            <span>·</span>
            <div className="flex items-center gap-1 font-mono">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{workout.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

      </div>

      {/* Right: Action Buttons (View Details, Mark as Done, Remove X) */}
      <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/80 shrink-0 justify-end">
        
        {/* View Details button */}
        <button
          onClick={onViewDetails}
          className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
          title="Open workout specs"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        {/* Mark as Done button (Challenge C3) */}
        <button
          onClick={onToggleDone}
          className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all ${
            workout.completed
              ? 'bg-zinc-800 text-zinc-400 border border-zinc-700 hover:bg-zinc-700'
              : 'bg-[#ccff00] text-black hover:bg-[#bbf000] shadow-[0_2px_10px_rgba(204,255,0,0.2)]'
          }`}
          title={workout.completed ? 'Mark as incomplete' : 'Mark as completed'}
        >
          <CheckCircle2 className="w-3.5 h-3.5 stroke-[2.5]" />
          <span>{workout.completed ? 'Finished' : 'Mark Done'}</span>
        </button>

        {/* Remove (X) button */}
        <button
          onClick={onRemove}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 border border-zinc-800 hover:border-rose-800/60 text-zinc-400 hover:text-rose-400 transition-colors"
          title="Remove from plan"
          aria-label={`Remove ${workout.name} from plan`}
        >
          <Trash2 className="w-4 h-4" />
        </button>

      </div>
    </div>
  );
};

/* Individual Saved Workout Row */
interface SavedWorkoutRowProps {
  workout: SavedWorkout;
  onViewDetails: () => void;
  onMoveToPlan: () => void;
  onRemove: () => void;
}

const SavedWorkoutRow: React.FC<SavedWorkoutRowProps> = ({
  workout,
  onViewDetails,
  onMoveToPlan,
  onRemove,
}) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-800 bg-[#15171c] hover:bg-[#181a21] p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all duration-200 shadow-md">
      {/* Left: Thumbnail & Details */}
      <div className="flex items-center gap-4 min-w-0">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 shrink-0">
          {!imgError ? (
            <img
              src={workout.image}
              alt={workout.name}
              referrerPolicy="no-referrer"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-zinc-600">
              <Dumbbell className="w-6 h-6" />
            </div>
          )}
        </div>

        <div className="min-w-0 space-y-1">
          <h3 className="font-display font-bold text-lg sm:text-xl uppercase tracking-wide text-white truncate">
            {workout.name}
          </h3>

          <p className="text-xs text-zinc-400 flex items-center gap-1.5 truncate">
            <span className="text-zinc-500 font-medium">Equipment:</span>
            <span className="text-zinc-300 font-medium">{workout.equipment}</span>
          </p>

          <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1">
            <span>{workout.duration}m</span>
            <span>·</span>
            <span>{workout.caloriesBurned} kcal</span>
            <span>·</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {workout.rating.toFixed(1)}
            </span>
          </div>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-zinc-800/80 shrink-0 justify-end">
        <button
          onClick={onViewDetails}
          className="px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-300 hover:text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Details</span>
        </button>

        <button
          onClick={onMoveToPlan}
          className="px-3.5 py-2 rounded-xl bg-[#ccff00] text-black hover:bg-[#bbf000] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-[0_2px_10px_rgba(204,255,0,0.2)]"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span>Add to Today</span>
        </button>

        <button
          onClick={onRemove}
          className="p-2 rounded-xl bg-zinc-900 hover:bg-rose-950/40 border border-zinc-800 hover:border-rose-800/60 text-zinc-400 hover:text-rose-400 transition-colors"
          title="Remove from saved"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

/* Empty State component matching the requirement */
const EmptyPlanState: React.FC<{ onGoToWorkouts: () => void }> = ({
  onGoToWorkouts,
}) => {
  return (
    <div className="py-20 text-center rounded-3xl border border-zinc-800 bg-[#121418] p-8 max-w-xl mx-auto space-y-4">
      <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ccff00] mx-auto shadow-inner">
        <Activity className="w-6 h-6" />
      </div>
      
      <h3 className="font-display font-extrabold text-2xl sm:text-3xl uppercase tracking-tight text-white">
        NOTHING HERE YET
      </h3>
      
      <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto">
        Browse the library and add a lift to get today moving.
      </p>

      <div className="pt-2">
        <button
          onClick={onGoToWorkouts}
          className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:bg-[#bbf000] active:scale-[0.98] transition-all shadow-[0_4px_18px_rgba(204,255,0,0.2)]"
        >
          <span>Go to workouts</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
