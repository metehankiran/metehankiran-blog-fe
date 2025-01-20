import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, ExternalLink, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CategoriesService, type Category } from '@/api/services/categories';
import { toast } from 'sonner';
import { PostImage } from '@/components/PostImage';

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setIsLoading(true);
        const data = await CategoriesService.getAllCategories();
        setCategories(data);
      } catch (error) {
        toast.error('Kategoriler yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    loadCategories();
  }, []);

  return (
    <>
      <Helmet>
        <title>Kategoriler | Blog</title>
      </Helmet>

      <div className="space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-4"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Kategoriler
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tüm blog yazılarımın kategorilere göre listesi
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, index) => (
              <Card key={index} className="h-[300px] animate-pulse">
                <div className="w-full h-40 bg-muted" />
                <div className="p-4 space-y-3">
                  <div className="h-5 bg-muted rounded w-1/2" />
                  <div className="h-4 bg-muted rounded w-full" />
                  <div className="h-4 bg-muted rounded w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        ) : categories.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group h-[300px] flex flex-col">
                  <PostImage
                    src={category.image}
                    alt={category.name}
                    height="default"
                  />
                  <div className="relative h-40">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="font-semibold text-lg text-white line-clamp-1">
                        {category.name}
                      </h3>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-sm text-muted-foreground line-clamp-2 flex-1">
                      {category.description || 'Bu kategoride henüz açıklama bulunmuyor.'}
                    </p>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <FileText className="w-4 h-4 mr-1" />
                        <span>{category.posts_count || 0} yazı</span>
                      </div>
                      <Button variant="ghost" size="sm" asChild className="gap-2">
                        <Link to={`/category/${category.slug}`}>
                          <ExternalLink className="w-4 h-4" />
                          Görüntüle
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          }</div>
        ) : (
          <div className="text-center py-12 space-y-4">
            <div className="text-4xl">📚</div>
            <h3 className="text-lg font-semibold">Henüz Kategori Yok</h3>
            <p className="text-muted-foreground">
              Yakında yeni kategoriler eklenecek.
            </p>
          </div>
        )}
      </div>
    </>
  );
} 