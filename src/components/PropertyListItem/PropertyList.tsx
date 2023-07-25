import { Property } from "@/data/queries/get-properties";
import Image from "next/image";
import Router from "next/router";
import ProgressBar from "../ProgressBar";

interface PropertyListItemProps {
  property: Property;
}

export const statusMap: {
  [key: string]: { label: string; className: string; color: string };
} = {
  DRAFT: {
    label: "DRAFT",
    className: "bg-yellow-400/10 border-yellow-400 text-yellow-400",
    color: "bg-yellow-400",
  },
  COMING_SOON: {
    label: "SOON",
    className: "bg-blue-600/10 border-blue-600 text-blue-600",
    color: "bg-blue-600",
  },
  ANNOUNCED: {
    label: "ANNOUNCED",
    className: "bg-blue-500/10 border-blue-500 text-blue-500",
    color: "bg-blue-500",
  },
  SALE: {
    label: "SALE",
    className: "bg-green-400/10 border-green-400 text-green-400",
    color: "bg-green-400",
  },
  CLOSED: {
    label: "CLOSED",
    className: "bg-gray-400/10 border-gray-400 text-gray-400",
    color: "bg-gray-400",
  },
};

const PropertyList = ({ property }: PropertyListItemProps) => {
  const { status } = property;
  const completedConfigSteps = property.configurationSteps.filter(
    (step) => step.status === "COMPLETE"
  );

  const propertyStatus = statusMap[status];

  return (
    <tr className="bg-gradient border border-white/10 rounded-xl ">
      <td className="flex flex-row items-center px-10 py-6">
        <img
          width={40}
          height={40}
          src="/imgs/token_image.png"
          alt=""
          className="mr-8"
        />
        {property.contract.tokenSymbol}
      </td>
      <td className="text-center w-48">
        ${parseFloat(property.tokenPriceInUsd).toLocaleString()}
      </td>
      <td className="text-center w-48">
        {parseFloat(property.contract.totalSupply).toLocaleString()}
      </td>
      <td className="px-8 w-64">
        <ProgressBar
          className="w-full"
          progress={(() => {
            const totalTokensSold = Number(property.totalTokensSold) || 0;
            const totalSupply = Number(property.contract.totalSupply) || 1;
            return parseFloat(
              ((totalTokensSold / totalSupply) * 100).toFixed(2)
            );
          })()}
        />
      </td>

      <td>
        <div
          className={`w-fit flex gap-2 items-center font-normal text-sm border px-3 py-2 rounded-full ${propertyStatus.className}`}
        >
          <div
            className={`w-3 h-3 rounded-full font-normal ${propertyStatus.color}`}
          />
          {propertyStatus.label || "unknown"}
        </div>
      </td>
      <td className="text-center w-64 gap-8">
        {property.status === "SALE" && (
          <>
            <button
              onClick={() => {
                Router.push("/offerings/[id]", `/offerings/${property._id}`);
              }}
            >
              View
            </button>
            <span> | </span>
          </>
        )}

        <button
          onClick={() =>
            Router.push(
              "/offerings/edit/[id]",
              `/offerings/edit/${property._id}`
            )
          }
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default PropertyList;
