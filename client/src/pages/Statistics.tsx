import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

interface Statistics {
  totalModules: number;
  completedModules: number;
  progressPercentage: number;
  averageTimePerModule: number;
  averageScore: number;
  themeProgress: Record<string, number>;
}

export default function Statistics() {
  const token = useAuthStore(state => state.token);

  const { data: statistics, isLoading } = useQuery<Statistics>({
    queryKey: ['statistics'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/progress/statistics', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Mes Statistiques</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Progression Globale</h3>
          <div className="relative pt-1">
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div
                style={{ width: `${statistics?.progressPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              />
            </div>
            <div className="text-center">
              {statistics?.completedModules} / {statistics?.totalModules} modules complétés
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Score Moyen</h3>
          <div className="text-3xl font-bold text-blue-600">
            {Math.round(statistics?.averageScore || 0)}
          </div>
          <p className="text-gray-600">points par module</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Temps Moyen</h3>
          <div className="text-3xl font-bold text-blue-600">
            {Math.round((statistics?.averageTimePerModule || 0) / 60000)}
          </div>
          <p className="text-gray-600">minutes par module</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4">Progression par Thème</h3>
        <div className="space-y-4">
          {Object.entries(statistics?.themeProgress || {}).map(([theme, count]) => (
            <div key={theme}>
              <div className="flex justify-between mb-1">
                <span className="text-gray-700">{theme}</span>
                <span className="text-gray-600">{count} modules</span>
              </div>
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
                  <div
                    style={{ width: `${(count / statistics!.totalModules) * 100}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}