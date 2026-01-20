import { create } from 'zustand';
import { GameState, Player, GamePhase, PLAYER_COLORS, CustomCategory } from '../types';
import { wordCategories } from '../constants/words';

const generateId = () => Math.random().toString(36).substring(2, 9);

const getRandomWord = (category: string, customCategories: CustomCategory[]): string => {
  // Check custom categories first
  if (category.startsWith('custom_')) {
    const customCat = customCategories.find((c) => c.id === category);
    if (customCat && customCat.words.length > 0) {
      const randomIndex = Math.floor(Math.random() * customCat.words.length);
      return customCat.words[randomIndex];
    }
    return '';
  }

  // Regular categories
  const cat = wordCategories.find((c) => c.id === category);
  if (!cat) return '';
  const randomIndex = Math.floor(Math.random() * cat.words.length);
  return cat.words[randomIndex];
};

const selectImpostors = (playerCount: number, impostorCount: number): number[] => {
  const indices: number[] = [];
  while (indices.length < impostorCount) {
    const randomIndex = Math.floor(Math.random() * playerCount);
    if (!indices.includes(randomIndex)) {
      indices.push(randomIndex);
    }
  }
  return indices;
};

const initialState = {
  players: [],
  currentPlayerIndex: 0,
  revealedPlayers: [],
  startingPlayerIndex: 0,
  totalRounds: 3,
  currentRound: 1,
  impostorCount: 1,
  turnDuration: 30,
  roundDuration: 180,
  currentWord: '',
  currentCategory: '',
  impostorIndices: [],
  gamePhase: 'setup' as GamePhase,
  votes: {},
  eliminatedThisRound: null,
  customCategories: [] as CustomCategory[],
};

export const useGameStore = create<GameState>((set, get) => ({
  ...initialState,

  // Player management
  setPlayers: (players) => set({ players }),

  addPlayer: (name) => {
    const { players } = get();
    if (players.length >= 30) return;

    const usedColors = players.map((p) => p.color);
    const availableColor = PLAYER_COLORS.find((c) => !usedColors.includes(c)) || PLAYER_COLORS[0];

    const newPlayer: Player = {
      id: generateId(),
      name,
      color: availableColor,
      isImpostor: false,
      isEliminated: false,
      score: 0,
    };

    set({ players: [...players, newPlayer] });
  },

  removePlayer: (id) => {
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    }));
  },

  updatePlayerColor: (id, color) => {
    set((state) => ({
      players: state.players.map((p) => (p.id === id ? { ...p, color } : p)),
    }));
  },

  // Game settings
  setGameSettings: (settings) => set(settings),

  // Custom categories
  addCustomCategory: (name: string, words: string[]) => {
    const id = `custom_${name}`;
    set((state) => ({
      customCategories: [...state.customCategories, { id, name, words }],
    }));
  },

  removeCustomCategory: (id: string) => {
    set((state) => ({
      customCategories: state.customCategories.filter((c) => c.id !== id),
    }));
  },

  // Game flow
  startGame: (category) => {
    const { players, impostorCount, customCategories } = get();
    const word = getRandomWord(category, customCategories);
    const impostorIndices = selectImpostors(players.length, impostorCount);

    // Pick a random starting player for the synonym round (fair - not based on impostor)
    const startingPlayerIndex = Math.floor(Math.random() * players.length);

    // Mark impostors
    const updatedPlayers = players.map((player, index) => ({
      ...player,
      isImpostor: impostorIndices.includes(index),
      isEliminated: false,
    }));

    set({
      currentCategory: category,
      currentWord: word,
      impostorIndices,
      players: updatedPlayers,
      currentPlayerIndex: 0,
      revealedPlayers: [],
      startingPlayerIndex,
      gamePhase: 'passing',
      votes: {},
      eliminatedThisRound: null,
    });
  },

  nextPlayer: () => {
    const { currentPlayerIndex, players, revealedPlayers } = get();
    const nextIndex = currentPlayerIndex + 1;

    // Check if all players have been revealed
    if (revealedPlayers.length >= players.length) {
      set({ gamePhase: 'playing', currentPlayerIndex: 0 });
    } else {
      set({ currentPlayerIndex: nextIndex, gamePhase: 'passing' });
    }
  },

  markPlayerRevealed: (playerId) => {
    set((state) => ({
      revealedPlayers: [...state.revealedPlayers, playerId],
    }));
  },

  setPhase: (phase) => set({ gamePhase: phase }),

  // Voting
  castVote: (voterId, votedForId) => {
    set((state) => ({
      votes: { ...state.votes, [voterId]: votedForId },
    }));
  },

  tallyVotes: () => {
    const { votes, players } = get();
    const voteCounts: Record<string, number> = {};

    // Count votes
    Object.values(votes).forEach((votedForId) => {
      voteCounts[votedForId] = (voteCounts[votedForId] || 0) + 1;
    });

    // Find player with most votes
    let maxVotes = 0;
    let eliminatedId: string | null = null;
    let isTie = false;

    Object.entries(voteCounts).forEach(([playerId, count]) => {
      if (count > maxVotes) {
        maxVotes = count;
        eliminatedId = playerId;
        isTie = false;
      } else if (count === maxVotes) {
        isTie = true;
      }
    });

    // Handle tie - no elimination
    if (isTie) {
      set({ eliminatedThisRound: null, gamePhase: 'results' });
      return null;
    }

    // Eliminate player and update scores
    if (eliminatedId) {
      const eliminatedPlayer = players.find((p) => p.id === eliminatedId);
      const isImpostor = eliminatedPlayer?.isImpostor || false;

      const updatedPlayers = players.map((player) => {
        if (player.id === eliminatedId) {
          return { ...player, isEliminated: true };
        }

        // Award points for correct vote
        const votedCorrectly = votes[player.id] === eliminatedId && isImpostor;
        if (votedCorrectly) {
          return { ...player, score: player.score + 100 };
        }

        // Award points to surviving impostors
        if (player.isImpostor && !isImpostor) {
          return { ...player, score: player.score + 50 };
        }

        return player;
      });

      set({
        players: updatedPlayers,
        eliminatedThisRound: eliminatedId,
        gamePhase: 'results',
      });
    }

    return eliminatedId;
  },

  nextRound: () => {
    const { currentRound, totalRounds, players } = get();

    // Check if game is over
    const remainingImpostors = players.filter((p) => p.isImpostor && !p.isEliminated).length;
    const remainingCivils = players.filter((p) => !p.isImpostor && !p.isEliminated).length;

    if (remainingImpostors === 0 || remainingCivils <= remainingImpostors || currentRound >= totalRounds) {
      set({ gamePhase: 'final' });
      return;
    }

    // Next round keeps the same word and impostors - just another round of synonyms
    // Pick a new random starting player from active (non-eliminated) players
    const activePlayersIndices = players
      .map((p, i) => (!p.isEliminated ? i : -1))
      .filter((i) => i !== -1);

    const randomActiveIndex = Math.floor(Math.random() * activePlayersIndices.length);
    const startingPlayerIndex = activePlayersIndices[randomActiveIndex];

    set({
      currentRound: currentRound + 1,
      currentPlayerIndex: 0,
      startingPlayerIndex,
      gamePhase: 'playing', // Go directly to playing phase (skip role reveal)
      votes: {},
      eliminatedThisRound: null,
    });
  },

  resetGame: () => {
    set({
      ...initialState,
      players: get().players.map((p) => ({
        ...p,
        score: 0,
        isImpostor: false,
        isEliminated: false,
      })),
    });
  },

  impostorGuess: (guess) => {
    const { currentWord, players } = get();
    const isCorrect = guess.toLowerCase().trim() === currentWord.toLowerCase().trim();

    if (isCorrect) {
      // Impostor wins - award bonus points
      const updatedPlayers = players.map((player) => {
        if (player.isImpostor) {
          return { ...player, score: player.score + 200 };
        }
        return player;
      });

      set({ players: updatedPlayers, gamePhase: 'final' });
    }

    return isCorrect;
  },
}));
