import PrimaryButton from "@/components/Button/PrimaryButton";
import TextInput from "@/components/TextInput";
import { putTextContent } from "@/data/mutations/put-text-content";
import {
  ConfigurationSpecification,
  ConfigurationStepStatus,
  Property,
} from "@/data/queries/get-properties";
import { PropertyByIdQueryKey } from "@/pages/offerings/[id]";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  property: Property;
  specification: ConfigurationSpecification;
  validationResult: ConfigurationStepStatus;
}

const TextContentStep = ({
  property,
  specification,
  validationResult,
}: Props) => {
  const [isSaving, setIsSaving] = useState(false);

  const queryClient = useQueryClient();

  const [title, setTitle] = useState(property.title ?? "");
  const [address, setAddress] = useState(property.address ?? "");
  const [description, setDescription] = useState(property.description ?? "");
  const [bomaAreaSquareMeters, setBomaAreaSquareMeters] = useState(
    property.bomaAreaSquareMeters ?? ""
  );
  const [totalAreaSquareMeters, setTotalAreaSquareMeters] = useState(
    property.totalAreaSquareMeters ?? ""
  );
  const [squareMetersByToken, setSquareMetersByToken] = useState(
    property.squareMetersByToken ?? ""
  );

  const contentHasntChanged =
    !!title &&
    property.title === title &&
    !!address &&
    property.address === address &&
    !!description &&
    property.description === description &&
    !!bomaAreaSquareMeters &&
    property.bomaAreaSquareMeters === bomaAreaSquareMeters &&
    !!totalAreaSquareMeters &&
    property.totalAreaSquareMeters === totalAreaSquareMeters &&
    !!squareMetersByToken &&
    property.squareMetersByToken === squareMetersByToken;

  return (
    <div className="grid gap-2">
      <TextInput label="Title" type="text" value={title} onChange={setTitle} />
      <TextInput
        label="Description"
        type="text"
        value={description}
        onChange={setDescription}
      />
      <TextInput
        label="Address"
        type="text"
        value={address}
        onChange={setAddress}
      />
      <TextInput
        label="BOMA area (m2)"
        type="number"
        value={bomaAreaSquareMeters}
        onChange={setBomaAreaSquareMeters}
      />
      <TextInput
        label="Total area (m2)"
        type="number"
        value={totalAreaSquareMeters}
        onChange={setTotalAreaSquareMeters}
      />
      <TextInput
        label="Square meters by token"
        type="number"
        value={squareMetersByToken}
        onChange={setSquareMetersByToken}
      />
      <PrimaryButton
        className="mt-8"
        text="Save"
        disabled={
          isSaving ||
          !title ||
          !address ||
          !description ||
          !bomaAreaSquareMeters ||
          !totalAreaSquareMeters ||
          !squareMetersByToken ||
          contentHasntChanged
        }
        onClick={async () => {
          try {
            setIsSaving(true);
            await putTextContent(property._id, {
              title,
              address,
              description,
              bomaAreaSquareMeters,
              totalAreaSquareMeters,
              squareMetersByToken,
            });

            toast.success("Text content saved");
            queryClient.invalidateQueries({
              queryKey: [PropertyByIdQueryKey],
            });
          } finally {
            setIsSaving(false);
          }
        }}
      />
    </div>
  );
};

export default TextContentStep;
