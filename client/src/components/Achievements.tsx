import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { useSoundEffect } from '../hooks/useSound';
import { useAuthStore } from '../stores/authStore';

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  animation: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

export default function Achievements() {
  const { playSound } = useSoundEffect('/sounds/achievement.mp3');
  const user = useAuthStore(state => state.user);

  const achievements: Achievement[] = [
    {
      id: '1',
      title: 'Explorateur Débutant',
      description: 'Complétez votre premier module',
      icon: '/icons/explorer.svg',
      animation: '/animations/explorer.json',
      unlocked: true,
      progress: 1,
      maxProgress: 1
    },
    {
      id: '2',
      title: 'Maître des Écritures',
      description: 'Apprenez 100 versets',
      icon: '/icons/master.svg',
      animation: '/animations/master.json',
      unlocked: false,
      progress: 45,
      maxProgress: 100
    }
  ];

  const handleAchievementClick = (achievement: Achievement) => {
    if (achievement.unlocked) {
      playSound();
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
        Réalisations
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement) => (
          <motion.div
            key={achievement.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-4 rounded-lg cursor-pointer ${
              achievement.unlocked
                ? 'bg-white dark:bg-gray-800'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
            onClick={() => handleAchievementClick(achievement)}
          >
            <div className="flex items-start space-x-4">
              <div className="relative">
                <Player
                  src={achievement.animation}
                  className="w-16 h-16"
                  autoplay={achievement.unlocked}
                  loop={false}
                />
                {!achievement.unlocked && (
                  <div className="absolute inset-0 bg-gray-500 bg-opacity-50 rounded-full" />
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {achievement.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {achievement.description}
                </p>

                <div className="mt-2">
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-sky-spiritual">
                          {Math.round((achievement.progress / achievement.maxProgress) * 100)}%
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200 dark:bg-gray-600">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(achievement.progress / achievement.maxProgress) * 100}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-sky-spiritual"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {achievement.unlocked && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-golden rounded-full p-1"
              >
                <svg
                  className="w-4 h-4 text-white"
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}