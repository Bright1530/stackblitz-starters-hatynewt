import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

interface LeaderboardEntry {
  _id: {
    username: string;
  };
  monthlyPoints: number;
}

export default function Leaderboard() {
  const token = useAuthStore(state => state.token);

  const { data: globalLeaderboard, isLoading: globalLoading } = useQuery({
    queryKey: ['globalLeaderboard'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/leaderboard/global', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  const { data: monthlyLeaderboard, isLoading: monthlyLoading } = useQuery({
    queryKey: ['monthlyLeaderboard'],
    queryFn: async () => {
      const response = await axios.get('http://localhost:3000/api/leaderboard/monthly', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    }
  });

  if (globalLoading || monthlyLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Classement Global</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {globalLeaderboard?.map((entry: any, index: number) => (
                <tr key={entry._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Classement Mensuel</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Utilisateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Points du mois
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {monthlyLeaderboard?.map((entry: LeaderboardEntry, index: number) => (
                <tr key={entry._id.username}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry._id.username}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{entry.monthlyPoints}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}