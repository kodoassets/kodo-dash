import axios from "axios";

export const putWhitepaperUrl = (propertyId: string, whitepaperUrl: string) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties/${propertyId}/whitepaper`,
    {
      whitepaperUrl,
    }
  );
};
