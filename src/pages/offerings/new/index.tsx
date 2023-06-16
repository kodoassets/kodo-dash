import Scaffold from "@/components/Scaffold";
import { useState } from "react";
import TokenDetails, {
  DetailsInput,
} from "@/components/offering/CreateOffer/TokenDetails";
import AssetDetails, {
  AssetDetailsInput,
} from "@/components/offering/CreateOffer/AssetDetails";
import Tokenomics, {
  TokenomicsInput,
} from "@/components/offering/CreateOffer/Tokenomics";
import {
  PropertyInput,
  createProperty,
} from "@/data/mutations/create-property";
import Router from "next/router";

const NewOfferingPage = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [createPropertyLoading, setCreatePropertyLoading] = useState(false);

  const [newProperty, setNewProperty] = useState<PropertyInput>({
    title: "",
    description: "",
    address: "",
    contract: {
      tokenSymbol: "",
      totalSupply: "",
    },
    totalAreaSquareMeters: "",
    bomaAreaSquareMeters: "",
    tokenPriceInUsd: "",
  });

  const onSubmitTokenDetails = (details: DetailsInput) => {
    setNewProperty({
      ...newProperty,
      contract: { ...newProperty.contract, ...details },
    });
    setActiveStep((prev) => prev + 1);
  };

  const onSubmitAssetDetails = ({
    title,
    address,
    description,
    totalArea,
  }: AssetDetailsInput) => {
    setNewProperty({
      ...newProperty,
      title,
      address,
      description,
      totalAreaSquareMeters: totalArea,
      bomaAreaSquareMeters: totalArea,
    });
    setActiveStep((prev) => prev + 1);
  };

  const onSubmitTokenomics = async ({
    totalSupply,
    tokenPriceInUsd,
  }: TokenomicsInput) => {
    setCreatePropertyLoading(true);
    try {
      await createProperty({
        ...newProperty,
        contract: { ...newProperty.contract, totalSupply },
        tokenPriceInUsd,
      });
      setCreatePropertyLoading(false);
      Router.push("/offerings");
    } catch (e) {
      setCreatePropertyLoading(false);
      console.log(e);
    }

    setCreatePropertyLoading(false);
  };

  return (
    <Scaffold title="Offerings">
      <h1 className="text-xl text-white">Token Setup</h1>
      <div className="flex flex-row">
        <TokenDetails
          active={activeStep === 0}
          onSubmit={onSubmitTokenDetails}
        />
        <AssetDetails
          active={activeStep === 1}
          onSubmit={onSubmitAssetDetails}
        />
        <Tokenomics
          active={activeStep === 2}
          onSubmit={onSubmitTokenomics}
          loading={createPropertyLoading}
        />
      </div>
    </Scaffold>
  );
};

export default NewOfferingPage;
