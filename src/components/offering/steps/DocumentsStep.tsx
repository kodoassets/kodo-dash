import PrimaryButton from "@/components/Button/PrimaryButton";
import TextInput from "@/components/TextInput";
import { putDocusignConfig } from "@/data/mutations/put-docusign-config";
import { putWhitepaperUrl } from "@/data/mutations/put-whitepaper-url";
import {
  ConfigurationSpecification,
  ConfigurationStepStatus,
  Property,
} from "@/data/queries/get-properties";
import { PropertyByIdQueryKey } from "@/pages/offerings/[slug]";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";

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
  const queryClient = useQueryClient();

  const [savingDocusignConfig, setSavingDocusignConfig] = useState(false);
  const [savingWhitepaper, setSavingWhitepaper] = useState(false);

  const [whitepaperUrl, setWhitepaperUrl] = useState(
    property.whitepaperUrl ?? ""
  );

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
            toast.success("Docusign configuration saved");
            queryClient.invalidateQueries({
              queryKey: [PropertyByIdQueryKey],
            });
          } finally {
            setSavingDocusignConfig(false);
          }
        }}
      />
      <p className="mt-8 mb-2">Whitepaper</p>
      <TextInput
        label="Link to whitepaper"
        value={whitepaperUrl}
        onChange={setWhitepaperUrl}
      />
      <PrimaryButton
        disabled={
          !whitepaperUrl ||
          savingWhitepaper ||
          (!!property.whitepaperUrl && whitepaperUrl === property.whitepaperUrl)
        }
        isLoading={savingWhitepaper}
        className="w-full mt-4"
        text="Save"
        onClick={async () => {
          setSavingWhitepaper(true);
          try {
            await putWhitepaperUrl(propertyId, whitepaperUrl);
            toast.success("Whitepaper link saved");
            queryClient.invalidateQueries({
              queryKey: [PropertyByIdQueryKey],
            });
          } finally {
            setSavingWhitepaper(false);
          }
        }}
      />
    </div>
  );
};

export default DocumentsStep;
