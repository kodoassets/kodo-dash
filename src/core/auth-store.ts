import { create } from "zustand";

interface AuthState {
  signedMessage: string;
  walletAddress: string;
  setSignedMessage: (signedMessage: string) => void;
  setWalletAddress: (walletAddress: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  signedMessage: "",
  walletAddress: "",
  setSignedMessage: (signedMessage: string) => set({ signedMessage }),
  setWalletAddress: (walletAddress: string) => set({ walletAddress }),
}));

export default useAuthStore;
