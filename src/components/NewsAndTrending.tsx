'use client';

import { useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, MessageSquare, ThumbsUp, BadgeCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrendingItem {
  id: string;
  title: string;
  image: string;
  tag?: string;
  source: string;
  verified: boolean;
  likes: number;
  comments: number;
  timeAgo: string;
  slug: string;
}

interface NewsAndTrendingProps {
  trendingNews: TrendingItem[];
}

export default function NewsAndTrending({ trendingNews }: NewsAndTrendingProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [emblaApi]);

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  const carouselData = trendingNews.slice(0, 5);
  const remainingtrendingNews = trendingNews.slice(5);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* News Carousel */}
      <div className="flex-1 relative">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {carouselData.map((item) => (
              <div
                key={item.slug}
                className="relative flex-[0_0_100%] min-w-0"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full aspect-[16/9] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-indigo_dye-500/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span>{item.source}</span>
                      {item.verified && (
                        <BadgeCheck className="h-4 w-4 text-pumpkin" />
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {item.likes} Suka
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {item.comments} Komentar
                      </span>
                      <span>{item.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-indigo_dye-500/50 text-white hover:bg-indigo_dye-500/70"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo_dye-500/50 text-white hover:bg-indigo_dye-500/70"
          onClick={scrollNext}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>
      </div>

      {/* Trending Section */}
      <aside className="w-full lg:w-1/3">
        <div className="border-0 rounded-none p-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold flex items-center gap-2 text-indigo_dye-500 dark:text-white">
              <div className="w-1 h-6 bg-pumpkin"></div>
              Trending
            </h2>
            <a href="#" className="text-pumpkin hover:underline text-sm">
              Lihat lainnya →
            </a>
          </div>
          <div className="space-y-4">
            {remainingtrendingNews.map((item) => (
              <div key={item.slug} className="flex gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1 space-y-2">
                  <h3 className="font-medium line-clamp-2 text-indigo_dye-500 dark:text-white">
                    {item.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-indigo_dye-400 dark:text-indigo_dye-100">
                    {item.tag && (
                      <span className="px-2 py-1 bg-pumpkin-100 text-pumpkin-800 rounded text-xs dark:bg-pumpkin-800 dark:text-pumpkin-100">
                        {item.tag}
                      </span>
                    )}
                    <div className="flex items-center gap-1">
                      <span>{item.source}</span>
                      {item.verified && (
                        <BadgeCheck className="h-4 w-4 text-pumpkin" />
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        {item.likes} Suka
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {item.comments} Komentar
                      </span>
                      <span>{item.timeAgo}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </div>
  );
}

