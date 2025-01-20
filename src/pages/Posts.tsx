import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar, Search, Eye } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PostsService, Post } from '@/api';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Skeleton } from "@/components/ui/skeleton";
import { PostImage } from '@/components/PostImage';
import { PostCard, PostCardSkeleton } from '@/components/PostCard';
import { CustomPagination } from '@/components/CustomPagination';

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export default function Posts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const searchTerm = searchParams.get('search') || '';

  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  const loadPosts = async () => {
    try {
      setIsLoading(true);
      const response = await PostsService.getAllPosts(currentPage, searchTerm);
      setPosts(response.data);
      setMeta(response.meta);
    } catch (error) {
      toast.error('Yazılar yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  // Hem arama hem sayfa değişikliğini tek bir useEffect'te yönetelim
  useEffect(() => {
    const timer = setTimeout(() => {
      loadPosts();
    }, searchTerm ? 500 : 0); // Arama varsa debounce uygula

    return () => clearTimeout(timer);
  }, [searchTerm, currentPage]); // Her iki değişikliği de dinle

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
        <title>Yazılar | Blog</title>
      </Helmet>
      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Blog Yazıları
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Yazılım, teknoloji ve güncel konular hakkında yazılar.
          </p>
        </motion.div>

        <div className="relative max-w-sm mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Yazılarda ara..."
            className="pl-9"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        ) : posts.length > 0 ? (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, index) => (
                <PostCard key={post.id} post={post} index={index} />
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
                ? `"${searchTerm}" ile ilgili yazı bulunamadı.` 
                : 'Henüz yazı bulunmuyor.'}
            </p>
          </div>
        )}
      </div>
    </>
  );
} 