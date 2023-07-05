import { Permission } from "@/core/use-auth";
import { apiUrl } from "./config";

export type PermissionDefinition = {
  id: string;
  name: string;
  description: string;
};

export const getPermissions: () => Promise<
  PermissionDefinition[]
> = async () => {
  const data = await fetch(apiUrl + "/backoffice/permissions");
  return data.json();
};

type AdminWallet = {
  address: string;
  name: string;
  permissions: Permission[];
};

export const getAdminWallet = async (wallet: string): Promise<AdminWallet> => {
  const data = await fetch(
    apiUrl + `/backoffice/permissions/wallets/${wallet}`
  );
  return data.json();
};
