import { create } from "zustand";

interface AuthState {
  permissions: string[];
  signedMessage: string;
  walletAddress: string;
  setPermissions: (permissions: string[]) => void;
  setSignedMessage: (signedMessage: string) => void;
  setWalletAddress: (walletAddress: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  signedMessage: "",
  walletAddress: "",
  permissions: [],
  setSignedMessage: (signedMessage: string) => set({ signedMessage }),
  setWalletAddress: (walletAddress: string) => set({ walletAddress }),
  setPermissions: (permissions: string[]) => set({ permissions }),
}));

export default useAuthStore;
