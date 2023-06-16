interface Props {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className }: Props) => {
  return (
    <div
      className={`bg-[#00aeef26] text-white rounded-[24px] ${
        className || ""
      } truncate`}
    >
      {children}
    </div>
  );
};

export default Card;
