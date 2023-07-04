import { apiUrl } from "./config";

type Permission = {
  id: string;
  name: string;
  description: string;
};

export const getPermissions: () => Promise<Permission[]> = async () => {
  const data = await fetch(apiUrl + "/backoffice/permissions");
  return data.json();
};
