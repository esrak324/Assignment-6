import React, { useState, useEffect, useCallback } from 'react';
import { WorkoutProvider } from './context/WorkoutContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Library } from './components/Library';
import { WorkoutDetails } from './components/WorkoutDetails';
import { MyPlan } from './components/MyPlan';
import { NotFound } from './components/NotFound';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { Workout } from './types/workout';
import { fetchAllWorkouts, fetchWorkoutById } from './services/api';

export default function App() {
  const [currentPath, setCurrentPath] = useState<string>(() => window.location.pathname || '/');
  const [searchParams, setSearchParams] = useState<string>(() => window.location.search);
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [isLoadingDetail, setIsLoadingDetail] = useState<boolean>(false);

  // Sync route navigation
  const navigate = useCallback((path: string, query?: string) => {
    const fullUrl = query ? `${path}?${query}` : path;
    window.history.pushState({}, '', fullUrl);
    setCurrentPath(path);
    setSearchParams(query ? `?${query}` : '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Listen to popstate for browser back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
      setSearchParams(window.location.search || '');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Load all workouts on initial load
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setIsLoading(true);
      try {
        const data = await fetchAllWorkouts();
        if (isMounted) {
          setWorkouts(data);
        }
      } catch (err) {
        console.error('Error fetching workouts in App:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Check if current route is a workout detail route: /workout/:id
  const workoutDetailMatch = currentPath.match(/^\/workout\/(\d+)$/);
  const workoutIdFromUrl = workoutDetailMatch ? parseInt(workoutDetailMatch[1], 10) : null;

  useEffect(() => {
    if (workoutIdFromUrl) {
      // Find in current workouts or fetch from API
      const existing = workouts.find((w) => w.id === workoutIdFromUrl);
      if (existing) {
        setSelectedWorkout(existing);
      } else {
        setIsLoadingDetail(true);
        fetchWorkoutById(workoutIdFromUrl)
          .then((data) => {
            setSelectedWorkout(data);
          })
          .catch((err) => {
            console.error('Failed to load workout details:', err);
            setSelectedWorkout(null);
          })
          .finally(() => {
            setIsLoadingDetail(false);
          });
      }
    } else {
      setSelectedWorkout(null);
    }
  }, [workoutIdFromUrl, workouts]);

  const handleSelectWorkout = (id: number) => {
    navigate(`/workout/${id}`);
  };

  const handleBackToLibrary = () => {
    navigate('/');
  };

  // Determine which page view to render
  const isHomePage = currentPath === '/' || currentPath === '';
  const isPlanPage = currentPath === '/my-plan';
  const isWorkoutDetailPage = Boolean(workoutIdFromUrl);

  const initialPlanTab = searchParams.includes('tab=saved') ? 'saved' : 'today';

  return (
    <WorkoutProvider>
      <div className="min-h-screen flex flex-col bg-[#0e1013] text-zinc-100 selection:bg-[#ccff00] selection:text-black">
        {/* Navigation Bar */}
        <Navbar currentPath={currentPath} onNavigate={navigate} />

        {/* Main Content Area */}
        <main className="flex-1">
          {isHomePage && (
            <>
              <Hero />
              <Library
                workouts={workouts}
                isLoading={isLoading}
                onSelectWorkout={handleSelectWorkout}
              />
            </>
          )}

          {isWorkoutDetailPage && (
            <>
              {isLoadingDetail ? (
                <div className="py-28 text-center">
                  <div className="w-10 h-10 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-zinc-400 font-mono text-sm">Loading workout specifications...</p>
                </div>
              ) : selectedWorkout ? (
                <WorkoutDetails
                  workout={selectedWorkout}
                  onBack={handleBackToLibrary}
                  onNavigateToPlan={(tab) => navigate('/my-plan', tab ? `tab=${tab}` : undefined)}
                />
              ) : (
                <NotFound onBackToHome={handleBackToLibrary} />
              )}
            </>
          )}

          {isPlanPage && (
            <MyPlan
              initialTab={initialPlanTab}
              onNavigateToWorkout={handleSelectWorkout}
              onNavigateToLibrary={() => navigate('/')}
            />
          )}

          {!isHomePage && !isWorkoutDetailPage && !isPlanPage && (
            <NotFound onBackToHome={() => navigate('/')} />
          )}
        </main>

        {/* Global Toast Notifications */}
        <ToastContainer />

        {/* Dark Athletic Footer */}
        <Footer />
      </div>
    </WorkoutProvider>
  );
}
