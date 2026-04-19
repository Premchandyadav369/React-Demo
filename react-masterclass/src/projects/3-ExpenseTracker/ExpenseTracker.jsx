// ==========================================
// 👉 CONCEPT: ReactJS Introduction & Component-Based Architecture
// DEFINITION: React builds UIs by breaking them down into isolated, reusable pieces called components.
// Here, we have a Parent component (ExpenseTracker) and two Child components (TransactionForm, TransactionList).
// ==========================================

import React, { useState, useEffect } from "react";
import "./expense.css";

// ==========================================
// 👉 FEATURE: Indian Currency Formatter (Best Practice)
// DEFINITION: Instead of manually typing '₹', we use the Internationalization API (Intl).
// 'en-IN' ensures commas are placed in the Indian numbering format (Thousands, Lakhs, Crores).
// ==========================================
const formatINR = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(Math.abs(amount));
};

export default function ExpenseTracker() {
  
  // ==========================================
  // 👉 CONCEPT: State Management (useState) & Lazy Initialization
  // DEFINITION: By passing an arrow function to useState, we tell React to only read 
  // from localStorage during the FIRST render. This is a massive performance optimization.
  // ==========================================
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("fintrack_data_inr");
    if (saved) return JSON.parse(saved);
    return[
      { id: 1, text: "Monthly Salary", amount: 85000, type: "income", category: "Bank", date: new Date().toISOString().split('T')[0] },
      { id: 2, text: "Electricity Bill", amount: -2450.50, type: "expense", category: "Utility", date: new Date().toISOString().split('T')[0] },
    ];
  });

  const [filter, setFilter] = useState("all");

  // ==========================================
  // 👉 CONCEPT: Side Effects & Component Lifecycle (useEffect)
  // DEFINITION: useEffect synchronizes our React State with an external system (Browser LocalStorage).
  // The dependency array [transactions] means this runs ONLY when the transactions list changes.
  // ==========================================
  useEffect(() => {
    localStorage.setItem("fintrack_data_inr", JSON.stringify(transactions));
  }, [transactions]);

  // ==========================================
  // 👉 CONCEPT: Derived State
  // DEFINITION: We do NOT store 'total', 'income', or 'expense' in useState. 
  // Because they can be calculated directly from 'transactions', storing them in state 
  // would be redundant and lead to out-of-sync bugs. We calculate them on the fly.
  // ==========================================
  const totalBalance = transactions.reduce((acc, curr) => acc + curr.amount, 0);
  const income = transactions.filter(t => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions.filter(t => t.amount < 0).reduce((acc, t) => acc + t.amount, 0) * -1;

  // ==========================================
  // 👉 CONCEPT: Data Flow (Lifting State Up & Callbacks)
  // DEFINITION: React has a "One-Way Data Flow" (Top to Bottom). 
  // To let a Child update the Parent's state, the Parent passes down a callback function.
  // ==========================================
  const handleAddTransaction = (newTransaction) => {
    setTransactions([newTransaction, ...transactions]);
  };

  const handleDeleteTransaction = (id) => {
    if(window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  const filteredTransactions = transactions.filter(t => {
    if (filter === "income") return t.amount > 0;
    if (filter === "expense") return t.amount < 0;
    return true; 
  });

  return (
    <div className="expense-dashboard">
      <div className="dashboard-header">
        <h2>Financial Overview</h2>
        <p>Track your cash flow and categorize expenses in INR (₹).</p>
      </div>

      {/* STATS OVERVIEW */}
      <div className="balance-card">
        <span className="balance-label">Total Balance</span>
        <h1 className={`balance-amount ${totalBalance < 0 ? 'text-danger' : ''}`}>
          {totalBalance < 0 ? '-' : ''}₹{formatINR(totalBalance)}
        </h1>
        
        <div className="stats-row">
          <div className="stat-item inc-box">
            <span className="stat-label">Total Income</span>
            <span className="stat-value">+₹{formatINR(income)}</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item exp-box">
            <span className="stat-label">Total Expense</span>
            <span className="stat-value">-₹{formatINR(expense)}</span>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="grid-left">
          <TransactionForm onAdd={handleAddTransaction} />
        </div>

        <div className="grid-right">
          <div className="list-header">
            <h3>Transaction History</h3>
            <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option value="all">All Transactions</option>
              <option value="income">Income Only</option>
              <option value="expense">Expense Only</option>
            </select>
          </div>
          
          <TransactionList 
            transactions={filteredTransactions} 
            onDelete={handleDeleteTransaction} 
          />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 👉 CONCEPT: Forms & Controlled Components
// DEFINITION: In React, form inputs are "Controlled". Their values are driven strictly 
// by React State, not by the HTML DOM. This gives React total control over user input.
// ==========================================
const TransactionForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("General");
  
  // 👉 FEATURE: Added Date State to track when a transaction occurred
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  // 👉 CONCEPT: Event Handling
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!text || !amount || !date) return;

    const numericAmount = parseFloat(amount);
    const newTransaction = {
      id: Date.now(),
      text,
      amount: type === "expense" ? -Math.abs(numericAmount) : Math.abs(numericAmount),
      type,
      category,
      date
    };

    onAdd(newTransaction); 

    // Form Reset
    setText("");
    setAmount("");
    setDate(new Date().toISOString().split('T')[0]); // Reset to today
  };

  return (
    <div className="form-card">
      <h3>Add Transaction</h3>
      <form onSubmit={handleSubmit} className="tx-form">
        <div className="input-group">
          <label>Description</label>
          <input 
            type="text" 
            placeholder="e.g. Jio Recharge" 
            value={text} 
            onChange={(e) => setText(e.target.value)} 
          />
        </div>

        <div className="input-row">
          <div className="input-group flex-2">
            <label>Amount (₹)</label>
            <input 
              type="number" 
              placeholder="0.00" 
              step="0.01"
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
            />
          </div>
          <div className="input-group flex-1">
            <label>Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>
        </div>

        <div className="input-row">
          <div className="input-group flex-1">
            <label>Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>General</option>
              <option>Food & Dining</option>
              <option>Transportation</option>
              <option>Utility</option>
              <option>Shopping</option>
              <option>Bank/Salary</option>
            </select>
          </div>
          <div className="input-group flex-1">
            <label>Date</label>
            <input 
              type="date" 
              value={date} 
              onChange={(e) => setDate(e.target.value)} 
            />
          </div>
        </div>

        <button type="submit" className={`btn-submit ${type}`}>
          Record {type === 'expense' ? 'Expense' : 'Income'}
        </button>
      </form>
    </div>
  );
};

// ==========================================
// 👉 CONCEPT: List Rendering & Keys
// DEFINITION: React requires a unique 'key' prop when rendering lists using .map().
// This helps React identify which items have changed, been added, or been removed, 
// ensuring efficient Virtual DOM diffing.
// ==========================================
const TransactionList = ({ transactions, onDelete }) => {
  if (transactions.length === 0) {
    return (
      <div className="empty-state">
        <p>No transactions found. Start adding some!</p>
      </div>
    );
  }

  // Feature: Helper to format date cleanly (e.g., "12 Oct 2025")
  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  return (
    <div className="transaction-list">
      {transactions.map(item => (
        <div key={item.id} className="tx-item">
          <div className={`tx-indicator ${item.amount < 0 ? 'ind-exp' : 'ind-inc'}`}></div>
          
          <div className="tx-details">
            <span className="tx-text">{item.text}</span>
            <div className="tx-meta">
              <span className="tx-category">{item.category}</span>
              <span className="tx-date">• {formatDate(item.date)}</span>
            </div>
          </div>

          <div className="tx-actions">
            <span className={`tx-amount ${item.amount < 0 ? 'text-danger' : 'text-success'}`}>
              {item.amount < 0 ? "-" : "+"}₹{formatINR(item.amount)}
            </span>
            <button onClick={() => onDelete(item.id)} className="btn-delete" title="Delete">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};