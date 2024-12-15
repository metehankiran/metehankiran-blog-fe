import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PostsService, Post } from '@/api';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Skeleton } from "@/components/ui/skeleton";
import { PostImage } from '@/components/PostImage';

// Skeleton loader komponenti
function PostSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-3/4" /> {/* Başlık */}
        <div className="flex gap-4">
          <Skeleton className="h-6 w-32" /> {/* Tarih */}
          <Skeleton className="h-6 w-32" /> {/* Görüntülenme */}
        </div>
      </div>
      <Skeleton className="w-full h-[400px]" /> {/* Kapak resmi */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" /> {/* Etiket */}
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-20" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" /> {/* İçerik paragrafları */}
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    </div>
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('Fetching post with slug:', slug); // Debug log
    const loadPost = async () => {
      try {
        setIsLoading(true);
        console.log('Fetching post with slug:', slug); // Debug için
        const response = await PostsService.getPostBySlug(slug as string);
        console.log('API Response:', response); // Debug için
        setPost(response);
      } catch (error) {
        toast.error('Yazı yüklenirken bir hata oluştu');
        console.error('Error loading post:', error);
      } finally {
        setIsLoading(false);
      }
    };
      
    if (slug) {
      loadPost();
    }
  }, [slug]);

  if (!slug) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <h1 className="text-2xl font-bold">Yazı Bulunamadı</h1>
        <p className="text-muted-foreground">
          Aradığınız yazı mevcut değil veya kaldırılmış olabilir.
        </p>
        <Button asChild>
          <Link to="/posts">Yazılara Dön</Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{isLoading ? 'Yükleniyor...' : `${post?.title} | Blog`}</title>
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild>
            <Link to="/posts" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Yazılara Dön
            </Link>
          </Button>
        </motion.div>

        {isLoading ? (
          <PostSkeleton />
        ) : post ? (
          <motion.article
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h1 className="text-4xl font-bold">{post.title}</h1>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center">
                  <Calendar className="mr-2 h-4 w-4" />
                  {format(new Date(post.created_at), 'dd MMMM yyyy', { locale: tr })}
                </div>
                <div className="flex items-center">
                  <span>{post.views} görüntülenme</span>
                </div>
              </div>
            </div>

            <PostImage src={post.image} alt={post.title} height="large" />

            <div className="flex flex-wrap gap-2">
              {JSON.parse(post.tags).map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>

            {post.categories.length > 0 && (
              <div className="flex gap-2 items-center">
                <span className="text-muted-foreground">Kategoriler:</span>
                {post.categories.map(category => (
                  <Link key={category.id} to={`/category/${category.slug}`}>
                    <Badge variant="outline">{category.name}</Badge>
                  </Link>
                ))}
              </div>
            )}

            <div className="prose prose-lg dark:prose-invert">
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </motion.article>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Yazı bulunamadı.</p>
          </div>
        )}
      </div>
    </>
  );
}