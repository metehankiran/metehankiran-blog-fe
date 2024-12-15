import { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { PostImage } from '@/components/PostImage';
import { ProjectsService, type Project } from '@/api/services/projects';
import { toast } from 'sonner';
import { ExternalLink, Github, Calendar, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const effectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current) return;

    const loadProject = async () => {
      if (!slug) {
        console.error('Slug parameter is missing');
        return;
      }

      try {
        setIsLoading(true);
        const response = await ProjectsService.getProjectBySlug(slug);
        setProject(response);
      } catch (error) {
        toast.error('Proje detayları yüklenirken bir hata oluştu');
        console.error('Error loading project:', error);
      } finally {
        setIsLoading(false);
      }
    };
      
    if (slug) {
      loadProject();
    }

    effectRan.current = true;
  }, [slug]);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-[400px] bg-muted animate-pulse rounded-lg" />
        <div className="space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded w-3/4" />
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="flex gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-6 w-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold">Proje Bulunamadı</h1>
        <p className="text-muted-foreground">
          Aradığınız proje mevcut değil veya kaldırılmış olabilir.
        </p>
        <Button asChild>
          <Link to="/projects">Projelere Dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{project.name} | Projeler</title>
      </Helmet>

      <article className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden">
            <PostImage
              src={project.image}
              alt={project.name}
              height="large"
            />
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <h1 className="text-4xl font-bold">{project.name}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={project.created_at}>
                {format(new Date(project.created_at), 'dd MMMM yyyy', { locale: tr })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{project.views} görüntülenme</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {JSON.parse(project.tags).map((tag: string) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.short_description}
          </p>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            {project.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Özellikler</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              {JSON.parse(project.key_features).map((feature: string) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <Button asChild>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub'da İncele
              </a>
            </Button>
            <Button asChild variant="secondary">
              <a href={project.website_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Canlı Demo
              </a>
            </Button>
          </div>
        </motion.div>
      </article>
    </>
  );
}