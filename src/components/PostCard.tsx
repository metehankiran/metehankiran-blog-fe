import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Skeleton } from "@/components/ui/skeleton";
import { PostImage } from '@/components/PostImage';
import { Post } from '@/api';

// Skeleton loader komponenti
export function PostCardSkeleton() {
  return (
    <Card className="overflow-hidden h-[450px]">
      <Skeleton className="w-full h-48" />
      <div className="p-6 space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </Card>
  );
}

interface PostCardProps {
  post: Post;
  index?: number;
}

export function PostCard({ post, index = 0 }: PostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link to={`/post/${post.slug}`}>
        <Card className="overflow-hidden h-[450px] flex flex-col hover:shadow-lg transition-shadow">
          <div className="h-48">
            <PostImage src={post.image} alt={post.title} />
          </div>
          <div className="p-6 flex flex-col h-[calc(450px-192px)]">
            <div className="flex flex-wrap gap-2 mb-4">
              {JSON.parse(post.tags).map((tag: string) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
            <h2 className="text-xl font-semibold mb-2 line-clamp-2">
              {post.title}
            </h2>
            <p className="text-muted-foreground line-clamp-3 mb-4">
              {post.description}
            </p>
            <div className="flex justify-between items-center text-sm text-muted-foreground mt-auto">
              <div className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {format(new Date(post.created_at), 'dd MMM yyyy', { locale: tr })}
              </div>
              <div className="flex items-center">
                <Eye className="mr-1 h-4 w-4" />
                {post.views}
              </div>
            </div>
          </div>
        </Card>
      </Link>
    </motion.div>
  );
}

// Grid container komponenti
interface PostGridProps {
  posts: Post[];
  isLoading: boolean;
  skeletonCount?: number;
}

export function PostGrid({ posts, isLoading, skeletonCount = 6 }: PostGridProps) {
  if (isLoading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(skeletonCount)].map((_, i) => (
          <PostCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post, index) => (
        <PostCard key={post.id} post={post} index={index} />
      ))}
    </div>
  );
} 