import Scaffold from "@/components/Scaffold";
import { useState } from "react";

import CreateToken, {
  TokenInput,
} from "@/components/offering/CreateOffer/CreateToken";
import { createProperty } from "@/data/mutations/create-property";
import Router from "next/router";
import useAuth from "@/core/use-auth";

const NewOfferingPage = () => {
  useAuth(["createOffering"]);
  const [createPropertyLoading, setCreatePropertyLoading] = useState(false);

  const onSubmitToken = async ({
    totalSupply,
    tokenPriceInUsd,
    tokenSymbol,
    contractAddress,
    title,
  }: TokenInput) => {
    setCreatePropertyLoading(true);
    try {
      await createProperty({
        title,
        contract: { totalSupply, tokenSymbol, contractAddress },
        tokenPriceInUsd,
      });
      setCreatePropertyLoading(false);
      Router.push("/offerings");
    } catch (e) {
      setCreatePropertyLoading(false);
    }

    setCreatePropertyLoading(false);
  };

  return (
    <Scaffold title="Offerings">
      <h1 className="text-xl text-white">Token Setup</h1>
      <div className="flex flex-row">
        <CreateToken onSubmit={onSubmitToken} loading={createPropertyLoading} />
      </div>
    </Scaffold>
  );
};

export default NewOfferingPage;
