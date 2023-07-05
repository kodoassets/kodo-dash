import axios, { AxiosInstance } from "axios";

let instance: AxiosInstance | null = null;

export const getAuthHeaders = () => {
  return {
    "x-wallet-address": localStorage.getItem("walletAddress"),
    "x-wallet-signature": localStorage.getItem("walletSignature"),
  };
};

export const getInstance = () => {
  if (!instance) {
    instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL,
    });
  }

  return instance;
};
