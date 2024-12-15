import { useState, useEffect } from 'react';
import { Post, PostsService } from '@/api';
import { toast } from 'sonner';

export function usePosts(limit?: number) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const data = limit 
          ? await PostsService.getRecentPosts(limit)
          : await PostsService.getAllPosts();
        setPosts(data);
      } catch (err) {
        const error = err as Error;
        setError(error);
        toast.error('Blog yazıları yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, [limit]);

  return { posts, isLoading, error };
} 