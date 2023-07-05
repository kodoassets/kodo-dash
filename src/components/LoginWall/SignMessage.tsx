import { useAccount, useDisconnect, useSignMessage } from "wagmi";
import Button from "../Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
import Router from "next/router";
import useAuthStore from "@/core/auth-store";
import { apiUrl } from "@/data/queries/config";
import { SIGNED_MESSAGE_KEY } from "@/core/use-auth";

const SignMessage = () => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: signedMessage, signMessage } = useSignMessage();

  const { setSignedMessage } = useAuthStore((state) => state);

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
      setSignedMessage(signedMessage);
      Router.push("/dashboard/63e81785d438180b942e5304"); // todo: check what permissions user has and route to a page that they have access to
    }
  }, [signedMessage, address, setSignedMessage]);

  return (
    <>
      <p className="text-3xl mb-4">We need you to sign a message to continue</p>
      <Button
        text="Sign message"
        onClick={async () => {
          const data = await createNonce();
          if (!data?.data?.nonce) {
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
