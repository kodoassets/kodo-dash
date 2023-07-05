import PrimaryButton from "@/components/Button/PrimaryButton";
import Card from "@/components/Card";
import PermissionsList from "@/components/PermissionsList";
import Scaffold from "@/components/Scaffold";
import useAuth from "@/core/use-auth";
import { getAdminWallet, getPermissions } from "@/data/queries/get-permissions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const WalletPermissions = () => {
  useAuth(["editPermissions"]);
  const router = useRouter();

  const [changeStatusLoading, setChangeStatusLoading] = useState(false);

  console.log(router.query);
  const { data: admin } = useQuery(
    ["adminByAddress", router.query.wallet],
    () => getAdminWallet(router.query.wallet as string),
    {
      enabled: !!router.query.wallet,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );

  const { data: permissions } = useQuery(["permissions"], () =>
    getPermissions()
  );

  if (!admin?.permissions || !permissions) {
    return null;
  }

  return (
    <Scaffold title="Permissions">
      <PermissionsList
        address={admin.address}
        name={admin.name}
        availablePermissions={permissions}
        currentPermissions={admin.permissions}
      />
    </Scaffold>
  );
};

export default WalletPermissions;
