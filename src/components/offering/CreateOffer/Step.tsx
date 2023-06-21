import Card from "@/components/Card";
import clsx from "clsx";

interface Props {
  title: string;
  stepNumber: string | number;
  children: React.ReactNode;
  active: boolean;
}

const Step = ({ title, stepNumber, children, active }: Props) => {
  return (
    <Card
      className={clsx("py-4 px-8 mt-4 w-full mr-8", !active && "opacity-40")}
    >
      <div className="text-center">
        <p className="text-xl font-bold">{stepNumber}</p>
        <h2 className="font-bold mb-6">{title}</h2>
      </div>
      {children}
    </Card>
  );
};

export default Step;
