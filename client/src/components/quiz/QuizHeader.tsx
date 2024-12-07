import { motion } from 'framer-motion';
import { ClockIcon } from '@heroicons/react/24/outline';
import useTimer from '../../hooks/useTimer';

interface QuizHeaderProps {
  title: string;
  progress: number;
  currentQuestion: number;
  totalQuestions: number;
  onPause: () => void;
}

export default function QuizHeader({
  title,
  progress,
  currentQuestion,
  totalQuestions,
  onPause
}: QuizHeaderProps) {
  const time = useTimer();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          {title}
        </h1>
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <ClockIcon className="w-5 h-5 mr-2" />
            {time}
          </div>
          <button
            onClick={onPause}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
          <span>Question {currentQuestion} sur {totalQuestions}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 h-full bg-sky-spiritual"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>
    </div>
  );
}