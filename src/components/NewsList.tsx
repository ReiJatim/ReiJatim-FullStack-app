'use client';

import { useEffect, useState } from 'react';
import NewsCard from '@/components/NewsCard';
import { News } from '@/lib/types';

interface NewsListProps {
  fallback?: React.ReactNode;
}

export default function NewsList({ fallback }: NewsListProps) {
  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/news?limit=3');
        const data = await response.json();
        if (response.ok) {
          setNewsList(data.data);
        } else {
          setError(data.error || 'Failed to fetch news');
        }
      } catch (err) {
        console.error('Error fetching news:', err);
        setError('Error fetching news. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (isLoading) return <div>Loading news...</div>;
  if (error) return <div>Error: {error}</div>;

  if (newsList.length === 0 && fallback) {
    return (
      <div className="text-center text-[#00427E] text-lg font-semibold">
        {fallback}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {newsList.map((news: News) => (
        <NewsCard
          key={news.slug}
          image={news.thumbnail}
          title={news.title}
          excerpt={news.excerp}
          date={new Date(news.createdAt).toLocaleDateString()}
          slug={news.slug}
        />
      ))}
    </div>
  );
}
