import { useQuery } from "@tanstack/react-query";
import Router from "next/router";
import { useEffect, useState } from "react";
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
  const { signedMessage, permissions, setPermissions } = useAuthStore(
    (state) => state
  );
  console.log({
    address,
    signedMessage,
    permissions,
  });

  useEffect(() => {
    if (address && signedMessage) {
      getAdminWallet(address || "")
        .then((data) => {
          // @ts-ignore
          if (data?.message === "Wallet not found") {
            toast.error("Wallet not found");
            Router.replace("/");
          }
          if (data?.permissions) {
            setPermissions(data?.permissions);
          }
        })
        .catch((e) => {
          console.log("caught error");
          Router.replace("/");
        });
    }

    if ((!address || !signedMessage) && window.location.pathname !== "/") {
      console.log("No adddress or signed message");
      Router.replace("/");
    }
  }, [address, signedMessage, setPermissions]);

  // useEffect(() => {
  //   if (
  //     permissions?.find((p) => p === "all") ||
  //     window.location.pathname === "/"
  //   ) {
  //     return;
  //   }
  //   if (
  //     requiredPermissions?.length &&
  //     !permissions.every((p) => requiredPermissions?.includes(p as Permission))
  //   ) {
  //     toast.error("You don't have permissions to access this page");
  //     Router.replace("/");
  //   }
  //   return;
  // }, [requiredPermissions, permissions]);
};

export default useAuth;
