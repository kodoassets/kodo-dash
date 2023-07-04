import { Chart, ArcElement, ChartDataset } from "chart.js";
Chart.register(ArcElement);
import { Pie } from "react-chartjs-2";

type Props = {
  labels: string[];
  datasets: ChartDataset<"pie", number[]>[];
};

const PieChart = ({ labels, datasets }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="w-[170px] h-[170px]">
        <Pie
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

export default PieChart;
