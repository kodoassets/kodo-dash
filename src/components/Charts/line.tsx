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

interface LineChartProps {
  data: {
    labels: string[];
    datasets: [
      {
        data: number[];
        label?: string;
        backgroundColor?: string;
      }
    ];
  };
  externalTooltip?: React.ReactNode;
  onElementSelect?: (selectedElement: any) => void;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  externalTooltip,
  onElementSelect,
}) => {
  const chartData = {
    labels: data.labels,

    datasets: data.datasets.map((dataset) => ({
      data: dataset.data,
      label: dataset.label,
      tension: 0,
      borderColor: dataset.backgroundColor || "#fff",
      backgroundColor: dataset.backgroundColor || "#00AEEF",
      borderWidth: 3,
      pointStyle: "circle",
      pointRadius: 10,
      pointHoverRadius: 15,
    })),
    interaction: {
      mode: "index",
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
      },

      tooltip: {
        enabled: externalTooltip ? false : true,

        external: (context: { tooltip: { dataPoints: string | any[] } }) => {
          const tooltipEl = document.getElementById("custom-tooltip");

          if (tooltipEl) {
            if (context.tooltip.dataPoints?.length) {
              const { caretX, caretY } = context.tooltip;

              tooltipEl.style.left = caretX + "px";
              tooltipEl.style.top = caretY + "px";
              tooltipEl.style.display = "block";
              tooltipEl.style.pointerEvents = "none";

              if (onElementSelect)
                onElementSelect(context.tooltip.dataPoints[0]);
            } else {
              tooltipEl.style.display = "none";
            }
          }
        },
      },
    },
  };

  return (
    <div className="relative">
      {externalTooltip}

      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;
