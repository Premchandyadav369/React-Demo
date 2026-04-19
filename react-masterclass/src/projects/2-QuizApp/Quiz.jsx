// ==========================================
// 👉 CONCEPT: ReactJS Introduction & Fundamentals
// DEFINITION: React is an open-source, component-based JavaScript library for building user interfaces.
// It allows developers to create large web applications that can change data, without reloading the page.
// ==========================================

// 👉 CONCEPT: Introduction to Hooks & State Management
// DEFINITION: Hooks are functions that let you "hook into" React state and lifecycle features.
// useState allows functional components to manage local state, driving the dynamic UI.
// useEffect allows you to perform side effects (like data fetching or timers) in function components.
import React, { useState, useEffect } from "react";
import "./quiz.css";

// 1. DATA: List of 10 Questions
const initialQuestions =[
  { id: 1, q: "Which hook is used for side effects?", options: ["useState", "useEffect", "useMemo", "useRef"], a: "useEffect" },
  { id: 2, q: "React uses a _____ DOM to improve performance.", options:["Real", "Shadow", "Virtual", "Static"], a: "Virtual" },
  { id: 3, q: "How do you pass data to a child component?", options:["State", "Props", "Context", "Hooks"], a: "Props" },
  { id: 4, q: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax X", "JSON XML", "Java Scripting"], a: "JavaScript XML" },
  { id: 5, q: "Which command starts the Vite dev server?", options:["npm run start", "npm run dev", "npm run serve", "npm start"], a: "npm run dev" },
  { id: 6, q: "What is the default port for a Vite React app?", options:["3000", "8080", "5173", "5000"], a: "5173" },
  { id: 7, q: "Who developed React?", options: ["Google", "Microsoft", "Meta (Facebook)", "Twitter"], a: "Meta (Facebook)" },
  { id: 8, q: "Which hook stores values across renders without re-rendering?", options:["useState", "useEffect", "useRef", "useReducer"], a: "useRef" },
  { id: 9, q: "Which prop is required for list items in React?", options:["id", "key", "index", "ref"], a: "key" },
  { id: 10, q: "Can browsers read JSX directly?", options: ["Yes", "No", "Only Chrome", "Only Safari"], a: "No" }
];

// ==========================================
// 👉 CONCEPT: Types of Components (Parent Component)
// DEFINITION: This functional component manages the top-level state and orchestrates child components.
// ==========================================
export default function Quiz() {
  const [gameState, setGameState] = useState("start"); // 'start' | 'play' | 'end'
  const [username, setUsername] = useState("");
  const[score, setScore] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);

  // ==========================================
  // 👉 CONCEPT: Component Lifecycle (useEffect)
  // DEFINITION: Mimicking componentDidMount. Here we could fetch questions from an API.
  // In this case, we just log when the Quiz component mounts.
  // ==========================================
  useEffect(() => {
    console.log("Quiz Component Mounted. Ready for user interaction.");
    // Cleanup function runs when component unmounts
    return () => console.log("Quiz Component Unmounted.");
  },[]);

  // ==========================================
  // 👉 CONCEPT: Event Handling & Communicate between Components
  // DEFINITION: This function handles the scoring logic. We will pass it down to 
  // the child component (<QuestionCard />) as a Prop.
  // ==========================================
  const handleScoreUpdate = (isCorrect) => {
    if (isCorrect) setScore((prev) => prev + 1);
    setAnsweredCount((prev) => prev + 1);
  };

  const handleFinishQuiz = () => {
    setGameState("end");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetQuiz = () => {
    setScore(0);
    setAnsweredCount(0);
    setGameState("start");
    setUsername("");
  };

  // ==========================================
  // 👉 CONCEPT: Conditional Rendering & Templating using JSX
  // DEFINITION: JSX allows writing HTML in React. We use JS logic (like ===) to 
  // conditionally render different screens (Start, Play, End).
  // ==========================================
  return (
    <div className="quiz-wrapper">
      
      {/* 
        👉 CONCEPT: React Routing (Contextual Info)
        This component assumes it is rendered via <Route path="/project-2" element={<Quiz />} />
        React Router allows single-page apps to have multiple views without page reloads.
      */}

      {/* --- SCREEN 1: START SCREEN --- */}
      {gameState === "start" && (
        <div className="card start-screen">
          <div className="icon-wrapper">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
          </div>
          <h1>React Assessment Module</h1>
          <p>Test your knowledge. All questions are displayed below. Answer at your own pace.</p>
          
          {/* 👉 CONCEPT: Forms and User Input */}
          {/* DEFINITION: A controlled input where React state ('username') acts as the single source of truth. */}
          <form 
            className="start-form" 
            onSubmit={(e) => {
              e.preventDefault();
              if(username.trim()) setGameState("play");
            }}
          >
            <input 
              type="text" 
              placeholder="Enter your candidate name..." 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="name-input"
            />
            <button type="submit" className="btn-primary" disabled={!username.trim()}>
              Begin Assessment
            </button>
          </form>
        </div>
      )}

      {/* --- SCREEN 2: PLAY SCREEN (ALL QUESTIONS) --- */}
      {gameState === "play" && (
        <div className="assessment-container">
          {/* Sticky Header to track progress */}
          <div className="sticky-header">
            <div className="candidate-info">
              <span className="label">Candidate:</span> <strong>{username}</strong>
            </div>
            <div className="progress-info">
              <span className="label">Completion:</span> <strong>{answeredCount} / {initialQuestions.length}</strong>
            </div>
            <div className="score-info">
              <span className="label">Current Score:</span> <strong>{score}</strong>
            </div>
          </div>

          <div className="questions-list">
            {/* 👉 CONCEPT: Rendering Lists */}
            {/* DEFINITION: Using .map() to iterate over data and return React components. The 'key' prop is mandatory. */}
            {initialQuestions.map((q, index) => (
              <QuestionCard 
                key={q.id} 
                questionData={q} 
                index={index} 
                onAnswered={handleScoreUpdate} 
              />
            ))}
          </div>

          <div className="submission-area">
            <button 
              className="btn-primary btn-large" 
              onClick={handleFinishQuiz}
              disabled={answeredCount < initialQuestions.length}
            >
              {answeredCount < initialQuestions.length ? "Complete all questions to submit" : "Submit Final Answers"}
            </button>
          </div>
        </div>
      )}

      {/* --- SCREEN 3: END SCREEN --- */}
      {gameState === "end" && (
        <div className="card result-screen">
          <div className="result-header">Assessment Complete</div>
          <h2>{username}</h2>
          <div className="final-score-box">
            <span className="big-score">{score}</span>
            <span className="total-score">/ {initialQuestions.length}</span>
          </div>
          <p className="rank-text">
            {score > 8 ? "Exceptional performance. You are a React expert." 
              : score > 5 ? "Solid understanding, but room for review." 
              : "Fundamental review recommended."}
          </p>
          <button className="btn-secondary" onClick={resetQuiz}>
            Retake Assessment
          </button>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 👉 CONCEPT: Components, State and Props (Child Component)
// DEFINITION: QuestionCard receives data via 'Props' and manages its own internal 'State'.
// ==========================================
const QuestionCard = ({ questionData, index, onAnswered }) => {
  // Local state to track if this specific question has been answered or revealed
  const [selectedOption, setSelectedOption] = useState(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // 👉 CONCEPT: Event Handling
  const handleOptionClick = (option) => {
    if (isRevealed) return; // Prevent clicking after answered

    setSelectedOption(option);
    setIsRevealed(true);

    // Communicate back to parent
    const isCorrect = option === questionData.a;
    onAnswered(isCorrect);
  };

  const handleRevealAnswer = () => {
    if (isRevealed) return;
    setIsRevealed(true);
    // Revealing without selecting an option counts as wrong (no points added)
    onAnswered(false); 
  };

  return (
    <div className={`question-card ${isRevealed ? 'card-answered' : ''}`}>
      <div className="q-header">
        <span className="q-number">Question {index + 1}</span>
        
        {/* Reveal Answer Button */}
        {!isRevealed && (
          <button className="btn-reveal" onClick={handleRevealAnswer}>
            Show Answer
          </button>
        )}
      </div>
      
      <h3 className="q-text">{questionData.q}</h3>

      <div className="options-grid">
        {questionData.options.map((opt) => {
          // Determine CSS classes for validation
          let statusClass = "option-default";
          if (isRevealed) {
            if (opt === questionData.a) {
              statusClass = "option-correct"; // Always highlight correct answer
            } else if (opt === selectedOption) {
              statusClass = "option-wrong"; // Highlight user's wrong choice
            } else {
              statusClass = "option-disabled"; // Dim the rest
            }
          }

          return (
            <button
              key={opt}
              className={`option-btn ${statusClass}`}
              onClick={() => handleOptionClick(opt)}
              disabled={isRevealed}
            >
              <div className="opt-indicator"></div>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
};