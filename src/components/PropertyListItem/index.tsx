import { Property } from "@/data/queries/get-properties";
import Image from "next/image";

interface PropertyListItemProps {
  property: Property;
}

export type OfferStatus =
  | "DRAFT"
  | "COMING_SOON"
  | "ANNOUNCED"
  | "SALE"
  | "CLOSED";

const offerStatusToLabel: { [key: string]: string } = {
  DRAFT: "Unpublished",
  COMING_SOON: "Coming soon",
  ANNOUNCED: "Announced",
  SALE: "Sale",
  CLOSED: "Closed",
};

const PropertyListItem = ({ property }: PropertyListItemProps) => {
  return (
    <div className="flex flex-row bg-gradient py-4 px-8 mb-4 rounded-lg">
      <img
        width={32}
        height={32}
        src="/imgs/token_image.png"
        alt=""
        className="mr-8"
      />
      <div className="grid grid-cols-8 items-center gap-8 ">
        <span className="min-w-[120px]">{property?.contract?.tokenSymbol}</span>
        <span>{property.tokenPriceInUsd}</span>
        <span>{property?.contract?.totalSupply}</span>
        <span>
          <a
            className="text-sm text-blue-400"
            href={`https://mumbai.polygonscan.com/address/${
              property?.contract?.contractAddress || ""
            }`}
            target="_blank"
          >
            Explorer
          </a>
        </span>
        <span>{offerStatusToLabel[property.status] || "Bad data"}</span>
      </div>
    </div>
  );
};

export default PropertyListItem;
