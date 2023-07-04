import axios from "axios";

export interface CreateAdminInput {
  address: string;
  name?: string;
}

export const createAdmin = (input: CreateAdminInput) => {
  return axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/permissions/wallets`,
    {
      ...input,
    }
  );
};
