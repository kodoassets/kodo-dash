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
      className={`border border-[#C6FFE0] flex flex-row bg-gradient-2 rounded-md pl-6 py-4 min-w-[290px] max-w-[290px] ${
        className || ""
      }`}
    >
      <Image width={74} height={74} src={src} alt="" className="mr-4" />
      <div className="flex flex-col">
        <span className="text-white text-sm font-light">{label}</span>
        <span className="text-lg text-gradient">{value}</span>
        <span className="text-white font-bold">{subtitle}</span>
      </div>
    </div>
  );
};

export default LabeledValue;
