import React, { useState, useMemo } from 'react';
import { ChevronDown, Search, Filter, Loader2, ArrowUpDown, X } from 'lucide-react';
import { Workout, SortOption } from '../types/workout';
import { WorkoutCard } from './WorkoutCard';

interface LibraryProps {
  workouts: Workout[];
  isLoading: boolean;
  onSelectWorkout: (id: number) => void;
  onRefresh?: () => void;
}

export const Library: React.FC<LibraryProps> = ({
  workouts,
  isLoading,
  onSelectWorkout,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscle, setSelectedMuscle] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('duration');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // Extract all distinct muscle groups
  const muscleGroups = useMemo(() => {
    const set = new Set<string>();
    workouts.forEach((w) => {
      w.muscleGroups.forEach((m) => set.add(m));
    });
    return ['All', ...Array.from(set).sort()];
  }, [workouts]);

  // Filter and Sort workouts
  const filteredWorkouts = useMemo(() => {
    let list = [...workouts];

    // Filter by muscle group
    if (selectedMuscle !== 'All') {
      list = list.filter((w) =>
        w.muscleGroups.some((m) => m.toLowerCase() === selectedMuscle.toLowerCase())
      );
    }

    // Filter by search query (name or muscle or equipment)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (w) =>
          w.name.toLowerCase().includes(q) ||
          w.equipment.toLowerCase().includes(q) ||
          w.muscleGroups.some((m) => m.toLowerCase().includes(q))
      );
    }

    // Sort according to Challenge C1
    list.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'duration') {
        comparison = a.duration - b.duration;
      } else if (sortBy === 'calories') {
        comparison = a.caloriesBurned - b.caloriesBurned;
      } else if (sortBy === 'rating') {
        // usually higher rating is preferred first by default
        comparison = b.rating - a.rating;
      } else if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      }

      if (sortBy !== 'rating' && sortDirection === 'desc') {
        return -comparison;
      } else if (sortBy === 'rating' && sortDirection === 'asc') {
        return -comparison;
      }
      return comparison;
    });

    return list;
  }, [workouts, selectedMuscle, searchQuery, sortBy, sortDirection]);

  return (
    <section id="library" className="py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#ccff00] mb-1">
            <span className="w-2 h-0.5 bg-[#ccff00]" />
            <span>FULL EXERCISE CATALOG</span>
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white">
            THE LIBRARY
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base mt-1">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        {/* Challenge C1: Sort Dropdown & Order */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative inline-flex items-center">
            <label htmlFor="sort-select" className="sr-only">
              Sort Workouts By
            </label>
            <div className="flex items-center gap-2 bg-[#15171c] border border-zinc-700/80 rounded-xl px-3.5 py-2 text-xs text-zinc-300">
              <span className="text-zinc-500 font-medium">Sort By:</span>
              <select
                id="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer pr-4 appearance-none"
              >
                <option value="duration" className="bg-zinc-900 text-white">
                  Duration
                </option>
                <option value="calories" className="bg-zinc-900 text-white">
                  Calories
                </option>
                <option value="rating" className="bg-zinc-900 text-white">
                  Rating
                </option>
                <option value="name" className="bg-zinc-900 text-white">
                  Name (A-Z)
                </option>
              </select>
              <ChevronDown className="w-4 h-4 text-zinc-400 pointer-events-none -ml-3" />
            </div>
          </div>

          <button
            onClick={() => setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
            className="p-2.5 rounded-xl bg-[#15171c] border border-zinc-700/80 text-zinc-300 hover:text-white hover:border-zinc-500 transition-colors"
            title={`Current: ${sortDirection === 'asc' ? 'Ascending' : 'Descending'}. Click to toggle.`}
            aria-label="Toggle sort order"
          >
            <ArrowUpDown className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="py-6 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        
        {/* Muscle group category filter buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <Filter className="w-4 h-4 text-zinc-500 mr-1 shrink-0 hidden sm:block" />
          {muscleGroups.map((group) => {
            const isActive = selectedMuscle === group;
            return (
              <button
                key={group}
                onClick={() => setSelectedMuscle(group)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-[#ccff00] text-black shadow-sm font-bold'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {group}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px] md:w-72">
          <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lifts, muscle, barbell..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#ccff00] focus:ring-1 focus:ring-[#ccff00] transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

      </div>

      {/* Loading Skeleton State */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-4">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[#14161b] border border-zinc-800/80 p-5 space-y-4 animate-pulse"
            >
              <div className="aspect-[16/10] bg-zinc-800/60 rounded-xl" />
              <div className="flex gap-2">
                <div className="h-4 w-16 bg-zinc-800 rounded-full" />
                <div className="h-4 w-12 bg-zinc-800 rounded-full" />
              </div>
              <div className="h-6 w-3/4 bg-zinc-800 rounded" />
              <div className="h-4 w-1/2 bg-zinc-800/60 rounded" />
              <div className="h-8 w-full bg-zinc-800/40 rounded-lg pt-2" />
            </div>
          ))}
        </div>
      ) : filteredWorkouts.length > 0 ? (
        /* 3x4 Grid on large screens (responsive: 1 on mobile, 2 on tablet, 3 on desktop) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-2">
          {filteredWorkouts.map((workout) => (
            <WorkoutCard
              key={workout.id}
              workout={workout}
              onSelect={onSelectWorkout}
            />
          ))}
        </div>
      ) : (
        /* Empty Filter State */
        <div className="py-20 text-center rounded-2xl border border-zinc-800/80 bg-zinc-950/40 p-8">
          <Loader2 className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="font-display text-xl uppercase font-bold text-white">No lifts matched your filters</h3>
          <p className="text-zinc-400 text-sm mt-1 max-w-md mx-auto">
            Try resetting your search query or selecting "All" muscle groups to view the full 12 library lifts.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedMuscle('All');
            }}
            className="mt-4 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </section>
  );
};
