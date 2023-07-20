import Scaffold from "@/components/Scaffold";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProgressBar from "@/components/ProgressBar";
import useAuth from "@/core/use-auth";
import LineChart from "@/components/Charts/line";

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

  console.log(data);
  const { data: stats } = useQuery(["other"], {
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/backoffice/payments`, {
          headers: {
            // "X-signed-message": signedMessage,
            "X-wallet-address": address,
          },
        })
        .then((res) => res.data),
  });

  if (!stats) return null;

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 3; i++) {
      const index = Math.floor(Math.random() * 16);
      color += letters[index] + letters[index];
    }
    return color;
  };

  return (
    <Scaffold title="Users" className="truncate">
      <main className="grid gap-16">
        <div className="flex flex-row flex-basis-[420px] gap-4">
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
            subtitle={`of ${data?.activeUsers}`}
            src="/imgs/dividends_paid.png"
          />
        </div>

        <div className="grid grid-cols-3">
          <div className="max-w-[320px] text-center">
            <p className="text-white font-light text-sm mb-2">
              Users per Token
            </p>
            <div className="bg-gradient-2 rounded-lg p-4 ">
              {data?.usersPerToken?.map((Data: any) => (
                <div key={Data.propertyId} className="flex flex-row mt-2">
                  <span className="text-white bg-[#00AEEF] rounded-lg p-1 mr-2 text-xs min-w-[80px]">
                    {Data.tokenSymbol}
                  </span>
                  <ProgressBar
                    progress={
                      +(
                        (Data.userWalletCount * 100) /
                        data.activeUsers
                      ).toFixed(0)
                    }
                    innerLabel={Data.userWalletCount.toString()}
                  />
                  <span className="text-[#7896A1] bg-[#000F14] rounded-lg p-1 ml-2 min-w-[40px] text-xs">
                    {((Data.userWalletCount * 100) / data.activeUsers).toFixed(
                      0
                    )}
                    %
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="max-w-[320px] text-center">
            <p className="text-white font-light text-sm mb-2">
              Users per Country
            </p>
            <div className="bg-gradient-2 rounded-lg p-4 ">
              {data?.usersPerCountry?.map((Data: any) => (
                <div key={Data._id} className="flex flex-row mt-2">
                  <span className="text-white bg-[#00AEEF] rounded-lg p-1 mr-2 text-xs min-w-[80px]">
                    {Data._id}
                  </span>
                  <ProgressBar
                    progress={
                      +((Data.count * 100) / data.activeUsers).toFixed(0)
                    }
                    innerLabel={Data.count.toString()}
                  />
                  <span className="text-[#7896A1] bg-[#000F14] rounded-lg p-1 ml-2 min-w-[40px] text-xs">
                    {((Data.count * 100) / data.activeUsers).toFixed(0)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl h-[400px]">
          <div className="grid grid-cols-3 mt-4 gap-9">
            <div className="col-span-1">
              <table className="w-full font-light">
                <thead>
                  <tr>
                    <th className="text-center pb-4 font-extralight text-sm">
                      #
                    </th>
                    <th className="text-center pb-4 font-extralight text-sm">
                      COUNTRY
                    </th>
                    <th className="text-center pb-4 font-extralight text-sm">
                      %
                    </th>
                    <th className="text-center pb-4 font-extralight text-sm">
                      AVG. INVEST
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats?.totalPerCountry
                    ?.sort((a: any, b: any) => b.TotalSold - a.TotalSold)
                    .map((row: any, index: number) => (
                      <tr
                        key={row.country}
                        className="bg-[#000F14] h-7 text-sm"
                      >
                        <td className="text-center w-10 bg-[#00AEEF80]">
                          {index}
                        </td>
                        <td className="text-left w-64 px-3 py-2">
                          <div className={`relative bg-[#000F1480] text-white`}>
                            <div className="z-[9999] relative pl-2 flex justify-between">
                              <span>{row.Country}</span>
                              <span className="text-xs">
                                {row.TotalSold.toLocaleString()}
                              </span>
                            </div>
                            <div
                              className={`absolute top-0 left-0 bottom-0 h-full bg-[#00AEEF] z-0`}
                              style={{
                                width: `${(row.TotalSold / 1800) * 100}%`,
                                background: getRandomColor(),
                              }}
                            />
                          </div>
                        </td>
                        <td className="text-left px-3">
                          {Math.round(row.TotalSold / 2000) * 100}%
                        </td>
                        <td className="text-left w-32">
                          $ {row.TotalSold.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            <div className="w-full h-[300px] col-span-2">
              <LineChart
                data={{
                  labels: [
                    "January",
                    "February",
                    "March",
                    "April",
                    "May",
                    "June",
                  ],
                  dataset1: [10, 15, 10, 50, 30, 20],
                  dataset2: [5, 21, 15, 52, 25, 80],
                }}
              />
            </div>
          </div>
        </div>
      </main>
    </Scaffold>
  );
}
