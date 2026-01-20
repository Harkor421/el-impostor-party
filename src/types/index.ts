// Player types
export interface Player {
  id: string;
  name: string;
  color: string;
  isImpostor: boolean;
  isEliminated: boolean;
  score: number;
}

// Game state types
export type GamePhase =
  | 'setup'
  | 'players'
  | 'passing'
  | 'reveal'
  | 'playing'
  | 'voting'
  | 'results'
  | 'final';

export interface GameState {
  // Players
  players: Player[];
  currentPlayerIndex: number;
  revealedPlayers: string[]; // IDs of players who have seen their role
  startingPlayerIndex: number; // Who starts saying synonyms each round

  // Game settings
  totalRounds: number;
  currentRound: number;
  impostorCount: number;
  turnDuration: number; // seconds
  roundDuration: number; // seconds

  // Current round
  currentWord: string;
  currentCategory: string;
  impostorIndices: number[];
  gamePhase: GamePhase;

  // Voting
  votes: Record<string, string>; // voterId -> votedForId
  eliminatedThisRound: string | null;

  // Custom categories
  customCategories: CustomCategory[];

  // Actions
  setPlayers: (players: Player[]) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  updatePlayerColor: (id: string, color: string) => void;

  setGameSettings: (settings: Partial<Pick<GameState, 'totalRounds' | 'impostorCount' | 'turnDuration' | 'roundDuration'>>) => void;

  // Custom categories
  addCustomCategory: (name: string, words: string[]) => void;
  removeCustomCategory: (id: string) => void;

  startGame: (category: string) => void;
  nextPlayer: () => void;
  markPlayerRevealed: (playerId: string) => void;

  setPhase: (phase: GamePhase) => void;

  castVote: (voterId: string, votedForId: string) => void;
  tallyVotes: () => string | null; // Returns eliminated player ID or null for tie

  nextRound: () => void;
  resetGame: () => void;

  // Impostor guess
  impostorGuess: (guess: string) => boolean;
}

// Settings types
export interface SettingsState {
  // Audio
  soundEnabled: boolean;
  musicEnabled: boolean;
  volume: number; // 0-1

  // Haptics
  hapticsEnabled: boolean;

  // Actions
  toggleSound: () => void;
  toggleMusic: () => void;
  toggleHaptics: () => void;
  setVolume: (volume: number) => void;
}

// Word category types
export interface WordCategory {
  id: string;
  name: string;
  icon: string;
  words: string[];
}

// Custom category type
export interface CustomCategory {
  id: string;
  name: string;
  words: string[];
}

// UI Component types
export type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
export type ButtonSize = 'small' | 'medium' | 'large';

export interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  fullWidth?: boolean;
}

// Avatar colors
export const PLAYER_COLORS = [
  '#e74c3c', // Red
  '#3498db', // Blue
  '#2ecc71', // Green
  '#f39c12', // Orange
  '#9b59b6', // Purple
  '#1abc9c', // Teal
  '#e91e63', // Pink
  '#00bcd4', // Cyan
  '#ff5722', // Deep Orange
  '#607d8b', // Blue Grey
] as const;

export type PlayerColor = typeof PLAYER_COLORS[number];
