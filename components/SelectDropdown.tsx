import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

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
        className="dark:bg-gray-800"
      >
        <InputLabel className="dark:bg-gray-800">{label}</InputLabel>
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
          renderValue={(selected) =>
            Array.isArray(selected) ? selected.join(", ") : selected
          }
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              {multiple ? (
                <>
                  <Checkbox
                    checked={Array.isArray(value) && value.indexOf(option) > -1}
                    size="small"
                  />
                  <ListItemText primary={option} />
                </>
              ) : (
                <ListItemText primary={option} />
              )}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};

export default SelectDropdown;
