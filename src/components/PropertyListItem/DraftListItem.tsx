import { Property } from "@/data/queries/get-properties";
import Image from "next/image";
import Link from "next/link";

interface PropertyListItemProps {
  property: Property;
}

const statusMap: {
  [key: string]: { label: string; color: string };
} = {
  DRAFT: {
    label: "DRAFT",
    color: "text-yellow-400",
  },
  COMING_SOON: {
    label: "SOON",
    color: "text-blue-600",
  },
  ANNOUNCED: {
    label: "ANNOUNCED",
    color: "text-blue-500",
  },
  SALE: {
    label: "SALE",
    color: "text-green-400",
  },
  CLOSED: {
    label: "CLOSED",
    color: "text-gray-400",
  },
};

const DraftListItem = ({ property }: PropertyListItemProps) => {
  const { status } = property;
  const completedConfigSteps = property.configurationSteps.filter(
    (step) => step.status === "COMPLETE"
  );

  return (
    <div className="flex flex-row bg-gradient py-4 px-8 mb-4 rounded-lg">
      <Image
        width={32}
        height={32}
        src="/imgs/token_image.png"
        alt=""
        className="mr-8"
      />
      <div className="flex flex-row items-center w-full gap-8">
        <div
          className={`text-xs w-[80px]   ${
            statusMap[property.status]?.color || "text-yellow-400"
          }`}
        >
          {statusMap[property.status]?.label || "unknown"}{" "}
        </div>
        <div>{property.title}</div>
        <div className="justify-self-end ml-auto">
          <>
            {status !== "DRAFT" ? (
              <Link
                className="text-blue-500 text-sm underline mr-8"
                href="/dashboard/[id]"
                as={`/dashboard/${property._id}`}
                passHref
              >
                DASHBOARD
              </Link>
            ) : null}

            <Link
              className="text-blue-500 text-sm underline"
              href="/offerings/[id]"
              as={`/offerings/${property._id}`}
              passHref
            >
              {status !== "DRAFT"
                ? "EDIT"
                : `Configuration steps:
              ${completedConfigSteps.length}/${property.configurationSteps.length}`}
            </Link>
          </>
        </div>
      </div>
    </div>
  );
};

export default DraftListItem;
