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

const TokenStep = ({ property, specification, validationResult }: Props) => {
  console.log(property);
  return (
    <div>
      <TextInput
        label="Token symbol"
        type="text"
        disabled
        value={property.contract.tokenSymbol}
        className="mb-2"
      />
      <TextInput
        label="Contract address"
        type="text"
        disabled
        value={property.contract.contractAddress}
        className="mb-2"
      />
      <TextInput
        label="Total supply"
        type="text"
        disabled
        value={property.contract.totalSupply}
      />
    </div>
  );
};

export default TokenStep;
