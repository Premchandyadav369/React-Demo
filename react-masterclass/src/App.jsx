// ==========================================
// 👉 CONCEPT: ReactJS Introduction & Fundamentals
// DEFINITION: React is a declarative, component-based library for building user interfaces. 
// Instead of reloading the browser page, React updates the Virtual DOM and efficiently 
// renders only the components that have changed.
// ==========================================

// ==========================================
// 👉 CONCEPT: React Routing (React Router DOM)
// DEFINITION: React Router enables "client-side routing". It turns a React app into a 
// Single Page Application (SPA). Instead of making a request to a server for a new HTML page,
// the router intercepts the URL change and swaps out the rendered React components instantly.
// ==========================================
import { BrowserRouter as Router, Routes, Route, NavLink, Link } from "react-router-dom";

import Dashboard from "./projects/1-StudentDashboard/Dashboard";
import Quiz from "./projects/2-QuizApp/Quiz";
import ExpenseTracker from "./projects/3-ExpenseTracker/ExpenseTracker";

// ==========================================
// 👉 CONCEPT: Types of Components (Root Component)
// DEFINITION: 'App' is the root component. It wraps the entire application logic, layout, 
// and routing configuration. Every other component is a child of this one.
// ==========================================
export default function App() {
  return (
    // <Router> (BrowserRouter) keeps your UI in sync with the URL.
    <Router>
      {/* 
        👉 CONCEPT: Templating using JSX
        DEFINITION: JSX looks like HTML but is actually JavaScript. 
        'className' is used instead of 'class' because 'class' is a reserved keyword in JS.
      */}
      <div className="app-wrapper">
        
        {/* --- TOP NAVIGATION BAR --- */}
        <nav className="navbar">
          {/* <Link> allows navigation without triggering a full page reload */}
          <Link to="/" className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            ReactMaster
          </Link>
          
          <div className="nav-links">
            {/* 
              👉 CONCEPT: NavLink vs Link
              DEFINITION: <NavLink> is a special version of <Link> that knows whether or not 
              it is "active". It automatically applies an class (default: "active") when 
              its 'to' prop matches the current URL, which we use for CSS highlighting.
            */}
            <NavLink to="/project-1" className="nav-item">Dashboard</NavLink>
            <NavLink to="/project-2" className="nav-item">Quiz App</NavLink>
            <NavLink to="/project-3" className="nav-item">Expense Tracker</NavLink>
          </div>
        </nav>

        {/* --- MAIN VIEWPORT --- */}
        {/* 
          👉 CONCEPT: Rendering (Dynamic Routing)
          DEFINITION: The <Routes> component looks through all its child <Route> elements 
          and renders the best match for the current URL location.
        */}
        <div className="content-area">
          <Routes>
            <Route path="/" element={<HomeGreeting />} />
            <Route path="/project-1" element={<Dashboard />} />
            <Route path="/project-2" element={<Quiz />} />
            <Route path="/project-3" element={<ExpenseTracker />} />
          </Routes>
        </div>

        <footer className="footer">
          <p>© {new Date().getFullYear()} React Masterclass. Built with Vite + React Router.</p>
        </footer>
      </div>
    </Router>
  );
}

// ==========================================
// 👉 CONCEPT: Components (Stateless Functional Component)
// DEFINITION: This component doesn't manage any State (no useState). It purely exists 
// to return JSX for the UI. This separation of concerns keeps the codebase clean.
// ==========================================
const HomeGreeting = () => (
  <div className="home-screen">
    <div className="hero-section">
      <div className="badge">Version 1.0</div>
      <h1>Mastering React Fundamentals</h1>
      <p>Explore three real-world enterprise applications designed to teach State, Props, Routing, and Component Lifecycles.</p>
    </div>

    {/* 
      👉 CONCEPT: CSS Grid Alignment
      Using display: grid ensures all these cards align perfectly regardless of screen size.
    */}
    <div className="project-grid">
      <Link to="/project-1" className="project-card">
        <div className="card-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
            <line x1="3" y1="9" x2="21" y2="9"></line>
            <line x1="9" y1="21" x2="9" y2="9"></line>
          </svg>
        </div>
        <div className="card-content">
          <h3>Smart Dashboard</h3>
          <p>Manage student attendance, calculate dynamic percentages, and filter records.</p>
          <div className="tech-stack">Teaches: <b>State & Lifecycles</b></div>
        </div>
      </Link>

      <Link to="/project-2" className="project-card">
        <div className="card-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </div>
        <div className="card-content">
          <h3>Assessment Module</h3>
          <p>Interactive single-page quiz with live scoring, conditional UI, and performance tracking.</p>
          <div className="tech-stack">Teaches: <b>Forms & Hooks</b></div>
        </div>
      </Link>

      <Link to="/project-3" className="project-card">
        <div className="card-icon-wrapper">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="1" x2="12" y2="23"></line>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
          </svg>
        </div>
        <div className="card-content">
          <h3>FinTrack Ledger</h3>
          <p>Track cash flow, categorize transactions, and persist data across browser reloads.</p>
          <div className="tech-stack">Teaches: <b>Data Flow & LocalStorage</b></div>
        </div>
      </Link>
    </div>
  </div>
);