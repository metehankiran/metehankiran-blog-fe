import { useState, useEffect } from 'react';
import { PostsService, Post } from '@/api';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Code, 
  Brain, 
  Laptop, 
  ArrowRight, 
  FileText,
  Sparkles,
  GraduationCap,
  Github
} from 'lucide-react';
import { Skeleton } from "@/components/ui/skeleton";
import { PostImage } from '@/components/PostImage';
import { PostGrid } from '@/components/PostCard';
import { useProjects } from '@/hooks/useProjects';
import { ProjectCard, ProjectCardSkeleton } from '@/components/ProjectCard';

export default function Home() {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { projects, isLoading: projectsLoading } = useProjects(3);

  useEffect(() => {
    const loadRecentPosts = async () => {
      try {
        setIsLoading(true);
        const posts = await PostsService.getRecentPosts(3);
        setRecentPosts(posts);
      } catch (error) {
        toast.error('Blog yazıları yüklenirken bir hata oluştu');
        console.error('Error loading posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRecentPosts();
  }, []);

  return (
    <>
      <Helmet>
        <title>Ana Sayfa | Blog</title>
      </Helmet>

      {/* Hero Section */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center"
          >
            <Badge variant="secondary" className="px-4 py-1">
              <Sparkles className="w-4 h-4 mr-2" />
              Yazılım Geliştirici & AI Enthusiast
            </Badge>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold">
            <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Merhaba, Ben [İsim]
            </span>
          </h1>

          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Modern web teknolojileri, yapay zeka ve yazılım geliştirme üzerine içerikler üretiyorum.
            Deneyimlerimi ve öğrendiklerimi paylaşmaktan keyif alıyorum.
          </p>

          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/posts">
                <FileText className="mr-2 h-5 w-5" />
                Blog Yazıları
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                GitHub Profilim
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Özellikler Section */}
      <section className="py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Neler Paylaşıyorum?</h2>
          <p className="text-muted-foreground">Blogumda bulabileceğiniz içerikler</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                <div className="p-3 w-fit rounded-full bg-secondary">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Son Yazılar Section */}
      <section className="py-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center space-y-4 mb-12"
        >
          <h2 className="text-3xl font-bold">Son Yazılar</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            En son yayınlanan blog yazılarım
          </p>
        </motion.div>

        <PostGrid posts={recentPosts} isLoading={isLoading} skeletonCount={3} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button size="lg" variant="outline" asChild>
            <Link to="/posts">
              Tüm Yazıları Gör
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </motion.div>
      </section>

      {/* Recent Projects Section */}
      <section className="py-16">
        <div className="container space-y-8">
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">Son Projelerim</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Üzerinde çalıştığım son projeler ve kişisel çalışmalarım.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projectsLoading ? (
              [...Array(3)].map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))
            ) : (
              projects.map((project, index) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))
            )}
          </div>

          <div className="text-center">
            <Button asChild>
              <Link to="/projects" className="gap-2">
                Tüm Projeleri Gör
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

const features = [
  {
    icon: <Code className="w-10 h-10 text-purple-500" />,
    title: "Modern Teknolojiler",
    description: "React, TypeScript ve modern web teknolojileri hakkında detaylı yazılar"
  },
  {
    icon: <Brain className="w-10 h-10 text-blue-500" />,
    title: "Yapay Zeka",
    description: "AI ve makine öğrenimi alanındaki son gelişmeler ve uygulamalar"
  },
  {
    icon: <GraduationCap className="w-10 h-10 text-green-500" />,
    title: "Eğitim İçerikleri",
    description: "Yazılım geliştirme ve best practice'ler hakkında öğretici içerikler"
  }
];