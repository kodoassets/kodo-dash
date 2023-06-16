import { useState } from "react";
import TextInput from "@/components/TextInput";
import Step from "./Step";
import PrimaryButton from "@/components/Button/PrimaryButton";

export interface AssetDetailsInput {
  title: string;
  totalArea: string;
  description: string;
  address: string;
}

interface Props {
  onSubmit: (details: AssetDetailsInput) => void;
  active: boolean;
}

const AssetDetails = ({ onSubmit, active }: Props) => {
  const [title, setTitle] = useState("");
  const [totalArea, setTotalArea] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");

  return (
    <Step stepNumber={2} title="Asset Details" active={active}>
      <TextInput
        value={title}
        onChange={setTitle}
        disabled={!active}
        className="w-full mt-2"
        label="Title"
      />
      <TextInput
        value={totalArea}
        onChange={setTotalArea}
        disabled={!active}
        className="w-full mt-2"
        label="Total Privative Area (m2)"
      />
      <TextInput
        value={description}
        onChange={setDescription}
        disabled={!active}
        className="mt-2"
        label="Description"
      />
      <TextInput
        value={address}
        onChange={setAddress}
        disabled={!active}
        className="mt-2"
        label="Address"
      />

      <div className="text-center mt-4">
        <PrimaryButton
          disabled={!active || !title || !totalArea || !description || !address}
          className="w-28"
          text="Next Step"
          onClick={() => onSubmit({ title, totalArea, description, address })}
        />
      </div>
    </Step>
  );
};

export default AssetDetails;
