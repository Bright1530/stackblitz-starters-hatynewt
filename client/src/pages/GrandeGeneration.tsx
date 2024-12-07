import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import ModuleCard from '../components/generations/ModuleCard';
import ChallengeCard from '../components/generations/ChallengeCard';
import CommunityFeed from '../components/generations/CommunityFeed';

export default function GrandeGeneration() {
  const token = useAuthStore(state => state.token);

  const { data: modules } = useQuery({
    queryKey: ['grande-generation-modules'],
    queryFn: async () => {
      const response = await axios.get('/api/generations/grande/modules', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
            Grande Génération R.O.Y.A.L.E.S
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Développe ton leadership spirituel et grandis dans ta foi à travers des
            défis inspirants et des discussions profondes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Modules d'apprentissage
              </h2>
              <div className="grid gap-6">
                {modules?.map((module: any) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    ageGroup="teen"
                  />
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Défis de leadership
              </h2>
              <div className="grid gap-6">
                <ChallengeCard
                  title="Impact dans ta communauté"
                  description="Organise une action de service communautaire avec ton groupe"
                  duration="2 semaines"
                  participants={12}
                  points={500}
                />
                <ChallengeCard
                  title="Mentor spirituel"
                  description="Guide un plus jeune dans son parcours spirituel"
                  duration="1 mois"
                  participants={8}
                  points={750}
                />
              </div>
            </section>
          </div>

          <div>
            <section>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Communauté
              </h2>
              <CommunityFeed ageGroup="teen" />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}