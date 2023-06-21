import PrimaryButton from "@/components/Button/PrimaryButton";
import TextInput from "@/components/TextInput";
import { putDocusignConfig } from "@/data/mutations/put-docusign-config";
import {
  ConfigurationSpecification,
  ConfigurationStepStatus,
  Property,
} from "@/data/queries/get-properties";
import { useRouter } from "next/router";
import { useState } from "react";

interface Props {
  property: Property;
  specification: ConfigurationSpecification;
  validationResult: ConfigurationStepStatus;
}

const DocumentsStep = ({
  property,
  specification,
  validationResult,
}: Props) => {
  const router = useRouter();
  const propertyId = router.query.id as string;

  const [savingDocusignConfig, setSavingDocusignConfig] = useState(false);

  const [accountId, setAccountId] = useState(
    property?.docusignConfig?.accountId ?? ""
  );
  const [clickwrapId, setClickwrapId] = useState(
    property?.docusignConfig?.clickwrapId ?? ""
  );
  const [environment, setEnvironment] = useState(
    property?.docusignConfig?.environment ?? ""
  );

  const inputHasntChanged =
    !!accountId &&
    accountId === property?.docusignConfig?.accountId &&
    !!clickwrapId &&
    clickwrapId === property?.docusignConfig?.clickwrapId &&
    !!environment &&
    environment === property?.docusignConfig?.environment;

  return (
    <div>
      <p className="mt-4 mb-2">Docusign configuration</p>
      <div className="grid gap-2">
        <TextInput
          label="Account id"
          type="text"
          value={accountId}
          onChange={setAccountId}
        />
        <TextInput
          label="Clickwrap id"
          type="text"
          value={clickwrapId}
          onChange={setClickwrapId}
        />
        <TextInput
          label="Environment"
          type="text"
          value={environment}
          onChange={setEnvironment}
        />
      </div>
      <PrimaryButton
        disabled={
          savingDocusignConfig ||
          accountId === "" ||
          clickwrapId === "" ||
          environment === "" ||
          inputHasntChanged
        }
        className="w-full mt-4"
        text="Save"
        onClick={async () => {
          setSavingDocusignConfig(true);
          try {
            await putDocusignConfig(propertyId, {
              accountId,
              clickwrapId,
              environment,
            });
          } finally {
            setSavingDocusignConfig(false);
          }
        }}
      />
    </div>
  );
};

export default DocumentsStep;
