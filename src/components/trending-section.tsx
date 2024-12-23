import { BadgeCheck, MessageSquare, ThumbsUp } from 'lucide-react'
import { trendingData } from '@/lib/mock-data'

export function TrendingSection() {
  return (
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
        {trendingData.map((item) => (
          <div key={item.id} className="flex gap-4">
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded-lg"
            />
            <div className="flex-1 space-y-2">
              <h3 className="font-medium line-clamp-2 text-indigo_dye-500 dark:text-white">{item.title}</h3>
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
  )
}

