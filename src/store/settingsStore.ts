import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SettingsState } from '../types';

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      // Initial state
      soundEnabled: true,
      musicEnabled: true,
      volume: 0.7,
      hapticsEnabled: true,

      // Actions
      toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
      toggleMusic: () => set((state) => ({ musicEnabled: !state.musicEnabled })),
      toggleHaptics: () => set((state) => ({ hapticsEnabled: !state.hapticsEnabled })),
      setVolume: (volume) => set({ volume: Math.max(0, Math.min(1, volume)) }),
    }),
    {
      name: 'impostor-settings',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
