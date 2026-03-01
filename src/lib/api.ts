import { Job, Application, ApiResponse, JobFilters } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Generic fetch wrapper with error handling
async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
    ...options,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

// ==================== JOB ENDPOINTS ====================

export async function getJobs(
  filters?: JobFilters
): Promise<ApiResponse<Job[]>> {
  const params = new URLSearchParams();

  if (filters?.search) params.set("search", filters.search);
  if (filters?.category) params.set("category", filters.category);
  if (filters?.location) params.set("location", filters.location);
  if (filters?.type) params.set("type", filters.type);
  if (filters?.page) params.set("page", filters.page.toString());
  if (filters?.limit) params.set("limit", filters.limit.toString());

  const query = params.toString() ? `?${params.toString()}` : "";
  return fetchApi<ApiResponse<Job[]>>(`/jobs${query}`);
}

export async function getJobById(id: string): Promise<ApiResponse<Job>> {
  return fetchApi<ApiResponse<Job>>(`/jobs/${id}`);
}

export async function createJob(
  jobData: Omit<Job, "_id" | "createdAt" | "updatedAt">
): Promise<ApiResponse<Job>> {
  return fetchApi<ApiResponse<Job>>("/jobs", {
    method: "POST",
    body: JSON.stringify(jobData),
  });
}

export async function deleteJob(id: string): Promise<ApiResponse<null>> {
  return fetchApi<ApiResponse<null>>(`/jobs/${id}`, {
    method: "DELETE",
  });
}

export async function getCategories(): Promise<ApiResponse<string[]>> {
  return fetchApi<ApiResponse<string[]>>("/jobs/categories");
}

// ==================== APPLICATION ENDPOINTS ====================

export async function submitApplication(
  applicationData: Omit<Application, "_id" | "createdAt">
): Promise<ApiResponse<Application>> {
  return fetchApi<ApiResponse<Application>>("/applications", {
    method: "POST",
    body: JSON.stringify(applicationData),
  });
}

export async function getApplications(
  jobId?: string
): Promise<ApiResponse<Application[]>> {
  const query = jobId ? `?jobId=${jobId}` : "";
  return fetchApi<ApiResponse<Application[]>>(`/applications${query}`);
}
