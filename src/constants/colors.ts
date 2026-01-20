export const colors = {
  // Primary gradient colors - Vibrant purple/indigo
  primary: {
    main: '#6366F1',
    light: '#818CF8',
    dark: '#4F46E5',
    gradient: ['#6366F1', '#8B5CF6', '#A855F7'] as const,
  },

  // Secondary accent - Hot pink/red
  secondary: {
    main: '#F43F5E',
    light: '#FB7185',
    dark: '#E11D48',
    gradient: ['#F43F5E', '#EC4899', '#D946EF'] as const,
  },

  // Success - Emerald green
  success: {
    main: '#10B981',
    light: '#34D399',
    dark: '#059669',
    gradient: ['#10B981', '#14B8A6', '#06B6D4'] as const,
  },

  // Warning - Amber
  warning: {
    main: '#F59E0B',
    light: '#FBBF24',
    dark: '#D97706',
    gradient: ['#F59E0B', '#F97316', '#EF4444'] as const,
  },

  // Error/Impostor - Red
  error: {
    main: '#EF4444',
    light: '#F87171',
    dark: '#DC2626',
    gradient: ['#EF4444', '#F43F5E', '#EC4899'] as const,
  },

  // Dark theme backgrounds
  background: {
    primary: '#0F0F1A',
    secondary: '#1A1A2E',
    tertiary: '#252542',
    card: 'rgba(30, 30, 50, 0.8)',
    glass: 'rgba(255, 255, 255, 0.05)',
    glassBorder: 'rgba(255, 255, 255, 0.1)',
  },

  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: 'rgba(255, 255, 255, 0.7)',
    muted: 'rgba(255, 255, 255, 0.5)',
    inverse: '#0F0F1A',
  },

  // Game specific
  impostor: '#EF4444',
  civil: '#10B981',
  eliminated: 'rgba(255, 255, 255, 0.3)',

  // Special effects
  glow: {
    purple: 'rgba(139, 92, 246, 0.6)',
    pink: 'rgba(236, 72, 153, 0.6)',
    blue: 'rgba(59, 130, 246, 0.6)',
    green: 'rgba(16, 185, 129, 0.6)',
    red: 'rgba(239, 68, 68, 0.6)',
  },

  // UI elements
  border: 'rgba(255, 255, 255, 0.1)',
  borderLight: 'rgba(255, 255, 255, 0.2)',
  overlay: 'rgba(0, 0, 0, 0.7)',
  shadow: 'rgba(0, 0, 0, 0.5)',

  // Basic
  transparent: 'transparent',
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type Colors = typeof colors;
