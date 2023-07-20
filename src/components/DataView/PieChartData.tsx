import { ChartDataset } from "chart.js";
import PieChart from "../Charts/pie";

type Props = {
  title: string;
  labels: string[];
  datasets: ChartDataset<"pie", number[]>[];
};
const PieChartData = ({ title, labels, datasets }: Props) => {
  return (
    <div className="flex flex-col items-center text-white bg-gradient-2 rounded-2xl py-4 px-8">
      <p className="mb-4">{title}</p>
      <PieChart labels={labels} datasets={datasets} />
      {/* <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
        {labels.map((l) => (
          <span key={l}>{l.toUpperCase()}</span>
        ))}
      </div> */}
    </div>
  );
};

export default PieChartData;
