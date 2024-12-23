import Image from 'next/image';
import Link from 'next/link';

interface GalleryCardProps {
  thumbnail: string;
  title: string;
  location: string;
  slug: string;
}

export default function GalleryCard({ thumbnail, title, location, slug }: GalleryCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:-translate-y-1 transition-transform duration-300">
      <Image src={thumbnail} alt={title} width={400} height={300} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-[#00427E] mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{location}</p>
        <Link href={`/gallery/${slug}`} className="text-[#FE730F] font-semibold hover:underline">
          View Details
        </Link>
      </div>
    </div>
  );
}
