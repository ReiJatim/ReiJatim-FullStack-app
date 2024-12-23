'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export type Gallery = {
  thumbnail: string;
  title: string;
  description: string;
  image: string[];
  slug: string;
  location: string;
  createdAt: string;
  updatedAt: string;
};

export default function GalleryPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      try {
        const response = await fetch('/api/gallery'); // Adjust the API endpoint if necessary
        if (!response.ok) {
          throw new Error('Failed to fetch gallery data');
        }
        const data = await response.json();
        setGalleries(data.data); // Assuming the API response structure has a `data` property
      } catch (err) {
        console.error(err);
        setError((err as Error).message || 'An unknown error occurred');
      }
    };

    fetchGalleries();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">Property Gallery</h1>
        {error && (
          <div className="text-red-600 text-center mb-4">
            {error}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleries.map((gallery) => (
            <Link href={`/gallery/${gallery.slug}`} key={gallery.slug} className="cursor-pointer">
              <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <img
                  src={gallery.thumbnail}
                  alt={gallery.title}
                  width={800}
                  height={600}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">{gallery.title}</h2>
                  <p className="text-gray-600 mb-2 line-clamp-2">{gallery.description}</p>
                  <p className="text-gray-500 mb-2">{gallery.location}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(gallery.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link href="/" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold inline-flex items-center hover:bg-blue-700 transition duration-300">
            <ChevronLeft className="mr-2 h-5 w-5" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
