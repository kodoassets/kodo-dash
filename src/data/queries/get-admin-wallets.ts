import { apiUrl } from "./config";

interface Permission {
  id: string;
  name: string;
  description: string;
}

export type AdminWallet = {
  address: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  permissions: Permission[];
};

export const getAdminWallets: () => Promise<AdminWallet[]> = async () => {
  const data = await fetch(apiUrl + "/backoffice/permissions/wallets");
  return data.json();
};
