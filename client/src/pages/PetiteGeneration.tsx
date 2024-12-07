import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import StoryCard from '../components/generations/StoryCard';
import GameCard from '../components/generations/GameCard';
import ProgressTracker from '../components/generations/ProgressTracker';

export default function PetiteGeneration() {
  const token = useAuthStore(state => state.token);

  const { data: stories } = useQuery({
    queryKey: ['petite-generation-stories'],
    queryFn: async () => {
      const response = await axios.get('/api/generations/petite/stories', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Petite Génération R.O.Y.A.L.E.S
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Pars à l'aventure et découvre la Bible de manière amusante avec des
            histoires passionnantes et des jeux super cool !
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Histoires bibliques
              </h2>
              <div className="grid gap-6">
                {stories?.map((story: any) => (
                  <StoryCard
                    key={story.id}
                    story={story}
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Jeux éducatifs
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GameCard
                  title="Le voyage de Moïse"
                  description="Aide Moïse à guider le peuple vers la Terre Promise"
                  image="/images/games/moses.jpg"
                  difficulty="facile"
                />
                <GameCard
                  title="Les amis de Daniel"
                  description="Découvre l'histoire de la fournaise ardente"
                  image="/images/games/daniel.jpg"
                  difficulty="moyen"
                />
              </div>
            </section>
          </div>

          <div>
            <section className="sticky top-24">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Mon aventure
              </h2>
              <ProgressTracker ageGroup="kid" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}