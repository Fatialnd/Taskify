import React, { useEffect, useState } from "react";

const cities = [
  { name: "New York", timezone: "America/New_York" },
  { name: "London", timezone: "Europe/London" },
  { name: "Tokyo", timezone: "Asia/Tokyo" },
  { name: "Sydney", timezone: "Australia/Sydney" },
];

interface CityTime {
  city: string;
  time: string;
}

const CitiesTimeWidget: React.FC = () => {
  const [citiesTimes, setCitiesTimes] = useState<CityTime[]>([]);

  const updateTimes = () => {
    const now = new Date();
    const updatedCities = cities.map((city) => {
      const localTime = new Intl.DateTimeFormat("en-US", {
        timeZone: city.timezone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).format(now);

      return { city: city.name, time: localTime };
    });
    setCitiesTimes(updatedCities);
  };

  useEffect(() => {
    updateTimes();
    const intervalId = setInterval(updateTimes, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="bg-gradient-to-br from-blue-100 via-white to-blue-50 shadow-md rounded-lg p-6 w-full max-w-3xl mx-auto">
      <h3 className="text-xl font-bold text-blue-600 mb-4 text-center">
        World Clock
      </h3>
      <div className="grid grid-cols-2 gap-6">
        {citiesTimes.map((cityTime) => (
          <div
            key={cityTime.city}
            className="flex flex-col justify-center items-center p-2 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
          >
            <span className="font-semibold text-gray-800 text-lg">
              {cityTime.city}
            </span>
            <span className="font-mono text-blue-500 text-base">
              {cityTime.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CitiesTimeWidget;
