'use client'

import { useEffect, useState } from 'react'
import NewsAndTrending from '@/components/NewsAndTrending'
import NewsFeed from '@/components/news-feed'
import { LoadingSpinner } from '@/components/LoadingSpinner'

interface NewsItem {
  id: string
  title: string
  image: string
  publisher: string
  likes: number
  comments: number
  time: string
  slug: string
}

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

export default function HomePage() {
  const [recentNews, setRecentNews] = useState<NewsItem[]>([])
  const [trendingNews, setTrendingNews] = useState<TrendingItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
        try {
          const fetchNews = async (type: string) => {
            const response = await fetch(`/api/news?limit=${10}&type=${type}`);
      
            if (!response.ok) {
                console.log(response); 
              throw new Error(`Failed to fetch ${type} news data`);
              
            }
      
            return response.json();
          };
      
          const [recentNewsData, trendingNewsData] = await Promise.all([
            fetchNews('recent'),
            fetchNews('trending'),
          ]);
      
          setRecentNews(recentNewsData.data);
          setTrendingNews(trendingNewsData.data);
          setError(null); // Clear any previous errors
        } catch (error) {
          if (error instanceof Error) {
            console.error('Error fetching news:', error.message);
            setError(error.message);
          }
        } finally {
          setLoading(false);
        }
      }
      

    fetchData()    
    
}, [])

if (loading) {
    return <LoadingSpinner />
}
console.log(trendingNews);
console.log(recentNews);

  return (
    <div className="bg-gradient-to-b from-gray-100 to-gray-50">
      <main className="container mx-auto p-4 mt-4">
        {error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        ) : (
          <>
            <NewsAndTrending trendingNews={trendingNews} />
            <div>
              <NewsFeed recentNews={recentNews} />
            </div>
          </>
        )}
      </main>
    </div>
  )
}

