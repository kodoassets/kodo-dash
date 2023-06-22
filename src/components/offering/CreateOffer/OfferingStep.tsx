import clsx from "clsx";
import Card from "../../Card";
import React from "react";
import {
  ConfigurationSpecification,
  ConfigurationStepStatus,
  Property,
} from "@/data/queries/get-properties";
import TokenStep from "../steps/TokenStep";
import DocumentsStep from "../steps/DocumentsStep";
import ImagesStep from "../steps/ImagesStep";
import TextContentStep from "../steps/TextContentStep";

interface Props {
  index: number;
  specification: ConfigurationSpecification;
  validationResult: ConfigurationStepStatus;
  property: Property;
}

const componentMap = {
  DOCUMENTS: DocumentsStep,
  TOKEN: TokenStep,
  IMAGES: ImagesStep,
  TEXT_CONTENT: TextContentStep,
};

const OfferingStep = ({
  property,
  index,
  specification,
  validationResult,
}: Props) => {
  return (
    <>
      <Card className="py-4 px-8 mt-4 mr-8 max-w-[640px]">
        <div className="text-center">
          <p className="text-xl font-bold">{index + 1}</p>
          <h2 className="font-bold">{specification.label}</h2>
          <p
            className={clsx(
              "mb-6",
              validationResult.status === "INCOMPLETE"
                ? "text-red-400"
                : "text-green-200"
            )}
          >
            {validationResult.status}
          </p>
        </div>
        {validationResult.errors.map((error, index) => (
          <p className="text-red-400 text-sm mb-1" key={error}>
            *{error}
          </p>
        ))}

        {React.createElement(componentMap[specification.step], {
          property,
          specification,
          validationResult,
        })}
      </Card>
    </>
  );
};

export default OfferingStep;
