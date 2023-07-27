import ProgressBar from "@/components/ProgressBar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAccount } from "wagmi";

export const AffiliatesComission = () => {
  const { address } = useAccount();

  const { data } = useQuery(["affiliates"], {
    queryFn: () =>
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/backoffice/affiliates`, {
          headers: {
            // "X-signed-message": signedMessage,
            "X-wallet-address": address,
          },
        })
        .then((res) => res.data),
  });

  return (
    <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl h-full">
      <p className="mb-6 text-xl font-thin">Affiliates Comission</p>
      <div>
        <div className="flex flex-row justify-between w-full mt-4">
          <p className="text-[#7896A1]">Claimed</p>
          <p className="text-[#F8F8F8] font-regular">
            ${data?.affiliatesComission?.claimed?.toLocaleString()}
          </p>
        </div>
        <div className="w-full bg-[#000F1480] h-12 mt-4 rounded-lg">
          <ProgressBar
            className="!h-12 rounded-lg"
            progress={
              (data?.affiliatesComission?.claimed /
                (data?.affiliatesComission?.claimed +
                  data?.affiliatesComission?.due)) *
              100
            }
          />
        </div>
      </div>
      <div>
        <div className="flex flex-row justify-between w-full mt-4">
          <p className="text-[#7896A1]">Due</p>
          <p className="text-[#F8F8F8] font-regular">
            ${data?.affiliatesComission?.due}
          </p>
        </div>
        <div className="w-full bg-[#000F1480] h-12 mt-4 rounded-lg">
          <ProgressBar
            className="!h-12 rounded-lg"
            progress={
              (data?.affiliatesComission?.due /
                (data?.affiliatesComission?.claimed +
                  data?.affiliatesComission?.due)) *
              100
            }
          />
        </div>
      </div>
    </div>
  );
};
