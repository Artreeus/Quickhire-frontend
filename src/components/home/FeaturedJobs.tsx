"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { Job } from "@/types";
import { getJobs } from "@/lib/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const tagColors: Record<string, { bg: string; text: string }> = {
  Marketing: { bg: "#FFB836", text: "#FFB836" },
  Design: { bg: "#56CDAD", text: "#56CDAD" },
  Business: { bg: "#4640DE", text: "#4640DE" },
  Technology: { bg: "#26A4FF", text: "#26A4FF" },
  "Full Stack": { bg: "#4640DE", text: "#4640DE" },
  Development: { bg: "#4640DE", text: "#4640DE" },
  HR: { bg: "#FFB836", text: "#FFB836" },
  Finance: { bg: "#FF6550", text: "#FF6550" },
  Data: { bg: "#26A4FF", text: "#26A4FF" },
  Writing: { bg: "#56CDAD", text: "#56CDAD" },
  Product: { bg: "#FFB836", text: "#FFB836" },
  Cloud: { bg: "#26A4FF", text: "#26A4FF" },
  Analysis: { bg: "#FF6550", text: "#FF6550" },
};

const typeColors: Record<string, { border: string; text: string }> = {
  "Full-Time": { border: "#4640DE", text: "#4640DE" },
  "Part-Time": { border: "#26A4FF", text: "#26A4FF" },
  Remote: { border: "#56CDAD", text: "#56CDAD" },
  Internship: { border: "#FFB836", text: "#FFB836" },
  Contract: { border: "#FF6550", text: "#FF6550" },
};

// Company logo colors
const companyColors: Record<string, string> = {
  N: "#FF6550",
  D: "#4640DE",
  T: "#FF6550",
  P: "#FFB836",
  R: "#4640DE",
  S: "#56CDAD",
  C: "#26A4FF",
  H: "#FFB836",
  G: "#56CDAD",
  B: "#FF6550",
};

function FeaturedJobCard({ job }: { job: Job }) {
  const tc = typeColors[job.type] || { border: "#4640DE", text: "#4640DE" };
  const logoColor = companyColors[job.company.charAt(0)] || "#4640DE";

  return (
    <Link href={`/jobs/${job._id}`}>
      <div className="bg-white border border-[#D6DDEB] p-6 hover:border-[#4640DE] hover:shadow-lg transition-all cursor-pointer group h-full flex flex-col">
        {/* Top Row: Logo + Type Badge */}
        <div className="flex items-start justify-between mb-4">
          <div
            className="w-10 h-10 flex items-center justify-center border border-[#D6DDEB] rounded"
          >
            <span
              className="text-lg font-bold"
              style={{ color: logoColor, fontFamily: "var(--font-clash)" }}
            >
              {job.company.charAt(0)}
            </span>
          </div>
          <span
            className="px-3 py-1 text-xs font-semibold border rounded bg-transparent"
            style={{ borderColor: tc.border, color: tc.text }}
          >
            {job.type}
          </span>
        </div>

        {/* Job Title */}
        <h3
          className="text-lg font-semibold text-[#25324B] mb-1 group-hover:text-[#4640DE] transition-colors"
          style={{ fontFamily: "var(--font-clash)" }}
        >
          {job.title}
        </h3>

        {/* Company + Location */}
        <p className="text-[#515B6F] text-sm mb-4">
          {job.company} <span className="mx-1">•</span> {job.location}
        </p>

        {/* Description */}
        <p className="text-[#515B6F] text-sm leading-relaxed line-clamp-2 mb-6 flex-1">
          {job.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto">
          {job.tags.slice(0, 3).map((tag) => {
            const color = tagColors[tag] || { bg: "#4640DE", text: "#4640DE" };
            return (
              <span
                key={tag}
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  borderColor: color.text,
                  color: color.text,
                  backgroundColor: "transparent",
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs({ limit: 8 });
        setJobs(response.data);
      } catch {
        console.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <section className="bg-white py-[72px]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
          <h2
            className="text-3xl md:text-[48px] leading-[1.1] text-[#25324B]"
            style={{ fontFamily: "var(--font-clash)", fontWeight: 600, fontFeatureSettings: "'cv11' 1" }}
          >
            Featured{" "}
            <span className="text-[#26A4FF]">jobs</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:gap-3 hover:text-[#4640DE]/80 transition-all"
          >
            Show all jobs
            <HiArrowRight size={16} />
          </Link>
        </div>

        {/* Job Cards Grid - 4 columns */}
        {loading ? (
          <LoadingSpinner />
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-[#7C8493]">
            <p className="text-lg">
              No jobs found. Start by adding some in the Admin panel!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {jobs.slice(0, 8).map((job) => (
              <FeaturedJobCard key={job._id} job={job} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
