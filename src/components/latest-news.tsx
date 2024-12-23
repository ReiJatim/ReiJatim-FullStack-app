import { BadgeCheck, MessageSquare, ThumbsUp } from 'lucide-react'
import { trendingData } from '@/lib/mock-data'

export function LatestNews() {
  return (
    <div className="border rounded-lg p-4 h-full bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <div className="w-1 h-6 bg-teal-500"></div>
          Terbaru di News
        </h2>
      </div>
      <div className="space-y-6">
        {trendingData.map((item: any) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-2">
              <h3 className="font-medium line-clamp-2 leading-snug">
                {item.title}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-600">
                <img 
                  src="/placeholder.svg?height=20&width=20" 
                  alt={item.source}
                  className="w-5 h-5 rounded-full"
                />
                <span>{item.source}</span>
                {item.verified && (
                  <BadgeCheck className="h-4 w-4 text-blue-400" />
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {item.likes} Suka
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="h-3.5 w-3.5" />
                  {item.comments} Komentar
                </span>
                <span>{item.timeAgo}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

