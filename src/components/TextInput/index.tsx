import clsx from "clsx";

interface Props {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
  type?: "text" | "number";
}

const TextInput = ({
  label,
  className,
  value,
  onChange,
  disabled,
  type = "text",
}: Props) => {
  return (
    <div className={clsx("rounded-lg", className)}>
      <p className="text-sm w-full text-[#F8F8F8] opacity-80 font-light mb-2">
        {label}
      </p>
      <input
        value={value}
        disabled={disabled}
        onChange={onChange ? (e) => onChange(e.target.value) : () => {}}
        className="border px-2 py-1 rounded-lg text-white bg-[#000F14] w-full"
        type={type}
      />
    </div>
  );
};

export default TextInput;
