import Router from "next/router";

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
      className={`text-xl hover:cursor-pointer hover:text-white text-[#7896A1] mx-auto ${
        active ? "text-white" : ""
      }`}
    >
      {icon}
      {/* <span className="ml-2">{text}</span> */}
    </a>
  );
};

export default NavLink;
