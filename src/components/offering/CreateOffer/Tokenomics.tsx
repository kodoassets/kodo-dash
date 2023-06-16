import * as React from "react";
import TextInput from "@/components/TextInput";
import Step from "./Step";
import PrimaryButton from "@/components/Button/PrimaryButton";

export interface TokenomicsInput {
  totalSupply: string;
  tokenPriceInUsd: string;
}

interface Props {
  onSubmit: (tokenomics: TokenomicsInput) => void;
  active: boolean;
  loading: boolean;
}

const Tokenomics = ({ onSubmit, active, loading }: Props) => {
  const [totalSupply, setTotalSupply] = React.useState("");
  const [tokenPriceInUsd, setTokenPriceInUsd] = React.useState("");

  return (
    <Step stepNumber={3} title="Tokenomics" active={active}>
      <TextInput
        value={totalSupply}
        onChange={setTotalSupply}
        disabled={!active}
        className="mt-2"
        label="Total Token Supply"
        type="number"
      />
      <TextInput
        value={tokenPriceInUsd}
        onChange={setTokenPriceInUsd}
        disabled={!active}
        className="mt-2"
        label="Token Unit Value ($)"
        type="number"
      />
      <div className="text-center mt-4">
        <PrimaryButton
          isLoading={loading}
          disabled={!active || !totalSupply || !tokenPriceInUsd}
          className="w-28"
          text="Create Token"
          onClick={() => onSubmit({ totalSupply, tokenPriceInUsd })}
        />
      </div>
    </Step>
  );
};

export default Tokenomics;
