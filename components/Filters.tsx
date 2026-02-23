import React from "react";
import SelectDropdown from "./SelectDropdown";
import { Box, Switch } from "@mui/material";

const Filters = ({
  dropdownOptions,
  setSelectedLocation,
  selectedLocation,
  selectedEmploymentType,
  setSelectedEmploymentType,
  selectedJobCategory,
  setSelectedJobCategory,
  isRemoteWork,
  setIsRemoteWork,
}: {
  dropdownOptions: {
    locations: string[];
    employmentTypes: string[];
    jobCategories: string[];
  };
  setSelectedLocation: (value: string) => void;
  selectedLocation: string;
  selectedEmploymentType: string[];
  setSelectedEmploymentType: (value: string[]) => void;
  selectedJobCategory: string;
  setSelectedJobCategory: (value: string) => void;
  isRemoteWork: boolean;
  setIsRemoteWork: (value: boolean) => void;
}) => {
  const isDark = localStorage.getItem("theme") === "dark";
  const fields = [
    {
      label: "Location",
      options: dropdownOptions.locations,
      value: selectedLocation,
      multiple: false,
      setValue: (value: string | string[]) =>
        setSelectedLocation(Array.isArray(value) ? value[0] || "" : value),
    },
    {
      label: "Employment Type",
      options: dropdownOptions.employmentTypes,
      value: selectedEmploymentType,
      multiple: true,
      setValue: (value: string | string[]) =>
        setSelectedEmploymentType(Array.isArray(value) ? value : [value]),
    },
    {
      label: "Job Category",
      options: dropdownOptions.jobCategories,
      value: selectedJobCategory,
      multiple: false,
      setValue: (value: string | string[]) =>
        setSelectedJobCategory(Array.isArray(value) ? value[0] || "" : value),
    },
  ];
  return (
    <>
      <Box className="w-full flex items-center flex-row flex-wrap gap-2">
        {fields?.map((field) => (
          <React.Fragment key={field.label}>
            <SelectDropdown
              value={field?.value || ""}
              label={field.label}
              options={field.options}
              multiple={field.multiple || false}
              setValue={field.setValue}
            />
          </React.Fragment>
        ))}
        <Box className="flex items-center gap-1">
          <h4 className="text-sm font-medium">Remote Work</h4>
          <Switch
            checked={isRemoteWork}
            size="small"
            onChange={(e) => setIsRemoteWork(e.target.checked)}
            sx={{
              "& .MuiSwitch-track": {
                backgroundColor: isDark
                  ? "white !important"
                  : "blue !important",
              },
            }}
          />
        </Box>
      </Box>
    </>
  );
};

export default Filters;
