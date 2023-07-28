import React, { useState, useRef } from "react";
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
    datasets: {
      data: number[];
      label?: string;
      backgroundColor?: string;
    }[];
  };
  externalTooltip?: React.ReactNode;
  onElementSelect?: (selectedElement: any) => void;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  externalTooltip,
  onElementSelect,
}) => {
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [graphUUID] = useState(() =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
  );

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
        external: (context: any) => {
          const tooltipEl = document.getElementById(graphUUID);

          if (tooltipEl) {
            if (context.tooltip.dataPoints?.length) {
              const { caretX, caretY } = context.tooltip;

              tooltipEl.style.left = caretX - 120 + "px";
              tooltipEl.style.top = caretY + 20 + "px";
              tooltipEl.style.display = "block";

              if (
                onElementSelect &&
                selectedElement?.label !== context.tooltip.dataPoints[0].label
              ) {
                setSelectedElement(context.tooltip.dataPoints[0]);
                onElementSelect(context.tooltip.dataPoints[0]);
              }
            } else {
              tooltipEl.style.display = "none";
            }
          }
        },
      },
    },
  };

  const chartContainerRef = useRef<HTMLDivElement>(null);

  const handleChartMouseLeave = () => {
    setSelectedElement(null);
    const tooltipEl = document.getElementById(graphUUID);
    if (tooltipEl) {
      tooltipEl.style.display = "none";
    }
  };

  return (
    <div className="relative" ref={chartContainerRef}>
      {externalTooltip && (
        <div
          id={graphUUID}
          className={`absolute ${!selectedElement ? "hidden" : "block"}`}
        >
          {externalTooltip}
        </div>
      )}

      <Line
        data={chartData}
        options={options}
        onMouseLeave={handleChartMouseLeave}
      />
    </div>
  );
};

export default LineChart;
