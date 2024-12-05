import React, { useState, useEffect } from "react";
import CircularProgressBar from "../components/CircularProgressBar";
import ProgressBar from "../components/ProgressBar";

const Pomodoro: React.FC = () => {
  const [workHours, setWorkHours] = useState<number | null>(() => {
    const savedWorkHours = localStorage.getItem("workHours");
    return savedWorkHours ? JSON.parse(savedWorkHours) : null;
  });
  const [totalCycles, setTotalCycles] = useState(() => {
    const savedCycles = localStorage.getItem("totalCycles");
    return savedCycles ? JSON.parse(savedCycles) : 0;
  });
  const [completedCycles, setCompletedCycles] = useState(() => {
    const savedCompletedCycles = localStorage.getItem("completedCycles");
    return savedCompletedCycles ? JSON.parse(savedCompletedCycles) : 0;
  });
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    const savedTimeLeft = localStorage.getItem("timeLeft");
    return savedTimeLeft ? JSON.parse(savedTimeLeft) : 25 * 60;
  });
  const [isWorking, setIsWorking] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(true);

  const handleStart = () => {
    if (workHours && workHours > 0) {
      const cycles = Math.floor((workHours * 60) / 30);
      setTotalCycles(cycles);
      setCompletedCycles(0);
      setTimeLeft(25 * 60);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;

    if (!isPaused && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      if (isWorking) {
        setTimeLeft(5 * 60);
      } else {
        setCompletedCycles((prev) => prev + 1);
        if (completedCycles + 1 < totalCycles) {
          setTimeLeft(25 * 60);
        }
      }
      setIsWorking(!isWorking);
    }

    return () => clearInterval(timer);
  }, [timeLeft, isPaused, isWorking, completedCycles, totalCycles]);

  useEffect(() => {
    if (workHours !== null) {
      localStorage.setItem("workHours", JSON.stringify(workHours));
    }
    localStorage.setItem("totalCycles", JSON.stringify(totalCycles));
    localStorage.setItem("completedCycles", JSON.stringify(completedCycles));
    localStorage.setItem("timeLeft", JSON.stringify(timeLeft));
  }, [workHours, totalCycles, completedCycles, timeLeft]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-6 max-w-lg bg-white shadow-md rounded-lg w-full sm:w-96">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200 text-center mb-6">
          Pomodoro Tracker
        </h1>

        {!totalCycles ? (
          <div className="flex flex-col items-center space-y-4">
            <input
              type="number"
              min="0"
              placeholder="Enter hours to work"
              value={workHours || ""}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value >= 0) setWorkHours(value);
              }}
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-72"
            />
            <button
              onClick={handleStart}
              disabled={!workHours || workHours <= 0}
              className={`px-6 py-3 ${
                workHours && workHours > 0
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              } rounded-lg transition-all`}
            >
              Start
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-6">
            <div className="w-72 h-72 flex items-center justify-center mb-6">
              <CircularProgressBar
                timeLeft={timeLeft}
                totalTime={isWorking ? 25 * 60 : 5 * 60}
                isWorking={isWorking}
              />
            </div>

            <div className="w-72 mb-4">
              <ProgressBar progress={(completedCycles / totalCycles) * 100} />
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
              >
                {isPaused ? "Resume" : "Pause"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Pomodoro;
