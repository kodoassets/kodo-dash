import { Chart, ArcElement, ChartDataset, Legend, Tooltip } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ArcElement, Legend, ChartDataLabels, Tooltip);
import { Pie } from "react-chartjs-2";

type Props = {
  labels: string[];
  datasets: ChartDataset<"pie", number[]>[];
};

const PieChart = ({ labels, datasets }: Props) => {
  return (
    <Pie
      options={{
        plugins: {
          datalabels: {
            color: "#fff",
            formatter: function (value: number, context: any) {
              const dataset = context.chart.data.datasets[context.datasetIndex];
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
            enabled: true,
            usePointStyle: true,
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
    />
  );
};

export default PieChart;
