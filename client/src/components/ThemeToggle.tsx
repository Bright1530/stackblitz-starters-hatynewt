import { SunIcon, MoonIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { useThemeStore } from '../stores/themeStore';
import { useSoundEffect } from '../hooks/useSound';

export default function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { playSound } = useSoundEffect('/sounds/switch.mp3');

  const handleToggle = () => {
    toggleDarkMode();
    playSound();
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800"
    >
      {isDarkMode ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-gray-600" />
      )}
    </motion.button>
  );
}