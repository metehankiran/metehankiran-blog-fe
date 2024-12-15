import { fetchApi } from '../config';

export interface Project {
  id: number;
  name: string;
  slug: string;
  image: string;
  short_description: string;
  description: string;
  key_features: string; // JSON string
  tags: string; // JSON string
  github_url: string;
  website_url: string;
  views: number;
  created_at: string;
  updated_at: string;
}

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

interface ProjectsResponse {
  data: Project[];
  meta: PaginationMeta;
}

export const ProjectsService = {
  // Tüm projeleri getir (sayfalama ve arama ile)
  getAllProjects: async (page: number = 1, search: string = '') => {
    const params = new URLSearchParams();
    
    // Sayfa numarasını her zaman gönder
    params.append('page', page.toString());
    
    // Arama parametresini ekle
    if (search) {
      params.append('search', search);
    }

    const queryString = params.toString();
    const response = await fetchApi<ProjectsResponse>(
      `/projects${queryString ? `?${queryString}` : ''}`
    );
    return response;
  },

  // Tek bir proje getir
  getProjectBySlug: async (slug: string) => {
    const response = await fetchApi<{ data: Project }>(`/projects/${slug}`);
    return response.data;
  },

  // Son projeleri getir
  getRecentProjects: async (limit: number = 3) => {
    const response = await fetchApi<{ data: Project[] }>(`/projects/recent?limit=${limit}`);
    return response.data;
  },
}; 