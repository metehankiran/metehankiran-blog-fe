import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Code, Rocket, Sparkles, Laptop, Brain, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { posts } from '@/data/posts';

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
    icon: <Laptop className="w-10 h-10 text-green-500" />,
    title: "Yazılım Geliştirme",
    description: "Best practice'ler, tasarım desenleri ve yazılım mimarisi"
  }
];

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Ana Sayfa | Blog</title>
      </Helmet>

      {/* Hero Section */}
      <section className="w-full -mx-4 px-4 min-h-[80vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6 relative z-10"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-purple-500/10 rounded-full flex items-center justify-center mx-auto"
            >
              <Sparkles className="w-10 h-10 text-purple-500" />
            </motion.div>

            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
              Teknoloji & Yazılım Blogu
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Modern web teknolojileri, yazılım geliştirme ve yapay zeka hakkında derinlemesine içerikler
            </p>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <Button size="lg" asChild>
                <Link to="/projects">
                  Projelerimi Gör
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">Hakkımda</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>

        {/* Animasyonlu arka plan desenleri */}
        <div className="absolute inset-0 -z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.5 }}
            className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.1 }}
            transition={{ delay: 0.7 }}
            className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"
          />
        </div>
      </section>

      {/* Özellikler Section */}
      <section className="w-full -mx-4 px-4 py-20">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-12"
          >
            <h2 className="text-3xl font-bold">Öne Çıkan Konular</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Blogumda paylaştığım içeriklerin ana kategorileri
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="p-6 text-center space-y-4 hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center mx-auto border">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Yazıları Section */}
      <section className="w-full -mx-4 px-4 py-20">
        <div className="container mx-auto">
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

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/post/${post.id}`}>
                  <Card className="overflow-hidden hover:shadow-lg transition-shadow h-[400px] flex flex-col">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4 space-y-3 flex flex-col flex-1">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        {post.date}
                      </div>
                      <h2 className="text-xl font-semibold line-clamp-2">{post.title}</h2>
                      <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {post.tags.map(tag => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button size="lg" variant="outline">
              Tüm Yazıları Gör
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>
    </>
  );
}