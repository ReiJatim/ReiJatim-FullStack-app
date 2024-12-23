import { ResourceCardProps } from '@/lib/types';

export default function ResourceCard({ title, description, icon }: ResourceCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-center text-gray-800">{title}</h3>
      <p className="text-gray-600 text-center">{description}</p>
    </div>
  );
}
