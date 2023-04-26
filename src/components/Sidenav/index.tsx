import Image from "next/image";
import NavLink from "./NavLink";

interface LabelProps {
  text: string;
}
const Label = ({ text }: LabelProps) => (
  <span className="uppercase font-bold text-xs text-gray-300 px-3 py-3 mt-4">
    {text}
  </span>
);

const Sidenav = () => {
  return (
    <div className="bg-slate-700 flex flex-col w-64">
      <div className="h-16 flex items-center justify-center border-b border-slate-600">
        <Image src="/svgs/logo.svg" alt="logo" width={100} height={100} />
      </div>
      <Label text="dashboard" />
      <NavLink active text="Offerings" />
    </div>
  );
};

export default Sidenav;
