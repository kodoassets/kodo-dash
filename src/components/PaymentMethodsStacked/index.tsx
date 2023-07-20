import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  plugins: {
    title: {
      display: true,
      text: "Revenue by payment method (USD)",
    },
  },
  // responsive: true,

  scales: {
    x: {
      stacked: true,
    },
    y: {
      stacked: true,
    },
  },
};

const labels = ["USDC", "USDT", "BUSD"];

export const data = {
  labels,
  datasets: [
    {
      label: "Polygon",
      data: [500, 100, 200],
      backgroundColor: "rgb(255, 99, 132)",
    },
    {
      label: "Ethereum",
      data: [100, 120],
      backgroundColor: "rgb(53, 162, 235)",
    },
  ],
};

const PaymentMethodsStacked = () => {
  return <Bar options={options} data={data} />;
};
export default PaymentMethodsStacked;
