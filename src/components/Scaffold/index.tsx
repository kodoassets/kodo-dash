import Header from "../Header";
import Sidenav from "../Sidenav";

interface Props {
  children: React.ReactNode;
}
const Scaffold = ({ children }: Props) => {
  return (
    <div className="flex flex-row min-h-screen">
      <Sidenav />
      <div className="w-full">
        <Header />
        <main className="w-full h-full bg-gray-200 text-black p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Scaffold;
