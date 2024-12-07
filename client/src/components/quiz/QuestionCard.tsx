import { motion } from 'framer-motion';
import { QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { Player } from '@lottiefiles/react-lottie-player';

interface QuestionCardProps {
  question: {
    question: string;
    options: string[];
    correct_answer: number;
    explanation?: string;
    mediaContent?: {
      type: 'image' | 'video' | 'audio';
      url: string;
    };
  };
  selectedAnswer: number | null;
  onAnswer: (index: number) => void;
}

export default function QuestionCard({
  question,
  selectedAnswer,
  onAnswer
}: QuestionCardProps) {
  const isAnswered = selectedAnswer !== null;
  const isCorrect = selectedAnswer === question.correct_answer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mt-8"
    >
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <QuestionMarkCircleIcon className="w-6 h-6 text-sky-spiritual flex-shrink-0 mt-1" />
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
            {question.question}
          </h2>
        </div>

        {question.mediaContent && (
          <div className="rounded-lg overflow-hidden">
            {question.mediaContent.type === 'image' && (
              <img
                src={question.mediaContent.url}
                alt="Question illustration"
                className="w-full h-auto"
              />
            )}
            {question.mediaContent.type === 'video' && (
              <video
                src={question.mediaContent.url}
                controls
                className="w-full"
              />
            )}
            {question.mediaContent.type === 'audio' && (
              <audio
                src={question.mediaContent.url}
                controls
                className="w-full"
              />
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => !isAnswered && onAnswer(index)}
              className={`p-4 rounded-lg text-left transition-colors ${
                isAnswered
                  ? index === question.correct_answer
                    ? 'bg-green-100 dark:bg-green-900 border-green-500'
                    : index === selectedAnswer
                    ? 'bg-red-100 dark:bg-red-900 border-red-500'
                    : 'bg-gray-100 dark:bg-gray-700'
                  : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
              } border-2 ${
                isAnswered
                  ? index === question.correct_answer
                    ? 'border-green-500'
                    : index === selectedAnswer
                    ? 'border-red-500'
                    : 'border-transparent'
                  : 'border-transparent'
              }`}
              disabled={isAnswered}
            >
              <div className="flex items-center space-x-3">
                <span className="w-6 h-6 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{option}</span>
                {isAnswered && index === question.correct_answer && (
                  <Player
                    src="/animations/check.json"
                    className="w-6 h-6"
                    autoplay
                    keepLastFrame
                  />
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {isAnswered && question.explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`p-4 rounded-lg ${
              isCorrect
                ? 'bg-green-50 dark:bg-green-900/30'
                : 'bg-red-50 dark:bg-red-900/30'
            }`}
          >
            <p className="text-sm">{question.explanation}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}