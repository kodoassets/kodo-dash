import { useState } from "react";
import Card from "@/components/Card";
import { statusMap } from "@/components/PropertyListItem/DraftListItem";
import Scaffold from "@/components/Scaffold";
import OfferingStep from "@/components/offering/CreateOffer/OfferingStep";
import Step from "@/components/offering/CreateOffer/Step";
import {
  ConfigurationSpecification,
  ConfigurationStepStatus,
  OfferingStatus,
  OfferingStatusDefinition,
  getOfferingSpecification,
  getPropertyById,
} from "@/data/queries/get-properties";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { putOfferingStatus } from "@/data/mutations/put-offering-status";
import { toast } from "react-toastify";
import useAuth from "@/core/use-auth";

export const PropertyByIdQueryKey = "propertyById";

const PropertyPage = () => {
  useAuth(["editOfferingContent"]);
  const router = useRouter();

  const [changeStatusLoading, setChangeStatusLoading] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<"" | OfferingStatus>("");

  const { data } = useQuery(["specification"], () =>
    getOfferingSpecification()
  );

  const { data: property } = useQuery(
    [PropertyByIdQueryKey, router.query.id],
    () => getPropertyById(router.query.id as string),
    { enabled: !!router.query.id, refetchInterval: 1000 }
  );

  if (!data?.steps || !data?.statuses || !property) return null;

  const { steps, statuses } = data;
  const allStepsFinished = property.configurationSteps.every(
    (step: ConfigurationStepStatus) => step.status === "COMPLETE"
  );

  if (!property.configurationSteps) return null;

  return (
    <Scaffold title="Edit offering">
      {/* {property.status !== "DRAFT" || allStepsFinished ? ( */}
      <Card className="py-4 px-8 mt-4 mr-8 max-w-[640px]">
        <p className="text-xl font-bold">
          Status:{" "}
          <span className={statusMap[property.status].color}>
            {statusMap[property.status].label}
          </span>
        </p>
        {property.status === "DRAFT" && !allStepsFinished ? (
          <p className="text-sm text-gray-400">
            Complete all steps to enable publishing this offering.
          </p>
        ) : (
          <>
            <p className="mt-2">Change status:</p>
            <div className="flex flex-row justify-between">
              <select
                className="mt-1 border px-2 py-1 rounded-lg text-white bg-[#000F14]"
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value as OfferingStatus);
                }}
              >
                <option value="">Select a status...</option>
                {Object.entries(statuses).map(([key, step]) => (
                  <option key={key} value={key}>
                    {step.label}
                  </option>
                ))}
              </select>
              <PrimaryButton
                text="SAVE"
                isLoading={changeStatusLoading}
                disabled={!selectedStatus || selectedStatus === property.status}
                onClick={async () => {
                  if (!selectedStatus) return;
                  setChangeStatusLoading(true);
                  try {
                    await putOfferingStatus(property._id, selectedStatus);
                    toast.success("Status updated successfully");
                  } finally {
                    setChangeStatusLoading(false);
                  }
                }}
              />
            </div>
          </>
        )}
      </Card>
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
