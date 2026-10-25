import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Workout, PlannedWorkout, SavedWorkout, ToastItem, ToastType } from '../types/workout';

interface WorkoutContextType {
  todayPlan: PlannedWorkout[];
  savedWorkouts: SavedWorkout[];
  toasts: ToastItem[];
  planCount: number;
  savedCount: number;
  metrics: {
    exercises: number;
    minutes: number;
    calories: number;
    completed: number;
  };
  addToTodayPlan: (workout: Workout) => boolean;
  removeFromTodayPlan: (workoutId: number) => void;
  toggleWorkoutCompleted: (workoutId: number) => void;
  saveForLater: (workout: Workout) => boolean;
  removeFromSaved: (workoutId: number) => void;
  moveToTodayPlan: (workout: Workout) => boolean;
  isInTodayPlan: (workoutId: number) => boolean;
  isSaved: (workoutId: number) => boolean;
  addToast: (message: string, type?: ToastType) => void;
  dismissToast: (id: string) => void;
  clearCompletedFromPlan: () => void;
}

const WorkoutContext = createContext<WorkoutContextType | undefined>(undefined);

const STORAGE_KEYS = {
  PLAN: 'fitlog_today_plan_v1',
  SAVED: 'fitlog_saved_workouts_v1',
};

const MAX_DAILY_LIFTS = 5;

export const WorkoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState<PlannedWorkout[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PLAN);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.SAVED);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(todayPlan));
    } catch (e) {
      console.warn('Failed to save todayPlan to localStorage', e);
    }
  }, [todayPlan]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedWorkouts));
    } catch (e) {
      console.warn('Failed to save savedWorkouts to localStorage', e);
    }
  }, [savedWorkouts]);

  const addToast = (message: string, type: ToastType = 'success') => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const isInTodayPlan = (workoutId: number) => {
    return todayPlan.some((item) => item.id === workoutId);
  };

  const isSaved = (workoutId: number) => {
    return savedWorkouts.some((item) => item.id === workoutId);
  };

  const addToTodayPlan = (workout: Workout): boolean => {
    if (isInTodayPlan(workout.id)) {
      addToast(`"${workout.name}" is already in Today's Plan.`, 'info');
      return false;
    }

    if (todayPlan.length >= MAX_DAILY_LIFTS) {
      addToast(
        `Daily cap reached: Maximum ${MAX_DAILY_LIFTS} lifts allowed in Today's Plan.`,
        'warning'
      );
      return false;
    }

    const newPlannedItem: PlannedWorkout = {
      ...workout,
      addedAt: Date.now(),
      completed: false,
    };

    setTodayPlan((prev) => [...prev, newPlannedItem]);
    addToast(`Added "${workout.name}" to today's plan!`, 'success');
    return true;
  };

  const removeFromTodayPlan = (workoutId: number) => {
    const target = todayPlan.find((item) => item.id === workoutId);
    setTodayPlan((prev) => prev.filter((item) => item.id !== workoutId));
    if (target) {
      addToast(`Removed "${target.name}" from today's plan.`, 'info');
    }
  };

  const toggleWorkoutCompleted = (workoutId: number) => {
    setTodayPlan((prev) =>
      prev.map((item) => {
        if (item.id === workoutId) {
          const nextState = !item.completed;
          addToast(
            nextState
              ? `Completed! "${item.name}" marked as done.`
              : `"${item.name}" marked as incomplete.`,
            nextState ? 'success' : 'info'
          );
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  const clearCompletedFromPlan = () => {
    const count = todayPlan.filter((w) => w.completed).length;
    if (count === 0) return;
    setTodayPlan((prev) => prev.filter((w) => !w.completed));
    addToast(`Cleared ${count} completed lift${count > 1 ? 's' : ''}!`, 'info');
  };

  const saveForLater = (workout: Workout): boolean => {
    if (isSaved(workout.id)) {
      addToast(`"${workout.name}" is already saved for later.`, 'info');
      return false;
    }

    const newSavedItem: SavedWorkout = {
      ...workout,
      savedAt: Date.now(),
    };

    setSavedWorkouts((prev) => [...prev, newSavedItem]);
    addToast(`Saved "${workout.name}" for later!`, 'success');
    return true;
  };

  const removeFromSaved = (workoutId: number) => {
    const target = savedWorkouts.find((item) => item.id === workoutId);
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== workoutId));
    if (target) {
      addToast(`Removed "${target.name}" from saved list.`, 'info');
    }
  };

  const moveToTodayPlan = (workout: Workout): boolean => {
    const added = addToTodayPlan(workout);
    if (added) {
      removeFromSaved(workout.id);
    }
    return added;
  };

  const metrics = {
    exercises: todayPlan.length,
    minutes: todayPlan.reduce((acc, curr) => acc + (curr.duration || 0), 0),
    calories: todayPlan.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0),
    completed: todayPlan.filter((w) => w.completed).length,
  };

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        toasts,
        planCount: todayPlan.length,
        savedCount: savedWorkouts.length,
        metrics,
        addToTodayPlan,
        removeFromTodayPlan,
        toggleWorkoutCompleted,
        saveForLater,
        removeFromSaved,
        moveToTodayPlan,
        isInTodayPlan,
        isSaved,
        addToast,
        dismissToast,
        clearCompletedFromPlan,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => {
  const context = useContext(WorkoutContext);
  if (!context) {
    throw new Error('useWorkout must be used within a WorkoutProvider');
  }
  return context;
};
