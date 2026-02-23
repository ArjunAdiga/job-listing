"use client";
import { Button, Menu, MenuItem } from "@mui/material";
import { document } from "postcss";
import React, { useState } from "react";

const Sort = ({
  sort,
  setSort,
}: {
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const sortOptions = [
    {
      name: "createdNew",
      label: "Created : New to Old",
    },
    {
      name: "createdOld",
      label: "Created : Old to New",
    },
    {
      name: "salary_high",
      label: "Salary : High to Low",
    },
    {
      name: "salary_low",
      label: "Salary : Low to High",
    },
    {
      name: "opening_high",
      label: "Opening : High to Low",
    },
    {
      name: "opening_low",
      label: "Opening : Low to High",
    },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  return (
    <>
      <Button onClick={(e) => setAnchorEl(e.currentTarget)}>Sort</Button>

      <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
        {sortOptions.map((option) => (
          <MenuItem
            key={option.name}
            onClick={() => {
              setSort(option.name);
              setAnchorEl(null);
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default Sort;
