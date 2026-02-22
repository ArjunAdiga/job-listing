import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

const SelectDropdown = ({
  value,
  label,
  options,
  multiple,
  setValue,
}: {
  value: string | string[];
  label: string;
  options: string[];
  multiple: boolean;
  setValue: (value: string | string[]) => void;
}) => {
  return (
    <>
      {" "}
      <FormControl
        variant="outlined"
        size="small"
        sx={{ width: 200, height: 40 }}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          value={value}
          label={label}
          onChange={(event) => {
            const {
              target: { value },
            } = event;
            setValue(value);
          }}
          multiple={multiple}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectDropdown;
