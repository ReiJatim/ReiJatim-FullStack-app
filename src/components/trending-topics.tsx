'use client'

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface TrendingTopic {
  id: string
  title: string
  href: string
}

interface TrendingTopicsProps {
  topics: TrendingTopic[]
}

export function TrendingTopics({ topics }: TrendingTopicsProps) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-4 p-4">
        {topics.map((topic) => (
          <Button
            key={topic.id}
            variant="default"
            className="rounded-full bg-[#0073B1] hover:bg-[#0073B1]/90 text-white"
            asChild
          >
            <a href={topic.href}>{topic.title}</a>
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}

