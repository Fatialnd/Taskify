import React from "react";

interface TaskCardProps {
  title: string;
  dueDate: string;
  completed: boolean;
  onToggle: () => void;
  onDelete: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  dueDate,
  completed,
  onToggle,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
      <div>
        <h3
          className={`text-lg font-semibold ${
            completed ? "line-through text-gray-500" : "text-gray-800"
          }`}
        >
          {title}
        </h3>
        <p className="text-sm text-gray-600">{dueDate}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onToggle}
          className={`px-4 py-2 rounded-lg text-white ${
            completed
              ? "bg-gray-500 hover:bg-gray-600"
              : "bg-blue-500 hover:bg-blue-600"
          } transition-colors`}
        >
          {completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={onDelete}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
