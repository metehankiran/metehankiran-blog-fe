import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { 
  Github, 
  Linkedin, 
  Twitter,
  Mail,
  Code,
  Palette,
  Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <>
      <Helmet>
        <title>Hakkımda | Blog</title>
      </Helmet>
      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <img
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080"
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto object-cover"
          />
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            John Doe
          </h1>
          <p className="text-xl text-muted-foreground">
            Full Stack Developer & Designer
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">About Me</h2>
            <p className="text-muted-foreground">
              I'm a passionate developer with over 5 years of experience in web development.
              I love creating beautiful and functional applications that solve real-world problems.
              When I'm not coding, you can find me exploring new technologies, writing technical articles,
              or contributing to open-source projects.
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid gap-6 md:grid-cols-3"
        >
          <Card className="p-6 text-center">
            <Code className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold">Development</h3>
            <p className="text-sm text-muted-foreground">
              React, TypeScript, Node.js
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Palette className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold">Design</h3>
            <p className="text-sm text-muted-foreground">
              UI/UX, Figma, Tailwind
            </p>
          </Card>

          <Card className="p-6 text-center">
            <Globe className="w-8 h-8 mx-auto mb-2" />
            <h3 className="font-semibold">Languages</h3>
            <p className="text-sm text-muted-foreground">
              English, Turkish
            </p>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center space-x-4"
        >
          <Button variant="ghost" size="icon">
            <Github className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Linkedin className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Twitter className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Mail className="w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </>
  );
}