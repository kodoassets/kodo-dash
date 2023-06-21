import TextInput from "@/components/TextInput";
import Step from "./Step";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { useState } from "react";

export interface TokenInput {
  title: string;
  tokenSymbol: string;
  tokenPriceInUsd: string;
  totalSupply: string;
  contractAddress: string;
}
interface Props {
  onSubmit: (details: TokenInput) => void;
  loading: boolean;
}

const CreateToken = ({ onSubmit, loading = false }: Props) => {
  const [title, setTitle] = useState("");
  const [tokenSymbol, setSymbol] = useState("");
  const [tokenPriceInUsd, setTokenPriceInUsd] = useState("");
  const [totalSupply, setTotalSupply] = useState("");
  const [contractAddress, setContractAddress] = useState(
    "0xA48eb16038Fe133469d4f2bc8f3365b959512E84".toLowerCase()
  );

  return (
    <Step stepNumber={1} title="Token Details" active={true}>
      <TextInput
        value={title}
        onChange={setTitle}
        className="mt-2"
        label="Offer title"
      />
      <TextInput
        onChange={setSymbol}
        value={tokenSymbol}
        className="w-full mt-2"
        label="Token Symbol (Ticker)"
      />
      <TextInput
        onChange={setTokenPriceInUsd}
        value={tokenPriceInUsd}
        type="number"
        className="mt-2"
        label="Unit price in USD"
      />
      <TextInput
        onChange={setTotalSupply}
        value={totalSupply}
        type="number"
        className="mt-2"
        label="Total supply"
      />

      <div className="text-center mt-4">
        <PrimaryButton
          disabled={
            !tokenSymbol ||
            !title ||
            !tokenPriceInUsd ||
            !totalSupply ||
            loading
          }
          isLoading={loading}
          text="Create token"
          onClick={
            !loading
              ? () =>
                  onSubmit({
                    title,
                    tokenSymbol,
                    tokenPriceInUsd,
                    totalSupply,
                    contractAddress,
                  })
              : () => {}
          }
        />
      </div>
    </Step>
  );
};

export default CreateToken;
