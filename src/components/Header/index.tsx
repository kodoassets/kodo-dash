import { Web3Button } from "@web3modal/react";

const Header = () => {
  return (
    <div className="bg-white text-black h-16 flex flex-row items-center justify-between px-4">
      <span className="">KODO1</span>
      <Web3Button />
    </div>
  );
};

export default Header;
