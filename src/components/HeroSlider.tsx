'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Slide {
  title: string
  description: string
  image: string
  cta: {
    text: string
    href: string
  }
}

interface HeroSliderProps {
  slides: Slide[]
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  useEffect(() => {
    const interval = setInterval(nextSlide, 10000) // Adjusted to 10 seconds
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-[#00427E] text-white min-h-[600px]">
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100 z-20' : 'opacity-0 z-10'
            }`}
          >
            <div className="container mx-auto px-4 py-20 relative z-30">
              <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <h1 className="text-4xl md:text-5xl font-bold mb-6">{slide.title}</h1>
                  <p className="text-xl mb-8">{slide.description}</p>
                  <Link 
                    href={slide.cta.href} 
                    className="bg-[#FE730F] text-white px-6 py-3 rounded-full font-semibold inline-flex items-center hover:bg-[#FE730F]/80 transition duration-300"
                  >
                    {slide.cta.text}
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
                <div className={`md:w-1/2 relative h-[300px] md:h-[400px] w-full ${index % 2 === 0 ? 'md:order-last' : 'md:order-first'}`}>
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover rounded-lg"
                    priority={index === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
