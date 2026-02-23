"use client";
import { Box, Pagination, Skeleton, Switch } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import IndividualJob from "./IndividualJob";
import { Job } from "@/types/job";
import Filters from "./Filters";
import Sort from "./Sort";

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
  const [isRemoteWork, setIsRemoteWork] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("");
  const [scrollType, setScrollType] = useState<"pagination" | "infinite">(
    "pagination",
  );
  const [page, setPage] = useState(1);
  const [visibleCount, setVisibleCount] = useState(10);
  const jobsPerPage = 10;
  const isDark = localStorage.getItem("theme") === "dark";

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
    if (isRemoteWork) {
      result = result.filter((job) => job.is_remote_work);
    }
    if (sort) {
      if (sort === "createdNew") {
        result = result.sort((a, b) => {
          return (
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
        });
      } else if (sort === "createdOld") {
        result = result.sort((a, b) => {
          return (
            new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          );
        });
      } else if (sort === "salary_high") {
        result = result.sort((a, b) => b.salary_to - a.salary_to);
      } else if (sort === "salary_low") {
        result = result.sort((a, b) => a.salary_to - b.salary_to);
      } else if (sort === "opening_high") {
        result = result.sort(
          (a, b) => b.number_of_opening - a.number_of_opening,
        );
      } else if (sort === "opening_low") {
        result = result.sort(
          (a, b) => a.number_of_opening - b.number_of_opening,
        );
      }
    }

    return result;
  }, [
    allJobs,
    searchQuery,
    selectedLocation,
    selectedEmploymentType,
    selectedJobCategory,
    isRemoteWork,
    sort,
  ]);

  const paginatedJobs = useMemo(() => {
    const start = (page - 1) * jobsPerPage;
    const end = start + jobsPerPage;
    return filteredJobs.slice(start, end);
  }, [filteredJobs, page]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [
    searchQuery,
    selectedLocation,
    selectedEmploymentType,
    selectedJobCategory,
    isRemoteWork,
    sort,
  ]);

  const visibleJobs = useMemo(() => {
    return filteredJobs.slice(0, visibleCount);
  }, [filteredJobs, visibleCount]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 200
      ) {
        setVisibleCount((prev) => prev + 10);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisibleCount(10);
  }, [filteredJobs]);
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
          <Box className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
            <Box className="flex flex-row align-items-center gap-2 justify-end">
              <h4 className="text-lg font-regular">Pagination</h4>
              <Switch
                checked={scrollType === "infinite"}
                size="small"
                onChange={(e) =>
                  setScrollType(e.target.checked ? "infinite" : "pagination")
                }
                sx={{
                  "& .MuiSwitch-track": {
                    backgroundColor: isDark
                      ? "white !important"
                      : "blue !important",
                  },
                }}
              />
              <h4 className="text-lg font-regular">Infinite scroll</h4>
            </Box>
          </Box>
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
                isRemoteWork={isRemoteWork}
                setIsRemoteWork={setIsRemoteWork}
              />
              <Box className="flex items-center gap-2">
                <Sort sort={sort} setSort={setSort} />
                <input
                  type="search"
                  id="search"
                  className="block w-40  outline-none boxshadow-none p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
                  placeholder="Search"
                  onChange={(e) => setsearch(e.target.value)}
                  value={search}
                />
              </Box>
            </Box>
            {filteredJobs?.length < 1 ? (
              <>
                <h2 className="flex items-center">No jobs found!</h2>
              </>
            ) : (
              <Box className="flex flex-col gap-4">
                {(scrollType === "infinite" ? visibleJobs : paginatedJobs)?.map(
                  (job: Job) => (
                    <React.Fragment key={job.id}>
                      <IndividualJob job={job} />
                    </React.Fragment>
                  ),
                )}
                {scrollType === "pagination" && (
                  <Box className="flex justify-center items-center">
                    <Pagination
                      count={Math.ceil(filteredJobs.length / jobsPerPage)}
                      page={page}
                      onChange={(e, value) => setPage(value)}
                      sx={{ mt: 3 }}
                    />
                  </Box>
                )}
              </Box>
            )}
          </>
        </Box>
      )}
    </>
  );
};

export default MainJob;
