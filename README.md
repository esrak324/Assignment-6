# FitLog — Workout Library & Gym Companion

> **"TRAIN WITH INTENT. LOG EVERY SET."**  
> FitLog is a dark, no-nonsense gym companion web application built to help lifters browse compound and isolation movements, lock lifts into today's training plan, track calorie & time metrics live, and keep a clean workout log with zero fluff.

---

## ⚡ Live Demo & Repository

- **Live Application**: [https://ais-dev-jnrygjwyo7ebqbdwvxfszk-864228365094.asia-southeast1.run.app](https://ais-dev-jnrygjwyo7ebqbdwvxfszk-864228365094.asia-southeast1.run.app)
- **GitHub Repository**: [https://github.com/ProgrammingHero1/B14-A6-Fit-Log.git](https://github.com/ProgrammingHero1/B14-A6-Fit-Log.git)

---

## 🛠️ Technologies Used

- **React 19 & TypeScript**: Component-driven architecture with rigorous type safety for workouts, plans, and metrics.
- **Vite 6**: Ultra-fast frontend tooling and bundle optimization.
- **Tailwind CSS v4**: Athletic high-contrast dark theme with custom `@theme` configuration, Oswald display typography, and volt accent palette (`#ccff00`).
- **Lucide React**: Crisp iconography for gym equipment, metrics, ratings, and navigation affordances.
- **Cloudflare Workers API**: REST API endpoints for workout retrieval with resilient multi-tier fallback architecture.
- **Web Storage API (`localStorage`)**: Persistent client-side state for today's plan, completed sets, and saved workouts across browser refreshes.

---

## 🚀 Key Features

### 1. Dynamic Workout Library & Responsive 3x4 Grid
- Fetches 12 core lifts covering every major muscle group (Chest, Arms, Back, Legs, Shoulders, Core, Full Body).
- Responsive grid (1-column on mobile, 2-column on tablet, 3-column on desktop).
- Each card highlights category tag pills, workout title, equipment requirements, and a stats row (duration in minutes, calories burned in kcal, and community rating).
- Loading skeleton animations while exercise data is retrieved.

### 2. Live Navbar Status Counters (Plan & Saved Badges)
- Prominent status badges in the top navigation:
  - **Plan Badge**: Filled pill with `#ccff00` accent background displaying the active plan count.
  - **Saved Badge**: Outlined border pill displaying the saved workout count.
- Direct quick-links into the respective tabs on `/my-plan`.
- Responsive navigation for mobile and desktop viewports.

### 3. Comprehensive Workout Details Page
- Two-column responsive layout with high-resolution visual showcase.
- Full specifications panel featuring Equipment, Difficulty level, Sets, Reps, Duration, and Calories burned.
- Step-by-step numbered execution guide (4 ordered steps).
- Primary **"Add to today's plan"** action with real-time toast feedback and 5-lift cap validation.
- Secondary **"Save for later"** bookmarking action.

### 4. Interactive Daily Log (`/my-plan`) with Real-time Telemetry
- **Dynamic Metrics Summary**: Three live stat cards tracking Total Exercises, Total Minutes, and Estimated Calories Burned, recalculating in real-time as lifts are added, removed, or completed.
- **Strict 5-Lift Daily Cap**: Enforces workout quality and prevents overtraining by notifying and preventing more than 5 lifts per daily plan.
- **Today's Plan / Saved Workouts Tabs**: Segmented switch between the active session and bookmarked lifts.
- Empty states featuring contextual calls-to-action to easily jump back to the library.

### 5. Challenge Requirements (C1, C2, C3)
- **C1: Real-time Multi-Criteria Sorting Dropdown**: Sort library exercises dynamically by **Duration**, **Calories Burned**, **Rating**, or **Alphabetical Name**, with ascending/descending toggle.
- **C2: Full Documentation**: Comprehensive README with project architecture and features.
- **C3: "Mark as Done" & Remove Handlers**:
  - Check-off lifts with the **"Mark as Done"** button, triggering strikethrough styling and a celebratory toast notification.
  - Quick **Remove (X)** action to discard lifts from the active plan or saved list with toast feedback.
- **Search & Filter**: Instant muscle-group filtering buttons plus live text search by exercise name, target muscle, or equipment.
- **404 Handling**: Dedicated custom 404 page for invalid or unknown routes with a quick return button.

---

## 📡 API Endpoints

- **Primary API**: `https://api.abcz.workers.dev/api/fitlog`
- **Single Workout**: `https://api.abcz.workers.dev/api/fitlog/:id`
- **Alternative API**: `https://api.api-store.workers.dev/api/fitlog`
- **Alternative Single Workout**: `https://api.api-store.workers.dev/api/fitlog/:id`

---

## 💻 Local Setup & Development

```bash
# Clone the repository
git clone https://github.com/ProgrammingHero1/B14-A6-Fit-Log.git

# Navigate into project directory
cd B14-A6-Fit-Log

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to interact with FitLog.

---

## 📝 License

Distributed under the MIT License. Built for Programming Hero Batch 14 Assignment 6.
