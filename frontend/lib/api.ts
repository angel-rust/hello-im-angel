import type {
  Project,
  Skill,
  Experience,
  Contact,
  CreateContactPayload,
  ResumeData,
  HealthResponse,
  SyncResponse,
  APIError,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        const error: APIError = await response.json().catch(() => ({
          error: 'Request failed',
          message: `HTTP ${response.status}: ${response.statusText}`,
        }));
        throw new Error(error.message || 'An error occurred');
      }

      return await response.json();
    } catch (error) {
      console.error(`API request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // Health check
  async health(): Promise<HealthResponse> {
    return this.request<HealthResponse>('/health');
  }

  // Projects
  async getProjects(): Promise<Project[]> {
    return this.request<Project[]>('/api/projects');
  }

  async getFeaturedProjects(): Promise<Project[]> {
    return this.request<Project[]>('/api/projects/featured');
  }

  async getProjectById(id: number): Promise<Project> {
    return this.request<Project>(`/api/projects/${id}`);
  }

  async createProject(project: Partial<Project>): Promise<Project> {
    return this.request<Project>('/api/projects', {
      method: 'POST',
      body: JSON.stringify(project),
    });
  }

  async updateProject(id: number, project: Partial<Project>): Promise<Project> {
    return this.request<Project>(`/api/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(project),
    });
  }

  async deleteProject(id: number): Promise<void> {
    return this.request<void>(`/api/projects/${id}`, {
      method: 'DELETE',
    });
  }

  // Skills
  async getSkills(): Promise<Skill[]> {
    return this.request<Skill[]>('/api/skills');
  }

  async getSkillById(id: number): Promise<Skill> {
    return this.request<Skill>(`/api/skills/${id}`);
  }

  async createSkill(skill: Partial<Skill>): Promise<Skill> {
    return this.request<Skill>('/api/skills', {
      method: 'POST',
      body: JSON.stringify(skill),
    });
  }

  async updateSkill(id: number, skill: Partial<Skill>): Promise<Skill> {
    return this.request<Skill>(`/api/skills/${id}`, {
      method: 'PUT',
      body: JSON.stringify(skill),
    });
  }

  async deleteSkill(id: number): Promise<void> {
    return this.request<void>(`/api/skills/${id}`, {
      method: 'DELETE',
    });
  }

  // Experiences
  async getExperiences(): Promise<Experience[]> {
    return this.request<Experience[]>('/api/experiences');
  }

  async getExperienceById(id: number): Promise<Experience> {
    return this.request<Experience>(`/api/experiences/${id}`);
  }

  async createExperience(experience: Partial<Experience>): Promise<Experience> {
    return this.request<Experience>('/api/experiences', {
      method: 'POST',
      body: JSON.stringify(experience),
    });
  }

  async deleteExperience(id: number): Promise<void> {
    return this.request<void>(`/api/experiences/${id}`, {
      method: 'DELETE',
    });
  }

  // Contacts
  async submitContact(contact: CreateContactPayload): Promise<Contact> {
    return this.request<Contact>('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contact),
    });
  }

  async getContacts(): Promise<Contact[]> {
    return this.request<Contact[]>('/api/contacts');
  }

  async getContactById(id: number): Promise<Contact> {
    return this.request<Contact>(`/api/contacts/${id}`);
  }

  async updateContactStatus(id: number, status: string): Promise<Contact> {
    return this.request<Contact>(`/api/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  }

  async deleteContact(id: number): Promise<void> {
    return this.request<void>(`/api/contacts/${id}`, {
      method: 'DELETE',
    });
  }

  // Resume
  async getResumeData(): Promise<ResumeData[]> {
    return this.request<ResumeData[]>('/api/resume');
  }

  async getResumeSection(section: string): Promise<ResumeData[]> {
    return this.request<ResumeData[]>(`/api/resume/${section}`);
  }

  async createResumeData(data: Partial<ResumeData>): Promise<ResumeData> {
    return this.request<ResumeData>('/api/resume', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateResumeData(id: number, data: Partial<ResumeData>): Promise<ResumeData> {
    return this.request<ResumeData>(`/api/resume/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteResumeData(id: number): Promise<void> {
    return this.request<void>(`/api/resume/${id}`, {
      method: 'DELETE',
    });
  }

  // GitHub Sync
  async syncGitHubProjects(): Promise<SyncResponse> {
    return this.request<SyncResponse>('/api/github/sync', {
      method: 'POST',
    });
  }
}

// Export singleton instance
export const api = new APIClient(API_BASE_URL);

// Export class for testing or custom instances
export default APIClient;
