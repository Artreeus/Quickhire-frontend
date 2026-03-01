import Link from "next/link";
import { Job } from "@/types";
import { HiLocationMarker } from "react-icons/hi";

interface JobCardProps {
  job: Job;
  variant?: "default" | "compact";
}

const typeColors: Record<string, string> = {
  "Full-Time":
    "bg-[#56CDAD]/10 text-[#56CDAD] border border-[#56CDAD]/20",
  "Part-Time":
    "bg-[#26A4FF]/10 text-[#26A4FF] border border-[#26A4FF]/20",
  Remote:
    "bg-[#4640DE]/10 text-[#4640DE] border border-[#4640DE]/20",
  Internship:
    "bg-[#FFB836]/10 text-[#FFB836] border border-[#FFB836]/20",
  Contract:
    "bg-[#FF6550]/10 text-[#FF6550] border border-[#FF6550]/20",
};

export default function JobCard({ job, variant = "default" }: JobCardProps) {
  const isCompact = variant === "compact";

  return (
    <Link href={`/jobs/${job._id}`}>
      <div
        className={`bg-white border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all group cursor-pointer ${
          isCompact ? "" : "flex flex-col gap-4"
        }`}
      >
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Company Logo */}
          <div className="w-12 h-12 bg-bg-light rounded-lg flex items-center justify-center shrink-0 border border-border">
            <span
              className="text-xl font-bold text-primary"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              {job.company.charAt(0)}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <h3
              className={`font-semibold text-dark group-hover:text-primary transition-colors ${
                isCompact ? "text-base" : "text-lg"
              }`}
              style={{ fontFamily: "var(--font-clash)" }}
            >
              {job.title}
            </h3>
            <div className="flex items-center gap-2 mt-1 text-text-light text-sm">
              <span>{job.company}</span>
              <span className="w-1 h-1 bg-text-light rounded-full" />
              <div className="flex items-center gap-1">
                <HiLocationMarker size={14} />
                <span>{job.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        {!isCompact && (
          <p className="text-text text-sm leading-relaxed line-clamp-2">
            {job.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mt-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              typeColors[job.type] || "bg-gray-100 text-gray-600"
            }`}
          >
            {job.type}
          </span>
          <span className="w-px h-4 bg-border" />
          {job.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10"
            >
              {tag}
            </span>
          ))}
          {job.salary && job.salary !== "Negotiable" && (
            <>
              <span className="w-px h-4 bg-border" />
              <span className="text-xs text-text-light font-medium">
                {job.salary}
              </span>
            </>
          )}
        </div>
      </div>
    </Link>
  );
}
