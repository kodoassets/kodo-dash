import Scaffold from "@/components/Scaffold";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PieChartData from "@/components/DataView/PieChartData";
import { PaymentsPerCountry } from "@/components/Graphs/payments/PaymentsPerCountry";
import { AffiliatesComission } from "@/components/Graphs/payments/AffiliatesComission";
import { PaymentsOvertime } from "@/components/Graphs/payments/PaymentsOvertime";
import { useState } from "react";

export default function Home() {
  // useAuth(["viewUsers"]);
  const { address } = useAccount();

  const [selectedTooltip, setSelectedTooltip] = useState<any>(null);

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
    backgroundColor: ["#000F14", "#00AEEF", "#4C2D9A"],
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
        <div className="grid xl:grid-cols-4 gap-6">
          <div className="col-span-2 grid xl:grid-cols-2 gap-6">
            <PieChartData
              title="Payment Method"
              datasets={[perCoin]}
              labels={perCoin.labels}
              onElementSelect={(element: any) => {
                setSelectedTooltip(element);
              }}
              externalTooltip={
                <div className=" bg-gradient-2 p-4 border border-white/20 rounded-2xl backdrop-blur-md">
                  <div className="text-center mb-4">
                    <p className="font-medium text-xl text-[#7896A1]">
                      {selectedTooltip?.label}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-8 w-48">
                    <div>
                      <p className="text-[#F8F8F8]">Top Countries</p>
                      <ul className="mt-2">
                        {data?.totalPerCountry
                          ?.sort(
                            (a: any, b: any) =>
                              b?.perCoin[selectedTooltip?.label] -
                              a?.perCoin[selectedTooltip?.label]
                          )
                          .map((country: any, index: number) => (
                            <li
                              key={index}
                              className="flex gap-8 justify-between"
                            >
                              <p className="text-[#F8F8F8] font-light text-sm">
                                {country?.Country}
                              </p>
                              <p className="text-[#F8F8F8] font-light text-sm">
                                {(
                                  country?.perCoin[selectedTooltip?.label] || 0
                                ).toLocaleString()}
                              </p>
                            </li>
                          ))}
                      </ul>
                    </div>
                    {/* <div>
                      <p className="text-[#F8F8F8]">Networks</p>
                      <p className="text-[#F8F8F8] font-regular"></p>
                    </div> */}
                  </div>
                </div>
              }
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
