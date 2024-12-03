import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200 flex justify-center items-center">
      <div className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Settings</h1>
        <div className="mb-6 flex items-center justify-between">
          <span className="text-lg">
            {isDarkMode ? "Dark Mode: On" : "Dark Mode: Off"}
          </span>
          <button
            onClick={toggleDarkMode}
            className="px-6 py-3 bg-blue-500 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-600 dark:hover:bg-blue-800 transition-all"
          >
            Toggle Dark Mode
          </button>
        </div>
        <div className="text-center mt-4 text-sm text-gray-600 dark:text-gray-300">
          <p>Toggle between light and dark themes.</p>
        </div>
      </div>
    </div>
  );
};

export default Settings;
