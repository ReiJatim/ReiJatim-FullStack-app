'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { ArrowRight, MessageSquare, ThumbsUp, Verified } from 'lucide-react'
import Image from "next/image"

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

interface NewsFeedProps {
  recentNews: NewsItem[]
}

export default function NewsFeed({ recentNews }: NewsFeedProps) {
  const featuredNews = recentNews[0] // Assuming the first item is the featured news

  return (
    <div className="w-full max-w-screen- mx-auto pt-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold border-l-4 border-primary pl-2 text-gray-800">Terbaru di News</h1>
        <a href="#" className="text-blue-600 hover:underline flex items-center gap-2">
          Lihat lainnya
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

      <div className="grid lg:grid-cols-6 gap-8">
        {/* Latest News */}
        <div className="lg:col-span-4 space-y-4">
          {recentNews.slice(1).map((news) => (
            <NewsCard key={news.slug} {...news} />
          ))}
        </div>

        {/* Featured News */}
        <Card className="lg:col-span-2 flex flex-col shadow-lg border border-gray-200 ">
          <CardContent className="p-0 flex-grow">
            <div className="relative h-full">
              <img
                src={featuredNews.image}
                alt={featuredNews.title}
                className="rounded-t-lg"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-indigo_dye-500/80 to-transparent text-white">
                <h2 className="text-lg font-bold mb-2 line-clamp-3">
                  {featuredNews.title}
                </h2>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-5 h-5">
                      <img
                        src="/placeholder.svg?height=20&width=20"
                        alt={featuredNews.publisher}
                        width={20}
                        height={20}
                      />
                    </Avatar>
                    <span className="text-sm text-gray-300">{featuredNews.publisher}</span>
                    <Verified className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" /> {featuredNews.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" /> {featuredNews.comments}
                    </span>
                    <span>{featuredNews.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function NewsCard({ title, image, publisher, likes, comments, time }: NewsItem) {
  return (
    <Card className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4 flex gap-4">
        <img
          src={image}
          alt={title}
          width={120}
          height={80}
          className="rounded object-cover w-[120px] h-[80px]"
        />
        <div className="flex-1">
          <h3 className="font-medium mb-2 line-clamp-2 text-gray-800">{title}</h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Avatar className="w-5 h-5">
                <img
                  src="/placeholder.svg?height=20&width=20"
                  alt={publisher}
                  width={20}
                  height={20}
                />
              </Avatar>
              <span className="text-sm text-gray-600">{publisher}</span>
              <Verified className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <ThumbsUp className="w-4 h-4" /> {likes}
              </span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-4 h-4" /> {comments}
              </span>
              <span>{time}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

