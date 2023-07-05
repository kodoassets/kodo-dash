import Scaffold from "@/components/Scaffold";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProgressBar from "@/components/ProgressBar";
import PieChartData from "@/components/DataView/PieChartData";
import useAuth from "@/core/use-auth";

export default function Home() {
  useAuth(["viewDashboard"]);
  const { address } = useAccount();

  const { data } = useQuery(["stats"], {
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/backoffice/stats`, {
          headers: {
            // "X-signed-message": signedMessage,
            "X-wallet-address": address,
          },
        })
        .then((res) => res.data),
  });

  const mockDataset = {
    label: "My First Dataset",
    data: [300, 50, 20],
    backgroundColor: ["#065F70", "#A314AB", "#1255F1"],
    hoverOffset: 4,
  };

  const mockDataset2 = {
    label: "My First Dataset",
    data: [20, 80],
    backgroundColor: ["#2E6273", "#136A8A", "#4C2D9A", "#854DB8", "#A95EB5"],
  };

  const doubleMockChartProps = {
    labels: ["ETH", "POLYGON"],
    datasets: [mockDataset, mockDataset2],
  };

  const mockChartProps = {
    labels: ["USDC", "USDT", "Yellow"],
    datasets: [mockDataset],
  };

  return (
    <Scaffold title="Dashboard" className="truncate">
      <div className="flex flex-row flex-wrap gap-8 justify-between">
        <DataWithIcon
          label="Tokens sold"
          value={data?.tokensSold || "-"}
          subtitle={`of ${data?.totalSupply}`}
          src="/imgs/tokens_sold.png"
        />
        <DataWithIcon
          label="Total Revenue"
          value={data?.totalRevenue || "-"}
          subtitle={`of ${data?.totalSupply * data?.tokenPriceInUsd}`}
          src="/imgs/total_revenue.png"
        />
        <DataWithIcon
          label="Token Price"
          value={data?.tokenPriceInUsd || "-"}
          subtitle={`USD`}
          src="/imgs/token_price.png"
        />
        <DataWithIcon
          label="Dividends Paid"
          value={data?.dividendsPaid || "-"}
          subtitle="USD"
          src="/imgs/dividends_paid.png"
        />
        <DataWithIcon
          label="Cashback Paid"
          value={data?.cashbackPaid || "-"}
          subtitle={`of ${data?.cashbackPaid}`}
          src="/imgs/cashback_paid.png"
        />
      </div>

      <ProgressBar className="w-full my-16" progress={75} />

      <div className="flex flex-row gap-8 flex-wrap justify-between">
        <PieChartData title="Payment Method" {...doubleMockChartProps} />
        <PieChartData title="Payments per Country" {...mockChartProps} />
        <PieChartData title="Users per Country" {...mockChartProps} />
        <div className="flex flex-col py-8 justify-between">
          <div className="flex flex-row">
            <DataWithIcon
              label="Tokens sold"
              value={data?.tokensSold || "-"}
              subtitle={`of ${data?.totalSupply}`}
              src="/imgs/tokens_sold.png"
            />
            <div className="flex flex-col ml-2">
              <p className="text-center text-white justify-self-end text-sm">
                Avg
                <br />
                Ticket
              </p>
              <div className="bg-[#005E81] border border-gradient rounded-lg text-[#F8F8F8] px-2 py-1 mt-1">
                12312.83
              </div>
            </div>
          </div>
          <div>
            <DataWithIcon
              label="Tokens sold"
              value={data?.tokensSold || "-"}
              subtitle={`of ${data?.totalSupply}`}
              src="/imgs/tokens_sold.png"
            />
          </div>
        </div>
      </div>
    </Scaffold>
  );
}
