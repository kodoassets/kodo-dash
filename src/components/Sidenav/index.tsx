import Image from "next/image";
import NavLink from "./NavLink";
import { FaBuilding, FaBook } from "react-icons/fa";
import { useRouter } from "next/router";

interface LabelProps {
  text: string;
}
const Label = ({ text }: LabelProps) => (
  <span className="uppercase font-bold text-xs text-gray-300 px-3 py-3 mt-4">
    {text}
  </span>
);

const Sidenav = () => {
  const { asPath } = useRouter();

  return (
    <div className="bg-slate-700 flex flex-col w-64">
      <div className="h-16 flex items-center justify-center border-b border-slate-600">
        <Image src="/svgs/logo.svg" alt="logo" width={100} height={100} />
      </div>
      <Label text="dashboard" />
      <NavLink
        route={"/dashboard"}
        active={asPath === "/dashboard"}
        text="Offerings"
        icon={<FaBuilding className="inline" />}
      />
      <NavLink
        route="/offerings/new"
        active={asPath === "/offerings/new"}
        text="New offering"
        icon={<FaBuilding className="inline" />}
      />
      <NavLink
        route="/academy"
        text="Academy"
        icon={<FaBook className="inline" />}
      />
    </div>
  );
};

export default Sidenav;
