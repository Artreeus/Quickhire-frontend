"use client";

import { useEffect, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Job } from "@/types";
import { getJobs, getCategories } from "@/lib/api";
import SearchBar from "@/components/ui/SearchBar";
import JobCard from "@/components/ui/JobCard";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { HiX } from "react-icons/hi";

const jobTypes = ["Full-Time", "Part-Time", "Remote", "Internship", "Contract"];

function JobListingsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [jobs, setJobs] = useState<Job[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalJobs, setTotalJobs] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // Get filters from URL
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const location = searchParams.get("location") || "";
  const type = searchParams.get("type") || "";
  const page = parseInt(searchParams.get("page") || "1");

  const fetchJobsData = useCallback(async () => {
    setLoading(true);
    try {
      const [jobsRes, catsRes] = await Promise.all([
        getJobs({ search, category, location, type, page, limit: 9 }),
        getCategories(),
      ]);
      setJobs(jobsRes.data);
      setTotalJobs(jobsRes.pagination?.total || 0);
      setTotalPages(jobsRes.pagination?.totalPages || 1);
      setCategories(catsRes.data);
    } catch {
      console.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, [search, category, location, type, page]);

  useEffect(() => {
    fetchJobsData();
  }, [fetchJobsData]);

  const updateFilters = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page"); // Reset page when filters change
    router.push(`/jobs?${params.toString()}`);
  };

  const clearAllFilters = () => {
    router.push("/jobs");
  };

  const hasActiveFilters = search || category || location || type;

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Hero Search Area */}
      <section className="bg-dark py-10 md:py-16 px-6 md:px-[124px]">
        <div className="max-w-[1440px] mx-auto">
          <h1
            className="text-3xl md:text-[48px] text-white leading-[1.1] mb-3"
            style={{ fontFamily: "var(--font-clash)", fontWeight: 600 }}
          >
            Find your{" "}
            <span className="text-secondary">dream job</span>
          </h1>
          <p className="text-white/60 text-base mb-8">
            Find your next career at companies like HubSpot, Nike, and Dropbox
          </p>
          <div className="max-w-4xl">
            <SearchBar
              initialSearch={search}
              initialLocation={location}
            />
          </div>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px] py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-[240px] shrink-0">
            {/* Active Filters */}
            {hasActiveFilters && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-dark">Active Filters</h3>
                  <button
                    onClick={clearAllFilters}
                    className="text-xs text-danger font-medium hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {search && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {search}
                      <HiX
                        className="cursor-pointer"
                        onClick={() => updateFilters("search", "")}
                      />
                    </span>
                  )}
                  {category && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {category}
                      <HiX
                        className="cursor-pointer"
                        onClick={() => updateFilters("category", "")}
                      />
                    </span>
                  )}
                  {type && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full">
                      {type}
                      <HiX
                        className="cursor-pointer"
                        onClick={() => updateFilters("type", "")}
                      />
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Type Filter */}
            <div className="mb-6">
              <h3
                className="text-base font-semibold text-dark mb-4"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                Type of Employment
              </h3>
              <div className="space-y-3">
                {jobTypes.map((t) => (
                  <label
                    key={t}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="type"
                      checked={type === t}
                      onChange={() =>
                        updateFilters("type", type === t ? "" : t)
                      }
                      className="w-4 h-4 text-primary accent-primary"
                    />
                    <span className="text-sm text-text group-hover:text-dark transition-colors">
                      {t}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Category Filter */}
            <div>
              <h3
                className="text-base font-semibold text-dark mb-4"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                Categories
              </h3>
              <div className="space-y-3">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="category"
                      checked={category === cat}
                      onChange={() =>
                        updateFilters("category", category === cat ? "" : cat)
                      }
                      className="w-4 h-4 text-primary accent-primary"
                    />
                    <span className="text-sm text-text group-hover:text-dark transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2
                  className="text-2xl font-semibold text-dark"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  All Jobs
                </h2>
                <p className="text-sm text-text-light mt-1">
                  Showing {jobs.length} of {totalJobs} jobs
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-text-light hidden md:inline">
                  Sort by:
                </span>
                <select className="text-sm font-medium text-dark border border-border rounded px-3 py-2 bg-white outline-none focus:border-primary">
                  <option>Most Relevant</option>
                  <option>Newest</option>
                  <option>Oldest</option>
                </select>
              </div>
            </div>

            {/* Jobs Grid */}
            {loading ? (
              <LoadingSpinner />
            ) : jobs.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-bg-light rounded-full mx-auto mb-4 flex items-center justify-center">
                  <svg
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#7C8493"
                    strokeWidth="1.5"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                </div>
                <h3
                  className="text-xl font-semibold text-dark mb-2"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  No jobs found
                </h3>
                <p className="text-text-light mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearAllFilters}
                  className="text-primary font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4">
                  {jobs.map((job) => (
                    <JobCard key={job._id} job={job} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-8">
                    <button
                      disabled={page <= 1}
                      onClick={() =>
                        updateFilters("page", (page - 1).toString())
                      }
                      className="px-4 py-2 text-sm font-medium border border-border rounded hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Previous
                    </button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (p) => (
                        <button
                          key={p}
                          onClick={() => updateFilters("page", p.toString())}
                          className={`w-10 h-10 text-sm font-medium rounded ${
                            p === page
                              ? "bg-primary text-white"
                              : "border border-border hover:border-primary"
                          }`}
                        >
                          {p}
                        </button>
                      )
                    )}
                    <button
                      disabled={page >= totalPages}
                      onClick={() =>
                        updateFilters("page", (page + 1).toString())
                      }
                      className="px-4 py-2 text-sm font-medium border border-border rounded hover:border-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function JobListingsPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <JobListingsContent />
    </Suspense>
  );
}
