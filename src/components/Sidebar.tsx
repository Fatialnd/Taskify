import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaTachometerAlt,
  FaTasks,
  FaBullseye,
  FaStickyNote,
  FaClock,
  FaCog,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const links = [
    { path: "/", label: "Dashboard", icon: <FaTachometerAlt /> },
    { path: "/tasks", label: "Task Manager", icon: <FaTasks /> },
    { path: "/goals", label: "Goals Tracker", icon: <FaBullseye /> },
    { path: "/notes", label: "Notes", icon: <FaStickyNote /> },
    { path: "/pomodoro", label: "Pomodoro", icon: <FaClock /> },
    { path: "/settings", label: "Settings", icon: <FaCog /> },
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
              `flex items-center space-x-2 px-4 py-2 rounded ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
