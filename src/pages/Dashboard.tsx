import React from "react";
import WeatherWidget from "../components/WeatherWidget";
import CitiesTimeWidget from "../components/CitiesTimeWidget";
import NotesWidget from "../components/NotesWidget";
import TaskManagerWidget from "../components/TaskManagerWidget";

const Dashboard: React.FC = () => {
  const savedNotes = localStorage.getItem("notes");
  const notes = savedNotes ? JSON.parse(savedNotes) : [];

  const savedTasks = localStorage.getItem("tasks");
  const tasks = savedTasks ? JSON.parse(savedTasks) : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 p-6 flex flex-col items-center overflow-hidden">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
        Welcome to your Dashboard
      </h1>

      <div className="flex flex-row gap-6 flex-wrap justify-center w-full max-w-9xl">
        <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/4 p-4">
          <div className="w-full h-full flex flex-col gap-6">
            <WeatherWidget />
            <NotesWidget notes={notes} />
          </div>
        </div>

        <div className="w-full sm:w-1/2 lg:w-1/2 xl:w-1/4 p-4">
          <div className="w-full h-full flex flex-col gap-6">
            <CitiesTimeWidget />
            <TaskManagerWidget tasks={tasks} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
