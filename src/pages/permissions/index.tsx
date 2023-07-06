import PrimaryButton from "@/components/Button/PrimaryButton";
import Card from "@/components/Card";
import Scaffold from "@/components/Scaffold";
import TextInput from "@/components/TextInput";
import useAuth from "@/core/use-auth";
import { createAdmin } from "@/data/mutations/create-admin";
import { getAdminWallets } from "@/data/queries/get-admin-wallets";
import { useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import Link from "next/link";
import { useState } from "react";
import { toast } from "react-toastify";

const Permissions = () => {
  // useAuth(["editPermissions"]);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addLoading, setAddLoading] = useState(false);

  const { data: adminWallets, refetch } = useQuery(["admin-wallets"], () =>
    getAdminWallets()
  );

  return (
    <Scaffold title="Permissions">
      <Card className="p-8">
        <p className="mb-4">
          New wallets are created with zero permissions.
          <br />
          You can add each desired permission one by one after inserting the
          wallet below.
        </p>
        <TextInput
          label="Add wallet address"
          value={address}
          onChange={setAddress}
        />
        <TextInput
          className="mt-2"
          label="Name (required)"
          value={name}
          onChange={setName}
        />
        <PrimaryButton
          text="Add"
          className="mt-3"
          isLoading={addLoading}
          disabled={!address || !address.startsWith("0x") || !name}
          onClick={async () => {
            setAddLoading(true);
            try {
              await createAdmin({
                address,
                name,
              });
              await refetch();
              setName("");
              setAddress("");
            } catch (e) {
              if ((e as AxiosError).response?.status === 409) {
                toast.error("This wallet is already an admin");
              }
            } finally {
              setAddLoading(false);
            }
          }}
        />
      </Card>
      <Card className="p-8 mt-4">
        <h1 className="mb-4">Allowed wallets</h1>
        {(adminWallets || []).map((wallet) => (
          <div
            key={wallet.address}
            className="flex flex-row bg-gradient border border-slate-700 p-4 mb-2 rounded-md items-center justify-between"
          >
            <div className="flex flex-col">
              <p className="text-sm">{wallet.name || "(no label)"}</p>
              <p>{wallet.address}</p>
            </div>
            <Link href={"/"} />
            <Link
              className="text-blue-500 text-sm underline mr-8"
              href="/permissions/[id]"
              as={`/permissions/${wallet.address}`}
              passHref
            >
              EDIT
            </Link>
          </div>
        ))}
      </Card>
    </Scaffold>
  );
};

export default Permissions;
