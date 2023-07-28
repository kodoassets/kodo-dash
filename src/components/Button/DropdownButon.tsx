import React from "react";
import clsx from "clsx";
import ReactSelect from "react-select";

interface Props {
  text: string;
  className?: string;
  items: { value: string; label: string }[];
  onSelect: (value: string) => void;
}

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "white" : "white",
    "&:hover": {
      backgroundColor: "rgb(107 114 128)",
      cursor: "pointer",
    },

    backgroundColor: state.isSelected ? "rgb(55 65 81) " : "rgb(#000F14)",
  }),

  menu: (provided: any, state: any) => ({
    ...provided,
    color: "white !important",
    backgroundColor: "#000F14",
    borderRadius: "8px",
    border: "1px solid rgb(107 114 128)",
    textAlign: "left",
  }),

  input: (provided: any, state: any) => ({
    ...provided,
    color: "white !important",
    padding: "6px",
  }),

  singleValue: (provided: any, state: any) => ({
    ...provided,
    textAlign: "left",
    color: "white !important",
  }),

  control: () => ({
    display: "flex",
  }),
};

const DropdownButton = ({ text, className, items, onSelect }: Props) => {
  return (
    <ReactSelect
      name="country"
      id="country"
      className={clsx(
        "!bg-transparent border border-white text-white rounded-full !min-w-[180px] pl-3 ",
        className
      )}
      isSearchable={true}
      options={items}
      placeholder={text}
      getOptionValue={(value) => value.value}
      getOptionLabel={(value) => value.label}
      styles={customStyles}
      onChange={(value) => onSelect(value?.value ?? "")}
      required
    />
  );
};

export default DropdownButton;
