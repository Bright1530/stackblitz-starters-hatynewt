import { motion } from 'framer-motion';
import { PlayIcon, StarIcon } from '@heroicons/react/solid';

interface GameCardProps {
  title: string;
  description: string;
  image: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
}

export default function GameCard({ title, description, image, difficulty }: GameCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="aspect-video relative">
        <img
          src={image}
          alt={title}
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
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
            {title}
          </h3>
          <div className="flex">
            {[...Array(difficulty === 'facile' ? 1 : difficulty === 'moyen' ? 2 : 3)].map((_, i) => (
              <StarIcon key={i} className="w-5 h-5 text-yellow-400" />
            ))}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300">
          {description}
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-4 w-full btn-primary"
        >
          Jouer maintenant
        </motion.button>
      </div>
    </motion.div>
  );
}