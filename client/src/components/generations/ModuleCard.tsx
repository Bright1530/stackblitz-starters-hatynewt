import { motion } from 'framer-motion';
import { BookOpenIcon, AcademicCapIcon } from '@heroicons/react/outline';

interface ModuleCardProps {
  module: {
    id: string;
    title: string;
    description: string;
    duration: string;
    difficulty: 'facile' | 'moyen' | 'difficile';
    progress: number;
  };
  ageGroup: 'teen' | 'kid';
}

export default function ModuleCard({ module, ageGroup }: ModuleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            <BookOpenIcon className="w-8 h-8 text-sky-spiritual mr-4" />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {module.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                {module.description}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {module.duration}
            </span>
            <AcademicCapIcon className="w-5 h-5 text-sky-spiritual" />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              Progression
            </span>
            <span className="text-sm font-medium text-sky-spiritual">
              {module.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${module.progress}%` }}
              className="bg-sky-spiritual h-2 rounded-full"
            />
          </div>
        </div>

        <div className="mt-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              module.difficulty === 'facile'
                ? 'bg-green-100 text-green-800'
                : module.difficulty === 'moyen'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {module.difficulty}
            </span>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
          >
            Continuer
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}