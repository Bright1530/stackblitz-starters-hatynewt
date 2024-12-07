import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../../stores/authStore';
import DrawingCanvas from './DrawingCanvas';
import TextResponse from './TextResponse';
import MultipleChoice from './MultipleChoice';
import ReflectionPrompt from './ReflectionPrompt';

interface Question {
  _id: string;
  type: 'text' | 'drawing' | 'multiple-choice' | 'reflection';
  question: string;
  options?: string[];
  mediaPrompt?: {
    type: string;
    url: string;
  };
}

interface InteractiveQuestionProps {
  question: Question;
  onComplete: () => void;
}

export default function InteractiveQuestion({ question, onComplete }: InteractiveQuestionProps) {
  const [response, setResponse] = useState<any>(null);
  const token = useAuthStore(state => state.token);

  const submitMutation = useMutation({
    mutationFn: async (content: any) => {
      await axios.post(
        `/api/questions/${question._id}/response`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    },
    onSuccess: () => {
      onComplete();
    }
  });

  const handleSubmit = async (content: any) => {
    setResponse(content);
    await submitMutation.mutateAsync(content);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
    >
      <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
        {question.question}
      </h3>

      {question.mediaPrompt && (
        <div className="mb-6">
          {question.mediaPrompt.type === 'image' && (
            <img
              src={question.mediaPrompt.url}
              alt="Question prompt"
              className="rounded-lg w-full"
            />
          )}
        </div>
      )}

      <div className="mt-6">
        {question.type === 'drawing' && (
          <DrawingCanvas onSave={handleSubmit} />
        )}
        {question.type === 'text' && (
          <TextResponse onSubmit={handleSubmit} />
        )}
        {question.type === 'multiple-choice' && (
          <MultipleChoice options={question.options || []} onSelect={handleSubmit} />
        )}
        {question.type === 'reflection' && (
          <ReflectionPrompt onSubmit={handleSubmit} />
        )}
      </div>
    </motion.div>
  );
}