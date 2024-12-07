import { useState } from 'react';
import { motion } from 'framer-motion';

interface TextResponseProps {
  onSubmit: (text: string) => void;
}

export default function TextResponse({ onSubmit }: TextResponseProps) {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit(text);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Écris ta réponse ici..."
        className="w-full h-32 p-4 rounded-lg border-2 border-gray-200 focus:border-sky-spiritual focus:ring-0"
      />
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="submit"
        className="w-full btn-primary"
        disabled={!text.trim()}
      >
        Envoyer ma réponse
      </motion.button>
    </form>
  );
}