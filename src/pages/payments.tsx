import Scaffold from "@/components/Scaffold";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PieChartData from "@/components/DataView/PieChartData";

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
      <div className="flex flex-row gap-8 flex-wrap">
        <PieChartData
          title="Payment Method"
          datasets={[perCoin]}
          labels={perCoin.labels}
        />
        <div>
          <div className="bg-gradient-2 pt-6 pb-8 px-8 text-white text-center w-[270px] rounded-lg">
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
          <div className="bg-gradient-2 pt-6 pb-8 px-8 text-white text-center w-[270px] rounded-lg mt-4">
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
      <div className="flex flex-row gap-8 flex-wrap mt-8">
        <PieChartData
          title="Payment per Blockchain"
          datasets={[perBlockchain]}
          labels={perBlockchain.labels}
        />
      </div>
      {/* <div className="mt-8 ">
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
      </div> */}
    </Scaffold>
  );
}
