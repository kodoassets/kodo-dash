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
      className={`px-4 py-4 text-sm hover:cursor-pointer hover:text-white text-[#7896A1] ml-8 mx-auto ${
        active ? "text-white" : ""
      }`}
    >
      {icon}
      <span className="ml-2">{text}</span>
    </a>
  );
};

export default NavLink;
