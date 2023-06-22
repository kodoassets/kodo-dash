import axios from "axios";

export interface DocusignConfig {
  clickwrapId: string;
  accountId: string;
  environment: string;
}

export const putDocusignConfig = (
  propertyId: string,
  docusignConfig: DocusignConfig
) => {
  return axios.put(
    `${process.env.NEXT_PUBLIC_API_URL}/backoffice/properties/${propertyId}/docusign-config`,
    {
      ...docusignConfig,
    }
  );
};
