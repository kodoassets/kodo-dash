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
        text="Dashboard"
        icon={<FaBuilding className="inline" />}
      />
      <NavLink
        route="/offerings"
        active={asPath === "/offerings"}
        text="Offerings"
        icon={<FaBuilding className="inline" />}
      />
      <NavLink
        route="/payments"
        active={asPath === "/offerings/new"}
        text="Payments"
        icon={<FaBuilding className="inline" />}
      />
      <NavLink
        route="/affiliates"
        text="Affiliates"
        icon={<FaBook className="inline" />}
      />
    </div>
  );
};

export default Sidenav;
