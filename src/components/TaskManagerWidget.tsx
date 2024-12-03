import React from "react";

interface Task {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
}

interface TaskManagerWidgetProps {
  tasks: Task[];
}

const TaskManagerWidget: React.FC<TaskManagerWidgetProps> = ({ tasks }) => {
  return (
    <div className="bg-gradient-to-br from-yellow-100 via-white to-yellow-50 dark:from-gray-800 dark:to-gray-700 shadow-lg rounded-lg p-6 w-full h-full max-w-xs mx-auto">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-4">
        Your Tasks
      </h3>
      <div className="space-y-4">
        {tasks.slice(0, 3).map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-lg shadow ${
              task.completed
                ? "bg-green-100 dark:bg-green-900"
                : "bg-red-100 dark:bg-red-900"
            }`}
          >
            <h4 className="font-semibold text-gray-800 dark:text-gray-100">
              {task.title}
            </h4>
            <p className="text-gray-600 dark:text-gray-300">
              Due: {task.dueDate}
            </p>
            <p className="text-gray-500 dark:text-gray-400">
              {task.completed ? "Completed" : "Pending"}
            </p>
          </div>
        ))}
      </div>
      {tasks.length > 3 && (
        <p className="text-gray-500 dark:text-gray-300 mt-4 text-center">
          ...and more
        </p>
      )}
    </div>
  );
};

export default TaskManagerWidget;
