import clsx from "clsx";

type Props = {
  className?: string;
  progress: number;
  innerLabel?: string;
};

const ProgressBar = ({ progress, innerLabel, className }: Props) => {
  if (!innerLabel) innerLabel = `${progress.toLocaleString()}%`;
  return (
    <div
      className={clsx(
        `w-full h-[22px] rounded-[71px] relative bg-[#7896A1] text-black`,
        className
      )}
    >
      <div
        className={`absolute left-0 h-full rounded-lg bg-progress transition-width duration-[1500ms] ease-in-out flex flex-row items-center`}
        style={{ width: `${progress}%` }}
      ></div>
      <div
        className={clsx(
          "absolute right-0 h-full progress-gradient transition-width duration-[1500ms] ease-in-out",
          progress === 0 ? "rounded-[71px]" : `rounded-r-[71px]`
        )}
        style={{ width: `${100 - progress}%` }}
      >
        <span className="absolute right-0 mr-2 font-normal text-sm flex flex-row items-center h-full">
          {innerLabel}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
