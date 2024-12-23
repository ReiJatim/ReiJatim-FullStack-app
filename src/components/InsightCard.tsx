import { InsightCardProps } from '@/lib/types';

export default function InsightCard({ title, description }: InsightCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-start space-x-4">
      <div>
        <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}
