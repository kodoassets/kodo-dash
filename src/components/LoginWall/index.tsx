import { getProperties } from "@/queries/get-properties";
import { useQuery } from "@tanstack/react-query";
import { Web3Button } from "@web3modal/react";
import { useState } from "react";
import { useAccount } from "wagmi";

const LoginWall = () => {
  const [signedMessage, setSignedMessage] = useState("");
  const { address, isConnecting, isDisconnected } = useAccount();

  const isAdmin = false;
  const getMessage = () => {
    if (!address) {
      return `Connect your wallet to continue...`;
    }
    if (address && !signedMessage) {
      return `We need you to sign a message to continue...`;
    }

    if (signedMessage && !isAdmin) {
      return `You wallet does not have access to this dashboard...`;
    }
  };

  return (
    <div className="h-screen">
      <div className="bg-[url('/imgs/login_wall_bg.png')] bg-cover bg-no-repeat h-full text-white">
        <div className="fixed w-full h-full bg-zinc-800 opacity-80" />
        <div className="w-full h-full backdrop-blur-md flex flex-col items-center justify-center">
          <p className="text-3xl mb-4">{getMessage()}</p>
          <Web3Button />
        </div>
        /
      </div>
    </div>
  );
};

export default LoginWall;
