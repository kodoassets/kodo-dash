import { apiUrl } from "./config";

export interface Property {
  _id: string;
  address: string;
  bomaAreaSquareMeters: string;
  contract: {
    contractAddress: string;
    protocol: string;
    tokenSymbol: string;
    totalSupply: string;
  };
  cover: string;
  description: string;
  details: {
    icon: string;
    referenceText: string;
  }[];
  gallery: string[];
  slug: string;
  squareMetersByToken: string;
  status: string;
  title: string;
  tokenPriceInUsd: string;
  totalAreaSquareMeters: string;
}

export const getProperties: () => Promise<Property[]> = async () => {
  const data = await fetch(apiUrl + "/properties");
  return data.json();
};
