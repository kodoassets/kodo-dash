import axios from "axios";

export interface TextContent {
  title: string;
  address: string;
  description: string;
  bomaAreaSquareMeters: string;
  totalAreaSquareMeters: string;
  squareMetersByToken: string;
}

export const putTextContent = (propertyId: string, content: TextContent) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties/${propertyId}/text-content`,
    {
      ...content,
    }
  );
};
