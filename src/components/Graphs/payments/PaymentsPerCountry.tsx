import PieChart from "@/components/Charts/pie";
import { useState } from "react";

export const PaymentsPerCountry = ({ data }: { data: any }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(0);

  const handleMouseEnter = (index: number) => {
    setModalContent(index);
    setShowModal(true);
  };

  const handleMouseLeave = () => {
    setShowModal(false);
  };

  return (
    <div className="flex flex-col items-start text-white bg-gradient-2 rounded-2xl py-6 px-8 w-full col-span-2">
      <p className="mb-4 text-xl font-thin">Payments per Country</p>
      <div className="grid grid-cols-2 mt-4">
        <div className="h-[264px]">
          <PieChart
            labels={data?.totalPerCountry?.map((row: any) => row.Country)}
            datasets={[
              {
                data: data?.totalPerCountry?.map((row: any) => row.TotalSold),
                backgroundColor: ["#000F14", "#00AEEF", "#4C2D9A"],
              },
            ]}
          />
        </div>
        <div>
          <table className="w-full font-light">
            <thead className="text-[#7896A1]">
              <tr>
                <th className="text-left pb-4 font-extralight text-lg">
                  Country
                </th>
                <th className="text-left pb-4 font-extralight text-lg">
                  Amount
                </th>
                <th className="text-center pb-4 font-extralight text-lg">%</th>
              </tr>
            </thead>
            <tbody className="relative">
              {data?.totalPerCountry
                ?.sort(
                  (a: { TotalSold: number }, b: { TotalSold: number }) =>
                    b.TotalSold - a.TotalSold
                )
                .map((row: any, index: number) => (
                  <tr
                    key={row.country}
                    className="bg-[#000F14] h-7 text-sm relative border border-white/20"
                    onMouseEnter={() => handleMouseEnter(index)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <td className="text-left w-48 px-3 py-2">
                      {index + 1} - {row.Country}
                    </td>
                    <td className="text-left w-32">
                      $ {row.TotalSold.toLocaleString()}
                    </td>
                    <td className="text-left px-3">
                      {((row.TotalSold / data?.total?.totalSold) * 100).toFixed(
                        2
                      )}
                      %
                    </td>
                  </tr>
                ))}
              {showModal && (
                <div className="absolute top-8 left-[-200px] bg-gradient-2 p-4 border border-white/20 rounded-2xl backdrop-blur-md">
                  <div className="text-center mb-4">
                    <p className="font-light text-sm text-[#7896A1]">
                      Top Methods
                    </p>
                    <p className="font-medium text-xl">
                      {data?.totalPerCountry[modalContent].Country}
                    </p>
                  </div>
                  {["USDC", "USDT", "BUSD"].map((coin, index) => (
                    <div
                      className="bg-[#000F14] flex items-center gap-4 w-56 justify-between mt-2 px-3 py-2 rounded-lg"
                      key={index}
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-[#00AEEF] w-4 h-4 rounded-full" />
                        <span>{coin}</span>
                      </div>
                      <div>
                        {(
                          (data?.totalPerCountry[modalContent].perCoin?.[coin] /
                            data?.totalPerCountry[modalContent].TotalSold) *
                          100
                        ).toFixed(2)}
                        %
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
