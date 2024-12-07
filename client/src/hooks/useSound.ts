import useSound from 'use-sound';
import { useThemeStore } from '../stores/themeStore';

export function useSoundEffect(soundUrl: string) {
  const soundEnabled = useThemeStore((state) => state.soundEnabled);
  
  const [play] = useSound(soundUrl, {
    volume: 0.5,
    soundEnabled,
  });

  return {
    playSound: () => {
      if (soundEnabled) {
        play();
      }
    },
  };
}