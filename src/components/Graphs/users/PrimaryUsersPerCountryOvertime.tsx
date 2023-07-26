import LineChart from "@/components/Charts/line";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export const PrimaryUsersPerCountryOvertime = () => {
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
          `${process.env.NEXT_PUBLIC_API_URL}/backoffice/users/timeframes?dateFrom=${startDate}T00:00:00.000Z&dateTo=${endDate}T00:00:00.000Z&frame=${periodsList[selectedPeriod].value}`,
          {
            headers: {
              // "X-signed-message": signedMessage,
              "X-wallet-address": address,
            },
          }
        )
        .then((res) => res.data),
  });

  useEffect(() => {
    refetch();
  }, [refetch, selectedPeriod]);

  if (!data) return null;

  console.log(data);

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
    <div className="bg-gradient-2 py-10 px-8 text-white text-start rounded-2xl grid grid-cols-6 gap-8 h-[500px]">
      <div className="col-span-2 flex flex-col justify-between">
        <table className="w-full font-light">
          <thead className="text-[#7896A1]">
            <tr>
              <th className="text-center pb-4 font-extralight text-md px-1">
                <div className="bg-gradient-2 rounded-md">#</div>
              </th>
              <th className="text-center pb-4 font-extralight text-md px-1">
                <div className="bg-gradient-2 rounded-md">Country</div>
              </th>
              <th className="text-center pb-4 font-extralight text-md px-1">
                <div className="bg-gradient-2 rounded-md">%</div>
              </th>
              <th className="text-center pb-4 font-extralight text-md">
                <div className="bg-gradient-2 rounded-md">Users</div>
              </th>
            </tr>
          </thead>
          <tbody className="relative">
            {Array.from(availableCountries).map((country, index) => (
              <tr key={country} className="h-7 text-sm relative">
                <td className="text-center w-10 rounded-md p-1">
                  <div className="px-4 py-1  bg-[#00AEEF80] rounded-md">
                    {index}
                  </div>
                </td>
                <td className="text-left w-48 px-1 py-1">
                  <div className="relative bg-[#000F1480] px-4 py-1 rounded-md">
                    <div className="flex justify-between relative z-50">
                      <span>{country.toUpperCase()}</span>
                      {/* <span>
                        {data?.data?.map((data: any) => data[country]).pop() ||
                          0}
                      </span> */}
                    </div>
                    <div
                      className="absolute top-0 left-0 bottom-0 h-full bg-[#00AEEF] z-1 rounded-md"
                      style={{
                        width:
                          data?.data
                            ?.map((data: any) => {
                              const totalActiveUsers = data.activeUsers;
                              const countryUsers = data[country] || 0;
                              const percentage =
                                (countryUsers / totalActiveUsers) * 100;
                              return `${percentage.toFixed(2)}%`;
                            })
                            .pop() || "0%",
                        background: datasets[index].backgroundColor,
                        opacity: 0.5,
                      }}
                    />
                  </div>
                </td>

                <td className="text-left px-1 rounded-tr-2xl rounded-br-2xl">
                  <div className="relative bg-[#000F1480] px-4 py-1 rounded-md">
                    {data?.data
                      ?.map((data: any) => {
                        const totalActiveUsers = data.activeUsers;
                        const countryUsers = data[country] || 0;
                        const percentage =
                          (countryUsers / totalActiveUsers) * 100;
                        return `${percentage.toFixed(2)} %`;
                      })
                      .pop() || 0}
                  </div>
                </td>
                <td className="text-center px-1 w-28">
                  <div className="relative bg-[#000F1480] px-4 py-1 rounded-md">
                    <span>
                      {data?.data?.map((data: any) => data[country]).pop() || 0}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-row justify-start items-center py-4 col-span-2">
          <div className="flex flex-row gap-4 items-center">
            <span>Filter</span>
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
      </div>
      <div className="col-span-4">
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
