import React, { useState, useEffect } from "react";
import CircularProgressBar from "../components/CircularProgressBar";
import ProgressBar from "../components/ProgressBar";

const Pomodoro: React.FC = () => {
  const [workHours, setWorkHours] = useState<number | null>(null);
  const [totalCycles, setTotalCycles] = useState(0);
  const [completedCycles, setCompletedCycles] = useState(0);
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isWorking, setIsWorking] = useState(true);
  const [isPaused, setIsPaused] = useState(true);

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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        Pomodoro Tracker
      </h1>

      {!totalCycles ? (
        <div>
          <input
            type="number"
            min="0"
            placeholder="Enter hours to work"
            value={workHours || ""}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value >= 0) setWorkHours(value);
            }}
            className="p-2 border border-gray-300 rounded mb-4"
          />
          <button
            onClick={handleStart}
            disabled={!workHours || workHours <= 0}
            className={`px-6 py-3 ${
              workHours && workHours > 0
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            } rounded-lg`}
          >
            Start
          </button>
        </div>
      ) : (
        <div>
          <div className="flex justify-center mb-6">
            <CircularProgressBar
              timeLeft={timeLeft}
              totalTime={isWorking ? 25 * 60 : 5 * 60}
              isWorking={isWorking}
            />
          </div>

          <div className="flex justify-center mb-4">
            <ProgressBar progress={(completedCycles / totalCycles) * 100} />
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => setIsPaused(!isPaused)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              {isPaused ? "Resume" : "Pause"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pomodoro;
