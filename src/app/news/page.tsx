'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { News } from '@/lib/types'
import { formatDistanceToNow } from 'date-fns'
import { AlertTriangle, InfoIcon } from 'lucide-react'

export default function NewsListPage() {
  const [newsItems, setNewsItems] = useState<News[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        const data = await response.json()

        if (response.ok) {
          setNewsItems(data.data)
        } else {
          setError(data.error || 'Failed to fetch news')
        }
      } catch (err) {
        setError('Error fetching news')
        console.error(err)
      }
    }

    fetchNews()
  }, [])

  if (error) {
    return <div className="text-center text-red-500">{error}</div>
  }

  const breakingNews = newsItems[0]
  const topStories = newsItems.slice(1, 4)
  const recentNews = newsItems.slice(4)

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white border-b border-gray-200">
      </header>

      <main className="container mx-auto px-4 py-6">
        {breakingNews && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <InfoIcon className="text-red-600 h-5 w-5" />
              <span className="text-red-600 font-semibold uppercase tracking-wider text-sm">Trending News</span>
            </div>
            <Link href={`/news/${breakingNews.slug}`} className="group">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="relative h-[400px]">
                  <img
                    src={breakingNews.thumbnail}
                    alt={breakingNews.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h2 className="text-3xl font-bold text-white mb-3">{breakingNews.title}</h2>
                    <p className="text-gray-200 text-lg mb-4">{breakingNews.excerp}</p>
                    <div className="flex items-center text-sm text-gray-300">
                      <span className="font-medium">{formatDistanceToNow(new Date(breakingNews.createdAt))} ago</span>
                      <span className="mx-2">•</span>
                      <span className="text-red-400">{breakingNews.tag.join(', ')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {topStories.map((news) => (
            <Link href={`/news/${news.slug}`} key={news.slug} className="group">
              <div className="bg-white rounded-lg shadow-md overflow-hidden h-full hover:shadow-lg transition-shadow">
                <img
                  src={news.thumbnail}
                  alt={news.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {news.title}
                  </h2>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{news.excerp}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{formatDistanceToNow(new Date(news.createdAt))} ago</span>
                    <span className="mx-2">•</span>
                    <span>{news.tag.join(', ')}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Latest News</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {recentNews.map((news) => (
              <Link href={`/news/${news.slug}`} key={news.slug} className="group">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                  <img
                    src={news.thumbnail}
                    alt={news.title}
                    className="w-full h-32 object-cover"
                  />
                  <div className="p-3">
                    <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                      {news.title}
                    </h3>
                    <div className="flex items-center text-xs text-gray-500">
                      <span>{formatDistanceToNow(new Date(news.createdAt))} ago</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

