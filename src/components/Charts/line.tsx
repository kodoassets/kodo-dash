import React from "react";
import {
  ArcElement,
  CategoryScale,
  Chart,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
Chart.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
import { Line } from "react-chartjs-2";

const LineChart = ({
  data,
}: {
  data: {
    labels: string[];
    datasets: [number[]];
  };
}) => {
  const chartData = {
    labels: data.labels,

    datasets: data.datasets.map((dataset) => ({
      data: dataset,
      tension: 0,
      borderColor: "rgba(255, 255, 255, 1)",
      backgroundColor: "#00AEEF",
      borderWidth: 3,
      pointStyle: "circle",
      pointRadius: 10,
      pointHoverRadius: 15,
    })),
    interaction: {
      mode: "index",
      intersect: false,
    },
  };

  const options = {
    scales: {
      x: {
        display: true,

        grid: {
          display: true,
          borderDash: [25, 25],

          color: "rgba(255, 255, 255, 0.08)",
        },
      },
      y: {
        display: true,
        grid: {
          display: true,

          borderDash: [25, 25],

          color: "rgba(255, 255, 255, 0.08)",
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        // position: "bottom",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
