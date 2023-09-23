import Select, { StylesConfig } from "react-select";

interface MyDropDownPickerProps {
  value: string | undefined;
  setValue: (value: string | undefined) => void;
  options: { value: string; label: string }[];
  error?: boolean;
  onChange: () => void;
}

const MyDropDownPicker: React.FC<MyDropDownPickerProps> = ({
  value,
  setValue,
  options,
  error,
  onChange,
}) => {
  return (
    <Select
      value={options.find((option) => option.value === value)}
      options={options}
      isSearchable={false}
      onChange={(newValue) => {
        onChange();
        setValue(newValue?.value);
      }}
      styles={{
        control: (baseStyles, state) => ({
          ...baseStyles,
          borderColor: error ? "red" : "white",
          backgroundColor: "transparent",
        }),
        placeholder: (baseStyles, state) => ({
          ...baseStyles,
          color: "white",
        }),

        singleValue: (baseStyles, state) => ({
          ...baseStyles,
          color: "white",
        }),
      }}
    />
  );
};

export default MyDropDownPicker;
