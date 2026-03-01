"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Job } from "@/types";
import { getJobById, submitApplication } from "@/lib/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  HiLocationMarker,
  HiClock,
  HiBriefcase,
  HiCurrencyDollar,
  HiArrowLeft,
  HiCheckCircle,
} from "react-icons/hi";

const typeColors: Record<string, string> = {
  "Full-Time": "bg-[#56CDAD]/10 text-[#56CDAD] border border-[#56CDAD]/20",
  "Part-Time": "bg-[#26A4FF]/10 text-[#26A4FF] border border-[#26A4FF]/20",
  Remote: "bg-[#4640DE]/10 text-[#4640DE] border border-[#4640DE]/20",
  Internship: "bg-[#FFB836]/10 text-[#FFB836] border border-[#FFB836]/20",
  Contract: "bg-[#FF6550]/10 text-[#FF6550] border border-[#FF6550]/20",
};

export default function JobDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    resumeLink: "",
    coverNote: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await getJobById(params.id as string);
        setJob(response.data);
      } catch {
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    if (params.id) fetchJob();
  }, [params.id]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.resumeLink.trim()) {
      newErrors.resumeLink = "Resume link is required";
    } else if (!/^https?:\/\/.+/.test(formData.resumeLink)) {
      newErrors.resumeLink = "Please enter a valid URL (starting with http:// or https://)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !job) return;

    setSubmitting(true);
    try {
      await submitApplication({
        jobId: job._id,
        ...formData,
      });
      setApplicationSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to submit application"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <LoadingSpinner size="lg" />;

  if (!job) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="text-center">
          <h2
            className="text-2xl font-semibold text-dark mb-4"
            style={{ fontFamily: "var(--font-clash)" }}
          >
            Job not found
          </h2>
          <button
            onClick={() => router.push("/jobs")}
            className="text-primary font-semibold hover:underline"
          >
            Back to Jobs
          </button>
        </div>
      </div>
    );
  }

  const timeAgo = () => {
    const diff = Date.now() - new Date(job.createdAt).getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return "Today";
    if (days === 1) return "1 day ago";
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    return `${Math.floor(days / 30)} months ago`;
  };

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <motion.section
        className="bg-dark py-8 px-6 md:px-[124px]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-[1440px] mx-auto">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors mb-4"
          >
            <HiArrowLeft size={18} />
            <span className="text-sm">Back to jobs</span>
          </button>
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            {/* Company Logo */}
            <motion.div
              className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shrink-0"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.15, type: "spring", stiffness: 260, damping: 20 }}
            >
              <span
                className="text-3xl font-bold text-primary"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                {job.company.charAt(0)}
              </span>
            </motion.div>
            <div className="flex-1 min-w-0">
              <motion.h1
                className="text-2xl md:text-4xl text-white font-semibold break-words"
                style={{ fontFamily: "var(--font-clash)" }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                {job.title}
              </motion.h1>
              <motion.div
                className="flex flex-wrap items-center gap-3 mt-2 text-white/60 text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <span>{job.company}</span>
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="flex items-center gap-1">
                  <HiLocationMarker size={14} />
                  <span>{job.location}</span>
                </div>
                <span className="w-1 h-1 bg-white/40 rounded-full" />
                <div className="flex items-center gap-1">
                  <HiClock size={14} />
                  <span>Posted {timeAgo()}</span>
                </div>
              </motion.div>
            </div>
            <motion.button
              onClick={() => setShowApplicationForm(true)}
              className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 transition-colors shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, type: "spring", stiffness: 260 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              Apply Now
            </motion.button>
          </div>
        </div>
      </motion.section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px] py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            {/* Description */}
            <motion.div
              className="bg-white p-6 md:p-8 border border-border mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <h2
                className="text-xl font-semibold text-dark mb-4"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                Description
              </h2>
              <p className="text-text leading-relaxed whitespace-pre-line break-words overflow-wrap-anywhere">
                {job.description}
              </p>
            </motion.div>

            {/* Requirements */}
            {job.requirements.length > 0 && (
              <motion.div
                className="bg-white p-6 md:p-8 border border-border mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h2
                  className="text-xl font-semibold text-dark mb-4"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  Requirements
                </h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <HiCheckCircle
                        className="text-primary shrink-0 mt-0.5"
                        size={18}
                      />
                      <span className="text-text leading-relaxed break-words min-w-0">{req}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Application Form */}
            {showApplicationForm && !applicationSubmitted && (
              <motion.div
                id="apply-form"
                className="bg-white p-6 md:p-8 border-2 border-primary"
                initial={{ opacity: 0, y: 30, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2
                  className="text-xl font-semibold text-dark mb-6"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  Apply for this position
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Full Name <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter your full name"
                      className={`w-full px-4 py-3 border rounded outline-none transition-colors ${
                        errors.name
                          ? "border-danger focus:border-danger"
                          : "border-border focus:border-primary"
                      }`}
                    />
                    {errors.name && (
                      <p className="text-danger text-xs mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Email Address <span className="text-danger">*</span>
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter your email address"
                      className={`w-full px-4 py-3 border rounded outline-none transition-colors ${
                        errors.email
                          ? "border-danger focus:border-danger"
                          : "border-border focus:border-primary"
                      }`}
                    />
                    {errors.email && (
                      <p className="text-danger text-xs mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Resume Link */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Resume Link <span className="text-danger">*</span>
                    </label>
                    <input
                      type="url"
                      value={formData.resumeLink}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          resumeLink: e.target.value,
                        })
                      }
                      placeholder="https://drive.google.com/your-resume"
                      className={`w-full px-4 py-3 border rounded outline-none transition-colors ${
                        errors.resumeLink
                          ? "border-danger focus:border-danger"
                          : "border-border focus:border-primary"
                      }`}
                    />
                    {errors.resumeLink && (
                      <p className="text-danger text-xs mt-1">
                        {errors.resumeLink}
                      </p>
                    )}
                  </div>

                  {/* Cover Note */}
                  <div>
                    <label className="block text-sm font-medium text-dark mb-2">
                      Cover Note{" "}
                      <span className="text-text-light">(Optional)</span>
                    </label>
                    <textarea
                      value={formData.coverNote}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          coverNote: e.target.value,
                        })
                      }
                      placeholder="Tell us why you're a great fit for this role..."
                      rows={4}
                      className="w-full px-4 py-3 border border-border rounded outline-none focus:border-primary transition-colors resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex gap-4">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? "Submitting..." : "Submit Application"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowApplicationForm(false)}
                      className="px-6 py-3 border border-border text-text font-medium hover:border-dark transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Success Message */}
            {applicationSubmitted && (
              <motion.div
                className="bg-[#56CDAD]/10 border border-[#56CDAD]/30 p-8 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, type: "spring" }}
              >
                <HiCheckCircle
                  className="text-[#56CDAD] mx-auto mb-4"
                  size={48}
                />
                <h3
                  className="text-xl font-semibold text-dark mb-2"
                  style={{ fontFamily: "var(--font-clash)" }}
                >
                  Application Submitted!
                </h3>
                <p className="text-text">
                  Thank you for applying. The hiring team will review your
                  application and get back to you.
                </p>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <motion.aside
            className="lg:w-[320px] shrink-0 min-w-0"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Job Overview */}
            <div className="bg-white p-6 border border-border mb-6">
              <h3
                className="text-lg font-semibold text-dark mb-6"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                Job Overview
              </h3>
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center shrink-0">
                    <HiBriefcase className="text-primary" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-light">Job Type</p>
                    <p className="text-sm font-medium text-dark break-words">{job.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center shrink-0">
                    <HiLocationMarker className="text-primary" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-light">Location</p>
                    <p className="text-sm font-medium text-dark break-words">
                      {job.location}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center shrink-0">
                    <HiCurrencyDollar className="text-primary" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-light">Salary</p>
                    <p className="text-sm font-medium text-dark break-words">
                      {job.salary}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center shrink-0">
                    <HiClock className="text-primary" size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-light">Posted</p>
                    <p className="text-sm font-medium text-dark break-words">
                      {timeAgo()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories & Tags */}
            <div className="bg-white p-6 border border-border">
              <h3
                className="text-lg font-semibold text-dark mb-4"
                style={{ fontFamily: "var(--font-clash)" }}
              >
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    typeColors[job.type] || "bg-gray-100 text-gray-600"
                  }`}
                >
                  {job.type}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
                  {job.category}
                </span>
              </div>
              {job.tags.length > 0 && (
                <>
                  <h3
                    className="text-lg font-semibold text-dark mt-6 mb-4"
                    style={{ fontFamily: "var(--font-clash)" }}
                  >
                    Required Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded bg-bg-light text-primary text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
}
