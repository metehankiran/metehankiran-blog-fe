import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, User, Clock } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { posts } from '@/data/posts';

export default function BlogPost() {
  const { id } = useParams();
  const post = posts.find(p => p.id === Number(id));

  if (!post) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold">Yazı Bulunamadı</h1>
        <p className="text-muted-foreground">
          Aradığınız yazı mevcut değil veya kaldırılmış olabilir.
        </p>
        <Button asChild>
          <Link to="/">Ana Sayfaya Dön</Link>
        </Button>
      </div>
    );
  }

  // Markdown içeriğini HTML'e çevirme
  const processContent = (content: string) => {
    if (!content) return '';

    // Başlıkları işle
    let processed = content.replace(/## (.*)/g, '<h2 class="text-2xl font-bold mt-8 mb-4">$1</h2>');

    // Paragrafları işle
    processed = processed.replace(/(?:^|\n)(?!<h2|<div)(.*?)(?=\n|$)/g, (_, text) => {
      if (text.trim()) {
        return `<p class="mb-4 text-muted-foreground">${text.trim()}</p>`;
      }
      return '';
    });

    return processed;
  };

  return (
    <>
      <Helmet>
        <title>{post.title} | Blog</title>
      </Helmet>

      <div className="max-w-4xl mx-auto space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <h1 className="text-4xl font-bold">{post.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              {post.date}
            </div>
            <div className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              John Doe
            </div>
            <div className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              10 dk okuma
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {post.tags.map(tag => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6 prose prose-neutral dark:prose-invert">
            <div 
              dangerouslySetInnerHTML={{ 
                __html: processContent(post.content || '') 
              }} 
            />
          </Card>
        </motion.div>
      </div>
    </>
  );
}