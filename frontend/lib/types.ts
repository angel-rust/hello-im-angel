// API types matching backend models

export interface Project {
  id: number;
  title: string;
  description: string;
  github_url: string | null;
  live_url: string | null;
  tech_stack: string[];
  year: number | null;
  featured: boolean;
  github_stars: number;
  github_forks: number;
  last_updated: string | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  proficiency: number;
  icon: string | null;
  order_index: number;
  created_at: string;
  updated_at: string;
}

export interface Experience {
  id: number;
  company: string;
  position: string;
  description: string | null;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  location: string | null;
  tech_stack: string[];
  created_at: string;
  updated_at: string;
}

export interface Contact {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  ip_address: string | null;
  user_agent: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface CreateContactPayload {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ResumeData {
  id: number;
  section: string;
  content: unknown;
  order_index: number;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface HealthResponse {
  status: string;
  message: string;
  version: string;
}

export interface SyncResponse {
  message: string;
  synced_count: number;
  updated_count: number;
  errors: string[];
}

export interface APIError {
  error: string;
  message: string;
}
