import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Define types for stock data and time series entry
type TimeSeriesEntry = {
  "1. open": string;
  "2. high": string;
  "3. low": string;
  "4. close": string;
  "5. volume": string;
};

type StockData = {
  [symbol: string]: string[]; // key is symbol (e.g., AAPL), value is an array of prices (strings)
};

const StockWidget: React.FC = () => {
  const [data, setData] = useState<StockData | null>(null); // Use StockData type
  const [error, setError] = useState<string | null>(null);

  const symbols = ["AAPL", "GOOGL", "AMZN", "NFLX", "META"]; // FAANG symbols

  // Move the getColorForSymbol function here to avoid initialization errors
  const getColorForSymbol = (symbol: string) => {
    switch (symbol) {
      case "AAPL":
        return "rgb(255, 99, 132)";
      case "GOOGL":
        return "rgb(54, 162, 235)";
      case "AMZN":
        return "rgb(75, 192, 192)";
      case "NFLX":
        return "rgb(153, 102, 255)";
      case "META":
        return "rgb(255, 159, 64)";
      default:
        return "rgb(255, 99, 132)";
    }
  };

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockData: StockData = {}; // Specify StockData type here
        const requests = symbols.map((symbol) =>
          fetch(
            `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=YOUR_API_KEY`
          ).then((response) => response.json())
        );

        const responses = await Promise.all(requests);

        responses.forEach((response, index) => {
          const symbol = symbols[index];
          if (response["Time Series (5min)"]) {
            const timeSeries = response["Time Series (5min)"];
            // Cast the timeSeries values to TimeSeriesEntry[] using `as`
            const prices = Object.values(timeSeries).map((entry) => {
              const typedEntry = entry as TimeSeriesEntry; // Type-casting to TimeSeriesEntry
              return typedEntry["4. close"];
            });
            stockData[symbol] = prices.reverse(); // Store the prices in reverse order
          } else {
            setError(`Failed to fetch data for ${symbols[index]}`);
          }
        });

        setData(stockData);
      } catch (err) {
        console.error("Error fetching stock data:", err);
        setError("Failed to fetch stock data");
      }
    };

    fetchStockData();
  }, []);

  // Prepare the data for the chart
  const chartData = {
    labels: Array.from({ length: 5 }, (_, index) => `5 min ago +${index * 5}`), // Labels for the x-axis (time in 5-minute increments)
    datasets: symbols.map((symbol) => ({
      label: symbol,
      data: data?.[symbol] || [],
      borderColor: getColorForSymbol(symbol),
      backgroundColor: "transparent",
      fill: false,
    })),
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">
        Stock Prices - FAANG Companies
      </h2>
      {error && <div className="text-red-500">{error}</div>}
      {data ? (
        <div className="h-[300px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              plugins: { legend: { position: "top" } },
            }}
          />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default StockWidget;