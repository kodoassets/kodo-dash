import { Web3Button } from "@web3modal/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import SignMessage from "./SignMessage";

const LoginWall = () => {
  const { address } = useAccount();

  return (
    <div className="h-screen">
      <div className="bg-[url('/imgs/login_wall_bg.png')] bg-cover bg-no-repeat h-full text-white">
        <div className="fixed w-full h-full bg-zinc-800 opacity-80" />
        <div className="w-full h-full backdrop-blur-md flex flex-col items-center justify-center">
          {address ? (
            <SignMessage />
          ) : (
            <>
              <p className="text-3xl mb-4">
                Connect a wallet with sufficient permissions to continue
              </p>
              <Web3Button />
            </>
          )}
        </div>
        /
      </div>
    </div>
  );
};

export default LoginWall;
