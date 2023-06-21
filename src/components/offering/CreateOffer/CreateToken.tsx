import TextInput from "@/components/TextInput";
import { erc20abi } from "./abi";
import Step from "./Step";
import PrimaryButton from "@/components/Button/PrimaryButton";
import { useState } from "react";
import { Signer, ethers } from "ethers";
import { bytecode } from "./bytecode";
import { parseUnits } from "ethers/lib/utils.js";
import { useAccount } from "wagmi";
import { createProperty } from "@/data/mutations/create-property";
import { toast } from "react-toastify";
import Router from "next/router";

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

const deployContract = async (signer: Signer, tokenSymbol: string) => {
  // TODO: limited supply
  const factory = new ethers.ContractFactory(erc20abi, bytecode, signer);
  const contract = await factory.deploy(tokenSymbol, tokenSymbol);
  await contract.deployTransaction.wait();
  return contract;
};

const CreateToken = ({ onSubmit, loading = false }: Props) => {
  const [isDeploying, setIsDeploying] = useState(false);
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
            isDeploying ||
            !tokenSymbol ||
            !title ||
            !tokenPriceInUsd ||
            !totalSupply ||
            loading
          }
          isLoading={loading || isDeploying}
          text="Create token"
          onClick={async () => {
            if (window.ethereum) {
              setIsDeploying(true);
              try {
                const provider = new ethers.providers.Web3Provider(
                  // @ts-ignore
                  window.ethereum
                );
                const signer = provider.getSigner();
                const contract = await deployContract(signer, tokenSymbol);
                if (!contract) {
                  toast.error("Failed to deploy contract");
                  return;
                }
                await createProperty({
                  title,
                  contract: {
                    contractAddress: contract.address,
                    tokenSymbol,
                    totalSupply,
                  },
                  tokenPriceInUsd,
                });
                Router.push("/offerings");
              } catch (e) {
              } finally {
                setIsDeploying(false);
              }
            }
          }}
        />
      </div>
    </Step>
  );
};

export default CreateToken;
