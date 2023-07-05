import { Permission } from "@/core/use-auth";
import axios from "axios";

export interface DocusignConfig {
  clickwrapId: string;
  accountId: string;
  environment: string;
}

export const putPermissions = (
  walletAddress: string,
  permissions: Permission[]
) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/permissions/wallets/${walletAddress}`,
    {
      permissions,
    }
  );
};
