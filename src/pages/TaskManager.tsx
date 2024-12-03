import React, { useState, useEffect } from "react";
import TaskCard from "../components/TaskCard";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [newTask, setNewTask] = useState({ title: "", dueDate: "" });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const toggleTaskCompletion = (id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const addTask = () => {
    if (!newTask.title || !newTask.dueDate) {
      alert("Please provide both a title and a due date.");
      return;
    }
    const newTaskObject: Task = {
      id: Date.now(),
      title: newTask.title,
      dueDate: newTask.dueDate,
      completed: false,
    };
    setTasks((prevTasks) => [...prevTasks, newTaskObject]);
    setNewTask({ title: "", dueDate: "" });
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 dark:text-gray-200">
        Task Manager
      </h1>

      <div className="mb-8 p-4 bg-gray-100 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Task
        </h2>
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Task Title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
          />
          <input
            type="date"
            value={newTask.dueDate}
            onChange={(e) =>
              setNewTask({ ...newTask, dueDate: e.target.value })
            }
            className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={addTask}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded shadow hover:bg-blue-600 transition"
          >
            Add Task
          </button>
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Your Tasks</h2>
        {tasks.length > 0 ? (
          <div className="space-y-4">
            {tasks.map((task) => (
              <TaskCard
                key={task.id}
                title={task.title}
                dueDate={task.dueDate}
                completed={task.completed}
                onToggle={() => toggleTaskCompletion(task.id)}
                onDelete={() => deleteTask(task.id)}
              />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">
            No tasks available. Add a task to get started!
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskManager;
