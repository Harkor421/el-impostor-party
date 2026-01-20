# Contributing to El Impostor Party

Thank you for your interest in contributing to El Impostor Party! This document provides guidelines and instructions for contributing.

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for everyone.

## How to Contribute

### Reporting Bugs

Before creating a bug report, please check existing issues to avoid duplicates.

When reporting a bug, include:
- Device and OS version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Suggesting Features

Feature suggestions are welcome! Please:
- Check if the feature has already been suggested
- Explain the use case clearly
- Consider how it fits with the game's purpose

### Pull Requests

1. **Fork & Clone**
   ```bash
   git clone https://github.com/yourusername/el-impostor-party.git
   cd el-impostor-party
   npm install
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

3. **Make Changes**
   - Follow the existing code style
   - Write TypeScript with proper types
   - Keep commits focused and atomic

4. **Test Your Changes**
   ```bash
   npm start
   # Test on iOS simulator
   npm run ios
   # Test on Android emulator
   npm run android
   ```

5. **Submit PR**
   - Write a clear description of changes
   - Reference any related issues
   - Include screenshots for UI changes

## Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator (macOS) or Android Emulator

### Getting Started
```bash
# Install dependencies
npm install

# Start development server
npm start

# Run on specific platform
npm run ios
npm run android
npm run web
```

## Code Style Guidelines

### TypeScript
- Use proper types, avoid `any`
- Define interfaces in `src/types/`
- Use functional components with hooks

### Components
- Place reusable components in `src/components/ui/`
- Game-specific components go in `src/components/game/`
- Use the existing theme system from `src/constants/theme.ts`

### File Structure
```
src/
├── app/           # Screen components (Expo Router)
├── components/    # Reusable components
├── constants/     # Theme, colors, words
├── hooks/         # Custom React hooks
├── store/         # Zustand state management
├── types/         # TypeScript definitions
└── utils/         # Helper functions
```

### Naming Conventions
- Components: PascalCase (`PlayerCard.tsx`)
- Hooks: camelCase with `use` prefix (`useTimer.ts`)
- Types: PascalCase (`GameState`)
- Constants: UPPER_SNAKE_CASE (`MAX_PLAYERS`)

### Styling
- Use `StyleSheet.create()` for styles
- Follow the color system in `colors.ts`
- Use spacing tokens from `theme.ts`

## Adding New Words

Words are stored in `src/constants/words.ts`. To add words:

1. Find the appropriate category
2. Add words in lowercase
3. Ensure words are appropriate for all ages
4. Avoid duplicates within categories

```typescript
// Example
animales: [
  'existing', 'words', 'here',
  'new', 'word', // Add new words
],
```

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for helping make El Impostor Party better!
