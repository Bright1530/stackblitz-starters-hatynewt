import { motion } from 'framer-motion';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/solid';
import { Player } from '@lottiefiles/react-lottie-player';
import Confetti from 'react-confetti';

interface ResultsSummaryProps {
  questions: any[];
  answers: (number | null)[];
  timeTaken: number;
  onRestart: () => void;
  onExit: () => void;
}

export default function ResultsSummary({
  questions,
  answers,
  timeTaken,
  onRestart,
  onExit
}: ResultsSummaryProps) {
  const correctAnswers = answers.filter(
    (answer, index) => answer === questions[index].correct_answer
  ).length;
  const score = Math.round((correctAnswers / questions.length) * 100);
  const minutes = Math.floor(timeTaken / 60000);
  const seconds = Math.floor((timeTaken % 60000) / 1000);

  return (
    <div className="min-h-screen bg-beige-light dark:bg-gray-900 py-8">
      {score >= 70 && <Confetti />}
      
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8"
        >
          <div className="text-center mb-8">
            <Player
              src={score >= 70 ? '/animations/success.json' : '/animations/try-again.json'}
              className="w-32 h-32 mx-auto"
              autoplay
              keepLastFrame
            />
            <h1 className="text-3xl font-bold mt-4 mb-2">
              {score >= 70 ? 'Félicitations !' : 'Continuez vos efforts !'}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Vous avez obtenu {score}% de bonnes réponses
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Temps: {minutes}m {seconds}s
            </p>
          </div>

          <div className="space-y-4 mb-8">
            {questions.map((question, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
              >
                {answers[index] === question.correct_answer ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500 flex-shrink-0" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-500 flex-shrink-0" />
                )}
                <div>
                  <p className="font-medium">{question.question}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    Votre réponse: {question.options[answers[index] || 0]}
                  </p>
                  {answers[index] !== question.correct_answer && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      Réponse correcte: {question.options[question.correct_answer]}
                    </p>
                  )}
                  {question.explanation && (
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                      {question.explanation}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onRestart}
              className="btn-primary"
            >
              Recommencer
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExit}
              className="btn-secondary"
            >
              Retour au tableau de bord
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}