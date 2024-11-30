import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar: React.FC = () => {
  const links = [
    { path: "/", label: "Dashboard" },
    { path: "/tasks", label: "Task Manager" },
    { path: "/goals", label: "Goals Tracker" },
    { path: "/notes", label: "Notes" },
    { path: "/pomodoro", label: "Pomodoro" },
    { path: "/settings", label: "Settings" },
  ];

  return (
    <div className="h-screen w-64 bg-gray-800 text-white p-4">
      <h2 className="text-2xl font-bold mb-6">Taskify</h2>
      <nav className="flex flex-col space-y-2">
        {links.map((link) => (
          <NavLink
            to={link.path}
            key={link.label}
            className={({ isActive }) =>
              `px-4 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
