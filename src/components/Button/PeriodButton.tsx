import { useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

export const PeriodButton = ({
  startDate,
  endDate,
  onDateChange,
}: {
  startDate: Date;
  endDate: Date;
  onDateChange?: (startDate: Date, endDate: Date) => void;
}) => {
  const [value, setValue] = useState({
    startDate: startDate,
    endDate: endDate,
  });

  const handleValueChange = (newValue: any) => {
    setValue(newValue);
    if (onDateChange) {
      onDateChange(newValue.startDate, newValue.endDate);
    }
  };

  return (
    <div className="w-60">
      <Datepicker
        value={value}
        onChange={handleValueChange}
        startFrom={value.startDate}
      />
    </div>
  );
};
