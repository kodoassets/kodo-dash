import axios from "axios";

export const putGallery = (propertyId: string, images: string[]) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties/${propertyId}/gallery`,
    {
      gallery: images,
    }
  );
};
