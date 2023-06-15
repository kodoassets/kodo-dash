import Router from "next/router";
import { IconType } from "react-icons";

interface Props {
  text: string;
  route: string;
  active?: boolean;
  icon?: React.ReactElement;
}
const NavLink = ({ text, active, icon, route }: Props) => {
  return (
    <a
      onClick={() => Router.push(route)}
      className={`px-4 py-4 hover:bg-slate-500 hover:cursor-pointer text-gray-200 w-full ${
        active ? "bg-slate-500 text-white" : ""
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </a>
  );
};

export default NavLink;
