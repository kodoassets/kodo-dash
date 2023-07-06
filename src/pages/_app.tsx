import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "react-toastify/dist/ReactToastify.css";

import { Web3Modal } from "@web3modal/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import useAuth from "@/core/use-auth";
import { providers } from "ethers";
import { mainnet, polygon } from "wagmi/chains";
// @ts-ignore
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { EthereumClient, w3mConnectors } from "@web3modal/ethereum";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";

const projectId = "284bbd5e31e1667d697f3ca612c9bdd7";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, polygon],
  [alchemyProvider({ apiKey: "LFUvQaD3PRH9b7lSALfbDDA61-tg_zfX" })]
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  connectors: w3mConnectors({ projectId, chains, version: 2 }),
  webSocketPublicClient,
});

const queryClient = new QueryClient();
const ethereumClient = new EthereumClient(config, chains);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <WagmiConfig config={config}>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
          <ToastContainer />
        </QueryClientProvider>
      </WagmiConfig>

      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </>
  );
}
