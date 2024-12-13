import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useState } from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const projects = [
  {
    id: 1,
    title: 'E-Ticaret Platformu',
    description: 'React ve Node.js ile geliştirilmiş tam özellikli e-ticaret platformu',
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: '#',
    demo: '#'
  },
  {
    id: 2,
    title: 'Görev Yönetimi Uygulaması',
    description: 'Güzel ve sezgisel görev yönetimi uygulaması',
    image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2070',
    technologies: ['React', 'TypeScript', 'Firebase'],
    github: '#',
    demo: '#'
  },
  {
    id: 3,
    title: 'Hava Durumu Paneli',
    description: 'Güzel görselleştirmelerle gerçek zamanlı hava durumu bilgisi',
    image: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?q=80&w=1974',
    technologies: ['React', 'D3.js', 'Weather API'],
    github: '#',
    demo: '#'
  },
  {
    id: 4,
    title: 'Sosyal Medya Uygulaması',
    description: 'Modern sosyal medya platformu',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=2074',
    technologies: ['React', 'GraphQL', 'PostgreSQL'],
    github: '#',
    demo: '#'
  },
  {
    id: 5,
    title: 'Blog Platformu',
    description: 'Markdown destekli blog yazma platformu',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072',
    technologies: ['Next.js', 'MDX', 'Tailwind'],
    github: '#',
    demo: '#'
  },
  {
    id: 6,
    title: 'Müzik Çalar',
    description: 'Web tabanlı müzik çalar uygulaması',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?q=80&w=2070',
    technologies: ['React', 'Web Audio API', 'Redux'],
    github: '#',
    demo: '#'
  },
  {
    id: 7,
    title: 'Not Alma Uygulaması',
    description: 'Gerçek zamanlı senkronizasyonlu not alma uygulaması',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?q=80&w=2074',
    technologies: ['React', 'Firebase', 'Redux'],
    github: '#',
    demo: '#'
  },
  {
    id: 8,
    title: 'Sohbet Uygulaması',
    description: 'Gerçek zamanlı mesajlaşma uygulaması',
    image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=2069',
    technologies: ['React', 'Socket.io', 'MongoDB'],
    github: '#',
    demo: '#'
  },
  {
    id: 9,
    title: 'Dosya Paylaşım Platformu',
    description: 'Güvenli dosya paylaşım platformu',
    image: 'https://images.unsplash.com/photo-1618609378039-b572f64c5b42?q=80&w=2070',
    technologies: ['React', 'AWS S3', 'Node.js'],
    github: '#',
    demo: '#'
  },
  {
    id: 10,
    title: 'Video Konferans Uygulaması',
    description: 'WebRTC tabanlı video konferans uygulaması',
    image: 'https://images.unsplash.com/photo-1516387938699-a93567ec168e?q=80&w=2071',
    technologies: ['React', 'WebRTC', 'Express'],
    github: '#',
    demo: '#'
  },
  {
    id: 11,
    title: 'Fitness Takip Uygulaması',
    description: 'Kişisel fitness hedeflerini takip etme uygulaması',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=2070',
    technologies: ['React Native', 'Redux', 'Node.js'],
    github: '#',
    demo: '#'
  },
  {
    id: 12,
    title: 'Yemek Tarifi Platformu',
    description: 'Topluluk destekli yemek tarifi paylaşım platformu',
    image: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?q=80&w=2080',
    technologies: ['React', 'Firebase', 'Algolia'],
    github: '#',
    demo: '#'
  },
  {
    id: 13,
    title: 'Bütçe Takip Uygulaması',
    description: 'Kişisel finans ve bütçe yönetimi uygulaması',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070',
    technologies: ['React', 'ChartJS', 'Firebase'],
    github: '#',
    demo: '#'
  }
];

export default function Projects() {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  const totalPages = Math.ceil(projects.length / projectsPerPage);

  // Geçerli sayfadaki projeleri hesapla
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);

  // Sayfa değiştirme fonksiyonu
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden group h-[400px] flex flex-col">
                <Link to={`/project/${project.id}`}>
                  <div className="relative">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </Link>
                
                <div className="p-4 space-y-3 flex flex-col flex-1">
                  <div className="space-y-3 flex-1">
                    <h2 className="text-xl font-semibold line-clamp-2">{project.title}</h2>
                    <p className="text-muted-foreground line-clamp-2">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mt-2">
                      {project.technologies.map(tech => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between">
                    <Button variant="ghost" size="sm">
                      <Github className="mr-2 h-4 w-4" />
                      Kod
                    </Button>
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Demo
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <Pagination className="mt-8">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={() => handlePageChange(currentPage - 1)}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  onClick={() => handlePageChange(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            
            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={() => handlePageChange(currentPage + 1)}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </>
  );
}