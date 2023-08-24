import Scaffold from "@/components/Scaffold";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProgressBar from "@/components/ProgressBar";
import useAuth from "@/core/use-auth";
import LineChart from "@/components/Charts/line";
import { PrimaryUsersPerCountryOvertime } from "@/components/Graphs/users/PrimaryUsersPerCountryOvertime";
import { AffiliatesComission } from "@/components/Graphs/payments/AffiliatesComission";
import { UsersPerToken } from "@/components/Graphs/users/UsersPerToken";
import { TokenHolders } from "@/components/Graphs/users/TokenHolders";
import { UsersOvertime } from "@/components/Graphs/users/UsersOvertime";

export default function Home() {
  // useAuth(["viewUsers"]);
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

  return (
    <Scaffold title="Users" className="truncate">
      <main className="grid gap-8">
        <div className="flex flex-row flex-basis-[420px] gap-4">
          <DataWithIcon
            label="Total Users"
            value={data?.activeUsers || "-"}
            subtitle={`all time`}
            src="/imgs/tokens_sold.png"
          />

          <DataWithIcon
            label="Average tokens per user"
            value={data?.avgTokensPerUser?.toFixed(2) || "-"}
            subtitle={"per user"}
            src="/imgs/token_price.png"
          />
          <DataWithIcon
            label="Multiple Token Holders"
            value={data?.multipleTokenHolders || "-"}
            subtitle={`of ${data?.activeUsers}`}
            src="/imgs/dividends_paid.png"
          />
        </div>

        <UsersOvertime />
        <div className="grid xl:grid-cols-2 gap-6">
          <UsersPerToken data={data} />
          <TokenHolders data={data} />
        </div>
        <PrimaryUsersPerCountryOvertime />
      </main>
    </Scaffold>
  );
}
