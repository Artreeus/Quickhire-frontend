"use client";

import { useEffect, useState, useCallback } from "react";
import { Job } from "@/types";
import { getJobs, createJob, deleteJob } from "@/lib/api";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import toast from "react-hot-toast";
import {
  HiPlus,
  HiTrash,
  HiLocationMarker,
  HiBriefcase,
  HiX,
  HiExclamation,
} from "react-icons/hi";

const jobTypes = ["Full-Time", "Part-Time", "Remote", "Internship", "Contract"];
const categoryOptions = [
  "Design",
  "Technology",
  "Marketing",
  "Business",
  "Human Resource",
  "Finance",
  "Engineering",
  "Development",
];

type JobType = "Full-Time" | "Part-Time" | "Remote" | "Internship" | "Contract";

interface FormState {
  title: string;
  company: string;
  location: string;
  type: JobType;
  category: string;
  description: string;
  requirements: string;
  salary: string;
  tags: string;
}

const initialFormState: FormState = {
  title: "",
  company: "",
  location: "",
  type: "Full-Time",
  category: "",
  description: "",
  requirements: "",
  salary: "",
  tags: "",
};

export default function AdminPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const fetchJobs = useCallback(async () => {
    try {
      const response = await getJobs({ limit: 100 });
      setJobs(response.data);
    } catch {
      toast.error("Failed to fetch jobs");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.company.trim()) newErrors.company = "Company is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateJob = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await createJob({
        title: formData.title,
        company: formData.company,
        location: formData.location,
        type: formData.type as Job["type"],
        category: formData.category,
        description: formData.description,
        requirements: formData.requirements
          .split("\n")
          .filter((r) => r.trim()),
        salary: formData.salary || "Negotiable",
        companyLogo: "",
        tags: formData.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      });
      toast.success("Job created successfully!");
      setFormData(initialFormState);
      setShowForm(false);
      fetchJobs();
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to create job"
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteJob = async (id: string) => {
    try {
      await deleteJob(id);
      toast.success("Job deleted successfully");
      setJobs((prev) => prev.filter((job) => job._id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete job"
      );
    }
  };

  return (
    <div className="min-h-screen bg-bg-light">
      {/* Header */}
      <section className="bg-dark py-8 px-6 md:px-[124px]">
        <div className="max-w-[1440px] mx-auto">
          <h1
            className="text-3xl md:text-[48px] text-white leading-[1.1]"
            style={{ fontFamily: "var(--font-clash)", fontWeight: 600 }}
          >
            Admin{" "}
            <span className="text-secondary">Dashboard</span>
          </h1>
          <p className="text-white/60 text-base mt-3">
            Manage job listings - add new jobs or remove existing ones
          </p>
        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-6 md:px-[124px] py-10">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white p-6 border border-border">
            <p className="text-text-light text-sm">Total Jobs</p>
            <p
              className="text-3xl font-semibold text-dark mt-1"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              {jobs.length}
            </p>
          </div>
          <div className="bg-white p-6 border border-border">
            <p className="text-text-light text-sm">Categories</p>
            <p
              className="text-3xl font-semibold text-dark mt-1"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              {new Set(jobs.map((j) => j.category)).size}
            </p>
          </div>
          <div className="bg-white p-6 border border-border">
            <p className="text-text-light text-sm">Locations</p>
            <p
              className="text-3xl font-semibold text-dark mt-1"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              {new Set(jobs.map((j) => j.location)).size}
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2
            className="text-2xl font-semibold text-dark"
            style={{ fontFamily: "var(--font-clash)" }}
          >
            Job Listings
          </h2>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-5 py-3 transition-colors"
          >
            {showForm ? (
              <>
                <HiX size={18} /> Close Form
              </>
            ) : (
              <>
                <HiPlus size={18} /> Add New Job
              </>
            )}
          </button>
        </div>

        {/* Create Job Form */}
        {showForm && (
          <div className="bg-white p-6 md:p-8 border-2 border-primary mb-8">
            <h3
              className="text-xl font-semibold text-dark mb-6"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              Create New Job
            </h3>
            <form onSubmit={handleCreateJob} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Job Title <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    placeholder="e.g. Senior UI Designer"
                    className={`w-full px-4 py-3 border rounded outline-none transition-colors ${
                      errors.title
                        ? "border-danger"
                        : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.title && (
                    <p className="text-danger text-xs mt-1">{errors.title}</p>
                  )}
                </div>

                {/* Company */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Company <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    placeholder="e.g. Stripe"
                    className={`w-full px-4 py-3 border rounded outline-none transition-colors ${
                      errors.company
                        ? "border-danger"
                        : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.company && (
                    <p className="text-danger text-xs mt-1">
                      {errors.company}
                    </p>
                  )}
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Location <span className="text-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) =>
                      setFormData({ ...formData, location: e.target.value })
                    }
                    placeholder="e.g. San Francisco, USA"
                    className={`w-full px-4 py-3 border rounded outline-none transition-colors ${
                      errors.location
                        ? "border-danger"
                        : "border-border focus:border-primary"
                    }`}
                  />
                  {errors.location && (
                    <p className="text-danger text-xs mt-1">
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Type */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Job Type <span className="text-danger">*</span>
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData({ ...formData, type: e.target.value as JobType })
                    }
                    className="w-full px-4 py-3 border border-border rounded outline-none focus:border-primary transition-colors bg-white"
                  >
                    {jobTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Category <span className="text-danger">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`w-full px-4 py-3 border rounded outline-none transition-colors bg-white ${
                      errors.category
                        ? "border-danger"
                        : "border-border focus:border-primary"
                    }`}
                  >
                    <option value="">Select a category</option>
                    {categoryOptions.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  {errors.category && (
                    <p className="text-danger text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                {/* Salary */}
                <div>
                  <label className="block text-sm font-medium text-dark mb-2">
                    Salary Range{" "}
                    <span className="text-text-light">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.salary}
                    onChange={(e) =>
                      setFormData({ ...formData, salary: e.target.value })
                    }
                    placeholder="e.g. $80,000 - $120,000"
                    className="w-full px-4 py-3 border border-border rounded outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Description <span className="text-danger">*</span>
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Describe the job role, responsibilities, and what you're looking for..."
                  rows={5}
                  className={`w-full px-4 py-3 border rounded outline-none transition-colors resize-none ${
                    errors.description
                      ? "border-danger"
                      : "border-border focus:border-primary"
                  }`}
                />
                {errors.description && (
                  <p className="text-danger text-xs mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Requirements */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Requirements{" "}
                  <span className="text-text-light">
                    (one per line, optional)
                  </span>
                </label>
                <textarea
                  value={formData.requirements}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      requirements: e.target.value,
                    })
                  }
                  placeholder={"3+ years experience in React\nProficiency in TypeScript\nStrong communication skills"}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded outline-none focus:border-primary transition-colors resize-none"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-dark mb-2">
                  Tags{" "}
                  <span className="text-text-light">
                    (comma-separated, optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) =>
                    setFormData({ ...formData, tags: e.target.value })
                  }
                  placeholder="e.g. React, TypeScript, Node.js"
                  className="w-full px-4 py-3 border border-border rounded outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Submit */}
              <div className="flex gap-4 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-primary hover:bg-primary/90 text-white font-bold px-8 py-3 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? "Creating..." : "Create Job"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setFormData(initialFormState);
                    setErrors({});
                  }}
                  className="px-6 py-3 border border-border text-text font-medium hover:border-dark transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Job Listings Table */}
        {loading ? (
          <LoadingSpinner />
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white border border-border">
            <HiBriefcase className="mx-auto text-text-light mb-4" size={48} />
            <h3
              className="text-xl font-semibold text-dark mb-2"
              style={{ fontFamily: "var(--font-clash)" }}
            >
              No jobs yet
            </h3>
            <p className="text-text-light mb-4">
              Start by creating your first job listing
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold px-6 py-3 transition-colors"
            >
              <HiPlus size={18} />
              Add New Job
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job) => (
              <div
                key={job._id}
                className="bg-white border border-border p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-primary/20 transition-colors"
              >
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  {/* Company Logo */}
                  <div className="w-12 h-12 bg-bg-light rounded-lg flex items-center justify-center shrink-0 border border-border">
                    <span
                      className="text-xl font-bold text-primary"
                      style={{ fontFamily: "var(--font-clash)" }}
                    >
                      {job.company.charAt(0)}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <h3
                      className="text-base font-semibold text-dark truncate"
                      style={{ fontFamily: "var(--font-clash)" }}
                    >
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-text-light text-sm">
                      <span>{job.company}</span>
                      <span className="w-1 h-1 bg-text-light rounded-full" />
                      <div className="flex items-center gap-1">
                        <HiLocationMarker size={14} />
                        <span>{job.location}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                        {job.type}
                      </span>
                      <span className="px-2.5 py-0.5 bg-bg-light text-text text-xs font-medium rounded-full">
                        {job.category}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-xs text-text-light">
                    {new Date(job.createdAt).toLocaleDateString()}
                  </span>
                  {deleteConfirm === job._id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-danger flex items-center gap-1">
                        <HiExclamation size={14} />
                        Confirm?
                      </span>
                      <button
                        onClick={() => handleDeleteJob(job._id)}
                        className="px-3 py-1.5 bg-danger text-white text-xs font-bold rounded hover:bg-danger/90 transition-colors"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-3 py-1.5 border border-border text-text text-xs font-medium rounded hover:border-dark transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(job._id)}
                      className="p-2 text-text-light hover:text-danger hover:bg-danger/10 rounded transition-colors"
                      title="Delete job"
                    >
                      <HiTrash size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
