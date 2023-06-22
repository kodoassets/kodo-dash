import axios from "axios";

export interface CreatePropertyInput {
  title: string;
  contract: {
    tokenSymbol: string;
    totalSupply: string;
    contractAddress: string;
  };
  tokenPriceInUsd: string;
}

export const createProperty = (property: CreatePropertyInput) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties`,
    {
      ...property,
    }
  );
};
