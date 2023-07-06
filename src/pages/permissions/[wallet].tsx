import PermissionsList from "@/components/PermissionsList";
import Scaffold from "@/components/Scaffold";
import useAuthStore from "@/core/auth-store";
import useAuth, { Permission } from "@/core/use-auth";
import { AdminWallet } from "@/data/queries/get-admin-wallets";
import { getAdminWallet, getPermissions } from "@/data/queries/get-permissions";
import { useQuery } from "@tanstack/react-query";

type Props = {
  wallet: AdminWallet;
};

const WalletPermissions = ({ wallet }: Props) => {
  // useAuth(["editPermissions"]);

  const { data: permissions } = useQuery(["permissions"], () =>
    getPermissions()
  );

  return (
    <Scaffold title="Permissions">
      {permissions ? (
        <PermissionsList
          address={wallet.address}
          name={wallet.name}
          availablePermissions={permissions}
          currentPermissions={
            (wallet?.permissions.map((p) => p.id) || []) as Permission[]
          }
        />
      ) : (
        <p>Loading</p>
      )}
    </Scaffold>
  );
};

// @ts-ignore
export async function getServerSideProps({ query }) {
  const wallet = await getAdminWallet(query.wallet);

  if (!wallet) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      wallet,
    },
  };
}

export default WalletPermissions;
