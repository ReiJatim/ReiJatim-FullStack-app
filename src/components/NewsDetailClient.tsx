'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import NewsDetail from '@/components/NewsDetailPage'
import { News } from '@/lib/types'

export default function NewsDetailClient({ slug }: { slug: string }) {
  const [news, setNews] = useState<News | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNewsDetail = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/news/slug?slug=${slug}`)
        const contentType = response.headers.get('content-type')

        if (contentType && contentType.includes('application/json')) {
          const data = await response.json()
          if (response.ok) {
            setNews(data)
          } else {
            setError(data.error || 'Failed to fetch news details')
          }
        } else {
          const text = await response.text()
          console.error('Received non-JSON response:', text)
          setError('Unexpected response from server. Please try again later.')
        }
      } catch (err) {
        console.error('Error fetching news:', err)
        setError('Error fetching news details. Please check your network connection and try again.')
      } finally {
        setIsLoading(false)
      }
    }

    if (slug) {
      fetchNewsDetail()
    }
  }, [slug])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600">Loading...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-red-500 mb-4">{error}</div>
        <Link href="/news" className="text-blue-600 hover:underline">
          Return to News List
        </Link>
      </div>
    )
  }

  if (!news) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <div className="text-2xl font-semibold text-gray-600 mb-4">News article not found</div>
        <Link href="/news" className="text-blue-600 hover:underline">
          Return to News List
        </Link>
      </div>
    )
  }

  return <NewsDetail news={news} />
}
