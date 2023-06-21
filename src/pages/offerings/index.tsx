import PrimaryButton from "@/components/Button/PrimaryButton";
import PropertyListItem from "@/components/PropertyListItem";
import DraftListItem from "@/components/PropertyListItem/DraftListItem";
import Scaffold from "@/components/Scaffold";
import { getProperties } from "@/data/queries/get-properties";
import { useQuery } from "@tanstack/react-query";
import Router from "next/router";

const Offerings = () => {
  const { data } = useQuery(["properties"], () => getProperties());
  return (
    <Scaffold title="Dashboard">
      <div className="mb-8 flex">
        <PrimaryButton
          className="ml-auto"
          onClick={() => Router.push("/offerings/new")}
          text="New token"
        />
      </div>
      <div className="bg-gradient rounded-md p-4 text-white">
        <p className="text-md mb-8">KODO TOKENS</p>
        <div className="flex flex-row px-[32px]">
          <span className="mr-[64px]"></span>
          <div className="grid grid-cols-8 w-full mb-2  ">
            <span className="text-sm min-w-[120px]">Token</span>
            <span className="text-sm">Price</span>
            <span className="text-sm">Supply</span>
            <span className="text-sm">Contract address</span>
          </div>
        </div>
        {(data || []).map((property) =>
          property.status === "DRAFT" ? (
            <DraftListItem key={property._id} property={property} />
          ) : (
            <PropertyListItem key={property._id} property={property} />
          )
        )}
      </div>
    </Scaffold>
  );
};

export default Offerings;
