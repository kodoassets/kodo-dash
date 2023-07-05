import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import { useEffect } from "react";
import { useAccount } from "wagmi";
import useAuthStore from "./auth-store";
import { getAdminWallet } from "@/data/queries/get-permissions";
import { toast } from "react-toastify";

export const SIGNED_MESSAGE_KEY = "SIGNED_MESSAGE";

export type Permission =
  | "all"
  | "viewDashboard"
  | "viewOfferings"
  | "viewPayments"
  | "viewUsers"
  | "editOfferingContent"
  | "editOfferingStatus"
  | "createOffering"
  | "viewOfferingDashboard"
  | "editPermissions";

const useAuth = (requiredPermissions?: Permission[]) => {
  const { address } = useAccount();
  const { signedMessage } = useAuthStore((state) => state);

  console.log(address);
  console.log(signedMessage);

  const { data } = useQuery(["get-admin"], {
    queryFn: async () => await getAdminWallet(address || ""),
    enabled: !!address && !!signedMessage,
    cacheTime: 0,
    onSettled(data, error) {
      // @ts-ignore
      if (error || data?.message === "Wallet not found") {
        toast.error("Wallet not found");
        Router.replace("/");
      }

      // @ts-ignore
      if (data?.permissions?.length === 0) {
        toast.error("You don't have permissions set up for this wallet");
        Router.replace("/");
      }
    },
  });

  console.log(data);

  // useEffect(() => {
  //   if ((!address || !signedMessage) && window.location.pathname !== "/") {
  //     Router.replace("/");
  //   }
  // }, [address, signedMessage]);

  console.log(data);
  // useEffect(() => {
  //   if (
  //     data?.permissions?.find((p) => p.id === "all") ||
  //     window.location.pathname === "/"
  //   ) {
  //     return;
  //   }
  //   if (
  //     requiredPermissions?.length &&
  //     !data?.permissions.every((p) =>
  //       requiredPermissions?.includes(p.id as Permission)
  //     )
  //   ) {
  //     toast.error("You don't have permissions to access this page");
  //     Router.replace("/");
  //   }
  //   return;
  //   // @ts-ignore
  // }, [requiredPermissions, data?.permissions, data?.permissions?.length]);

  if (!address || !signedMessage) {
    return null;
  }

  return data;
};

export default useAuth;
