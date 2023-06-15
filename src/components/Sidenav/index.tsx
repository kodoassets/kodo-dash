import Image from "next/image";
import NavLink from "./NavLink";
import { FaBuilding, FaBook } from "react-icons/fa";
import { useRouter } from "next/router";

const Sidenav = () => {
  const { asPath } = useRouter();

  return (
    <div className="bg-[#001C25] flex flex-col w-64">
      <div className="h-16 flex items-center justify-center mb-16">
        <Image src="/svgs/logo.svg" alt="logo" width={100} height={100} />
      </div>
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