import { ChartDataset } from "chart.js";
import DoughnutChart from "../Charts/doghnut";

type Props = {
  title: string;
  labels: string[];
  datasets: ChartDataset<"doughnut", number[]>[];
};
const DoughnutChartData = ({ title, labels, datasets }: Props) => {
  return (
    <div className="flex flex-col items-center text-white bg-gradient-2 rounded-lg py-4 px-8 w-[300px]">
      <p className="mb-4">{title}</p>
      <DoughnutChart labels={labels} datasets={datasets} />
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
        {labels.map((l) => (
          <span key={l}>{l.toUpperCase()}</span>
        ))}
      </div>
    </div>
  );
};

export default DoughnutChartData;
