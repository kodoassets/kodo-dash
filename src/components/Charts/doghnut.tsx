import { Chart, ArcElement, ChartDataset } from "chart.js";
Chart.register(ArcElement);
import { Doughnut } from "react-chartjs-2";

type Props = {
  labels: string[];
  datasets: ChartDataset<"doughnut", number[]>[];
};

const DoughnutChart = ({ labels, datasets }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="w-[170px] h-[170px]">
        <Doughnut
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
          }}
          data={{
            labels,
            datasets,
          }}
        />
      </div>
    </div>
  );
};

export default DoughnutChart;
