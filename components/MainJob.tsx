"use client";
import { Box, Skeleton } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import IndividualJob from "./IndividualJob";
import { Job } from "@/types/job";
import Filters from "./Filters";

const MainJob = () => {
  const [allJobs, setAllJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setsearch] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [locations, setLocations] = useState<string[]>([]);
  const [employmentTypes, setEmploymentTypes] = useState<string[]>([]);
  const [jobCategories, setJobCategories] = useState<string[]>([]);

  const [selectedLocation, setSelectedLocation] = useState<string>("");
  const [selectedEmploymentType, setSelectedEmploymentType] = useState<
    string[]
  >([]);
  const [selectedJobCategory, setSelectedJobCategory] = useState<string>("");

  useEffect(() => {
    const time = setTimeout(() => {
      setSearchQuery(search);
    }, 1000);
    return () => clearTimeout(time);
  }, [search]);
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
        const uniqueLocations = Array.from(
          new Set(parsedJobs.map((j: Job) => j.location)),
        ).filter(Boolean) as string[];
        setLocations(uniqueLocations); // to store unique locations

        const uniqueEmploymentTypes = Array.from(
          new Set(parsedJobs.map((j: Job) => j.employment_type)),
        ).filter(Boolean) as string[];
        setEmploymentTypes(uniqueEmploymentTypes); // to store unique employment types

        const uniqueJobCategories = Array.from(
          new Set(parsedJobs.map((j: Job) => j.job_category)),
        ).filter(Boolean) as string[];
        setJobCategories(uniqueJobCategories); // to store unique job categories

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredJobs = useMemo(() => {
    let result = allJobs;
    if (searchQuery) {
      result = result.filter((job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (selectedLocation) {
      result = result.filter((job) =>
        job.location.toLowerCase().includes(selectedLocation.toLowerCase()),
      );
    }
    if (selectedEmploymentType.length > 0) {
      result = result.filter((job) =>
        selectedEmploymentType.includes(job.employment_type),
      );
    }
    if (selectedJobCategory) {
      result = result.filter((job) =>
        job.job_category
          .toLowerCase()
          .includes(selectedJobCategory.toLowerCase()),
      );
    }

    return result;
  }, [
    allJobs,
    searchQuery,
    selectedLocation,
    selectedEmploymentType,
    selectedJobCategory,
  ]);
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
          <>
            <Box className="flex items-center justify-between">
              <Filters
                dropdownOptions={{
                  locations,
                  employmentTypes,
                  jobCategories,
                }}
                setSelectedLocation={setSelectedLocation}
                selectedLocation={selectedLocation}
                selectedEmploymentType={selectedEmploymentType}
                setSelectedEmploymentType={setSelectedEmploymentType}
                selectedJobCategory={selectedJobCategory}
                setSelectedJobCategory={setSelectedJobCategory}
              />
              <input
                type="search"
                id="search"
                className="block w-40  outline-none boxshadow-none p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                placeholder="Search"
                onChange={(e) => setsearch(e.target.value)}
                value={search}
              />
            </Box>
            {filteredJobs?.length < 1 ? (
              <>
                <h2 className="flex items-center">No jobs found!</h2>
              </>
            ) : (
              <Box className="flex flex-col gap-4">
                {filteredJobs?.map((job: Job) => (
                  <React.Fragment key={job.id}>
                    <IndividualJob job={job} />
                  </React.Fragment>
                ))}
              </Box>
            )}
          </>
        </Box>
      )}
    </>
  );
};

export default MainJob;
