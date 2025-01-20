import { fetchApi } from '../config';

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  is_active: number;
  posts_count?: number;
  children?: Category[];
  created_at: string;
  updated_at: string;
}

interface CategoriesResponse {
  data: Category[];
}

export const CategoriesService = {
  // Tüm kategorileri getir
  getAllCategories: async () => {
    const response = await fetchApi<CategoriesResponse>('/categories');
    return response.data;
  },

  // Slug ile kategori getir
  getCategoryBySlug: async (slug: string, page: number = 1) => {
    const response = await fetchApi<{ data: Category, meta: PaginationMeta }>(
      `/categories/${slug}?page=${page}`
    );
    return response;
  },
}; 