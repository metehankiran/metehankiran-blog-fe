import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Github, ExternalLink, Calendar, User } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

export default function ProjectDetail() {
  const { id } = useParams();

  // In a real app, fetch project data based on id
  const project = {
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform built with React and Node.js',
    longDescription: `
      This project is a comprehensive e-commerce solution that provides a seamless
      shopping experience for users. It includes features such as product catalog,
      shopping cart, user authentication, payment processing, and order management.
      
      The frontend is built with React and uses modern practices like hooks and
      context for state management. The backend is powered by Node.js and Express,
      with MongoDB as the database.
    `,
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2069',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: '#',
    demo: '#',
    date: '2024-03-15',
    author: 'John Doe',
    features: [
      'User authentication and authorization',
      'Product catalog with search and filtering',
      'Shopping cart functionality',
      'Secure payment processing with Stripe',
      'Order tracking and history',
      'Admin dashboard for product management'
    ]
  };

  return (
    <>
      <Helmet>
        <title>{project.title} | Blog</title>
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-[400px] object-cover rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">{project.title}</h1>
            
            <div className="flex flex-wrap gap-4 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {project.date}
              </div>
              <div className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                {project.author}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {project.technologies.map(tech => (
                <Badge key={tech} variant="secondary">
                  {tech}
                </Badge>
              ))}
            </div>
          </div>

          <Card className="p-6">
            <p className="text-muted-foreground whitespace-pre-line">
              {project.longDescription}
            </p>
          </Card>

          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">Key Features</h2>
            <ul className="space-y-2">
              {project.features.map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center space-x-2"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="text-muted-foreground">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <Button>
              <Github className="mr-2 h-4 w-4" />
              View Source
            </Button>
            <Button variant="secondary">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Demo
            </Button>
          </div>
        </motion.div>
      </div>
    </>
  );
}