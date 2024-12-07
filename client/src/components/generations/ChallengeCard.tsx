import { motion } from 'framer-motion';
import { UserGroupIcon, ClockIcon, StarIcon } from '@heroicons/react/outline';

interface ChallengeCardProps {
  title: string;
  description: string;
  duration: string;
  participants: number;
  points: number;
}

export default function ChallengeCard({
  title,
  description,
  duration,
  participants,
  points
}: ChallengeCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            {description}
          </p>
        </div>
        <div className="flex items-center space-x-2 bg-sky-spiritual/10 rounded-full px-3 py-1">
          <StarIcon className="w-5 h-5 text-sky-spiritual" />
          <span className="text-sky-spiritual font-medium">{points} pts</span>
        </div>
      </div>

      <div className="mt-4 flex items-center space-x-6 text-gray-500 dark:text-gray-400">
        <div className="flex items-center space-x-2">
          <ClockIcon className="w-5 h-5" />
          <span>{duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <UserGroupIcon className="w-5 h-5" />
          <span>{participants} participants</span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="mt-4 w-full btn-primary"
      >
        Rejoindre le défi
      </motion.button>
    </motion.div>
  );
}