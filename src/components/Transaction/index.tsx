interface TransactionProps {
  id: string;
  date: string;
  amountInUsd: number;
  tokenAmount: number;
  tokenSymbol: string;
  user: {
    email: string;
    wallet: string;
  };
}

const Transaction = ({
  date,
  amountInUsd,
  tokenSymbol,
  tokenAmount,
  user: { email, wallet },
}: TransactionProps) => {
  return (
    <div className="block grid text-center grid-cols-4 gap-4 p-4 items-center justify-center w-full border-b">
      <span>{new Date(date).toLocaleDateString()}</span>
      <span>{email}</span>
      <span>
        ${amountInUsd} ({tokenAmount} {tokenSymbol})
      </span>
      <a
        className="text-sky-600"
        href="https://polygonscan.com/address/0x9ead03f7136fc6b4bdb0780b00a1c14ae5a8b6d0"
        target="_blank"
        rel="noopener noreferrer"
      >
        View on explorer
      </a>
    </div>
  );
};

export default Transaction;
