import PrimaryButton from "@/components/Button/PrimaryButton";
import Card from "@/components/Card";
import Scaffold from "@/components/Scaffold";
import { getAdminWallet, getPermissions } from "@/data/queries/get-permissions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";

const WalletPermissions = () => {
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

  console.log(admin);
  const { data: permissions } = useQuery(["permissions"], () =>
    getPermissions()
  );

  const [selectedPermissions, setSelectedPermissions] = useState<string[]>();

    

  if (!admin) {
    return null;
  }

  return (
    <Scaffold title="Permissions">
      <Card className="p-8">
        {permissions?.map((p) => (
          <div
            key={p.name}
            className="bg-gradient p-4 rounded-md mb-4 flex flex-row hover:cursor-pointer"
          >
            <div className="flex justify-center items-center px-4">
              <input type="checkbox" />
            </div>
            <div>
              <p>{p.name}</p>
              <p className="text-gray-200 font-light">{p.description}</p>
            </div>
          </div>
        ))}
        <div className="flex flex-row justify-between mt-8">
          <PrimaryButton text="Save" onClick={() => {}} />
          <PrimaryButton
            className="bg-red-500"
            text="Remove Wallet"
            onClick={() => {}}
          />
        </div>
      </Card>
    </Scaffold>
  );
};

export default WalletPermissions;
