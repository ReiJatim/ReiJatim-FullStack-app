import Image from 'next/image';
import Link from 'next/link';

interface NewsCardProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  slug: string;
}

export default function NewsCard({ image, title, excerpt, date, slug }: NewsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-300 flex flex-col h-full">
      <div className="relative h-48 w-full">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="p-4 flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-[#00427E] mb-2">{title}</h3>
        <p className="text-gray-600 mb-4 flex-1">{excerpt}</p>
        <div className="flex justify-between items-center mt-auto">
          <span className="text-sm text-gray-500">{date}</span>
          <Link href={`/news/${slug}`} className="text-[#FE730F] font-semibold hover:underline">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
}
