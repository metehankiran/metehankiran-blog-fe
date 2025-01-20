import { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { CategoriesService, type Category } from '@/api/services/categories';
import { PostGrid } from '@/components/PostCard';
import { toast } from 'sonner';
import { PostImage } from '@/components/PostImage';
import { FileText } from 'lucide-react';
import { CustomPagination } from '@/components/CustomPagination';

interface PaginationMeta {
  current_page: number;
  from: number;
  last_page: number;
  per_page: number;
  to: number;
  total: number;
}

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [meta, setMeta] = useState<PaginationMeta | null>(null);

  useEffect(() => {
    const loadCategory = async () => {
      if (!slug) return;

      try {
        setIsLoading(true);
        const response = await CategoriesService.getCategoryBySlug(slug, currentPage);
        setCategory(response.data);
        setMeta(response.meta);
      } catch (error) {
        toast.error('Kategori yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategory();
  }, [slug, currentPage]);

  const handlePageChange = (page: number) => {
    setIsLoading(true);
    setSearchParams(prev => {
      prev.set('page', page.toString());
      return prev;
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="h-[300px] bg-muted animate-pulse rounded-lg" />
        <div className="space-y-4">
          <div className="h-8 bg-muted animate-pulse rounded w-1/3" />
          <div className="h-4 bg-muted animate-pulse rounded w-full" />
          <div className="h-4 bg-muted animate-pulse rounded w-2/3" />
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="text-center py-12 space-y-4">
        <div className="text-4xl">🔍</div>
        <h3 className="text-lg font-semibold">Kategori Bulunamadı</h3>
        <p className="text-muted-foreground">
          Aradığınız kategori mevcut değil veya kaldırılmış olabilir.
        </p>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{category.name} | Kategoriler</title>
      </Helmet>

      <div className="space-y-12">
        {/* Hero Section */}
        <section>
          <div className="relative h-[300px] rounded-lg overflow-hidden">
            <PostImage
              src={category.image}
              alt={category.name}
              height="large"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h1 className="text-4xl font-bold text-white">{category.name}</h1>
                <p className="text-lg text-white/90 max-w-3xl">
                  {category.description}
                </p>
                <div className="flex items-center text-white/80">
                  <FileText className="w-5 h-5 mr-2" />
                  <span>{meta?.total || 0} yazı</span>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Posts Section */}
        <section>
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-4"
            >
              <h2 className="text-3xl font-bold">Yazılar</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Bu kategorideki tüm yazılar
              </p>
            </motion.div>

            {category.posts && category.posts.length > 0 ? (
              <>
                <PostGrid posts={category.posts} isLoading={false} />
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
                <div className="text-4xl">📝</div>
                <h3 className="text-lg font-semibold">Henüz Yazı Yok</h3>
                <p className="text-muted-foreground">
                  Bu kategoride henüz yazı bulunmuyor.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
} 