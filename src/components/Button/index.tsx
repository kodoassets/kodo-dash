import clsx from "clsx";

interface Props {
  text: string;
  onClick: () => void;
  className?: string;
}
const Button = ({ text, onClick, className }: Props) => {
  return (
    <button
      onClick={onClick}
      className={clsx("text-blue-400 underline", className)}
    >
      {text}
    </button>
  );
};

export default Button;
