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
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded shadow">
      <div>
        <h3 className={`text-lg font-bold ${completed ? "line-through" : ""}`}>
          {title}
        </h3>
        <p className="text-sm text-gray-500">{dueDate}</p>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={onToggle}
          className="px-2 py-1 bg-blue-500 text-white rounded"
        >
          {completed ? "Undo" : "Complete"}
        </button>
        <button
          onClick={onDelete}
          className="px-2 py-1 bg-red-500 text-white rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
