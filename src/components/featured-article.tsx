import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { MessageSquare, ThumbsUp } from 'lucide-react'

interface FeaturedArticleProps {
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

export function FeaturedArticle({
  title,
  image,
  publisher,
  engagement,
  timestamp,
  href,
}: FeaturedArticleProps) {
  return (
    <Link href={href} className="group relative block aspect-[16/9] overflow-hidden rounded-lg">
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="absolute bottom-0 p-6">
          <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl lg:text-4xl">
            {title}
          </h2>
          <div className="flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
              <span className="font-medium">{publisher.name}</span>
              {publisher.isVerified && (
                <Badge variant="secondary" className="bg-blue-500">
                  ✓
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1">
                <ThumbsUp className="h-4 w-4" />
                {engagement.likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4" />
                {engagement.comments}
              </span>
              <span>{timestamp}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

