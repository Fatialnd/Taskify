import React from "react";
import WeatherWidget from "../components/WeatherWidget";
import StockWidget from "../components/StockWidget";

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">
        Welcome to your Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <WeatherWidget />
        <StockWidget />
      </div>
    </div>
  );
};

export default Dashboard;
