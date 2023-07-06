import axios from "axios";

export const putReports = (propertyId: string, reports: string[]) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties/${propertyId}/reports`,
    {
      reports,
    }
  );
};
