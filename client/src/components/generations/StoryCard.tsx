import { motion } from 'framer-motion';
import { PlayIcon, VolumeUpIcon } from '@heroicons/react/solid';

interface StoryCardProps {
  story: {
    id: string;
    title: string;
    description: string;
    image: string;
    audioUrl: string;
    duration: string;
  };
}

export default function StoryCard({ story }: StoryCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="aspect-video relative">
        <img
          src={story.image}
          alt={story.title}
          className="w-full h-full object-cover"
        />
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40"
        >
          <PlayIcon className="w-16 h-16 text-white" />
        </motion.button>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
          {story.title}
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          {story.description}
        </p>

        <div className="mt-4 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-sky-spiritual">
            <VolumeUpIcon className="w-5 h-5" />
            <span>Écouter l'histoire</span>
          </button>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {story.duration}
          </span>
        </div>
      </div>
    </motion.div>
  );
}