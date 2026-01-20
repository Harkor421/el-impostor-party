import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CustomCategory, Player, PLAYER_COLORS } from '../types';

const generateId = () => Math.random().toString(36).substring(2, 9);

interface PersistedState {
  // Persisted data
  customCategories: CustomCategory[];
  savedPlayers: Player[];

  // Actions
  addCustomCategory: (name: string, words: string[]) => void;
  removeCustomCategory: (id: string) => void;

  // Player management (persisted)
  addSavedPlayer: (name: string) => void;
  removeSavedPlayer: (id: string) => void;
  reorderPlayers: (players: Player[]) => void;
  clearSavedPlayers: () => void;
}

export const usePersistedStore = create<PersistedState>()(
  persist(
    (set, get) => ({
      customCategories: [],
      savedPlayers: [],

      addCustomCategory: (name: string, words: string[]) => {
        const id = `custom_${name.toLowerCase().replace(/\s+/g, '_')}`;
        set((state) => ({
          customCategories: [...state.customCategories, { id, name, words }],
        }));
      },

      removeCustomCategory: (id: string) => {
        set((state) => ({
          customCategories: state.customCategories.filter((c) => c.id !== id),
        }));
      },

      addSavedPlayer: (name: string) => {
        const { savedPlayers } = get();
        if (savedPlayers.length >= 30) return;

        const usedColors = savedPlayers.map((p) => p.color);
        const availableColor = PLAYER_COLORS.find((c) => !usedColors.includes(c)) || PLAYER_COLORS[0];

        const newPlayer: Player = {
          id: generateId(),
          name,
          color: availableColor,
          isImpostor: false,
          isEliminated: false,
          score: 0,
        };

        set({ savedPlayers: [...savedPlayers, newPlayer] });
      },

      removeSavedPlayer: (id: string) => {
        set((state) => ({
          savedPlayers: state.savedPlayers.filter((p) => p.id !== id),
        }));
      },

      reorderPlayers: (players: Player[]) => {
        set({ savedPlayers: players });
      },

      clearSavedPlayers: () => {
        set({ savedPlayers: [] });
      },
    }),
    {
      name: 'impostor-data',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
