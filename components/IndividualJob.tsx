import { Job } from "@/types/job";
import { Box, Switch, Grid, useMediaQuery } from "@mui/material";
import React from "react";

const IndividualJob = ({ job }: { job: Job }) => {
  const isDark = localStorage.getItem("theme") === "dark";

  const isMobile = useMediaQuery("(max-width:600px)");
  const isTab = useMediaQuery("(max-width:900px)");

  const salaryFormatter = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  });
  return (
    <>
      <Box
        className={`p-4 border rounded ${isMobile || isTab ? "p-3" : "p-4"}`}
        key={job.id}
      >
        <Grid container spacing={1} alignItems="center" className="mb-1">
          <Grid
            item
            xs={12}
            sm={7}
            className="min-w-0 flex items-center gap-1 flex-wrap"
          >
            <h3 className="text-lg font-semibold truncate">{job.title}</h3>
            <span className="text-sm text-gray-600 truncate">
              {" "}
              - {job.job_category}
            </span>
            <span className="text-sm text-gray-600 truncate ">{`(${salaryFormatter.format(
              job.salary_from,
            )} - ${salaryFormatter.format(job.salary_to)})`}</span>
          </Grid>

          <Grid
            item
            xs={12}
            sm={5}
            className={`${isMobile || isTab ? "text-left" : "text-right"} min-w-0 flex ${isMobile ? "justify-start" : "justify-end"}  flex-row flex-wrap`}
          >
            <span className="text-sm text-gray-600 truncate block">
              {job.company}-
            </span>
            <span className="text-sm text-gray-400 truncate block ml-0 sm:">
              {job.location}
            </span>
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="center" className="mb-1">
          <Grid item xs={12} sm={8} className="min-w-0 flex flex-row flex-wrap">
            {!(isMobile || isTab) && (
              <span className="text-sm text-gray-400">Qualifications:</span>
            )}
            <span className="text-sm text-gray-600   block">
              {Array.isArray(job.qualifications)
                ? job.qualifications.join(", ")
                : job.qualifications}
            </span>
          </Grid>

          <Grid
            item
            xs={12}
            sm={4}
            className={`min-w-0 flex flex-row  ${isMobile ? "justify-start" : "justify-end"}  gap-1`}
          >
            {!(isMobile || isTab) && (
              <span className="text-sm text-gray-400">Employment type: </span>
            )}
            <span className="text-sm text-gray-600 truncate block">
              {job.employment_type}
            </span>
          </Grid>
        </Grid>

        <Grid container spacing={1} alignItems="center">
          <Grid item xs={12} sm={4} className="min-w-0 flex flex-row gap-1">
            <span className="text-sm text-gray-400">Last date: </span>
            <span className="text-sm text-gray-600 truncate block">
              {job.application_deadline}
            </span>
          </Grid>

          <Grid
            item
            xs={12}
            sm={8}
            className={`min-w-0 flex items-center ${isMobile || isTab ? "justify-start" : "justify-end"} gap-4 sm:justify-end`}
          >
            <div className="min-w-0 flex flex-row gap-1">
              <span className="text-sm text-gray-400">No of openings: </span>
              <span className="text-sm text-gray-600 truncate block">
                {job.number_of_opening}
              </span>
            </div>
            <label className="inline-flex items-center">
              <span className="text-sm text-gray-400 mr-1">Remote</span>
              <Switch
                disabled
                checked={job.is_remote_work === 1}
                size="small"
                sx={{
                  "& .MuiSwitch-track": {
                    backgroundColor: isDark
                      ? "white !important"
                      : "blue !important",
                  },
                }}
              />
            </label>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default IndividualJob;
