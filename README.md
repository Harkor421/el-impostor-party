# El Impostor Party

<div align="center">

<img src="assets/icon.png" alt="El Impostor Party Logo" width="150" height="150" style="border-radius: 30px;">

### A local multiplayer word-guessing party game

[![Expo SDK](https://img.shields.io/badge/Expo-SDK%2052-000020?style=for-the-badge&logo=expo)](https://expo.dev)
[![React Native](https://img.shields.io/badge/React%20Native-0.76-61DAFB?style=for-the-badge&logo=react)](https://reactnative.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-3178C6?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

[Features](#features) • [How to Play](#how-to-play) • [Installation](#installation) • [Tech Stack](#tech-stack) • [Contributing](#contributing)

</div>

---

## About

**El Impostor Party** is a social deduction party game where players try to identify the impostor among them. All players except the impostor(s) receive a secret word. Through rounds of giving one-word clues, players must figure out who doesn't know the word while the impostor tries to blend in by listening carefully and adapting.

Perfect for parties, family gatherings, game nights, or any social event!

## Features

| Feature | Description |
|---------|-------------|
| **Local Multiplayer** | Pass the phone around - no internet required |
| **4-30 Players** | Scales from small groups to large parties |
| **Multiple Impostors** | Configure 1-4 impostors for larger games |
| **18 Categories** | Animals, food, countries, movies, sports, and more |
| **2000+ Words** | Extensive word database in Spanish |
| **Beautiful UI** | Modern dark theme with smooth animations |
| **Haptic Feedback** | Tactile responses for an immersive experience |
| **Customizable** | Set timer duration and number of rounds |
| **Privacy First** | No ads, no tracking, completely offline |

## How to Play

### Setup
1. Choose number of players (4-30)
2. Select number of impostors (1-4)
3. Pick a word category
4. Set round timer

### Gameplay

```
1. REVEAL ROLES
   Pass the phone around. Each player privately sees:
   - Civilians: The secret word
   - Impostors: "You are the Impostor"

2. GIVE CLUES
   Take turns saying ONE word related to the secret word.
   The impostor must fake knowing the word!

3. DISCUSS & VOTE
   After the clue rounds, discuss and vote to eliminate
   the suspected impostor.

4. LAST CHANCE
   If caught, the impostor can guess the word to win!
```

### Win Conditions

| Team | How to Win |
|------|-----------|
| **Civilians** | Successfully vote out all impostors |
| **Impostors** | Survive until the end OR guess the secret word when caught |

### Tips

- Give clues that aren't too obvious (the impostor is listening!)
- Watch other players' reactions and hesitations
- Impostors should listen carefully and give vague but plausible clues

## Screenshots

<div align="center">
<table>
  <tr>
    <td align="center"><strong>Home</strong></td>
    <td align="center"><strong>Setup</strong></td>
    <td align="center"><strong>Role Reveal</strong></td>
    <td align="center"><strong>Voting</strong></td>
  </tr>
  <tr>
    <td><img src="screenshots/home.png" width="200"></td>
    <td><img src="screenshots/setup.png" width="200"></td>
    <td><img src="screenshots/reveal.png" width="200"></td>
    <td><img src="screenshots/vote.png" width="200"></td>
  </tr>
</table>
</div>

## Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (macOS) or Android Emulator

### Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/el-impostor-party.git
cd el-impostor-party

# Install dependencies
npm install

# Start development server
npm start
```

### Run on Device

```bash
# iOS Simulator
npm run ios

# Android Emulator
npm run android

# Web Browser
npm run web

# Physical Device
# Scan QR code with Expo Go app
```

## Tech Stack

<table>
<tr>
<td>

**Framework**
- React Native 0.76
- Expo SDK 52
- TypeScript 5.3

</td>
<td>

**Navigation**
- Expo Router 4
- File-based routing

</td>
<td>

**State**
- Zustand 5
- AsyncStorage

</td>
</tr>
<tr>
<td>

**UI/Animation**
- React Native Reanimated 3
- Expo Linear Gradient
- Expo Blur

</td>
<td>

**Feedback**
- Expo Haptics
- Expo AV (audio)

</td>
<td>

**Icons**
- @expo/vector-icons
- Ionicons

</td>
</tr>
</table>

## Project Structure

```
src/
├── app/                    # Expo Router screens
│   ├── index.tsx          # Home screen
│   ├── setup.tsx          # Game configuration
│   ├── players.tsx        # Player registration
│   ├── settings.tsx       # App settings
│   └── game/              # Game flow
│       ├── reveal.tsx     # Role reveal
│       ├── pass.tsx       # Pass phone screen
│       ├── play.tsx       # Clue giving phase
│       ├── vote.tsx       # Voting phase
│       ├── results.tsx    # Round results
│       └── final.tsx      # Game end
│
├── components/
│   ├── ui/                # Button, Card, Modal, Input...
│   ├── layout/            # Screen, Header, Container...
│   ├── game/              # PlayerCard, RoleReveal, VoteButton...
│   └── feedback/          # Timer, Toast, LoadingSpinner...
│
├── constants/
│   ├── colors.ts          # Color palette
│   ├── theme.ts           # Theme tokens
│   └── words.ts           # 2000+ words in 18 categories
│
├── hooks/                 # useHaptics, useSound, useTimer
├── store/                 # Zustand stores (game, settings)
├── types/                 # TypeScript definitions
└── utils/                 # Helper functions
```

## Word Categories

The game includes 18 categories with 80-150 words each:

| | | | |
|---|---|---|---|
| Animals | Food | Countries | Cities |
| Sports | Professions | Movies | Music |
| Home Items | Clothing | Fruits | Vegetables |
| Emotions | Places | Transportation | Famous People |
| Video Games | Brands | | |

## Building for Production

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Submit to App Store
eas submit --platform ios

# Submit to Play Store
eas submit --platform android
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) before submitting a PR.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Write TypeScript with proper types
- Test on both iOS and Android
- Update documentation as needed

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by classic party games like Spyfall and The Chameleon
- Built with the amazing [Expo](https://expo.dev) platform
- Icons from [Ionicons](https://ionicons.com)

---

<div align="center">

Made with love for parties and social gatherings

**[DegenTech](https://degentech.app)**

</div>
