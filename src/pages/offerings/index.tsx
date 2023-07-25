import PrimaryButton from "@/components/Button/PrimaryButton";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import PropertyList from "@/components/PropertyListItem/PropertyList";
import Scaffold from "@/components/Scaffold";
import useAuth from "@/core/use-auth";
import { getProperties } from "@/data/queries/get-properties";
import { useQuery } from "@tanstack/react-query";
import Router from "next/router";

const Offerings = () => {
  // useAuth(["viewOfferings"]);
  const { data } = useQuery(["properties"], () => getProperties());

  const totalSupply = !data
    ? 0
    : data?.reduce(
        (acc, curr) => acc + parseFloat(curr.contract.totalSupply),
        0
      );

  const avgTokenPrice = !data
    ? 0
    : data?.reduce((acc, curr) => acc + parseFloat(curr.tokenPriceInUsd), 0) /
      data?.length;

  return (
    <Scaffold title="Offerings">
      <div className="flex items-center justify-between mb-16">
        <div className="grid grid-cols-5 flex-wrap gap-8">
          <DataWithIcon
            label="Total offer"
            value={totalSupply?.toLocaleString() || "-"}
            subtitle={`tokens`}
            src="/imgs/token_image.png"
          />
          <DataWithIcon
            label="Avg Token Price"
            value={`$${avgTokenPrice ? avgTokenPrice.toLocaleString() : "-"}`}
            subtitle={`USD`}
            src="/imgs/avg_token_price.png"
          />
          <DataWithIcon
            label="Total Value"
            value={(totalSupply * avgTokenPrice).toLocaleString() || "-"}
            subtitle={`USD`}
            src="/imgs/total_value.png"
          />
        </div>
        <div className="mb-8 flex">
          <PrimaryButton
            className="ml-auto"
            onClick={() => Router.push("/offerings/new")}
            text="New token"
          />
        </div>
      </div>
      <div className="bg-gradient rounded-2xl p-8 text-white">
        <p className="text-md mb-8">KODO TOKENS</p>

        <table className="w-full font-light">
          <thead>
            <tr>
              <th className="text-center pb-6 font-extralight text-md">
                Token
              </th>
              <th className="text-center pb-6 font-extralight text-md">
                Initial Offer Price
              </th>
              <th className="text-center pb-6 font-extralight text-md">
                Supply
              </th>
              <th className="text-center pb-6 font-extralight text-md">
                Total Revenue
              </th>
              <th className="text-center pb-6 font-extralight text-md">
                Status
              </th>
              <th className="text-center pb-6 font-extralight text-md">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {(data || []).map((property) => (
              <PropertyList key={property._id} property={property} />
            ))}
          </tbody>
        </table>
      </div>
    </Scaffold>
  );
};

export default Offerings;
