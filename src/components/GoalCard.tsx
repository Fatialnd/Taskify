import React from "react";
import ProgressBar from "./ProgressBar";

interface ToDo {
  id: number;
  title: string;
  completed: boolean;
}

interface Goal {
  id: number;
  title: string;
  description: string;
  toDos: ToDo[];
}

interface GoalCardProps {
  goal: Goal;
  onToggleToDo: (goalId: number, toDoId: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onToggleToDo }) => {
  const completedCount = goal.toDos.filter((toDo) => toDo.completed).length;
  const progress =
    goal.toDos.length > 0 ? (completedCount / goal.toDos.length) * 100 : 0;

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <h3 className="text-lg font-bold">{goal.title}</h3>
      <p className="text-gray-600 mb-2">{goal.description}</p>
      <ProgressBar progress={progress} />
      <ul className="list-none mt-4">
        {goal.toDos.map((toDo) => (
          <li key={toDo.id} className="flex items-center space-x-4">
            <input
              type="checkbox"
              checked={toDo.completed}
              onChange={() => onToggleToDo(goal.id, toDo.id)}
              className="w-5 h-5"
            />
            <span
              className={toDo.completed ? "line-through text-gray-500" : ""}
            >
              {toDo.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GoalCard;
