import Image from "next/image";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Sidenav from "@/components/Sidenav";
import Scaffold from "@/components/Scaffold";
import Card from "@/components/Card";
import LabeledValue from "@/components/DataView/LabeledValue";
import PaymentMethodsStacked from "@/components/PaymentMethodsStacked";
import LoginWall from "@/components/LoginWall";
import { useAccount } from "wagmi";
import Transaction from "@/components/Transaction";

export default function Home() {
  const { address } = useAccount();
  console.log(address);
  if (!address || address !== "0x8Dc4D04c9646a410580a47660e2D11a8E3D91d69")
    return <LoginWall />;

  const orders = [
    {
      id: "1",
      date: new Date().toISOString(),
      amountInUsd: 140,
      tokenAmount: 1,
      tokenSymbol: "KODO1",
      user: {
        email: "andre.daher@cryptum.io",
        wallet: "0x8Dc4D04c9646a410580a47660e2D11a8E3D91d69",
      },
    },
    {
      id: "2",
      date: new Date().toISOString(),
      amountInUsd: 210,
      tokenAmount: 1.5,
      tokenSymbol: "KODO1",
      user: {
        email: "andre.daher@cryptum.io",
        wallet: "0x8Dc4D04c9646a410580a47660e2D11a8E3D91d69",
      },
    },
    {
      id: "3",
      date: new Date().toISOString(),
      amountInUsd: 280,
      tokenAmount: 2,
      tokenSymbol: "KODO1",
      user: {
        email: "andre.daher@cryptum.io",
        wallet: "0x8Dc4D04c9646a410580a47660e2D11a8E3D91d69",
      },
    },
  ];
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
          <Card className="h-72 flex flex-row mt-4">
            <div className="w-full">
              <div className="grid grid-cols-4 w-full items-center justify-center text-center py-4 border-b bg-gray-100">
                <span>Date</span>
                <span>Email</span>
                <span>Amount</span>
                <span>Link</span>
              </div>
              {orders.map((o) => (
                <Transaction key={o.id} {...o} />
              ))}
            </div>
          </Card>
        </Scaffold>
      </div>
    </div>
  );
}
