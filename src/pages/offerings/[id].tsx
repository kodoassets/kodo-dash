import Scaffold from "@/components/Scaffold";
import OfferingStep from "@/components/offering/CreateOffer/OfferingStep";
import Step from "@/components/offering/CreateOffer/Step";
import {
  ConfigurationStepStatus,
  getOfferingSpecification,
  getPropertyById,
} from "@/data/queries/get-properties";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

const PropertyPage = () => {
  const router = useRouter();

  const { data: steps } = useQuery(["specification"], () =>
    getOfferingSpecification()
  );
  console.log("Query", router.query);
  const { data: property } = useQuery(
    ["propertyById"],
    () => getPropertyById(router.query.id as string),
    { enabled: !!router.query.id }
  );

  if (!steps || !property) return null;

  return (
    <Scaffold title="Edit offering">
      {steps.map((step, index) => (
        <OfferingStep
          key={step.label}
          specification={step}
          property={property}
          index={index}
          validationResult={property.configurationSteps.find(
            (s: ConfigurationStepStatus) => s.step === step.step
          )}
        />
      ))}
    </Scaffold>
  );
};

export default PropertyPage;
