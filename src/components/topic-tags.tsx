import { topicTags } from '@/lib/mock-data'

export function TopicTags() {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
      {topicTags.map((tag) => (
        <a
          key={tag}
          href="#"
          className="inline-flex px-4 py-2 bg-pumpkin text-white rounded-full whitespace-nowrap hover:bg-pumpkin-600 transition-colors"
        >
          {tag}
        </a>
      ))}
    </div>
  )
}

