import ProgressBar from "@/components/ProgressBar";

export const UsersPerToken = ({ data }: { data: any }) => {
  return (
    <div className="bg-gradient-2 rounded-2xl py-6 px-8">
      <p className="mb-12 text-xl font-thin text-white">Users per Token</p>
      {data?.usersPerToken?.map((Data: any) => (
        <div key={Data.propertyId} className="flex flex-row mt-4">
          <span className="text-white bg-[#00AEEF] rounded-lg p-2 mr-2 text-xs min-w-[90px]">
            {Data.tokenSymbol}
          </span>
          <ProgressBar
            className="!h-8 rounded-lg"
            progress={
              +((Data.userWalletCount * 100) / data.activeUsers).toFixed(0)
            }
            innerLabel={Data.userWalletCount.toString()}
          />
          <span className="text-[#7896A1] bg-[#000F14] rounded-lg p-2 ml-2 min-w-[60px] text-xs">
            {((Data.userWalletCount * 100) / data.activeUsers).toFixed(0)}%
          </span>
        </div>
      ))}
    </div>
  );
};
