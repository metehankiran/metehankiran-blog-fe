import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { ProjectsService, type Project } from '@/api/services/projects';
import { toast } from 'sonner';
import { ProjectCard, ProjectCardSkeleton } from '@/components/ProjectCard';
import { CustomPagination } from '@/components/CustomPagination';

export default function Projects() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('search') || '';

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const loadProjects = async () => {
    try {
      setIsLoading(true);
      const response = await ProjectsService.getAllProjects(currentPage, searchTerm);
      setProjects(response.data);
      setMeta(response.meta);
    } catch (error) {
      toast.error('Projeler yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProjects();
    }, searchTerm ? 500 : 0); // Arama varsa debounce uygula

    return () => clearTimeout(timer);
  }, [searchTerm, currentPage]);

  const handleSearch = (value: string) => {
    setIsLoading(true);
    setSearchParams(prev => {
      if (value) {
        prev.set('search', value);
        prev.delete('page');
      } else {
        prev.delete('search');
        prev.delete('page');
      }
      return prev;
    });
  };

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Projeler | Blog</title>
      </Helmet>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Projelerim
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Son çalışmalarım ve kişisel projelerim.
          </p>
        </motion.div>

        <div className="relative max-w-sm mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Projelerde ara..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <ProjectCardSkeleton key={index} />
            ))}
          </div>
        ) : projects.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>

            {meta && (
              <CustomPagination
                currentPage={currentPage}
                totalPages={meta.last_page}
                onPageChange={handlePageChange}
              />
            )}
          </>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="text-4xl">🔍</div>
            <h3 className="text-lg font-semibold">Sonuç Bulunamadı</h3>
            <p className="text-muted-foreground">
              {searchTerm 
                ? `"${searchTerm}" ile ilgili proje bulunamadı.` 
                : 'Henüz proje bulunmuyor.'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}