import { fetchApi } from '../config';

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  description: string;
  content: string;
  image: string;
  tags: string; // JSON string olarak geliyor
  views: number;
  status: string;
  categories: Category[];
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

interface PostsResponse {
  data: Post[];
  meta: PaginationMeta;
}

export const PostsService = {
  // Tüm gönderileri getir (sayfalama ve arama ile)
  getAllPosts: async (page: number = 1, search: string = '') => {
    const params = new URLSearchParams();
    
    // Sayfa numarasını her zaman gönder
    params.append('page', page.toString());
    
    // Arama parametresini ekle
    if (search) {
      params.append('search', search);
    }

    const queryString = params.toString();
    const response = await fetchApi<PostsResponse>(
      `/posts${queryString ? `?${queryString}` : ''}`
    );
    return response;
  },
  
  // Tek bir gönderi getir
  getPost: async (id: number) => {
    const response = await fetchApi<ApiResponse<Post>>(`/posts/${id}`);
    return response.data;
  },
  
  // Son gönderileri getir
  getRecentPosts: async (limit: number = 3) => {
    const response = await fetchApi<ApiResponse<Post[]>>(`/posts/recent?limit=${limit}`);
    return response.data;
  },
  
  // Kategoriye göre gönderileri getir
  getPostsByCategory: async (category: string) => {
    const response = await fetchApi<ApiResponse<Post[]>>(`/posts/category/${category}`);
    return response.data;
  },
  
  // Slug ile gönderi getir
  getPostBySlug: async (slug: string) => {
    const response = await fetchApi<ApiResponse<Post>>(`/posts/${slug}`);
    return response.data;
  },
}; 