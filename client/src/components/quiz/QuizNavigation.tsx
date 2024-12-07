import { motion } from 'framer-motion';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/outline';

interface QuizNavigationProps {
  currentQuestion: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  canNavigate: boolean;
}

export default function QuizNavigation({
  currentQuestion,
  totalQuestions,
  onPrevious,
  onNext,
  canNavigate
}: QuizNavigationProps) {
  return (
    <div className="flex justify-between items-center mt-8">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onPrevious}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 disabled:opacity-50"
        disabled={currentQuestion === 1}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Précédent</span>
      </motion.button>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNext}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-sky-spiritual text-white disabled:opacity-50"
        disabled={!canNavigate || currentQuestion === totalQuestions}
      >
        <span>Suivant</span>
        <ArrowRightIcon className="w-5 h-5" />
      </motion.button>
    </div>
  );
}