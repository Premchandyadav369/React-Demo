// ==========================================
// 👉 CONCEPT: ReactJS Introduction & Fundamentals
// DEFINITION: React is a declarative, efficient, and flexible JavaScript library for building user interfaces.
// It lets you compose complex UIs from small and isolated pieces of code called "components".
// ==========================================

// 👉 CONCEPT: Introduction to Hooks
// DEFINITION: Hooks are functions that let you "hook into" React state and lifecycle features from function components.
import React, { useState, useEffect } from "react";
import "./dashboard.css";

// 1. DATA: Using imaginary/fake professor names
const initialData =[
  { id: 1, code: "CS101", name: "Theory of Computation", faculty: "Dr. Emmett Brown", attended: 47, total: 49, type: "Theory" },
  { id: 2, code: "CS202", name: "Natural Language Processing", faculty: "Prof. Charles Xavier", attended: 32, total: 36, type: "Embedded Theory" },
  { id: 3, code: "CS202L", name: "NLP Lab", faculty: "Dr. Bruce Banner", attended: 22, total: 24, type: "Embedded Lab" },
  { id: 4, code: "CS303", name: "Web Technologies", faculty: "Prof. Ada Lovelace", attended: 33, total: 37, type: "Embedded Theory" },
  { id: 5, code: "CS303L", name: "Web Tech Lab", faculty: "Mr. Tony Stark", attended: 20, total: 22, type: "Embedded Lab" },
  { id: 6, code: "CS404", name: "Artificial Intelligence", faculty: "Dr. Alan Turing", attended: 32, total: 37, type: "Embedded Theory" },
];

// ==========================================
// 👉 CONCEPT: Types of Components (Functional Components)
// DEFINITION: Functional components are simpler ways to write components that only contain a render method.
// We are using modern Functional Components exclusively here.
// ==========================================

export default function Dashboard() {
  // ==========================================
  // 👉 CONCEPT: State Management (useState)
  // DEFINITION: State is a built-in React object that is used to contain data or information about the component.
  // When state changes, the component responds by re-rendering.
  // ==========================================
  const [courses, setCourses] = useState([]);
  const[searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // ==========================================
  // 👉 CONCEPT: Component Lifecycle (useEffect)
  // DEFINITION: In functional components, useEffect replaces lifecycle methods like componentDidMount, 
  // componentDidUpdate, and componentWillUnmount. Here, it mimics 'componentDidMount' by running once.
  // ==========================================
  useEffect(() => {
    const timer = setTimeout(() => {
      setCourses(initialData);
      setLoading(false); // Triggers a re-render
    }, 1000);
    return () => clearTimeout(timer); // Cleanup (mimics componentWillUnmount)
  },[]);

  // ==========================================
  // 👉 CONCEPT: Communicate between Components
  // DEFINITION: Parent components pass functions down to child components via props. 
  // The child calls this function to pass data back up to the parent.
  // ==========================================
  const handleUpdateCourse = (id, newAttended, newTotal) => {
    setCourses(prev => prev.map(course => 
      course.id === id 
        ? { ...course, attended: Number(newAttended), total: Number(newTotal) } 
        : course
    ));
  };

  const handleQuickAttendance = (id, type) => {
    setCourses(prev => prev.map(course => {
      if (course.id === id) {
        return type === 'present' 
          ? { ...course, attended: course.attended + 1, total: course.total + 1 }
          : { ...course, total: course.total + 1 };
      }
      return course;
    }));
  };

  // FEATURE: Search/Filter Logic
  const filteredCourses = courses.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // FEATURE: Calculate Overall Stats dynamically
  const totalAttended = courses.reduce((acc, curr) => acc + curr.attended, 0);
  const totalClasses = courses.reduce((acc, curr) => acc + curr.total, 0);
  const overallPercent = totalClasses === 0 ? 0 : Math.round((totalAttended / totalClasses) * 100);

  // ==========================================
  // 👉 CONCEPT: Conditional Rendering
  // DEFINITION: Rendering different UI elements or components based on certain conditions (like loading state).
  // ==========================================
  if (loading) return <div className="loading-screen"><div className="spinner"></div><p>Fetching Academic Records...</p></div>;

  // ==========================================
  // 👉 CONCEPT: Templating using JSX
  // DEFINITION: JSX is a syntax extension for JavaScript. It produces React "elements" and allows us 
  // to write HTML-like markup inside JS files.
  // ==========================================
  return (
    <div className="dashboard-wrapper">
      
      {/* 
        👉 CONCEPT: React Routing (Contextual note)
        While not actively defining Routes here, this Dashboard is mounted inside a 
        <Route path="/project-1" element={<Dashboard />} /> in App.js. 
        It acts as a Page-level component in the router.
      */}

      <div className="header-section">
        <h2>Academic Overview</h2>
        <p>Manage and track your semester attendance in real-time.</p>
      </div>

      <div className="stats-grid">
        {/* 👉 CONCEPT: Rendering Components & Passing Props */}
        <StatCard title="Overall Attendance" value={`${overallPercent}%`} isLow={overallPercent < 75} />
        <StatCard title="Total Courses" value={courses.length} />
        <StatCard title="Status" value={overallPercent >= 75 ? "Safe" : "At Risk"} isLow={overallPercent < 75} isBadge />
      </div>

      <div className="controls-row">
        {/* 👉 CONCEPT: Event Handling (onChange) */}
        <input 
          type="text" 
          placeholder="Search by course code or name..." 
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="table-container">
        <table className="modern-table">
          <thead>
            <tr>
              <th>Course Details</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCourses.map(course => (
              <CourseRow 
                key={course.id} 
                course={course} 
                onQuickUpdate={handleQuickAttendance}
                onCustomUpdate={handleUpdateCourse}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 👉 CONCEPT: Components, State and Props
// DEFINITION: Props (short for properties) are used to pass data from one component to another (Parent to Child).
// StatCard is a stateless (dumb) component that only relies on Props.
// ==========================================
const StatCard = ({ title, value, isLow, isBadge }) => {
  return (
    <div className="stat-card">
      <h3>{title}</h3>
      <div className={`stat-value ${isLow ? 'danger-text' : ''} ${isBadge && !isLow ? 'safe-text' : ''}`}>
        {value}
      </div>
    </div>
  );
};

// ==========================================
// 👉 CONCEPT: Components (Child Component)
// We break down the UI into smaller, manageable components.
// ==========================================
const CourseRow = ({ course, onQuickUpdate, onCustomUpdate }) => {
  const percent = course.total === 0 ? 0 : Math.round((course.attended / course.total) * 100);
  const isDanger = percent < 75;

  // Local state for the Edit Form feature
  const[isEditing, setIsEditing] = useState(false);
  const [editAttended, setEditAttended] = useState(course.attended);
  const [editTotal, setEditTotal] = useState(course.total);

  // ==========================================
  // 👉 CONCEPT: Forms and User Input & Event Handling
  // DEFINITION: React uses controlled components where form data is handled by the React component's state.
  // ==========================================
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevents default page reload
    if (editAttended > editTotal) {
      alert("Attended classes cannot be greater than total classes!");
      return;
    }
    onCustomUpdate(course.id, editAttended, editTotal);
    setIsEditing(false);
  };

  return (
    <tr className={isDanger ? "row-warn" : ""}>
      <td>
        <div className="course-info">
          <span className="code">{course.code} • <span className="type-tag">{course.type}</span></span>
          <span className="name">{course.name}</span>
          <span className="faculty">{course.faculty}</span>
        </div>
      </td>
      
      <td>
        {isEditing ? (
          // ==========================================
          // 👉 CONCEPT: Forms and User Input
          // controlled inputs managed by local state.
          // ==========================================
          <form className="edit-form" onSubmit={handleFormSubmit}>
            <input 
              type="number" 
              min="0"
              value={editAttended} 
              onChange={(e) => setEditAttended(e.target.value)} 
              className="number-input"
            />
            <span>/</span>
            <input 
              type="number" 
              min="1"
              value={editTotal} 
              onChange={(e) => setEditTotal(e.target.value)} 
              className="number-input"
            />
            <button type="submit" className="btn-save">Save</button>
            <button type="button" onClick={() => setIsEditing(false)} className="btn-cancel">X</button>
          </form>
        ) : (
          <div className="progress-group">
            <div className="progress-bg">
              <div 
                className={`progress-fill ${isDanger ? 'fill-danger' : 'fill-safe'}`} 
                style={{ width: `${Math.min(percent, 100)}%` }}
              ></div>
            </div>
            <small className="attendance-ratio">{course.attended} / {course.total} classes</small>
          </div>
        )}
      </td>
      
      <td>
        <span className={`percent-badge ${isDanger ? 'badge-danger' : 'badge-safe'}`}>
          {percent}%
        </span>
      </td>

      <td>
        <div className="action-buttons">
          {!isEditing && (
            <>
              {/* 👉 CONCEPT: Event Handling (onClick) */}
              <button onClick={() => onQuickUpdate(course.id, 'present')} className="btn-quick present">+1 Present</button>
              <button onClick={() => onQuickUpdate(course.id, 'absent')} className="btn-quick absent">+1 Absent</button>
              <button onClick={() => setIsEditing(true)} className="btn-edit">Edit</button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
};