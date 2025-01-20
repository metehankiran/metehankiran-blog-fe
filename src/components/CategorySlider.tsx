import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, FileText, ExternalLink } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { CategoriesService, type Category } from '@/api/services/categories';
import { PostImage } from '@/components/PostImage';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from '@/lib/utils';

export function CategorySlider() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const plugin = Autoplay({ delay: 2000, stopOnInteraction: true });

    useEffect(() => {
        const loadCategories = async () => {
            try {
                setIsLoading(true);
                const data = await CategoriesService.getAllCategories();
                setCategories(data);
            } catch (error) {
                console.error('Error loading categories:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadCategories();
    }, []);

    if (isLoading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[...Array(4)].map((_, i) => (
                    <Card key={i} className="h-[300px] animate-pulse">
                        <div className="h-40 bg-muted" />
                        <div className="p-4 space-y-3">
                            <div className="h-4 bg-muted rounded w-3/4" />
                            <div className="h-4 bg-muted rounded w-1/2" />
                        </div>
                    </Card>
                ))}
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <div className="text-center py-12 space-y-4">
                <div className="text-4xl">📚</div>
                <h3 className="text-lg font-semibold">Henüz Kategori Yok</h3>
                <p className="text-muted-foreground">
                    Yakında yeni kategoriler eklenecek.
                </p>
            </div>
        );
    }

    return (
        <div className="relative">
            <Carousel
                opts={{
                    align: "start",
                    loop: true,
                }}
                plugins={[plugin]}
                className="w-full"
            >
                <CarouselContent className="-ml-2 md:-ml-4">
                    {categories.map((category, index) => (
                        <CarouselItem key={category.id} className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/4">
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
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <div className="hidden md:block">
                    <CarouselPrevious className="absolute -left-12" />
                    <CarouselNext className="absolute -right-12" />
                </div>
            </Carousel>
        </div>
    );
} 