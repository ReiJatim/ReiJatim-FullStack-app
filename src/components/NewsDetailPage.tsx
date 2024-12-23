import { format } from 'date-fns';
import Link from 'next/link';
import Image from 'next/image';
import { News } from '@/lib/types';

const renderContent = (content: any[]) => {
    return content.map((item, index) => {
      switch (item.type) {
        case 'heading': {
          const level = Math.min(Math.max(Number(item.attrs.level?.$numberInt ?? 1), 1), 6)
          const HeadingTag = `h${level}` as keyof HTMLElementTagNameMap
          return (
            <HeadingTag key={index} className="mt-4 mb-2 font-bold">
              {item.content[0].text}
            </HeadingTag>
          )
        }
        case 'paragraph':
          return (
            <p key={index} className="mb-4">
              {item.content.map((contentItem: any, contentIndex: number) => {
                if (contentItem.type === 'image') {
                  return (
                    <Image
                      key={contentIndex}
                      src={contentItem.attrs.src}
                      alt={contentItem.attrs.alt || 'Article image'}
                      width={600}
                      height={400}
                      className="my-4 rounded-lg"
                    />
                  )
                }
                let className = ''
                if (contentItem.marks) {
                  if (contentItem.marks.some((mark: any) => mark.type === 'bold')) className += 'font-bold '
                  if (contentItem.marks.some((mark: any) => mark.type === 'italic')) className += 'italic '
                  if (contentItem.marks.some((mark: any) => mark.type === 'underline')) className += 'underline '
                }
                return (
                  <span key={contentIndex} className={className}>
                    {contentItem.text}
                  </span>
                )
              })}
            </p>
          )
        default:
          return null
      }
    })
  }
  

type NewsDetailProps = {
  news: News;
};

export default function NewsDetail({ news }: NewsDetailProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <article className="container mx-auto px-4 max-w-3xl">
        <Link href="/news" className="text-blue-600 hover:underline mb-4 inline-block">
          &larr; Back to News List
        </Link>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">{news.title}</h1>
        <div className="prose max-w-none">{renderContent(news.content)}</div>
        <div className="flex flex-wrap gap-2 mb-4">
          {news.tag.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-8 text-sm text-gray-500">
        <time className="text-sm text-gray-500 mb-8 block">
          Published on {format(new Date(news.createdAt), 'MMMM d, yyyy')}
        </time>
        </div>
      </article>
    </div>
  );
}
