'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useSwipeable } from 'react-swipeable'; // Add this for swipe functionality

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

export default function GalleryDetailPage() {
  const { slug } = useParams();

  const [gallery, setGallery] = useState<Gallery | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    if (!slug) return;

    const fetchGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/gallery/slug?slug=${slug}`);
        if (!response.ok) {
          throw new Error('Failed to fetch gallery details');
        }
        const data = await response.json();
        setGallery(data);
      } catch (err) {
        setError((err as Error).message || 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, [slug]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gallery!.image.length),
    onSwipedRight: () => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + gallery!.image.length) % gallery!.image.length),
  });

  if (loading) {
    return <p className="text-center mt-12 text-gray-500">Loading...</p>;
  }

  if (error) {
    return <p className="text-center mt-12 text-red-500">{error}</p>;
  }

  if (!gallery) {
    return <p className="text-center mt-12 text-gray-500">Gallery not found.</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">{gallery.title}</h1>
        <p className="text-gray-500 text-center mb-12">{gallery.location}</p>

        {/* Grid layout for gallery images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
          {gallery.image.map((img, index) => (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => openModal(index)}
            >
              <img
                src={img}
                alt={`${gallery.title} - Image ${index + 1}`}
                width={500}
                height={400}
                className="w-full rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>

        <p className="text-gray-700 mb-8">{gallery.description}</p>
        <div className="text-gray-400 text-sm">
          <p>Created on: {new Date(gallery.createdAt).toLocaleDateString()}</p>
          <p>Last updated: {new Date(gallery.updatedAt).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && gallery && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50" onClick={closeModal}>
          <div
            className="bg-white p-4 rounded-lg shadow-lg max-w-2xl mx-auto relative"
            onClick={(e) => e.stopPropagation()}
            {...swipeHandlers} // Adding swipe handlers
          >
            <button
              className="absolute top-2 right-2 text-white bg-gray-800 rounded-full p-2"
              onClick={closeModal}
            >
              &times;
            </button>
            <img
              src={gallery.image[currentImageIndex]}
              alt={`${gallery.title} - Image ${currentImageIndex + 1}`}
              width={800}
              height={600}
              className="w-full rounded-lg"
            />
            <div className="flex justify-between mt-4">
              <button
                className="text-blue-500"
                onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex - 1 + gallery.image.length) % gallery.image.length)}
              >
                &lt; Prev
              </button>
              <button
                className="text-blue-500"
                onClick={() => setCurrentImageIndex((prevIndex) => (prevIndex + 1) % gallery.image.length)}
              >
                Next &gt;
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
