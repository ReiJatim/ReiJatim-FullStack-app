'use client'

import { useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight, MessageSquare, ThumbsUp, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { carouselData } from '@/lib/mock-data'

export function NewsCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext()
      }, 5000)

      return () => clearInterval(interval)
    }
  }, [emblaApi])

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {carouselData.map((item) => (
            <div
              key={item.id}
              className="relative flex-[0_0_100%] min-w-0"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-[16/9] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-indigo_dye-500/80 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <h2 className="text-2xl font-bold mb-2">{item.title}</h2>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span>{item.source}</span>
                    {item.verified && (
                      <BadgeCheck className="h-4 w-4 text-pumpkin" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" />
                      {item.likes} Suka
                    </span>
                    <span className="flex items-center gap-1"><MessageSquare className="h-4 w-4" />
                      {item.comments} Komentar
                    </span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-indigo_dye-500/50 text-white hover:bg-indigo_dye-500/70"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-8 w-8" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-indigo_dye-500/50 text-white hover:bg-indigo_dye-500/70"
        onClick={scrollNext}
      >
        <ChevronRight className="h-8 w-8" />
      </Button>
    </div>
  )
}

