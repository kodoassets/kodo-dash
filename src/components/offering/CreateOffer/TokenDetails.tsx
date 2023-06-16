import TextInput from "@/components/TextInput";
import Step from "./Step";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { useState } from "react";

export interface DetailsInput {
  tokenSymbol: string;
  tokenName: string;
  // offerStarts: string;
  // offerEnds: string;
}
interface Props {
  onSubmit: (details: DetailsInput) => void;
  active?: boolean;
}

const TokenDetails = ({ onSubmit, active = false }: Props) => {
  const [tokenSymbol, setSymbol] = useState("");
  const [tokenName, setName] = useState("");
  // const [offerStarts, setOfferStarts] = useState("");
  // const [offerEnds, setOfferEnds] = useState("");

  return (
    <Step stepNumber={1} title="Token Details" active={active}>
      <TextInput
        disabled={!active}
        onChange={setSymbol}
        value={tokenSymbol}
        className="w-full mt-2"
        label="Token Symbol (Ticker)"
      />
      <TextInput
        disabled={!active}
        onChange={setName}
        value={tokenName}
        className="mt-2"
        label="Token name"
      />
      {/* <TextInput
        disabled={!active}
        onChange={setOfferStarts}
        value={offerStarts}
        className="mt-2"
        label="Offer Starts"
      />
      <TextInput
        disabled={!active}
        onChange={setOfferEnds}
        value={offerEnds}
        className="mt-2"
        label="Offer Ends"
      /> */}

      <div className="text-center mt-4">
        <PrimaryButton
          disabled={
            !active || !tokenSymbol || !tokenName // || !offerStarts || !offerEnds
          }
          className="w-28"
          text="Next Step"
          onClick={() => onSubmit({ tokenName, tokenSymbol })}
        />
      </div>
    </Step>
  );
};

export default TokenDetails;
