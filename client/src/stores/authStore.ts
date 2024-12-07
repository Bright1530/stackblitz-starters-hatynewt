import create from 'zustand';
import api from '../config/axios';

interface User {
  id: string;
  username: string;
  email: string;
  age_group: string;
  preferences: {
    musicEnabled: boolean;
    volume: number;
  };
}

interface Preferences {
  musicEnabled: boolean;
  volume: number;
}

interface AuthState {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string, age_group: string) => Promise<void>;
  logout: () => void;
  updatePreferences: (preferences: Preferences) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem('token'),
  
  login: async (email, password) => {
    try {
      const response = await api.post('/api/users/login', {
        email,
        password,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user });
    } catch (error) {
      throw error;
    }
  },

  register: async (username, email, password, age_group) => {
    try {
      const response = await api.post('/api/users/register', {
        username,
        email,
        password,
        age_group,
      });
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      set({ token, user });
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('token');
    set({ token: null, user: null });
  },

  updatePreferences: async (preferences) => {
    try {
      const response = await api.patch('/api/users/preferences', { preferences });
      set((state) => ({
        user: state.user ? { ...state.user, preferences } : null
      }));
    } catch (error) {
      throw error;
    }
  },
}));