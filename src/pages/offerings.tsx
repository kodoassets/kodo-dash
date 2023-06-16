import PrimaryButton from "@/components/Button/PrimaryButton";
import Scaffold from "@/components/Scaffold";
import { Property, getProperties } from "@/data/queries/get-properties";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Router from "next/router";

interface PropertyListItemProps {
  property: Property;
}

const PropertyListItem = ({ property }: PropertyListItemProps) => {
  return (
    <div className="flex flex-row bg-gradient py-4 px-8 mb-4 rounded-lg">
      <Image
        width={32}
        height={32}
        src="/imgs/token_image.png"
        alt=""
        className="mr-8"
      />
      <div className="grid grid-cols-8 items-center gap-8 ">
        <span className="min-w-[120px]">{property.contract.tokenSymbol}</span>
        <span>{property.tokenPriceInUsd}</span>
        <span>{property.contract.totalSupply}</span>
        <span>
          <a
            className="text-sm text-blue-400"
            href={`https://mumbai.polygonscan.com/address/${
              property.contract.contractAddress || ""
            }`}
            target="_blank"
          >
            Explorer
          </a>
        </span>
      </div>
    </div>
  );
};

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
        {(data || []).map((property) => (
          <PropertyListItem key={property._id} property={property} />
        ))}
      </div>
    </Scaffold>
  );
};

export default Offerings;
