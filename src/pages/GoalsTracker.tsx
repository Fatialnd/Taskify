import React, { useState, useEffect } from "react";
import GoalCard from "../components/GoalCard";

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

const GoalsTracker: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem("goals");
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  const [newGoal, setNewGoal] = useState({
    title: "",
    description: "",
    toDos: [] as ToDo[],
  });

  const [newToDo, setNewToDo] = useState("");

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals));
  }, [goals]);

  const addGoal = () => {
    if (!newGoal.title) {
      alert("Please provide a title for the goal.");
      return;
    }

    const newGoalObject: Goal = {
      id: Date.now(),
      title: newGoal.title,
      description: newGoal.description,
      toDos: [...newGoal.toDos],
    };

    setGoals((prevGoals) => [...prevGoals, newGoalObject]);
    setNewGoal({ title: "", description: "", toDos: [] });
  };

  const addToDo = () => {
    if (!newToDo) return;
    const newToDoObject: ToDo = {
      id: Date.now(),
      title: newToDo,
      completed: false,
    };
    setNewGoal((prevGoal) => ({
      ...prevGoal,
      toDos: [...prevGoal.toDos, newToDoObject],
    }));
    setNewToDo("");
  };

  const toggleToDo = (goalId: number, toDoId: number) => {
    setGoals((prevGoals) =>
      prevGoals.map((goal) =>
        goal.id === goalId
          ? {
              ...goal,
              toDos: goal.toDos.map((toDo) =>
                toDo.id === toDoId
                  ? { ...toDo, completed: !toDo.completed }
                  : toDo
              ),
            }
          : goal
      )
    );
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-200 mb-6">
        Goals Tracker
      </h1>

      <div className="max-w-3xl w-full p-6 bg-gray-100 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Add New Goal
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Goal Title"
            value={newGoal.title}
            onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <textarea
            placeholder="Description (optional)"
            value={newGoal.description}
            onChange={(e) =>
              setNewGoal({ ...newGoal, description: e.target.value })
            }
            className="p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <div className="flex space-x-4 items-center">
            <input
              type="text"
              placeholder="Add To-Do"
              value={newToDo}
              onChange={(e) => setNewToDo(e.target.value)}
              className="flex-grow p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addToDo}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors"
            >
              Add To-Do
            </button>
          </div>
          {newGoal.toDos.length > 0 && (
            <ul className="list-disc ml-5 text-gray-700">
              {newGoal.toDos.map((toDo) => (
                <li key={toDo.id}>{toDo.title}</li>
              ))}
            </ul>
          )}
          <button
            onClick={addGoal}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition-colors"
          >
            Add Goal
          </button>
        </div>
      </div>

      <div
        className="max-w-3xl w-full space-y-8 overflow-y-auto"
        style={{
          maxHeight: "calc(100vh - 400px)",
        }}
      >
        {goals.map((goal) => (
          <GoalCard key={goal.id} goal={goal} onToggleToDo={toggleToDo} />
        ))}
      </div>
    </div>
  );
};

export default GoalsTracker;
