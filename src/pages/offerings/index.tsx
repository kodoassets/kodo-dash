import DropdownButton from "@/components/Button/DropdownButon";
import PrimaryButton from "@/components/Button/PrimaryButton";
import DataWithIcon from "@/components/DataView/DataWithIcon";
import PropertyList from "@/components/PropertyListItem/PropertyList";
import Scaffold from "@/components/Scaffold";
import useAuth from "@/core/use-auth";
import { Property, getProperties } from "@/data/queries/get-properties";
import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import { useEffect, useState } from "react";

const Offerings = () => {
  // useAuth(["viewOfferings"]);
  const [filteredProperties, setFilteredProperties] = useState<any>();

  const { data } = useQuery(["properties"], () => getProperties());

  useEffect(() => {
    setFilteredProperties(data);
  }, [data]);

  if (!data) return null;

  const totalSupply = !data
    ? 0
    : data?.reduce(
        (acc: number, curr: { contract: { totalSupply: string } }) =>
          acc + parseFloat(curr.contract.totalSupply),
        0
      );

  const avgTokenPrice = !data
    ? 0
    : data?.reduce(
        (acc: number, curr: { tokenPriceInUsd: string }) =>
          acc + parseFloat(curr.tokenPriceInUsd),
        0
      ) / data?.length;

  const filterByStatus = (value: string) => {
    if (value !== "all" && data) {
      const filtered = data.filter(
        (property: Property) => property.status === value
      );
      setFilteredProperties(filtered);
    }

    if (value === "all" && data) {
      setFilteredProperties(data);
    }
  };
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
      <div className="bg-gradient rounded-2xl py-12 px-8 text-white">
        <div className="flex justify-between mb-16">
          <p className="text-md">KODO TOKENS</p>
          <DropdownButton
            text="Status"
            items={[
              { label: "All", value: "all" },
              { label: "Draft", value: "DRAFT" },
              { label: "Coming Soon", value: "COMING_SOON" },
              { label: "Announced", value: "ANNOUNCED" },
              { label: "Sale", value: "SALE" },
              { label: "Closed", value: "CLOSED" },
            ]}
            onSelect={(value) => {
              filterByStatus(value);
            }}
          />
        </div>

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
            {(filteredProperties || []).map((property: Property) => (
              <PropertyList key={property._id} property={property} />
            ))}
          </tbody>
        </table>
      </div>
    </Scaffold>
  );
};

export default Offerings;
