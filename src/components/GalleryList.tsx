'use client';

import { useEffect, useState } from 'react';
import GalleryCard from '@/components/GalleryCard';
import { Gallery } from '@/lib/types';

interface GalleryListProps {
  fallback?: React.ReactNode;
}

export default function GalleryList({ fallback }: GalleryListProps) {
  const [galleries, setGalleries] = useState<Gallery[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGalleries = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/gallery?limit=3');
        const data = await response.json();
        if (response.ok) {
          setGalleries(data.data);
        } else {
          setError(data.error || 'Failed to fetch galleries');
        }
      } catch (err) {
        console.error('Error fetching galleries:', err);
        setError('Error fetching galleries. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGalleries();
  }, []);

  if (isLoading) return <div>Loading galleries...</div>;
  if (error) return <div>Error: {error}</div>;

  if (galleries.length === 0 && fallback) {
    return (
      <div className="text-center text-[#00427E] text-lg font-semibold">
        {fallback}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {galleries.map((gallery: Gallery) => (
        <GalleryCard
          key={gallery.slug}
          thumbnail={gallery.thumbnail}
          title={gallery.title}
          location={gallery.location}
          slug={gallery.slug}
        />
      ))}
    </div>
  );
}
