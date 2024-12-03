import React, { useEffect, useState } from "react";
import {
  FaCloud,
  FaSun,
  FaCloudRain,
  FaSnowflake,
  FaBolt,
} from "react-icons/fa";

interface Weather {
  name: string;
  weather: { description: string; main: string }[];
  main: { temp: number };
}

const WeatherWidget: React.FC = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = "005326ffeefecc610f41afaea641bfcd";

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch weather data");
            }
            return response.json();
          })
          .then((data) => setWeather(data))
          .catch((err) => setError(err.message));
      },
      () => setError("Location access denied")
    );
  }, []);

  const getWeatherIcon = (main: string) => {
    switch (main.toLowerCase()) {
      case "clear":
        return <FaSun className="text-yellow-400" />;
      case "clouds":
        return <FaCloud className="text-gray-400" />;
      case "rain":
        return <FaCloudRain className="text-blue-400" />;
      case "snow":
        return <FaSnowflake className="text-blue-200" />;
      case "thunderstorm":
        return <FaBolt className="text-yellow-500" />;
      default:
        return <FaCloud className="text-gray-400" />;
    }
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!weather) {
    return <div>Loading weather...</div>;
  }

  const { name, weather: weatherDetails, main } = weather;
  const { main: weatherType, description } = weatherDetails[0];

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 dark:from-blue-900 dark:to-blue-700 rounded-lg shadow-lg flex flex-col justify-center items-center p-6 w-full max-w-xs mx-auto">
      <div className="text-4xl mb-2">{getWeatherIcon(weatherType)}</div>
      <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">
        {name}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 capitalize mb-2">
        {description}
      </p>
      <p className="text-lg text-gray-800 dark:text-gray-200">{main.temp}°C</p>
    </div>
  );
};

export default WeatherWidget;
