export interface Workout {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | string;
  duration: number; // in minutes
  caloriesBurned: number; // in kcal
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
}

export interface PlannedWorkout extends Workout {
  addedAt: number;
  completed: boolean;
}

export interface SavedWorkout extends Workout {
  savedAt: number;
}

export type ToastType = 'success' | 'info' | 'warning' | 'error';

export interface ToastItem {
  id: string;
  message: string;
  type: ToastType;
}

export type SortOption = 'duration' | 'calories' | 'rating' | 'name';
