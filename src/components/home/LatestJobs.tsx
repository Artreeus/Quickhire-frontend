"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { HiArrowRight } from "react-icons/hi";
import { Job } from "@/types";
import { getJobs } from "@/lib/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { motion } from "framer-motion";

const typeTagColors: Record<string, { bg: string; text: string; border: string }> = {
  "Full-Time": { bg: "#4640DE15", text: "#4640DE", border: "#4640DE" },
  "Part-Time": { bg: "#26A4FF15", text: "#26A4FF", border: "#26A4FF" },
  Remote: { bg: "#56CDAD15", text: "#56CDAD", border: "#56CDAD" },
  Internship: { bg: "#FFB83615", text: "#FFB836", border: "#FFB836" },
  Contract: { bg: "#FF655015", text: "#FF6550", border: "#FF6550" },
};

const logoColors = [
  "#4640DE", "#56CDAD", "#FFB836", "#26A4FF",
  "#FF6550", "#4640DE", "#56CDAD", "#FFB836",
  "#26A4FF", "#FF6550", "#4640DE", "#56CDAD",
];

const listVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1, x: 0,
    transition: { duration: 0.45, ease: "easeOut" as const },
  },
};

function LatestJobCard({ job, colorIndex }: { job: Job; colorIndex: number }) {
  const tc = typeTagColors[job.type] || typeTagColors["Full-Time"];
  const logoColor = logoColors[colorIndex % logoColors.length];

  return (
    <motion.div variants={itemVariants} whileHover={{ x: 4, backgroundColor: "#f7f7ff" }}>
      <Link href={`/jobs/${job._id}`}>
        <div className="bg-white p-6 hover:shadow-md transition-all cursor-pointer group flex flex-col sm:flex-row sm:items-center gap-6 rounded-sm">
          {/* Company Logo */}
          <div
            className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
            style={{ backgroundColor: `${logoColor}15` }}
          >
            <span
              className="text-2xl font-bold"
              style={{ color: logoColor, fontFamily: "var(--font-clash)" }}
            >
              {job.company.charAt(0)}
            </span>
          </div>

          {/* Job Info */}
          <div className="flex-1 min-w-0">
            <h3
              className="text-[18px] font-semibold text-[#25324B] group-hover:text-[#4640DE] transition-colors mb-1 truncate"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              {job.title}
            </h3>
            <div className="flex flex-wrap items-center gap-2 text-[#515B6F] text-sm mb-3">
              <span>{job.company}</span>
              <span className="w-1 h-1 bg-[#A8ADB7] rounded-full" />
              <span>{job.location}</span>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium border"
                style={{
                  backgroundColor: "transparent",
                  borderColor: "#56CDAD",
                  color: "#56CDAD",
                }}
              >
                {job.type}
              </span>
              {job.tags.slice(0, 2).map((tag, idx) => {
                const colors = [
                  { border: "#FFB836", text: "#FFB836" },
                  { border: "#4640DE", text: "#4640DE" },
                ];
                const color = colors[idx % colors.length];
                return (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs font-medium border"
                    style={{ borderColor: color.border, color: color.text }}
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function LatestJobs() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await getJobs({ limit: 10 });
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
    <section className="relative overflow-hidden py-[72px] bg-[#F8F8FD]">
      {/* Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40"
        style={{
          backgroundImage: "url('/Pattern.png')",
          backgroundSize: "600px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right -100px bottom -50px",
        }}
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px] relative z-10">
        {/* Header */}
        <motion.div
          className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 gap-4"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <h2
            className="text-3xl md:text-[48px] leading-[1.1] text-[#25324B]"
            style={{ fontFamily: "var(--font-clash)", fontWeight: 600 }}
          >
            Latest{" "}
            <span className="text-[#26A4FF]">jobs open</span>
          </h2>
          <Link
            href="/jobs"
            className="flex items-center gap-2 text-[#4640DE] font-semibold text-base hover:gap-3 hover:text-[#4640DE]/80 transition-all"
          >
            Show all jobs
            <HiArrowRight size={16} />
          </Link>
        </motion.div>

        {/* Two Column Card Grid */}
        {loading ? (
          <LoadingSpinner />
        ) : jobs.length === 0 ? (
          <div className="text-center py-12 text-[#7C8493]">
            <p className="text-lg">No jobs found.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
          >
            {jobs.slice(0, 8).map((job, i) => (
              <LatestJobCard key={job._id} job={job} colorIndex={i} />
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}
