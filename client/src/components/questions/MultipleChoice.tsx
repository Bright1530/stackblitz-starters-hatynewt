import { motion } from 'framer-motion';

interface MultipleChoiceProps {
  options: string[];
  onSelect: (option: string) => void;
}

export default function MultipleChoice({ options, onSelect }: MultipleChoiceProps) {
  return (
    <div className="space-y-4">
      {options.map((option, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onSelect(option)}
          className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-sky-spiritual"
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
}