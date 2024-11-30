import React, { useState } from "react";

const Settings: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark", !isDarkMode);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6">Settings</h1>

      <div className="flex items-center justify-between">
        <span className="text-lg">Dark Mode</span>
        <button
          onClick={toggleDarkMode}
          className={`px-4 py-2 ${
            isDarkMode ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
          } rounded-lg`}
        >
          {isDarkMode ? "Disable" : "Enable"}
        </button>
      </div>
    </div>
  );
};

export default Settings;
