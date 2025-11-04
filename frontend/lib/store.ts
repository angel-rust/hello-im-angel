import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  accentColor: string;
  grainEffect: boolean;
  animationSpeed: number;
  reducedMotion: boolean;
  setAccentColor: (color: string) => void;
  setGrainEffect: (enabled: boolean) => void;
  setAnimationSpeed: (speed: number) => void;
  setReducedMotion: (enabled: boolean) => void;
}

interface UIState {
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      accentColor: '#00a3ff',
      grainEffect: true,
      animationSpeed: 1,
      reducedMotion: false,
      setAccentColor: (color) => set({ accentColor: color }),
      setGrainEffect: (enabled) => set({ grainEffect: enabled }),
      setAnimationSpeed: (speed) => set({ animationSpeed: speed }),
      setReducedMotion: (enabled) => set({ reducedMotion: enabled }),
    }),
    {
      name: 'theme-storage',
    }
  )
);

export const useUIStore = create<UIState>((set) => ({
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
}));
