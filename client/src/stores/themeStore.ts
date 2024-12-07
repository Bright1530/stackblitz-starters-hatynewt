import create from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  isDarkMode: boolean;
  primaryColor: string;
  fontSize: 'normal' | 'large' | 'xl';
  soundEnabled: boolean;
  toggleDarkMode: () => void;
  setPrimaryColor: (color: string) => void;
  setFontSize: (size: 'normal' | 'large' | 'xl') => void;
  toggleSound: () => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      isDarkMode: false,
      primaryColor: '#87CEEB',
      fontSize: 'normal',
      soundEnabled: true,
      toggleDarkMode: () => set((state) => ({ isDarkMode: !state.isDarkMode })),
      setPrimaryColor: (color) => set({ primaryColor: color }),
      setFontSize: (size) => set({ fontSize: size }),
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
    }),
    {
      name: 'theme-storage',
    }
  )
);