import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import TaskManager from "./pages/TaskManager";
import GoalsTracker from "./pages/GoalsTracker";
import Notes from "./pages/Notes";
import Pomodoro from "./pages/Pomodoro";
import Settings from "./pages/Settings";

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-4">
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
  );
};

export default App;
