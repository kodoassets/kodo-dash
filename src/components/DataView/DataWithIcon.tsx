import Image from "next/image";

interface Props {
  src: string;
  label: string;
  value: string;
  subtitle: string;
  className?: string;
}

const LabeledValue = ({ label, value, subtitle, src, className }: Props) => {
  return (
    <div
      className={`border border-[#C6FFE0] flex flex-row items-center bg-gradient-2 rounded-xl px-4 py-3 min-w-[240px] ${
        className || ""
      }`}
    >
      <Image width={72} height={72} src={src} alt="" className="mr-4" />
      <div className="flex flex-col">
        <span className="text-white text-sm font-light">{label}</span>
        <span className="text-lg text-gradient">{value}</span>
        <span className="text-white font-bold">{subtitle}</span>
      </div>
    </div>
  );
};

export default LabeledValue;
