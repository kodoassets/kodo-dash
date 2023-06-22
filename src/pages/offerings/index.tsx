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

        {(data || []).map((property) => (
          <DraftListItem key={property._id} property={property} />
        ))}
      </div>
    </Scaffold>
  );
};

export default Offerings;
