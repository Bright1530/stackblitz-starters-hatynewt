import { motion } from 'framer-motion';
import { ChatAltIcon, HeartIcon } from '@heroicons/react/outline';

interface CommunityFeedProps {
  ageGroup: 'teen' | 'kid';
}

export default function CommunityFeed({ ageGroup }: CommunityFeedProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        {[1, 2, 3].map((post) => (
          <motion.div
            key={post}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-b border-gray-200 dark:border-gray-700 last:border-0 pb-6 last:pb-0"
          >
            <div className="flex items-start space-x-4">
              <img
                src={`https://ui-avatars.com/api/?name=User${post}`}
                alt="User avatar"
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-medium text-gray-800 dark:text-white">
                      Utilisateur {post}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Il y a 2 heures
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
                <div className="mt-4 flex items-center space-x-4">
                  <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <HeartIcon className="w-5 h-5" />
                    <span>12</span>
                  </button>
                  <button className="flex items-center space-x-1 text-gray-500 dark:text-gray-400">
                    <ChatAltIcon className="w-5 h-5" />
                    <span>5 réponses</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="mt-6 w-full btn-primary"
      >
        Partager un témoignage
      </motion.button>
    </div>
  );
}