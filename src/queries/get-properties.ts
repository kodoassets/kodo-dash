import { apiUrl } from "./config";

export const getProperties = async () => {
  const data = await fetch(apiUrl + "/properties");
  return data.json();
};
