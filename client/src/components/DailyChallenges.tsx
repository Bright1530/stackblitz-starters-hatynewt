import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import { Player } from '@lottiefiles/react-lottie-player';

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  reward: number;
  type: 'daily' | 'weekly';
  animation: string;
}

export default function DailyChallenges() {
  const token = useAuthStore(state => state.token);

  const { data: challenges, isLoading } = useQuery({
    queryKey: ['challenges'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/challenges', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data as Challenge[];
    }
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-spiritual" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Défis du Jour
      </h2>

      <div className="grid gap-4">
        {challenges?.map((challenge) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md"
          >
            <div className="flex items-center space-x-4">
              <Player
                src={challenge.animation}
                className="w-12 h-12"
                autoplay
                loop
              />

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {challenge.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {challenge.description}
                </p>

                <div className="mt-2">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-sky-spiritual">
                          {challenge.progress} / {challenge.target}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs font-semibold text-golden">
                          +{challenge.reward} points
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(challenge.progress / challenge.target) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-sky-spiritual"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {challenge.progress >= challenge.target && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-golden rounded-full p-2"
                >
                  <svg
                    className="w-6 h-6 text-white"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}