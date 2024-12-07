import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';
import ModuleCard from '../components/ModuleCard';
import DailyVerse from '../components/DailyVerse';
import Achievements from '../components/Achievements';
import { Tutorial } from '../components/Tutorial';
import Confetti from 'react-confetti';

interface Module {
  _id: string;
  title: string;
  description: string;
  order: number;
  difficulty: 1 | 2 | 3;
}

export default function Dashboard() {
  const token = useAuthStore(state => state.token);
  const [showConfetti, setShowConfetti] = useState(false);

  const { data: modules, isLoading } = useQuery({
    queryKey: ['modules'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/modules', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data as Module[];
    }
  });

  useEffect(() => {
    const checkNewAchievements = async () => {
      const response = await axios.get('http://localhost:3000/api/progress/achievements', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.newAchievements?.length > 0) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    };

    checkNewAchievements();
  }, [token]);

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      {showConfetti && <Confetti />}
      
      <Tutorial />
      
      <div className="dashboard-overview grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Tableau de bord</h1>
          <DailyVerse className="daily-verse mb-6" />
        </div>
        <div>
          <Achievements />
        </div>
      </div>
      
      <div className="modules-section">
        <h2 className="text-2xl font-semibold mb-4">Modules disponibles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules?.map((module) => (
            <ModuleCard
              key={module._id}
              title={module.title}
              description={module.description}
              difficulty={module.difficulty}
              progress={75}
              icon="📚"
              onClick={() => {/* TODO: Navigate to module */}}
            />
          ))}
        </div>
      </div>
    </div>
  );
}