import { PeriodButton } from "@/components/Button/PeriodButton";
import LineChart from "@/components/Charts/line";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const PaymentsOvertime = () => {
  const { address } = useAccount();

  const [selectedPeriod, setSelectedPeriod] = useState(3);

  const [startDate, setStartDate] = useState(
    `${new Date().getFullYear()}-01-01`
  );
  const [endDate, setEndDate] = useState(`${new Date().getFullYear()}-12-31`);

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

  const { data, refetch } = useQuery(["paymentsOvertime"], {
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
  });

  const handleDateChange = (newStartDate: any, newEndDate: any) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [refetch, selectedPeriod]);

  return (
    <div className="grid gap-8">
      <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl flex justify-end items-center gap-8 ">
        <PeriodButton
          startDate={new Date(new Date().getFullYear(), 0, 1)}
          endDate={new Date(new Date().getFullYear(), 11, 31)}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl pb-12">
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
          externalTooltip={
            <div
              id="custom-tooltip"
              className="absolute bg-gradient-2 p-4 border border-white/20 rounded-2xl backdrop-blur-md"
            >
              <div className="text-center mb-4">
                <p className="font-light text-sm text-[#7896A1]">Top Methods</p>
                <p className="font-medium text-xl">Opa</p>
              </div>
              {["USDC", "USDT", "BUSD"].map((coin, index) => (
                <div
                  className="bg-[#000F14] flex items-center gap-4 w-56 justify-between mt-2 px-3 py-2 rounded-lg"
                  key={index}
                >
                  <div className="flex items-center gap-3">
                    <div className="bg-[#00AEEF] w-4 h-4 rounded-full" />
                    <span>{coin}</span>
                  </div>
                  <div>OI %</div>
                </div>
              ))}
            </div>
          }
          data={{
            labels: data?.data?.map((data: any) => {
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
              {
                data: data?.data?.map((data: any) => data.total),
                label: "Total",
              },
            ],
          }}
        />
      </div>
    </div>
  );
};
