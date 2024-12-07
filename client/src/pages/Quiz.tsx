import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import QuizHeader from '../components/quiz/QuizHeader';
import QuestionCard from '../components/quiz/QuestionCard';
import QuizNavigation from '../components/quiz/QuizNavigation';
import ResultsSummary from '../components/quiz/ResultsSummary';
import { useSoundEffect } from '../hooks/useSound';
import { Player } from '@lottiefiles/react-lottie-player';

interface Question {
  _id: string;
  question: string;
  options: string[];
  correct_answer: number;
  explanation: string;
  references: {
    book: string;
    chapter: number;
    verse: number;
  }[];
  mediaContent?: {
    type: 'image' | 'video' | 'audio';
    url: string;
  };
}

interface QuizState {
  currentQuestionIndex: number;
  answers: (number | null)[];
  startTime: number;
  isPaused: boolean;
  showResults: boolean;
}

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useAuthStore(state => state.token);
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: [],
    startTime: Date.now(),
    isPaused: false,
    showResults: false
  });
  const { playSound: playCorrect } = useSoundEffect('/sounds/correct.mp3');
  const { playSound: playIncorrect } = useSoundEffect('/sounds/incorrect.mp3');

  const { data: quiz, isLoading } = useQuery({
    queryKey: ['quiz', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/modules/${id}/quiz`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  useEffect(() => {
    if (quiz) {
      setQuizState(prev => ({
        ...prev,
        answers: new Array(quiz.questions.length).fill(null)
      }));
    }
  }, [quiz]);

  const handleAnswer = async (questionIndex: number, answerIndex: number) => {
    const isCorrect = quiz.questions[questionIndex].correct_answer === answerIndex;
    
    if (isCorrect) {
      playCorrect();
    } else {
      playIncorrect();
    }

    setQuizState(prev => ({
      ...prev,
      answers: prev.answers.map((ans, idx) => 
        idx === questionIndex ? answerIndex : ans
      )
    }));

    // Soumettre la réponse au serveur
    await axios.post(
      `http://localhost:3000/api/modules/${id}/submit`,
      {
        questionId: quiz.questions[questionIndex]._id,
        answer: answerIndex
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    // Passer à la question suivante après un court délai
    setTimeout(() => {
      if (questionIndex === quiz.questions.length - 1) {
        setQuizState(prev => ({ ...prev, showResults: true }));
      } else {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: prev.currentQuestionIndex + 1
        }));
      }
    }, 1500);
  };

  const handlePause = () => {
    setQuizState(prev => ({ ...prev, isPaused: true }));
    // Sauvegarder l'état actuel
    localStorage.setItem(`quiz_${id}_state`, JSON.stringify(quizState));
  };

  const handleResume = () => {
    setQuizState(prev => ({ ...prev, isPaused: false }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Player
          src="/animations/loading.json"
          className="w-24 h-24"
          autoplay
          loop
        />
      </div>
    );
  }

  if (quizState.showResults) {
    return (
      <ResultsSummary
        questions={quiz.questions}
        answers={quizState.answers}
        timeTaken={Date.now() - quizState.startTime}
        onRestart={() => navigate(0)}
        onExit={() => navigate('/dashboard')}
      />
    );
  }

  const currentQuestion = quiz.questions[quizState.currentQuestionIndex];
  const progress = (quizState.currentQuestionIndex / quiz.questions.length) * 100;

  return (
    <div className="min-h-screen bg-beige-light dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <QuizHeader
          title={quiz.title}
          progress={progress}
          currentQuestion={quizState.currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
          onPause={handlePause}
        />

        <AnimatePresence mode="wait">
          {quizState.isPaused ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center mt-8"
            >
              <h2 className="text-2xl font-bold mb-4">Quiz en pause</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Votre progression a été sauvegardée
              </p>
              <div className="space-x-4">
                <button
                  onClick={handleResume}
                  className="btn-primary"
                >
                  Reprendre
                </button>
                <button
                  onClick={() => navigate('/dashboard')}
                  className="btn-secondary"
                >
                  Quitter
                </button>
              </div>
            </motion.div>
          ) : (
            <QuestionCard
              key={currentQuestion._id}
              question={currentQuestion}
              selectedAnswer={quizState.answers[quizState.currentQuestionIndex]}
              onAnswer={(answer) => handleAnswer(quizState.currentQuestionIndex, answer)}
            />
          )}
        </AnimatePresence>

        <QuizNavigation
          currentQuestion={quizState.currentQuestionIndex + 1}
          totalQuestions={quiz.questions.length}
          onPrevious={() => setQuizState(prev => ({
            ...prev,
            currentQuestionIndex: Math.max(0, prev.currentQuestionIndex - 1)
          }))}
          onNext={() => setQuizState(prev => ({
            ...prev,
            currentQuestionIndex: Math.min(
              quiz.questions.length - 1,
              prev.currentQuestionIndex + 1
            )
          }))}
          canNavigate={quizState.answers[quizState.currentQuestionIndex] !== null}
        />
      </div>
    </div>
  );
}