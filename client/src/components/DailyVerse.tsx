import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ShareIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import { FacebookShareButton } from 'react-share';

interface DailyVerseProps {
  className?: string;
}

export default function DailyVerse({ className }: DailyVerseProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const shareUrl = window.location.href;
  const shareTitle = "Découvrez le verset du jour sur ScripturaQuest!";

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
          Verset du jour
        </h2>
        <div className="flex space-x-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <BookmarkIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </motion.button>
          <FacebookShareButton url={shareUrl}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <ShareIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </motion.div>
          </FacebookShareButton>
        </div>
      </div>

      <blockquote className="text-lg text-gray-700 dark:text-gray-300 mb-4">
        "Car Dieu a tant aimé le monde qu'il a donné son Fils unique, afin que quiconque croit en lui ne périsse point, mais qu'il ait la vie éternelle."
      </blockquote>

      <div className="text-right text-gray-600 dark:text-gray-400">
        - Jean 3:16
      </div>
    </motion.div>
  );
}