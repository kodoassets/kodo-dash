import ProgressBar from "@/components/ProgressBar";

export const TokenHolders = ({ data }: { data: any }) => {
  return (
    <div className="bg-gradient-2 py-6 px-8 text-white text-start rounded-2xl h-full">
      <p className="mb-6 text-xl font-thin">Token Holders</p>
      <div>
        <div className="flex flex-row justify-between w-full mt-4">
          <p className="text-[#7896A1]">Primary Market</p>
          <p className="text-[#F8F8F8] font-regular">{data?.activeUsers}</p>
        </div>
        <div className="w-full bg-[#000F1480] h-12 mt-4 rounded-lg">
          <ProgressBar
            className="!h-12 rounded-lg"
            progress={(data?.activeUsers / 20) * 100}
          />
        </div>
      </div>
    </div>
  );
};
