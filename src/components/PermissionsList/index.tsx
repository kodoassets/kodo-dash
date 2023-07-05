import { useState } from "react";
import Card from "../Card";
import PrimaryButton from "../Button/PrimaryButton";
import { Permission } from "@/core/use-auth";
import { PermissionDefinition } from "@/data/queries/get-permissions";
import { putPermissions } from "@/data/mutations/put-permissions";
import { toast } from "react-toastify";
import Router from "next/router";

type PermissionsListProps = {
  address: string;
  name?: string;
  currentPermissions: Permission[];
  availablePermissions: PermissionDefinition[];
};
const PermissionsList = ({
  address,
  name,
  currentPermissions,
  availablePermissions,
}: PermissionsListProps) => {
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [selectedPermissions, setSelectedPermissions] =
    useState<string[]>(currentPermissions);

  const permissionsChanged = () => {
    return (
      selectedPermissions.sort().join(",") !==
      currentPermissions.sort().join(",")
    );
  };

  return (
    <Card className="p-8">
      <p className="text-light mb-1">You are editing the following wallet:</p>
      <p className="mb-4">
        {address} ({name || "(no label)"})
      </p>
      {availablePermissions
        ?.filter((p) => p.id !== "all")
        .map((p) => (
          <div
            key={p.name}
            className="bg-gradient p-4 rounded-md mb-4 flex flex-row hover:cursor-pointer"
            onClick={() => {
              if (selectedPermissions?.includes(p.id)) {
                setSelectedPermissions(
                  selectedPermissions.filter((sp) => sp !== p.id)
                );
              } else {
                setSelectedPermissions([...selectedPermissions, p.id]);
              }
            }}
          >
            <div className="flex justify-center items-center px-4">
              <input
                type="checkbox"
                checked={selectedPermissions.includes(p.id)}
              />
            </div>
            <div>
              <p>{p.name}</p>
              <p className="text-gray-200 font-light">{p.description}</p>
            </div>
          </div>
        ))}
      <div className="flex flex-row justify-between mt-8">
        <PrimaryButton
          className="bg-red-500"
          text="Remove Wallet"
          onClick={() => {}}
        />
        <PrimaryButton
          text="Save"
          onClick={async () => {
            setIsSaveLoading(true);
            try {
              let res = await putPermissions(
                address,
                selectedPermissions as Permission[]
              );
              if (res.status === 200) {
                toast.success("Permissions updated");
                return Router.replace("/permissions");
              } else {
                toast.error(
                  "Error updating permissions. If the error persists, contact support."
                );
              }
            } finally {
              setIsSaveLoading(false);
            }
          }}
          disabled={!permissionsChanged()}
        />
      </div>
    </Card>
  );
};

export default PermissionsList;
