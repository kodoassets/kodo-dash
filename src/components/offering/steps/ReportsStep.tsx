import Button from "@/components/Button";
import PrimaryButton from "@/components/Button/PrimaryButton";
import InteractiveList from "@/components/InteractiveList";
import TextInput from "@/components/TextInput";
import { putReports } from "@/data/mutations/put-reports";
import {
  ConfigurationSpecification,
  ConfigurationStepStatus,
  Property,
} from "@/data/queries/get-properties";
import { PropertyByIdQueryKey } from "@/pages/offerings/edit/[id]";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-toastify";

interface Props {
  property: Property;
  specification: ConfigurationSpecification;
  validationResult: ConfigurationStepStatus;
}

const ReportsStep = ({ property, specification, validationResult }: Props) => {
  const [reports, setReports] = useState(property.reports || []);
  const queryClient = useQueryClient();
  const [savingReports, setSavingReports] = useState(false);
  const [reportInput, setReportInput] = useState("");

  const reportsDidntChange =
    reports.every((i) => property.gallery?.includes(i)) &&
    reports.length === property.gallery?.length;

  return (
    <div className="">
      <p className="mt-4 mb-2">Reports</p>

      <p className="mt-4 mb-2">Link to report&apos;s .pdfs</p>
      <div className="flex flex-row items-center">
        <TextInput
          className="inline flex-1"
          label="Add report"
          type="text"
          value={reportInput}
          onChange={setReportInput}
        />
        <Button
          className="mt-[28px] px-8"
          onClick={() => {
            if (reportInput === "" || !reportInput.includes("https://")) {
              toast.error(
                "Invalid report URL. Must be a valid link starting with https://"
              );
              return;
            }

            if (reports.includes(reportInput)) {
              toast.error("Report already added");
              return;
            }

            setReports([...reports, reportInput]);
            setReportInput("");
          }}
          text="Add"
        />
      </div>
      <InteractiveList
        onRemoveItem={(item) =>
          setReports(reports.filter((i) => i !== item.id))
        }
        items={reports.map((i) => ({ id: i, text: i }))}
      />
      <PrimaryButton
        disabled={reportsDidntChange || savingReports}
        isLoading={savingReports}
        className="w-full mt-4"
        text="Save"
        onClick={async () => {
          setSavingReports(true);
          try {
            await putReports(property._id, reports);
            toast.success("Reports saved");
            queryClient.invalidateQueries({
              queryKey: [PropertyByIdQueryKey],
            });
          } finally {
            setSavingReports(false);
          }
        }}
      />
    </div>
  );
};

export default ReportsStep;
