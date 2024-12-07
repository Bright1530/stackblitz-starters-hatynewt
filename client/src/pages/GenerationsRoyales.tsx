import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Player } from '@lottiefiles/react-lottie-player';
import { useInView } from 'react-intersection-observer';

const values = [
  { letter: 'R', word: 'Raison d\'être', color: 'text-purple-600' },
  { letter: 'O', word: 'Obéissant', color: 'text-blue-600' },
  { letter: 'Y', word: 'Yeshua-centrique', color: 'text-green-600' },
  { letter: 'A', word: 'Authentique', color: 'text-yellow-600' },
  { letter: 'L', word: 'Loyal', color: 'text-orange-600' },
  { letter: 'E', word: 'Épanoui', color: 'text-red-600' },
  { letter: 'S', word: 'Serviable', color: 'text-pink-600' }
];

export default function GenerationsRoyales() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Player
            src="/animations/crown.json"
            className="w-32 h-32 mx-auto"
            autoplay
            loop
          />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mt-6 mb-4">
            LES GÉNÉRATIONS R.O.Y.A.L.E.S
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Former la prochaine génération à vivre selon les principes bibliques et à incarner
            les valeurs de la royauté divine.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-16">
          {values.map((value, index) => (
            <motion.div
              key={value.letter}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg text-center"
            >
              <span className={`text-3xl font-bold ${value.color}`}>
                {value.letter}
              </span>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-300">
                {value.word}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <Link
              to="/generations/grande"
              className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="aspect-video relative">
                <img
                  src="/images/teens.jpg"
                  alt="Adolescents"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Grande Génération R.O.Y.A.L.E.S
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Pour les 13-17 ans : Développe ton leadership et ta foi à travers des défis
                  inspirants et des discussions profondes.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 btn-primary"
                >
                  Rejoindre l'aventure
                </motion.button>
              </div>
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="relative group"
          >
            <Link
              to="/generations/petite"
              className="block bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <div className="aspect-video relative">
                <img
                  src="/images/kids.jpg"
                  alt="Enfants"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                  Petite Génération R.O.Y.A.L.E.S
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Pour les 5-12 ans : Découvre la Bible de manière amusante avec des histoires
                  interactives et des jeux passionnants.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 btn-primary"
                >
                  Commencer l'aventure
                </motion.button>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}