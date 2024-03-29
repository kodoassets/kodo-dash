import Scaffold from "@/components/Scaffold";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import ProgressBar from "@/components/ProgressBar";
import PieChartData from "@/components/DataView/PieChartData";

import { useRouter } from "next/router";
import { ActiverUsers } from "@/components/Graphs/offerings/[id]/ActiveUsers";

export default function Home() {
  // useAuth(["viewDashboard"]);

  const router = useRouter();

  const { data: propertyData } = useQuery(["properties"], {
    queryFn: () =>
      axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties/${router.query.id}`,
        {
          headers: {
            // "X-signed-message": signedMessage,
            // "X-wallet-address": address,
          },
        }
      ),
  });

  if (!propertyData?.data) return null;

  const {
    data: {
      newUsers: { userCount, averageTicket },
      recurrentUsers: {
        userCount: recurrentUserCount,
        averageTicket: recurrentAverageTicket,
      },
      paymentMethod: { totalSold, perBlockchain, perCoin },
      totalTokensSold,
      tokenPriceInUsd,
      contract: { totalSupply },
    },
  } = propertyData;

  return (
    <Scaffold
      title={"Property"}
      className="truncate"
      hasPropertySelector
      selectedProperty={propertyData.data}
    >
      <div className="grid gap-16">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 flex-wrap gap-8 justify-between">
          <DataWithIcon
            label="Tokens sold"
            value={totalTokensSold?.toLocaleString() || "-"}
            subtitle={`of ${totalSupply?.toLocaleString()}`}
            src="/imgs/tokens_sold.png"
          />
          <DataWithIcon
            label="Total Revenue"
            value={`$${totalSold ? totalSold.toLocaleString() : "-"}`}
            subtitle={`of $${(totalSupply * tokenPriceInUsd).toLocaleString()}`}
            src="/imgs/total_revenue.png"
          />
          <DataWithIcon
            label="Token Price"
            value={`$${tokenPriceInUsd?.toLocaleString() || "-"}`}
            subtitle={`USD`}
            src="/imgs/token_price.png"
          />
          <DataWithIcon
            label="Dividends Paid"
            value={"-"}
            subtitle="USD"
            src="/imgs/dividends_paid.png"
          />
          <DataWithIcon
            label="Cashback Paid"
            value={"-"}
            subtitle={`USD`}
            src="/imgs/cashback_paid.png"
          />
        </div>

        <ProgressBar
          className="w-full"
          progress={Number(((totalTokensSold / totalSupply) * 100).toFixed(2))}
        />

        <div className="grid grid-cols-5">
          <div className="bg-gradient-2  rounded-lg text-[#F8F8F8] px-6 py-5 mt-1 flex justify-between">
            <span className="font-light">Average Ticket: </span>
            <span className="text-gradient font-bold">
              ${(totalSold / userCount).toLocaleString()}
            </span>
          </div>
        </div>

        <div className="grid xl:grid-cols-4 gap-8">
          <PieChartData
            title="Payment Method"
            labels={["USDC", "ETHEREUM", "USDT", "POLYGON"]}
            datasets={[
              {
                label: "Per Blockchain",
                data: [perBlockchain?.ETHEREUM, perBlockchain?.POLYGON],
                backgroundColor: ["#000F14", "#00AEEF", "#4C2D9A"],
              },
              {
                label: "Per Coin",
                data: [perCoin?.USDC, perCoin?.USDT],
                backgroundColor: ["#000F14", "#00AEEF", "#4C2D9A"],
              },
            ]}
          />
          <PieChartData
            title="Payments per Country"
            labels={propertyData.data.paymentsPerCountry.map(
              (country: any) => country.country
            )}
            datasets={[
              {
                label: "Payments per Country",
                data: propertyData.data.paymentsPerCountry.map(
                  (country: any) => country.count
                ),
                backgroundColor: ["#000F14", "#00AEEF", "#4C2D9A"],
              },
            ]}
          />
          <PieChartData
            title="Users per Country"
            labels={propertyData.data.usersPerCountry.map(
              (country: any) => country._id
            )}
            datasets={[
              {
                label: "Users per Country",
                data: propertyData.data.usersPerCountry.map(
                  (country: any) => country.count
                ),
                backgroundColor: ["#000F14", "#00AEEF", "#4C2D9A"],
              },
            ]}
          />
          <div className="flex flex-col py-8 justify-between">
            <div className="flex flex-row">
              <DataWithIcon
                label="New Users"
                value={userCount || "-"}
                subtitle={"users"}
                src="/imgs/tokens_sold.png"
              />
              <div className="flex flex-col ml-4">
                <p className="text-center text-white justify-self-end text-sm">
                  Avg
                  <br />
                  Ticket
                </p>
                <div className="bg-[#005E81] border border-gradient rounded-lg text-[#F8F8F8] px-2 py-1 mt-1">
                  {averageTicket?.toLocaleString() || "-"}
                </div>
              </div>
            </div>
            <div className="flex flex-row">
              <DataWithIcon
                label="Recurrent Users"
                value={recurrentUserCount || "-"}
                subtitle={"users"}
                src="/imgs/tokens_sold.png"
              />
              <div className="flex flex-col ml-4">
                <p className="text-center text-white justify-self-end text-sm">
                  Avg
                  <br />
                  Ticket
                </p>
                <div className="bg-[#005E81] border border-gradient rounded-lg text-[#F8F8F8] px-2 py-1 mt-1">
                  {recurrentAverageTicket?.toLocaleString() || "-"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Scaffold>
  );
}
