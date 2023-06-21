import { Property } from "@/data/queries/get-properties";
import Image from "next/image";
import Link from "next/link";

interface PropertyListItemProps {
  property: Property;
}

const DraftListItem = ({ property }: PropertyListItemProps) => {
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
      <div className="grid grid-cols-3 items-center ">
        <span className="text-xs text-yellow-400">DRAFT </span>
        <span>{property.title}</span>
        <span>
          <Link
            className="text-blue-500 text-sm underline"
            href="/offerings/[id]"
            as={`/offerings/${property._id}`}
            passHref
          >
            Configuration steps:{" "}
            {`${completedConfigSteps.length}/${property.configurationSteps.length}`}
          </Link>
        </span>
      </div>
    </div>
  );
};

export default DraftListItem;
