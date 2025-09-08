import { useState, useEffect } from "react";

import { Line } from "react-chartjs-2";

import {
  Chart as Chartjs,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  LineElement,
} from "chart.js";
import "chartjs-adapter-date-fns";
// import { callback } from "chart.js/helpers";

Chartjs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  TimeScale,
  LineElement
);

const API_URL = import.meta.env.VITE_API_URL_COIN;

const Chart = ({ coinid }) => {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const res = await fetch(
          `${API_URL}/${coinid}/market_chart?vs_currency=usd&days=7`
        );
        if (!res.ok) throw new Error("Failed fetching Response");
        const data = await res.json();
        const prices = data.prices.map((price) => ({
          x: price[0],
          y: price[1],
        }));

        setChartData({
          datasets: [
            {
              label: "Prices (USD)",
              data: prices,
              fill: true,
              borderColor: "#007bff",
              backgroundColor: "rgba(0, 123, 255, 0.1)",
              pointRadius: 0,
              tension: 0.3,
            },
          ],
        });
      } catch (error) {
        setError(error.message || "Can't fetch Data");
      } finally {
        setLoading(false);
        setError(null);
      }
    };
    fetchPrices();
  }, [coinid]);
  if (loading) return <p>Loading chart...</p>;
  if (error) return <div style={{ color: "red" }}>⚠️ {error}</div>;
  return (
    <div style={{ marginTop: "30px" }}>
      <Line
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: { mode: "index", intersect: false },
          },
          scales: {
            x: {
              type: "time",
              time: {
                unit: "day",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 7,
              },
            },
            y: {
              ticks: {
                callback: (value) => `$${value.toLocaleString()}`,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
