import React from 'react';
import { useRouter } from 'expo-router';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AnimatedBackground } from '../../components/ui/AnimatedBackground';
import { RoleReveal } from '../../components/game/RoleReveal';
import { useGameStore } from '../../store/gameStore';
import { colors } from '../../constants/theme';

export default function RevealScreen() {
  const router = useRouter();
  const gameStore = useGameStore();

  const currentPlayer = gameStore.players[gameStore.currentPlayerIndex];

  const handleRevealComplete = () => {
    // Mark this player as having seen their role
    gameStore.markPlayerRevealed(currentPlayer.id);

    // Check if all players have been revealed
    if (gameStore.revealedPlayers.length + 1 >= gameStore.players.length) {
      // All players have seen their roles, go to play phase
      gameStore.setPhase('playing');
      router.replace('/game/play');
    } else {
      // Move to next player
      gameStore.nextPlayer();
      router.replace('/game/pass');
    }
  };

  if (!currentPlayer) {
    return null;
  }

  return (
    <AnimatedBackground variant={currentPlayer.isImpostor ? 'impostor' : 'game'}>
      <SafeAreaView style={styles.container}>
        <RoleReveal
          word={gameStore.currentWord}
          isImpostor={currentPlayer.isImpostor}
          playerName={currentPlayer.name}
          onRevealComplete={handleRevealComplete}
        />
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
