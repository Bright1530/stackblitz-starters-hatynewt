import { motion } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';

interface ModuleCardProps {
  title: string;
  description: string;
  progress: number;
  difficulty: 1 | 2 | 3;
  icon: string;
  onClick: () => void;
}

export default function ModuleCard({ 
  title, 
  description, 
  progress, 
  difficulty,
  icon, 
  onClick 
}: ModuleCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <span className="text-2xl mr-3">{icon}</span>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
              {title}
            </h3>
          </div>
          <div className="flex">
            {[...Array(difficulty)].map((_, i) => (
              <StarIcon 
                key={i}
                className="h-5 w-5 text-golden"
              />
            ))}
          </div>
        </div>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4">{description}</p>
        
        <div className="mt-4">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300 mb-2">
            <span>Progression</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="bg-sky-spiritual h-2 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}