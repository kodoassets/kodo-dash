import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import Button from "../Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import Router from "next/router";
import useAuthStore from "@/core/auth-store";
import { apiUrl } from "@/data/queries/config";

const SignMessage = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: signedMessage, signMessage } = useSignMessage();
  const { mutateAsync: createNonce } = useMutation({
    mutationFn: () => {
      return axios.post(apiUrl + "/accounts/verifications", {
        wallet: {
          address,
        },
      });
    },
  });

  useEffect(() => {
    if (signedMessage && address) {
      localStorage.setItem("signedMessage", signedMessage);
      localStorage.setItem("walletAddress", address);

      // setSignedMessage(signedMessage);
      // setWalletAddress(address);
      // Router.push("/dashboard");
    }
  }, [signedMessage, address]);

  return (
    <>
      <p className="text-3xl mb-4">We need you to sign a message to continue</p>
      <Button
        text="Sign message"
        onClick={async () => {
          const data = await createNonce();
          if (!data?.data?.nonce) {
            // handle error
            return;
          }
          signMessage({ message: data.data.nonce });
        }}
      />
      <Button text="Disconnect" className="mt-2" onClick={() => disconnect()} />
    </>
  );
};

export default SignMessage;
