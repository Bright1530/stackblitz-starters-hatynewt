import { useState } from 'react';
import { motion } from 'framer-motion';
import { LightBulbIcon } from '@heroicons/react/outline';

interface ReflectionPromptProps {
  onSubmit: (reflection: string) => void;
}

export default function ReflectionPrompt({ onSubmit }: ReflectionPromptProps) {
  const [reflection, setReflection] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (reflection.trim()) {
      onSubmit(reflection);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <div className="flex items-center space-x-2 text-yellow-600 dark:text-yellow-400">
          <LightBulbIcon className="w-5 h-5" />
          <span className="font-medium">Conseil pour la réflexion</span>
        </div>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Prends un moment pour réfléchir calmement. Il n'y a pas de mauvaise réponse,
          exprime simplement ce que tu ressens.
        </p>
      </div>

      <textarea
        value={reflection}
        onChange={(e) => setReflection(e.target.value)}
        placeholder="Partage ta réflexion..."
        className="w-full h-48 p-4 rounded-lg border-2 border-gray-200 focus:border-sky-spiritual focus:ring-0"
      />

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full btn-primary"
        disabled={!reflection.trim()}
      >
        Partager ma réflexion
      </motion.button>
    </form>
  );
}