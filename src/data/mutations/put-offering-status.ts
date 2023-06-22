import axios from "axios";
import { OfferingStatus } from "../queries/get-properties";

export const putOfferingStatus = (
  propertyId: string,
  status: OfferingStatus
) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties/${propertyId}/status`,
    {
      status,
    }
  );
};
