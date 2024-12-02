import React from "react";
import { useDarkMode } from "../context/DarkModeContext";

const Settings: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        Settings
      </h1>
      <div className="mt-4 flex items-center">
        <span className="text-gray-800 dark:text-gray-200 mr-4">
          {isDarkMode ? "Dark Mode: On" : "Dark Mode: Off"}
        </span>
        <button
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-blue-500 dark:bg-blue-700 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-800"
        >
          Toggle Dark Mode
        </button>
      </div>
    </div>
  );
};

export default Settings;
