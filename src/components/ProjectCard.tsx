import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { PostImage } from '@/components/PostImage';
import type { Project } from '@/api/services/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Card className="overflow-hidden group h-[400px] flex flex-col">
        <Link to={`/project/${project.slug}`}>
          <div className="relative">
            <PostImage
              src={project.image}
              alt={project.name}
              height="default"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </Link>
        
        <div className="p-4 space-y-3 flex flex-col flex-1">
          <div className="space-y-3 flex-1">
            <h2 className="text-xl font-semibold line-clamp-2">{project.name}</h2>
            <p className="text-muted-foreground line-clamp-2">{project.short_description}</p>
            
            <div className="flex flex-wrap gap-2 mt-2">
              {JSON.parse(project.tags).map((tech: string) => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="ghost" size="sm" asChild>
              <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Kod
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={project.website_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Demo
              </a>
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <Card className="h-[400px] flex flex-col">
      <div className="w-full h-48 bg-muted animate-pulse" />
      <div className="p-4 space-y-3 flex-1">
        <div className="h-6 bg-muted animate-pulse rounded w-3/4" />
        <div className="h-4 bg-muted animate-pulse rounded w-full" />
        <div className="flex flex-wrap gap-2 mt-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-6 w-16 bg-muted animate-pulse rounded" />
          ))}
        </div>
      </div>
    </Card>
  );
}