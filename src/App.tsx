import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DarkModeProvider } from "./context/DarkModeContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TaskManager from "./pages/TaskManager";
import GoalsTracker from "./pages/GoalsTracker";
import Notes from "./pages/Notes";
import Pomodoro from "./pages/Pomodoro";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  return (
    <DarkModeProvider>
      <div className="h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
        <Router>
          <div className="flex">
            <Sidebar />
            <div className="flex-1 p-6">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<TaskManager />} />
                <Route path="/goals" element={<GoalsTracker />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/pomodoro" element={<Pomodoro />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </div>
          </div>
        </Router>
      </div>
    </DarkModeProvider>
  );
};

export default App;
