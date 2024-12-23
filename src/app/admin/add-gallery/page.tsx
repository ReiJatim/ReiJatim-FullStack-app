'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Building } from 'lucide-react';
import imageCompression from 'browser-image-compression';

export default function AddGalleryPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);

      try {
        const compressedFiles = await Promise.all(
          selectedFiles.map(async (file) => {
            const options = {
              maxSizeMB: 0.5, // Maximum size in MB (512KB)
              useWebWorker: true, // Enable web worker for performance
            };
            const compressedFile = await imageCompression(file, options);
            return new File([compressedFile], file.name, { type: file.type });
          })
        );
        setImages([...images, ...compressedFiles]);
      } catch (err) {
        console.error('Image compression error:', err);
        setError('Failed to compress some images. Please try again.');
      }
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('location', location);

    images.forEach((file) => formData.append('images', file));

    try {
      const response = await fetch('/api/gallery', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        router.push('/gallery');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add gallery');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-center">
          <Building className="h-12 w-12 text-blue-600" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Add Gallery
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Or{' '}
          <Link href="/admin" className="font-medium text-blue-600 hover:text-blue-500">
            return to admin dashboard
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="mb-4">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700"
              required
            ></textarea>
          </div>

          <div className="mb-4">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              type="text"
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="images" className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              type="file"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-700"
            />
          </div>

          {images.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-700">Selected Images:</h3>
              <ul className="mt-2 space-y-2">
                {images.map((image, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="Preview"
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <span className="text-sm text-gray-800">{image.name}</span>
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              {isLoading ? 'Uploading...' : 'Upload Gallery'}
            </button>
          </div>

          {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        </form>
      </div>
    </div>
  );
}
