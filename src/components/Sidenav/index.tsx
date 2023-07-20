import Image from "next/image";
import NavLink from "./NavLink";
import { FaBuilding, FaWallet, FaUser, FaLock } from "react-icons/fa";
import { useRouter } from "next/router";

const Sidenav = () => {
  const { asPath } = useRouter();

  return (
    <div className="bg-[#001C25] flex flex-col w-24">
      <div className="h-16 flex items-center justify-center my-16">
        <Image src="/svgs/logo.svg" alt="logo" width={40} height={40} />
      </div>
      {/* <NavLink
        route={"/dashboard/63e81785d438180b942e5304"}
        active={asPath === "/dashboard"}
        text="Dashboard"
        icon={<FaBuilding className="inline" />}
      /> */}
      <div className="flex flex-col gap-12">
        <NavLink
          route="/offerings"
          active={asPath === "/offerings"}
          text="Offerings"
          icon={<FaBuilding className="inline" />}
        />
        <NavLink
          route="/payments"
          active={asPath === "/payments"}
          text="Payments"
          icon={<FaWallet className="inline" />}
        />
        <NavLink
          route="/users"
          active={asPath === "/users"}
          text="Users"
          icon={<FaUser className="inline" />}
        />
        <NavLink
          route="/permissions"
          active={asPath === "/permissions"}
          text="Permissions"
          icon={<FaLock className="inline" />}
        />
      </div>
    </div>
  );
};

export default Sidenav;
