import { apiUrl } from "./config";

export type ConfigurationStep =
  | "TOKEN"
  | "IMAGES"
  | "TEXT_CONTENT"
  | "DOCUMENTS";

export interface ConfigurationStepStatus {
  step: ConfigurationStep;
  status: "COMPLETE" | "INCOMPLETE";
  errors: string[];
}

export interface ConfigurationSpecification {
  step: ConfigurationStep;
  label: string;
  inputs: Array<{
    name: string;
    label: string;
    type: "image" | "text" | "number" | "address" | "url" | "pdf";
  }>;
  validator: (property: Property) => ConfigurationStepStatus;
}

export type OfferingStatus =
  | "DRAFT"
  | "COMING_SOON"
  | "ANNOUNCED"
  | "SALE"
  | "CLOSED";
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
  status: OfferingStatus;
  title: string;
  tokenPriceInUsd: string;
  totalAreaSquareMeters: string;
  configurationSteps: ConfigurationStepStatus[];
  docusignConfig?: {
    clickwrapId: string;
    accountId: string;
    environment: string;
  };
  whitepaperUrl?: string;
}

export const getProperties: () => Promise<Property[]> = async () => {
  const data = await fetch(apiUrl + "/backoffice/properties");
  return data.json();
};

export const getOfferingSpecification: () => Promise<
  ConfigurationSpecification[]
> = async () => {
  const data = await fetch(apiUrl + "/backoffice/properties/specification");
  return data.json();
};

export const getPropertyById = async (id: string) => {
  const data = await fetch(apiUrl + `/backoffice/properties/${id}`);
  return data.json();
};
