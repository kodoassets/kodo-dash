interface Props {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={`border-gray-300 border bg-white rounded ${className || ""}`}
    >
      {children}
    </div>
  );
};

export default Card;
