import { useState, useEffect } from 'react';
import { Project, ProjectsService } from '@/api';
import { toast } from 'sonner';

export function useProjects(limit?: number) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = limit 
          ? await ProjectsService.getRecentProjects(limit)
          : (await ProjectsService.getAllProjects()).data;
        setProjects(data);
      } catch (err) {
        const error = err as Error;
        setError(error);
        toast.error('Projeler yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    loadProjects();
  }, [limit]);

  return { projects, isLoading, error };
} 