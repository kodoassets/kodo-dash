import PrimaryButton from "@/components/Button/PrimaryButton";
import TextInput from "@/components/TextInput";
import {
  ConfigurationSpecification,
  ConfigurationStepStatus,
  Property,
} from "@/data/queries/get-properties";

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
  console.log(property);
  return (
    <div className="grid gap-2">
      <TextInput label="Title" type="text" value={property.title} />
      <TextInput label="Description" type="text" value={property.description} />
      <TextInput
        label="BOMA area (m2)"
        type="number"
        value={property.bomaAreaSquareMeters}
      />
      <TextInput
        label="Total area (m2)"
        type="number"
        value={property.bomaAreaSquareMeters}
      />
      <TextInput
        label="Square meters by token"
        type="number"
        value={property.squareMetersByToken}
      />
      <PrimaryButton className="mt-8" text="Save" onClick={() => {}} />
    </div>
  );
};

export default TextContentStep;
