import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { AnimatedBackground } from '../../components/ui/AnimatedBackground';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { useGameStore } from '../../store/gameStore';
import { useHaptics } from '../../hooks/useHaptics';
import { Player } from '../../types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PlayerOptionProps {
  player: Player;
  isSelected: boolean;
  onSelect: () => void;
  index: number;
}

function PlayerOption({ player, isSelected, onSelect, index }: PlayerOptionProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Animated.View entering={FadeInDown.delay(index * 50).springify()}>
      <AnimatedPressable
        onPress={onSelect}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={animatedStyle}
      >
        <LinearGradient
          colors={isSelected
            ? ['rgba(239, 68, 68, 0.3)', 'rgba(244, 63, 94, 0.2)']
            : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
          }
          style={[
            styles.playerCard,
            isSelected && styles.playerCardSelected
          ]}
        >
          {/* Avatar */}
          <LinearGradient
            colors={isSelected
              ? ['#EF4444', '#F43F5E']
              : ['#6366F1', '#8B5CF6']
            }
            style={styles.avatar}
          >
            <Text style={styles.avatarText}>{getInitials(player.name)}</Text>
          </LinearGradient>

          {/* Name */}
          <Text style={styles.playerName} numberOfLines={1}>{player.name}</Text>

          {/* Selection indicator */}
          <View style={[
            styles.selectionCircle,
            isSelected && styles.selectionCircleSelected
          ]}>
            {isSelected && (
              <Ionicons name="checkmark" size={16} color={colors.white} />
            )}
          </View>
        </LinearGradient>
      </AnimatedPressable>
    </Animated.View>
  );
}

export default function VoteScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const gameStore = useGameStore();

  // Track which player was selected as having most votes
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  const activePlayers = gameStore.players.filter((p) => !p.isEliminated);

  const handleSelectPlayer = (playerId: string) => {
    haptics.selection();
    setSelectedPlayerId(playerId === selectedPlayerId ? null : playerId);
  };

  const handleConfirmVote = () => {
    if (!selectedPlayerId) return;
    haptics.medium();

    // Cast a single decisive vote for the selected player
    // This simulates that player having the most votes
    gameStore.castVote('admin', selectedPlayerId);
    gameStore.tallyVotes();
    router.replace('/game/results');
  };

  const handleSkipVoting = () => {
    haptics.light();
    // No votes - go directly to results (will be a tie/no elimination)
    gameStore.tallyVotes();
    router.replace('/game/results');
  };

  const selectedPlayer = activePlayers.find(p => p.id === selectedPlayerId);

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerBadge}>
            <Ionicons name="hand-left" size={16} color={colors.error.main} />
            <Text style={styles.headerBadgeText}>Votación</Text>
          </View>
          <Text style={styles.headerTitle}>¿Quién es el impostor?</Text>
          <Text style={styles.headerSubtitle}>
            Selecciona quién recibió más votos
          </Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Instructions */}
          <Card variant="glass" padding="medium" style={styles.instructionCard}>
            <Ionicons name="information-circle" size={20} color={colors.primary.main} />
            <Text style={styles.instructionText}>
              Después de que todos voten, selecciona al jugador con más votos para eliminarlo
            </Text>
          </Card>

          {/* Player Options */}
          <View style={styles.playerList}>
            {activePlayers.map((player, index) => (
              <PlayerOption
                key={player.id}
                player={player}
                isSelected={selectedPlayerId === player.id}
                onSelect={() => handleSelectPlayer(player.id)}
                index={index}
              />
            ))}
          </View>
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title={selectedPlayer ? `Eliminar a ${selectedPlayer.name}` : 'Selecciona un jugador'}
            onPress={handleConfirmVote}
            size="large"
            icon="skull"
            variant="danger"
            disabled={!selectedPlayerId}
            fullWidth
          />
          <Pressable onPress={handleSkipVoting} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Empate (nadie eliminado)</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    marginBottom: spacing.sm,
  },
  headerBadgeText: {
    color: colors.error.main,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  instructionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  instructionText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    flex: 1,
    lineHeight: 20,
  },
  playerList: {
    gap: spacing.sm,
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  playerCardSelected: {
    borderColor: colors.error.main,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  playerName: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginLeft: spacing.md,
    flex: 1,
  },
  selectionCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: colors.text.muted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectionCircleSelected: {
    backgroundColor: colors.error.main,
    borderColor: colors.error.main,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: 'rgba(15, 15, 26, 0.9)',
    borderTopWidth: 1,
    borderTopColor: colors.background.glassBorder,
  },
  skipButton: {
    marginTop: spacing.md,
    alignItems: 'center',
    padding: spacing.sm,
  },
  skipButtonText: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
  },
});
