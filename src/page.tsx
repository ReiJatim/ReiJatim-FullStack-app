import { TrendingTopics } from "@/components/trending-topics"
import { FeaturedArticle } from "@/components/featured-article"
import { NewsGrid } from "@/components/news-grid"
import Navbar from "@/components/Navbar"

export default function Home() {
  const trendingTopics = [
    { id: "1", title: "Yuk Coba HolidAI SG Sekarang", href: "#" },
    { id: "2", title: "Bayi Tertukar di RSI Cempaka Putih", href: "#" },
    { id: "3", title: "Kasus Agus Buntung", href: "#" },
    { id: "4", title: "Pemberontakan di Suriah", href: "#" },
  ]

  const featuredArticle = {
    title: "PB Pertacami Harap Emas dari 4 Atlet Indonesia Jelang Final Kejuaraan Dunia MMA",
    image: "/placeholder.svg?height=600&width=800",
    publisher: {
      name: "kumparanSPORT",
      isVerified: true,
    },
    engagement: {
      likes: 0,
      comments: 0,
    },
    timestamp: "13 Des 2024",
    href: "#",
  }

  const newsArticles = [
    {
      id: "1",
      title: "Penganiaya Koas di Palembang Mengaku Kesal karena Korban Tak Sopan",
      image: "/placeholder.svg?height=200&width=200",
      publisher: {
        name: "Urban Id",
        isVerified: true,
      },
      engagement: {
        likes: 2,
        comments: 3,
      },
      timestamp: "6 jam",
      href: "#",
    },
    {
      id: "2",
      title: "Mukernas II PPP Sempat Diwarnai Keributan",
      image: "/placeholder.svg?height=200&width=200",
      publisher: {
        name: "kumparanNEWS",
        isVerified: true,
      },
      engagement: {
        likes: 0,
        comments: 1,
      },
      timestamp: "3 jam",
      href: "#",
    },
    // Add more articles as needed
  ]

  return (
    <div className="min-h-screen bg-[#FBFCFE]">
      <Navbar />

      <main className="container mx-auto px-4 py-6">
        <TrendingTopics topics={trendingTopics} />
        
        <div className="mt-6 grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <FeaturedArticle {...featuredArticle} />
            <NewsGrid articles={newsArticles} />
          </div>
          <aside className="space-y-6">
            <div className="rounded-lg border bg-white p-6">
              <h2 className="mb-4 text-xl font-bold">Trending</h2>
              {/* Add trending content here */}
            </div>
          </aside>
        </div>
      </main>

      {/* Keep the existing footer */}
    </div>
  )
}

