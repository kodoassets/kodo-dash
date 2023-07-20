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

const LineChart = (data: {
  labels: string[];
  dataset1: number[];
  dataset2: number[];
}) => {
  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Dataset 1",
        data: data.dataset1,
        fill: false,
        borderColor: "rgba(192, 75, 75, 1)",
      },
      {
        label: "Dataset 2",
        data: data.dataset2,
        fill: false,
        borderColor: "rgba(75, 192, 192, 1)",
      },
    ],
  };

  const options = {
    scales: {
      x: {
        display: true,
        grid: {
          display: true,
          drawOnChartArea: true,
          borderDash: [25, 25],
          color: "rgba(255, 255, 255, 0.16)",
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default LineChart;
