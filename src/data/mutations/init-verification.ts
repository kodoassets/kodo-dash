import axios from "axios";

export const initVerification = (walletAddress: string) => {
  return axios.post("http://localhost:3001/accounts/verifications", {
    wallet: {
      address: walletAddress,
    },
  });
};

export const confirmVerification = (
  walletAddress: string,
  signedMessage: string
) => {
  return axios.post("http://localhost:3001/accounts/verifications/confirm", {
    wallet: {
      address: walletAddress,
    },
    signedMessage,
  });
};
