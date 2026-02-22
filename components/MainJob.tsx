"use client";
import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import IndividualJob from "./IndividualJob";
import { Job } from "@/types/job";

const MainJob = () => {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://jsonfakery.com/jobs");
        const data = await response.json();
        const parsedJobs = data.map((job: Job) => ({
          ...job,
          qualifications:
            typeof job.qualifications === "string"
              ? JSON.parse(job.qualifications)
              : job.qualifications,
        }));

        setAllJobs(parsedJobs || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  console.log(allJobs);
  return (
    <>
      {loading ? (
        <>
          {Array.from({ length: 5 }).map((_, index) => (
            <Box
              key={index}
              sx={{ display: "flex", flexDirection: "column", gap: 1, mb: 2 }}
            >
              <Skeleton variant="rounded" width="100%" height={60} />
            </Box>
          ))}
        </>
      ) : (
        <Box className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
          <Box className="flex flex-col gap-4">
            {allJobs.map((job: Job) => (
              <React.Fragment key={job.id}>
                <IndividualJob job={job} />
              </React.Fragment>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
};

export default MainJob;
