import Scaffold from "@/components/Scaffold";

import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PieChartData from "@/components/DataView/PieChartData";
import { PaymentsPerCountry } from "@/components/Graphs/payments/PaymentsPerCountry";
import { AffiliatesComission } from "@/components/Graphs/payments/AffiliatesComission";
import { PaymentsOvertime } from "@/components/Graphs/payments/PaymentsOvertime";

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
      <div className="grid gap-8">
        <PaymentsOvertime />
        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-2 grid grid-cols-2 gap-6">
            <PieChartData
              title="Payment Method"
              datasets={[perCoin]}
              labels={perCoin.labels}
            />
            <div className="grid grid-rows-2 gap-6">
              <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl h-full">
                <p className="mb-6 text-xl font-thin">Payments received</p>
                <div className="flex flex-row justify-between w-full mt-4">
                  <p className="text-[#7896A1]">Total</p>
                  <p className="text-[#F8F8F8] font-regular">
                    $ {data?.total?.totalSold?.toLocaleString()} USD
                  </p>
                </div>
                <div className="flex flex-row justify-between w-full mt-4">
                  <p className="text-[#7896A1]">Average (monthly)</p>
                  <p className="text-[#F8F8F8] font-regular">
                    $ {data?.avgPerMonth?.toLocaleString()} USD
                  </p>
                </div>
              </div>
              <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl h-full">
                <p className="mb-6 text-xl font-thin">Payments sent</p>
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
          <PaymentsPerCountry data={data} />
        </div>
        <AffiliatesComission />
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
