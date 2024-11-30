import React from "react";

interface TimerProps {
  timeLeft: number;
  isWorking: boolean;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, isWorking }) => {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="text-5xl font-bold">
      {isWorking ? "Work Time" : "Break Time"}:{" "}
      {minutes < 10 ? `0${minutes}` : minutes}:
      {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
