import Header from "@/components/Header";
import Sidenav from "@/components/Sidenav";
import Scaffold from "@/components/Scaffold";
import Card from "@/components/Card";
import LabeledValue from "@/components/DataView/LabeledValue";
import PaymentMethodsStacked from "@/components/PaymentMethodsStacked";
import Router from "next/router";
import { useEffect } from "react";
import useAuthStore from "@/core/auth-store";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();

  const { signedMessage, walletAddress, setWalletAddress, setSignedMessage } =
    useAuthStore((state) => state);

  useEffect(() => {
    if (address !== walletAddress) {
      setWalletAddress("");
      setSignedMessage("");
    }
  }, [address, walletAddress, setWalletAddress, setSignedMessage]);

  useEffect(() => {
    if (!signedMessage || !walletAddress) {
      Router.push("/");
    }
  }, [signedMessage, walletAddress]);

  return (
    <div className="flex flex-row min-h-screen">
      <Sidenav />
      <div className="w-full">
        <Header />
        <Scaffold>
          <Card className="px-4 py-2 flex flex-row justify-between">
            <LabeledValue color="blue" label="Tokens sold" value="9,123" />
            <LabeledValue color="red" label="Total sold" value="$140.000" />
            <LabeledValue color="yellow" label="Confirmed orders" value="594" />
            <LabeledValue
              color="green"
              label="Tokens available"
              value="12000"
            />
          </Card>
          <Card className="h-72 flex flex-row justify-center mt-4">
            <PaymentMethodsStacked />
          </Card>
          <Card className="h-72 flex flex-row justify-center mt-4">
            <p>transactions</p>
          </Card>
        </Scaffold>
      </div>
    </div>
  );
}
