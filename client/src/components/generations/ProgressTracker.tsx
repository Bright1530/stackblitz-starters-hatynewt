import { motion } from 'framer-motion';
import { StarIcon, BookOpenIcon, PuzzleIcon } from '@heroicons/react/solid';

interface ProgressTrackerProps {
  ageGroup: 'teen' | 'kid';
}

export default function ProgressTracker({ ageGroup }: ProgressTrackerProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <div className="inline-block p-3 bg-sky-spiritual/10 rounded-full mb-2">
          <StarIcon className="w-8 h-8 text-sky-spiritual" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          Mon parcours
        </h3>
      </div>

      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <BookOpenIcon className="w-5 h-5 text-sky-spiritual" />
              <span className="text-gray-700 dark:text-gray-300">Histoires lues</span>
            </div>
            <span className="text-sky-spiritual font-medium">12/20</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '60%' }}
              className="bg-sky-spiritual h-2 rounded-full"
            />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center space-x-2">
              <PuzzleIcon className="w-5 h-5 text-sky-spiritual" />
              <span className="text-gray-700 dark:text-gray-300">Jeux complétés</span>
            </div>
            <span className="text-sky-spiritual font-medium">8/15</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '53%' }}
              className="bg-sky-spiritual h-2 rounded-full"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <h4 className="text-lg font-medium text-gray-800 dark:text-white mb-4">
            Badges récents
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((badge) => (
              <motion.div
                key={badge}
                whileHover={{ scale: 1.1 }}
                className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center"
              >
                <StarIcon className="w-8 h-8 text-golden" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}