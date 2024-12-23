import Link from 'next/link'
import Image from 'next/image'
import { SearchButton } from '@/components/SearchButton'
import { ThemeToggle } from '@/components/ThemeToggle'
import LogoutButton from '@/components/LogoutButton'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import DeleteNewsButton from '@/components/DeleteNewsButton'
import {News} from '@/lib/types'
import { ArrowLeft } from 'lucide-react'

interface NewsOutput {
    data: News[]
    message: string
}

async function getNews(): Promise<NewsOutput> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/news`, { cache: 'no-store' })
  if (!res.ok) {
    throw new Error('Failed to fetch news')
  }
  return res.json()
}

export default async function AdminNewsPage() {
  const news = await getNews()
  
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <header className="bg-white border-hidden sticky top-0 z-50 dark:bg-gray-950 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-2">
                <Image 
                  src="/REILOGO.svg" 
                  alt="REI Logo" 
                  width={40} 
                  height={40} 
                  className="w-10 h-10" 
                />
                <span className="text-2xl font-bold text-indigo_dye-500 dark:text-white">
                  Admin News Management
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <SearchButton />
              <ThemeToggle />
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">News Management</h1>
          <div className="flex items-center space-x-4">
          <Button asChild variant="outline">
            <Link href="/admin" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Admin
            </Link>
          </Button>
          <Button asChild>
            <Link href="/admin/add-news">Create New Article</Link>
          </Button>
        </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.data.map((item) => (
            <Card key={item.slug}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <img 
                  src={item.thumbnail} 
                  alt={item.title} 
                  width={300} 
                  height={200} 
                  className="w-full h-48 object-cover mb-4"
                />
                <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
                <div className="mt-2">
                  {item.tag.map((tag: string) => (
                    <span key={tag} className="inline-block bg-gray-200 dark:bg-gray-700 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 dark:text-gray-200 mr-2 mb-2">
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button asChild variant="outline">
                  <Link href={`/news/${item.slug}`}>Go To</Link>
                </Button>
                <DeleteNewsButton slug={item.slug} />
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}

