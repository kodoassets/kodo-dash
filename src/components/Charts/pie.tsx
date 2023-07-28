import { Chart, ArcElement, ChartDataset, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useState, useRef } from "react";

Chart.register(ArcElement, Legend, ChartDataLabels, Tooltip);
import { Pie } from "react-chartjs-2";

type Props = {
  labels: string[];
  datasets: ChartDataset<"pie", number[]>[];
  externalTooltip?: React.ReactNode;
  onElementSelect?: (selectedElement: any) => void;
};

const PieChart = ({
  labels,
  datasets,
  externalTooltip,
  onElementSelect,
}: Props) => {
  const [selectedElement, setSelectedElement] = useState<any>(null);
  const [graphUUID] = useState(() =>
    "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    })
  );

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

      <Pie
        options={{
          plugins: {
            datalabels: {
              color: "#fff",
              formatter: function (value: number, context: any) {
                const dataset =
                  context.chart.data.datasets[context.datasetIndex];
                const total = dataset.data.reduce(
                  (acc: number, val: number) => acc + val,
                  0
                );

                if (value < 1) {
                  return "";
                }

                const percentage = Math.round((value / total) * 100);

                return `${percentage}%`;
              },
            },
            tooltip: {
              enabled: externalTooltip ? false : true,
              usePointStyle: true,
              external: (context: { tooltip: any }) => {
                const tooltipEl = document.getElementById(graphUUID);

                if (tooltipEl) {
                  if (context.tooltip.dataPoints?.length > 0) {
                    const { caretX, caretY } = context.tooltip;

                    tooltipEl.style.left = caretX + "px";
                    tooltipEl.style.top = caretY + "px";
                    tooltipEl.style.display = "block";
                    tooltipEl.style.pointerEvents = "none";

                    if (
                      onElementSelect &&
                      selectedElement?.label !==
                        context.tooltip.dataPoints[0].label
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

            legend: {
              display: true,
              align: "start",
              position: "bottom",

              labels: {
                padding: 14,
                boxHeight: 8,
                useBorderRadius: true,
                usePointStyle: true,

                color: "#7896A1",
                font: {
                  size: 14,
                  weight: "400",
                  lineHeight: 1.2,
                  style: "normal",
                },
              },
            },
          },
        }}
        data={{
          labels,
          datasets,
        }}
        onMouseLeave={handleChartMouseLeave}
      />
    </div>
  );
};

export default PieChart;
