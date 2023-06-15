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
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Home() {
  const { address } = useAccount();

  // const { signedMessage, walletAddress, setWalletAddress, setSignedMessage } =
  //   useAuthStore((state) => state);

  // useEffect(() => {
  //   if (address !== walletAddress) {
  //     setWalletAddress("");
  //     setSignedMessage("");
  //   }
  // }, [address, walletAddress, setWalletAddress, setSignedMessage]);

  // useEffect(() => {
  //   if (!signedMessage || !walletAddress) {
  //     Router.push("/");
  //   }
  // }, [signedMessage, walletAddress]);

  const { data } = useQuery(["stats"], {
    queryKey: ["stats"],
    queryFn: () =>
      axios
        .get("http://localhost:3002/backoffice/stats", {
          headers: {
            // "X-signed-message": signedMessage,
            "X-wallet-address": address,
          },
        })
        .then((res) => res.data),
  });

  return (
    <Scaffold title="Dashboard">
      <Card className="px-4 py-2 grid grid-cols-4 justify-between">
        <LabeledValue
          color="blue"
          label="Tokens sold"
          value={data?.tokensSold || "-"}
        />
        <LabeledValue
          color="red"
          label="Total sold"
          value={`$${Number(data?.totalSold).toFixed(2) || "-"}`}
        />
        <LabeledValue
          color="yellow"
          label="Confirmed orders"
          value={data?.totalOrders || "-"}
        />
        <LabeledValue
          color="green"
          label="Average Ticket Price"
          value={`$${data?.averageTicketPrice.toFixed(2) || "-"}`}
        />
      </Card>
      <Card className="px-4 py-2 grid grid-cols-4 justify-between mt-2">
        <LabeledValue color="green" label="Tokens available" value="12000" />
        <LabeledValue
          color="yellow"
          label="Active users"
          value={data?.totalActiveUsers || "-"}
        />
      </Card>
      <Card className="h-72 flex flex-row justify-center mt-4">
        <PaymentMethodsStacked />
      </Card>
      <Card className="h-72 flex flex-row justify-center mt-4">
        <p>transactions</p>
      </Card>
    </Scaffold>
  );
}
