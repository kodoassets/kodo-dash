import Scaffold from "@/components/Scaffold";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import { useAccount } from "wagmi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import PieChartData from "@/components/DataView/PieChartData";
import PieChart from "@/components/Charts/pie";
import ProgressBar from "@/components/ProgressBar";
import { useEffect, useState } from "react";
import LineChart from "@/components/Charts/line";
import { PeriodButton } from "@/components/Button/PeriodButton";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(0);

  const [selectedPeriod, setSelectedPeriod] = useState(3);

  const [startDate, setStartDate] = useState(
    `${new Date().getFullYear()}-01-01`
  );
  const [endDate, setEndDate] = useState(`${new Date().getFullYear()}-12-31`);

  const handleDateChange = (newStartDate: any, newEndDate: any) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    refetch();
  };

  const periodsList = [
    {
      label: "D",
      value: "daily",
    },
    {
      label: "W",
      value: "weekly",
    },
    {
      label: "M",
      value: "monthly",
    },
    {
      label: "Q",
      value: "quarterly",
    },
    {
      label: "Y",
      value: "yearly",
    },
  ];

  const handleMouseEnter = (index: number) => {
    setModalContent(index);
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

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

  const { data: affiliatesData } = useQuery(["affiliates"], {
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/backoffice/affiliates`, {
          headers: {
            // "X-signed-message": signedMessage,
            "X-wallet-address": address,
          },
        })
        .then((res) => res.data),
  });

  const { data: paymentsOvertimeData, refetch } = useQuery(
    ["paymentsOvertime"],
    {
      queryFn: () =>
        axios
          .get(
            `${process.env.NEXT_PUBLIC_API_URL}/backoffice/payments/timeframes?dateFrom=${startDate}T00:00:00.000Z&dateTo=${endDate}T00:00:00.000Z&frame=${periodsList[selectedPeriod].value}`,
            {
              headers: {
                // "X-signed-message": signedMessage,
                "X-wallet-address": address,
              },
            }
          )
          .then((res) => res.data),
    }
  );

  useEffect(() => {
    refetch();
  }, [refetch, selectedPeriod]);

  if (!data || !affiliatesData || !paymentsOvertimeData) return null;

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
        <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl flex justify-end items-center gap-8">
          <PeriodButton
            startDate={new Date(new Date().getFullYear(), 0, 1)}
            endDate={new Date(new Date().getFullYear(), 11, 31)}
            onDateChange={handleDateChange}
          />
        </div>
        <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl">
          <div className="flex flex-row justify-end items-center py-4">
            <div className="flex flex-row gap-4">
              {periodsList.map((period, index) => (
                <button
                  key={index}
                  className={`${
                    selectedPeriod === index
                      ? "border-2 border-[#00AEEF] text-white"
                      : "border-2 border-[#7896A1] text-[#7896A1]"
                  } px-4 py-1 rounded-xl text-sm`}
                  onClick={() => {
                    setSelectedPeriod(index);
                  }}
                >
                  {period.label}
                </button>
              ))}
            </div>
          </div>
          <LineChart
            data={{
              labels: paymentsOvertimeData?.data?.map((data: any) => {
                switch (periodsList[selectedPeriod].value) {
                  case "daily":
                    return new Date(data.date).getDay();

                  case "weekly":
                    return `Week ${new Date(data.date).toLocaleDateString()}`;

                  case "monthly":
                    return new Date(data.date)
                      .toLocaleDateString("en-US", {
                        month: "short",
                      })
                      .toUpperCase();

                  case "quarterly":
                    return `Q${Math.ceil(
                      (new Date(data.date).getMonth() + 1) / 3
                    )} ${new Date(data.date).getFullYear()}`;

                  case "yearly":
                    return new Date(data.date).getFullYear();

                  default:
                    return new Date(data.date).toLocaleDateString();
                }
              }),
              datasets: [
                paymentsOvertimeData?.data?.map((data: any) =>
                  data.total.toFixed(2)
                ),
              ],
            }}
          />
        </div>
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
                  <p className="text-[#F8F8F8] font-regular">N/A</p>
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
          <div className="flex flex-col items-start text-white bg-gradient-2 rounded-2xl py-6 px-8 w-full col-span-2">
            <p className="mb-4 text-xl font-thin">Payments per Country</p>
            <div className="grid grid-cols-2 mt-4">
              <div className="h-[264px]">
                <PieChart
                  labels={data?.totalPerCountry?.map((row: any) => row.Country)}
                  datasets={[
                    {
                      data: data?.totalPerCountry?.map(
                        (row: any) => row.TotalSold
                      ),
                      backgroundColor: ["#000F14", "#00AEEF", "#4C2D9A"],
                    },
                  ]}
                />
              </div>
              <div>
                <table className="w-full font-light">
                  <thead className="text-[#7896A1]">
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
                  <tbody className="relative">
                    {data?.totalPerCountry
                      ?.sort(
                        (a: { TotalSold: number }, b: { TotalSold: number }) =>
                          b.TotalSold - a.TotalSold
                      )
                      .map((row: any, index: number) => (
                        <tr
                          key={row.country}
                          className="bg-[#000F14] h-7 text-sm relative"
                          onMouseEnter={() => handleMouseEnter(index)}
                          onMouseLeave={handleMouseLeave}
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
                {showModal && (
                  <div className="absolute top-0 bg-gradient-2 p-4 border border-white/20 rounded-2xl backdrop-blur-md">
                    <div className="text-center mb-4">
                      <p className="font-light text-sm text-[#7896A1]">
                        Top Methods
                      </p>
                      <p className="font-medium text-xl">
                        {data?.totalPerCountry[modalContent].Country}
                      </p>
                    </div>
                    {["USDC", "USDT", "BUSD"].map((coin, index) => (
                      <div
                        className="bg-[#000F14] flex items-center gap-4 w-56 justify-between mt-2 px-3 rounded-lg"
                        key={index}
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-[#00AEEF] w-4 h-4 rounded-full" />
                          <span>{coin}</span>
                        </div>
                        <div>
                          {(
                            (data?.totalPerCountry[modalContent].perCoin?.[
                              coin
                            ] /
                              data?.totalPerCountry[modalContent].TotalSold) *
                            100
                          ).toFixed(2)}
                          %
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl h-full">
          <p className="mb-6 text-xl font-thin">Affiliates Comission</p>
          <div>
            <div className="flex flex-row justify-between w-full mt-4">
              <p className="text-[#7896A1]">Claimed</p>
              <p className="text-[#F8F8F8] font-regular">
                $
                {affiliatesData?.affiliatesComission?.claimed?.toLocaleString()}
              </p>
            </div>
            <div className="w-full bg-[#000F1480] h-12 mt-4 rounded-lg">
              <ProgressBar
                className="!h-12 rounded-lg"
                progress={
                  (affiliatesData?.affiliatesComission?.claimed /
                    (affiliatesData?.affiliatesComission?.claimed +
                      affiliatesData?.affiliatesComission?.due)) *
                  100
                }
              />
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-between w-full mt-4">
              <p className="text-[#7896A1]">Due</p>
              <p className="text-[#F8F8F8] font-regular">
                ${affiliatesData?.affiliatesComission?.due}
              </p>
            </div>
            <div className="w-full bg-[#000F1480] h-12 mt-4 rounded-lg">
              <ProgressBar
                className="!h-12 rounded-lg"
                progress={
                  (affiliatesData?.affiliatesComission?.due /
                    (affiliatesData?.affiliatesComission?.claimed +
                      affiliatesData?.affiliatesComission?.due)) *
                  100
                }
              />
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
