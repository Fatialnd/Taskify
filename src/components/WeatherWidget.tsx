import React, { useEffect, useState } from "react";

interface Weather {
  name: string;
  weather: { description: string }[];
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

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!weather) {
    return <div>Loading weather...</div>;
  }

  return (
    <div className="p-4 bg-blue-100 dark:bg-blue-800 rounded shadow-md">
      <h2 className="text-lg font-bold">Weather</h2>
      <p className="text-gray-700 dark:text-gray-300">
        {weather.name}: {weather.weather[0].description}
      </p>
      <p className="text-gray-700 dark:text-gray-300">
        Temp: {weather.main.temp}°C
      </p>
    </div>
  );
};

export default WeatherWidget;
