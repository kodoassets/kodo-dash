import { PeriodButton } from "@/components/Button/PeriodButton";
import LineChart from "@/components/Charts/line";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const UsersOvertime = () => {
  const { address } = useAccount();

  const [selectedPeriod, setSelectedPeriod] = useState(3);
  const [selectedToken, setSelectedToken] = useState(0);

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

  const { data, refetch, isLoading } = useQuery(["paymentsOvertime"], {
    queryFn: () =>
      axios
        .get(
          `${
            process.env.NEXT_PUBLIC_API_URL
          }/backoffice/users/timeframes?dateFrom=${startDate}T00:00:00.000Z&dateTo=${endDate}T00:00:00.000Z&frame=${
            periodsList[selectedPeriod].value
          }${selectedToken === 0 ? "" : `&token=${selectedToken._id}`}`,
          {
            headers: {
              // "X-signed-message": signedMessage,
              "X-wallet-address": address,
            },
          }
        )
        .then((res) => res.data),
  });

  const {
    data: propertiesData,
    refetch: propertyDataRefetch,
    isLoading: propertyDataLoading,
  } = useQuery(["properties"], {
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties`, {
          headers: {
            // "X-signed-message": signedMessage,
            "X-wallet-address": address,
          },
        })
        .then((res) => res.data),
  });

  const handleDateChange = (newStartDate: any, newEndDate: any) => {
    setStartDate(newStartDate);
    setEndDate(newEndDate);
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [refetch, selectedPeriod, selectedToken]);

  if (!data || !propertiesData) return null;

  const availableCountries: Set<string> = new Set();
  data?.data.forEach(
    ({
      activeUsers,
      date,
      ...countries
    }: {
      activeUsers: number;
      date: number;
      [key: string]: number;
    }) => {
      Object.keys(countries).forEach((country) => {
        availableCountries.add(country);
      });
    }
  );

  const datasets = Array.from(availableCountries).map((country) => {
    return {
      label: country,
      data: data.data.map((item: any) => item[country] || 0),
      backgroundColor: getRandomColor(),
    };
  });

  return (
    <div className="bg-gradient-2 py-8 px-8 text-white text-start rounded-2xl h-[560px]">
      <p className="mb-12 text-xl font-thin">Users Overtime</p>
      <div className="grid grid-cols-6 gap-8">
        <div className="col-span-4">
          {isLoading || propertyDataLoading ? (
            <div>Loading...</div>
          ) : (
            <LineChart
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
                datasets: datasets,
              }}
            />
          )}
        </div>

        <div className="col-span-2 flex flex-col justify-between items-center">
          <div className="flex flex-row gap-8">
            <div className="flex flex-row justify-start items-start py-4 col-span-2">
              <div className="flex flex-col gap-4 items-center">
                <span>Filter</span>
                {periodsList.map((period, index) => (
                  <button
                    key={index}
                    className={`${
                      selectedPeriod === index
                        ? "border-2 border-[#00AEEF] text-white"
                        : "border-2 border-[#7896A1] text-[#7896A1]"
                    } flex items-center gap-3 px-3 py-2 rounded-full text-md`}
                    onClick={() => {
                      setSelectedPeriod(index);
                    }}
                  >
                    {period.label}
                    <span
                      className={`w-4 h-4 border rounded-full ${
                        selectedPeriod === index ? "bg-white" : ""
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="flex flex-row justify-start items-start py-4 col-span-2">
              <div className="flex flex-col gap-4 items-center">
                <span>Token</span>
                {propertiesData
                  .filter((property) => property?.status !== "DRAFT")
                  .map((property, index) => (
                    <button
                      key={index}
                      className={`${
                        selectedToken._id === property._id
                          ? "border-2 border-[#00AEEF] text-white"
                          : "border-2 border-[#7896A1] text-[#7896A1]"
                      } flex items-center gap-3 px-3 py-2 rounded-full text-md`}
                      onClick={() => {
                        setSelectedToken(property);
                      }}
                    >
                      <span
                        className={`w-4 h-4 border rounded-full ${
                          selectedToken._id === property._id ? "bg-white" : ""
                        }`}
                      />
                      {property?.contract?.tokenSymbol}
                    </button>
                  ))}

                <button
                  className={`${
                    selectedToken === 0
                      ? "border-2 border-[#00AEEF] text-white"
                      : "border-2 border-[#7896A1] text-[#7896A1]"
                  } flex items-center gap-3 px-3 py-2 rounded-full text-md`}
                  onClick={() => {
                    setSelectedToken(0);
                  }}
                >
                  <span
                    className={`w-4 h-4 border rounded-full ${
                      selectedToken === 0 ? "bg-white" : ""
                    }`}
                  />
                  All
                </button>
              </div>
            </div>
          </div>
          <div className="mb-2">
            <PeriodButton
              startDate={new Date(new Date().getFullYear(), 0, 1)}
              endDate={new Date(new Date().getFullYear(), 11, 31)}
              onDateChange={handleDateChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};
