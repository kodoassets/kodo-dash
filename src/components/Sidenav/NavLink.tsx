interface Props {
  text: string;
  active?: boolean;
}
const NavLink = ({ text, active }: Props) => {
  return (
    <a
      className={`px-4 py-2 hover:bg-slate-500 hover:cursor-pointer text-gray-200 w-full ${
        active ? "bg-slate-500 text-white" : ""
      }`}
    >
      {text}
    </a>
  );
};

export default NavLink;
