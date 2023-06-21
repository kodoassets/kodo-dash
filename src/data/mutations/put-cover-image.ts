import axios from "axios";

export const putCoverImage = (propertyId: string, coverImageUrl: string) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties/${propertyId}/cover`,
    {
      cover: coverImageUrl,
    }
  );
};
