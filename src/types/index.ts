export interface Job {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Remote" | "Internship" | "Contract";
  category: string;
  description: string;
  requirements: string[];
  salary: string;
  companyLogo: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Application {
  _id: string;
  jobId: string;
  name: string;
  email: string;
  resumeLink: string;
  coverNote: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  pagination?: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface JobFilters {
  search?: string;
  category?: string;
  location?: string;
  type?: string;
  page?: number;
  limit?: number;
}
