import clsx from "clsx";

interface Props {
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

const TextInput = ({ label, className, value, onChange }: Props) => {
  return (
    <div className={clsx("rounded-lg", className)}>
      <p className="text-sm">{label}</p>
      <input
        value={value || undefined}
        onChange={onChange ? (e) => onChange(e.target.value) : () => {}}
        className="border px-2 py-1 rounded-lg"
        type="text"
      />
    </div>
  );
};

export default TextInput;
