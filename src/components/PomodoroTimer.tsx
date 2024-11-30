import React, { useState, useEffect } from "react";

const PomodoroTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning]);

  const toggleTimer = () => setIsRunning(!isRunning);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-3xl font-bold">{`${Math.floor(timeLeft / 60)
        .toString()
        .padStart(2, "0")}:${(timeLeft % 60).toString().padStart(2, "0")}`}</h2>
      <button
        onClick={toggleTimer}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  );
};

export default PomodoroTimer;
