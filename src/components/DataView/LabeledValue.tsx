interface Props {
  label: string;
  value: string;
  color?: "red" | "blue" | "green" | "yellow";
}

const LabeledValue = ({ label, value, color = "blue" }: Props) => {
  const colorMap = {
    blue: "border-blue-400",
    red: "border-red-400",
    green: "border-green-400",
    yellow: "border-yellow-400",
  };

  return (
    <div className={`${colorMap[color]} border-l-4 flex flex-col px-4 py-2`}>
      <span className="text-gray-400">{label}</span>
      <span className="text-lg font-bold">{value}</span>
    </div>
  );
};

export default LabeledValue;
