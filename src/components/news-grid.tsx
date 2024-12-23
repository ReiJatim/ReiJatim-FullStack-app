import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp } from 'lucide-react'

interface NewsArticle {
  id: string
  title: string
  image: string
  publisher: {
    name: string
    isVerified: boolean
  }
  engagement: {
    likes: number
    comments: number
  }
  timestamp: string
  href: string
}

interface NewsGridProps {
  articles: NewsArticle[]
}

export function NewsGrid({ articles }: NewsGridProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {articles.map((article) => (
        <Link
          key={article.id}
          href={article.href}
          className="group flex gap-4 rounded-lg p-4 hover:bg-gray-100"
        >
          <div className="relative aspect-square w-32 overflow-hidden rounded-lg">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
            />
          </div>
          <div className="flex flex-col justify-between">
            <h3 className="font-semibold">{article.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span>{article.publisher.name}</span>
                {article.publisher.isVerified && (
                  <Badge variant="secondary" className="bg-blue-500">
                    ✓
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4" />
                  {article.engagement.likes}
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4" />
                  {article.engagement.comments}
                </span>
                <span>{article.timestamp}</span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}

