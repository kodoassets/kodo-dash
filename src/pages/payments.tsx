import Scaffold from "@/components/Scaffold";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PieChartData from "@/components/DataView/PieChartData";
import PieChart from "@/components/Charts/pie";

export default function Home() {
  // useAuth(["viewUsers"]);
  const { address } = useAccount();

  const { data } = useQuery(["stats"], {
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

  if (!data) return null;

  const perCoin = {
    labels: ["USDC", "USDT", "BUSD"],
    data: [
      data?.total?.perCoin?.USDC,
      data?.total?.perCoin?.USDT,
      data?.total?.perCoin?.BUSD,
    ],
    backgroundColor: ["#065F70", "#A314AB", "#1255F1"],
  };

  const perBlockchain = {
    labels: ["ETH", "POLYGON"],
    data: [
      data?.total?.perBlockchain?.ETH,
      data?.total?.perBlockchain?.POLYGON,
    ],
    backgroundColor: ["#2E6273", "#136A8A"],
  };

  return (
    <Scaffold title="Payments" className="truncate">
      <div className="grid grid-cols-4 gap-9">
        <div className="col-span-2 grid grid-cols-2">
          <PieChartData
            title="Payment Method"
            datasets={[perCoin]}
            labels={perCoin.labels}
          />
          <div>
            <div className="bg-gradient-2 pt-6 pb-8 px-8 text-white text-center rounded-lg">
              <p>Payments received</p>
              <div className="flex flex-row justify-between w-full mt-4">
                <p className="text-[#7896A1]">Total</p>
                <p className="text-[#F8F8F8] font-regular">
                  $ {data?.total?.totalSold?.toLocaleString()} USD
                </p>
              </div>
              <div className="flex flex-row justify-between w-full mt-4">
                <p className="text-[#7896A1]">Average (monthly)</p>
                <p className="text-[#F8F8F8] font-regular">N/A</p>
              </div>
            </div>
            <div className="bg-gradient-2 pt-6 pb-8 px-8 text-white text-center rounded-lg mt-4">
              <p>Payments sent</p>
              <div className="flex flex-row justify-between w-full mt-4">
                <p className="text-[#7896A1]">Total</p>
                <p className="text-[#F8F8F8] font-regular">N/A</p>
              </div>
              <div className="flex flex-row justify-between w-full mt-4">
                <p className="text-[#7896A1]">Average (monthly)</p>
                <p className="text-[#F8F8F8] font-regular">N/A</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-start text-white bg-gradient-2 rounded-lg py-4 px-8 w-full col-span-2">
          <p className="mb-4">Payments per Country</p>
          <div className="grid grid-cols-2 mt-4">
            <div>
              <PieChart
                labels={data?.totalPerCountry?.map((row) => row.Country)}
                datasets={[
                  {
                    data: data?.totalPerCountry?.map((row) => row.TotalSold),
                  },
                ]}
              />
              <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-4">
                {data?.totalPerCountry?.map((l) => (
                  <span key={l}>{l.Country}</span>
                ))}
              </div>
            </div>
            <div>
              <table className="w-full font-light">
                <thead>
                  <tr>
                    <th className="text-left pb-4 font-extralight text-lg">
                      Country
                    </th>
                    <th className="text-left pb-4 font-extralight text-lg">
                      Amount
                    </th>
                    <th className="text-center pb-4 font-extralight text-lg">
                      %
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.totalPerCountry
                    ?.sort((a, b) => b.TotalSold - a.TotalSold)
                    .map((row, index: number) => (
                      <tr
                        key={row.country}
                        className="bg-[#000F14] h-7 text-sm"
                      >
                        <td className="text-left w-48 px-3 rounded-tl-2xl rounded-bl-2xl py-2">
                          {index + 1} - {row.Country}
                        </td>
                        <td className="text-left w-32">
                          $ {row.TotalSold.toLocaleString()}
                        </td>
                        <td className="text-left px-3 rounded-tr-2xl rounded-br-2xl">
                          {(
                            (row.TotalSold / data?.total?.totalSold) *
                            100
                          ).toFixed(2)}
                          %
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-row gap-8 flex-wrap mt-8">
        <PieChartData
          title="Payment per Blockchain"
          datasets={[perBlockchain]}
          labels={perBlockchain.labels}
        />
      </div> */}
    </Scaffold>
  );
}
