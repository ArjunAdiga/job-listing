import React from "react";
import SelectDropdown from "./SelectDropdown";
import { Box } from "@mui/material";

const Filters = ({
  dropdownOptions,
  setSelectedLocation,
  selectedLocation,
  selectedEmploymentType,
  setSelectedEmploymentType,
  selectedJobCategory,
  setSelectedJobCategory,
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
}) => {
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
          <>
            <SelectDropdown
              value={field?.value || ""}
              label={field.label}
              options={field.options}
              multiple={field.multiple || false}
              setValue={field.setValue}
            />
          </>
        ))}
      </Box>
    </>
  );
};

export default Filters;
