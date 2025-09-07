# 📖 Frontend Reviews Dashboard

A React-based frontend for displaying standardized reviews from multiple data sources (e.g., Hostaway, Google Places). The app consumes a normalized API so that reviews from different platforms can be compared side by side.

<br>
<br>

---

## 🚀 Features

- Unified view of reviews across multiple providers
- Normalized rating scale (0.0–1.0) for easy comparison
- View property performance
- Search and filter by reviewType, status , channel or date
- Responsive design for mobile & desktop

<br>
<br>

---

## 🛠️ Tech Stack

- React (with TypeScript)
- Vite (fast dev/build tool)
- TailwindCSS (styling)
- Axios (API calls)
- React Query / TanStack Query (data fetching & caching)
- Recharts (for visualization, e.g., rating breakdowns)

<br>
<br>

---

## ⚙️ Getting Started

1.  Clone the repo
    git clone https://github.com/your-username/reviews-frontend.git
    cd reviews-frontend

2.  Install dependencies
    npm install

3.  Setup environment variables

        Create a .env file in the project root:

        VITE_API_BASE_URL=https://theflexassessmentbackend-production.up.railway.app/api

4.  Run the app
    npm run dev

5.  Build for production
    npm run build

<br>
<br>

---

## 🌐 API Contract

The frontend expects the backend to expose endpoints like:

Get all reviews

- GET /api/reviews
- GET /api/properties
- GET /api/properties/admin
