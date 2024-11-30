import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface CircularProgressBarProps {
  timeLeft: number;
  totalTime: number;
  isWorking: boolean;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  timeLeft,
  totalTime,
  isWorking,
}) => {
  const percentage = ((totalTime - timeLeft) / totalTime) * 100;

  return (
    <div style={{ width: 150, height: 150 }}>
      <CircularProgressbar
        value={percentage}
        text={`${Math.floor(timeLeft / 60)}:${timeLeft % 60 < 10 ? "0" : ""}${
          timeLeft % 60
        }`}
        styles={buildStyles({
          pathColor: isWorking ? "#3b82f6" : "#22c55e",
          textColor: "#111827",
          trailColor: "#e5e7eb",
        })}
      />
    </div>
  );
};

export default CircularProgressBar;
