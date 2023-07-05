import Scaffold from "@/components/Scaffold";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProgressBar from "@/components/ProgressBar";
import useAuth from "@/core/use-auth";

export default function Home() {
  useAuth(["viewUsers"]);
  const { address } = useAccount();

  const { data } = useQuery(["stats"], {
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/backoffice/users`, {
          headers: {
            // "X-signed-message": signedMessage,
            "X-wallet-address": address,
          },
        })
        .then((res) => res.data),
  });

  const usersPerToken = [
    {
      token: "KODO1",
      users: 1000,
      percentageOfTotal: 50,
    },
    {
      token: "KODO2",
      users: 500,
      percentageOfTotal: 25,
    },
    {
      token: "KODO3",
      users: 250,
      percentageOfTotal: 12.5,
    },
    {
      token: "KODO4",
      users: 250,
      percentageOfTotal: 12.5,
    },
  ];

  return (
    <Scaffold title="Dashboard" className="truncate">
      <div className="flex flex-row flex-basis-[420px] gap-8">
        <DataWithIcon
          label="Total Users"
          value={data?.activeUsers || "-"}
          subtitle={`all time`}
          src="/imgs/tokens_sold.png"
        />
        <DataWithIcon
          label="Active Users"
          value={data?.activeUsers || "-"}
          subtitle={`of ${data?.activeUsers}`}
          src="/imgs/total_revenue.png"
        />
        <DataWithIcon
          label="Average Tokens"
          value={data?.avgTokensPerUser?.toFixed(2) || "-"}
          subtitle={"per user"}
          src="/imgs/token_price.png"
        />
        <DataWithIcon
          label="Multiple Token Holders"
          value={data?.multipleTokenHolders || "-"}
          subtitle={`of ${data?.ctiveUsers}`}
          src="/imgs/dividends_paid.png"
        />
      </div>

      <div className="mt-8 ">
        <div className="max-w-[320px] text-center">
          <p className="text-white font-light text-sm mb-2">Users per Token</p>
          <div className="bg-gradient-2 rounded-lg p-4">
            {usersPerToken.map((data) => (
              <div key={data.token} className="flex flex-row mt-2">
                <span className="text-white bg-[#00AEEF] rounded-lg p-1 mr-2 text-xs">
                  {data.token}
                </span>
                <ProgressBar
                  progress={data.percentageOfTotal}
                  innerLabel={data.users.toString()}
                />
                <span className="text-[#7896A1] bg-[#000F14] rounded-lg p-1 ml-2 min-w-[40px] text-xs">
                  {data.percentageOfTotal}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-[320px] text-center mt-4">
          <p className="text-white font-light text-sm mb-2">
            Users per Country
          </p>
          <div className="bg-gradient-2 rounded-lg p-4">
            {usersPerToken.map((data) => (
              <div key={data.token} className="flex flex-row mt-2">
                <span className="text-white bg-[#00AEEF] rounded-lg p-1 mr-2 text-xs">
                  {data.token}
                </span>
                <ProgressBar
                  progress={data.percentageOfTotal}
                  innerLabel={data.users.toString()}
                />
                <span className="text-[#7896A1] bg-[#000F14] rounded-lg p-1 ml-2 min-w-[40px] text-xs">
                  {data.percentageOfTotal}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Scaffold>
  );
}
