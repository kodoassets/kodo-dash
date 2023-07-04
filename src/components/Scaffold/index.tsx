import { ToastContainer } from "react-toastify";
import Header from "../Header";
import Sidenav from "../Sidenav";

interface Props {
  children: React.ReactNode;
  title: string;
  className?: string;
}
const Scaffold = ({ children, title, className }: Props) => {
  return (
    <div
      className={`flex flex-row min-h-screen bg-[#000F14] truncate ${
        className || ""
      }`}
    >
      <Sidenav />
      <div className="w-full pl-32 pr-16 md:px-8 lg:px-16 xl:px-32">
        <div className="mb-16 bg-transparent">
          <h1 className="text-3xl mt-12">{title}</h1>
          <Header />
        </div>
        <main className="w-full text-black p-4">{children}</main>
      </div>
    </div>
  );
};

export default Scaffold;
