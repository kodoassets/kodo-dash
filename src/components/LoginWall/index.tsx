import { initVerification } from "@/data/mutations/init-verification";
import { getProperties } from "@/data/queries/get-properties";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Web3Button } from "@web3modal/react";
import { useEffect, useRef, useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

const LoginWall = () => {
  const [nonce, setNonce] = useState("");
  const { address, isConnecting, isDisconnected } = useAccount();

  const {
    data: signedMessage,
    isError,
    isLoading,
    isSuccess,
    signMessage,
  } = useSignMessage({
    message: nonce,
  });

  const mutation = useMutation({
    mutationFn: (address: string) => initVerification(address),
    onSuccess: (data, error) => {
      if (data?.data?.nonce) {
        setNonce(data?.data?.nonce);
      }
    },
  });

  const isMutationRunning = useRef(false);
  const isAdmin = false;

  useEffect(() => {
    if (isSuccess) {
    }
  });

  useEffect(() => {
    if (!address || mutation.isLoading || isMutationRunning.current) return;

    isMutationRunning.current = true;
    mutation.mutate(address);
  }, [address, mutation]);

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
          <p className="text-3xl mb-4" suppressHydrationWarning={true}>
            {getMessage()}
          </p>
          {!address && <Web3Button />}
          {address && nonce && !signedMessage && (
            <button
              onClick={() =>
                signMessage({
                  message: nonce,
                })
              }
            >
              Sign
            </button>
          )}
        </div>
        /
      </div>
    </div>
  );
};

export default LoginWall;
