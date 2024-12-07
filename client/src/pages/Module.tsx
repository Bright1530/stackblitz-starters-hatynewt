import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuthStore } from '../stores/authStore';

interface Question {
  _id: string;
  question: string;
  options: string[];
}

interface Module {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}

export default function Module() {
  const { id } = useParams();
  const token = useAuthStore(state => state.token);

  const { data: module, isLoading } = useQuery({
    queryKey: ['module', id],
    queryFn: async () => {
      const response = await axios.get(`http://localhost:3000/api/modules/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data as Module;
    }
  });

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{module?.title}</h1>
      <p className="text-gray-600">{module?.description}</p>

      <div className="space-y-8">
        {module?.questions.map((question) => (
          <div key={question._id} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">{question.question}</h3>
            <div className="space-y-2">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded border hover:bg-gray-50"
                  onClick={() => {/* TODO: Implement answer submission */}}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}