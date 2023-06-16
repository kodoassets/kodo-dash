import axios from "axios";

export interface PropertyInput {
  title: string;
  description: string;
  contract: {
    tokenSymbol: string;
    totalSupply: string;
  };
  address: string;
  totalAreaSquareMeters: string;
  bomaAreaSquareMeters: string;
  tokenPriceInUsd: string;
}

export const createProperty = (property: PropertyInput) => {
  return axios.post(
    "https://gateway-dev.kodoassets.com/backoffice/properties",
    {
      ...property,
    }
  );
};
