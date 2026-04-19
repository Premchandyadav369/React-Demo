codeMarkdown

```
# 🚀 React Masterclass: Enterprise-Grade Application Suite

Welcome to the **React Masterclass** repository! This project is a comprehensive, component-based Single Page Application (SPA) built to demonstrate core React fundamentals. It features three real-world, beautifully designed applications seamlessly integrated using React Router.

## 🌟 Projects Included

1. **🎓 Smart Student Dashboard**
   * **Features:** Track student attendance, dynamic progress bars, and custom course filtering.
   * **Concepts Taught:** `State`, `Props`, `Component Lifecycles (useEffect)`.
2. **⚡ Assessment Quiz Module**
   * **Features:** Interactive single-page quiz, live scoring, immediate feedback, and conditional UI rendering.
   * **Concepts Taught:** `Forms`, `Hooks`, `Event Handling`, `List Rendering`.
3. **💸 FinTrack Ledger (Expense Tracker)**
   * **Features:** Track cash flow, dynamically calculate balances in INR (₹), categorize transactions, and persist data across browser reloads.
   * **Concepts Taught:** `Data Flow (Child to Parent)`, `Derived State`, `Browser LocalStorage`.

## 📚 Core React Concepts Covered
* **JSX:** Writing declarative HTML within JavaScript.
* **Component-Based Architecture:** Breaking UIs down into reusable, independent pieces.
* **React Hooks:** Utilizing `useState` for memory and `useEffect` for side effects.
* **React Router DOM:** Enabling client-side routing without page reloads.
* **State Management & Props:** Passing data down the component tree and lifting state up via callback functions.

---

## 🛠️ End-to-End Environment Setup Guide

Follow this step-by-step guide to set up your React development environment from scratch and run this project on your local machine.

### Step 1: Install Node.js (The Engine)
React requires Node.js to run the local development server and manage package dependencies.
1. Go to: [nodejs.org](https://nodejs.org/)
2. Download the **LTS (Long Term Support)** version.
3. Run the installer and proceed with the default settings.

**Verify Installation:**
Open your terminal (Command Prompt on Windows, Terminal on Mac) and run the following commands:
```bash
node -v
npm -v
```

You should see version numbers like 

### Step 2: Install Visual Studio Code (The Editor)

-   Go to: [code.visualstudio.com](https://www.google.com/url?sa=E&q=https%3A%2F%2Fcode.visualstudio.com%2F)

    -   Download and install VS Code for your operating system.

**Recommended Extensions:**\
Open VS Code, navigate to the **Extensions** tab (left sidebar), and install:

-   **Prettier - Code Formatter:** Automatically formats your code to keep it clean.

    -   **ES7+ React/Redux/React-Native Snippets:** Helps you write React boilerplate code instantly.

### Step 3: Create the React Project Using Vite

Vite is a modern, lightning-fast alternative to Create React App.

Open a new terminal inside VS Code (Terminal -> New Terminal) and run:

codeBash

```
npm create vite@latest react-masterclass -- --template react
```

Navigate into your new project folder:

codeBash

```
cd react-masterclass
```

Install the base dependencies:

codeBash

```
npm install
```

### Step 4: Install React Router

To enable multiple pages (Dashboard, Quiz, Expense Tracker) without reloading the browser, install React Router:

codeBash

```
npm install react-router-dom
```

### Step 5: Build the Folder Structure

Inside the src folder of your project, **delete** the following unnecessary default files:

-   App.css

    -   The assets folder (optional)

Next, create the following exact folder structure:

codeText

```
react-masterclass/
├── node_modules/
├── public/
├── src/
│   ├── index.css
│   ├── main.jsx
│   ├── App.jsx
│   └── projects/
│       ├── 1-StudentDashboard/
│       │   ├── Dashboard.jsx
│       │   └── dashboard.css
│       ├── 2-QuizApp/
│       │   ├── Quiz.jsx
│       │   └── quiz.css
│       └── 3-ExpenseTracker/
│           ├── ExpenseTracker.jsx
│           └── expense.css
├── index.html
├── package.json
└── vite.config.js
```

### Step 6: Paste the Code

Paste the respective code provided in this repository into each file:

-   src/index.css → Global CSS styling

    -   src/App.jsx → Main Router component and Landing Page

    -   Dashboard.jsx & dashboard.css → Student Dashboard module

    -   Quiz.jsx & quiz.css → Assessment Quiz module

    -   ExpenseTracker.jsx & expense.css → FinTrack Ledger module

(Note: 

### Step 7: Run the Application 🚀

In your terminal, ensure you are inside the react-masterclass directory and start the development server:

codeBash

```
npm run dev
```

You will see an output similar to this:

codeText

```
VITE v5.x.x  ready in 250 ms
  ➜  Local:   http://localhost:5173/
```

**Open the App:**

-   Hold Ctrl (Windows) or Cmd (Mac) and click the URL: http://localhost:5173/

    -   Your sleek, enterprise-grade React app will open in your default web browser!

* * * * *

🛑 Troubleshooting Tips
-----------------------

**1\. "Module Not Found" Error**

-   Check your file names and folder paths carefully.

    -   Ensure your import statements at the top of App.jsx match the folder names exactly (e.g., 1-StudentDashboard). Keep in mind that file paths are case-sensitive.

**2\. Blank / White Screen**

-   A white screen usually means there is a typo breaking the JavaScript execution.

    -   Open your browser's Developer Tools (Right Click -> Inspect -> Console). The console will tell you exactly which file and line of code is causing the error.

* * * * *

Built with ❤️ using React, Vite, and React Router DOM.
