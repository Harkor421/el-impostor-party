import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { AnimatedBackground } from '../../components/ui/AnimatedBackground';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { useGameStore } from '../../store/gameStore';
import { useHaptics } from '../../hooks/useHaptics';
import { getCategoryById } from '../../constants/words';
import { Player } from '../../types';

export default function PlayScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const gameStore = useGameStore();

  const activePlayers = gameStore.players.filter((p) => !p.isEliminated);
  const category = getCategoryById(gameStore.currentCategory);
  const startingPlayerIndex = gameStore.startingPlayerIndex;

  // Get the turn order starting from the random starting player (clockwise)
  const turnOrder = useMemo(() => {
    const activeIndices = gameStore.players
      .map((p, i) => (!p.isEliminated ? i : -1))
      .filter((i) => i !== -1);

    // Find where the starting player is in the active players list
    const startPosInActive = activeIndices.indexOf(startingPlayerIndex);

    // If starting player was eliminated, just use first active player
    const effectiveStart = startPosInActive >= 0 ? startPosInActive : 0;

    // Reorder: starting player first, then clockwise through the rest
    const ordered: Player[] = [];
    for (let i = 0; i < activeIndices.length; i++) {
      const idx = (effectiveStart + i) % activeIndices.length;
      ordered.push(gameStore.players[activeIndices[idx]]);
    }
    return ordered;
  }, [gameStore.players, startingPlayerIndex]);

  // Pulse animation for the discussion indicator
  const pulseScale = useSharedValue(1);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
  }, []);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleEndRound = () => {
    haptics.medium();
    gameStore.setPhase('voting');
    router.replace('/game/vote');
  };

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  return (
    <AnimatedBackground variant="game">
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <View style={styles.roundBadge}>
              <Text style={styles.roundText}>
                Ronda {gameStore.currentRound}/{gameStore.totalRounds}
              </Text>
            </View>
          </View>
          <View style={styles.headerCenter}>
            <Text style={styles.categoryLabel}>Categoría</Text>
            <Text style={styles.categoryName}>{category?.name || 'Desconocida'}</Text>
          </View>
          <View style={styles.headerRight}>
            <View style={styles.playerCountBadge}>
              <Ionicons name="people" size={14} color={colors.text.secondary} />
              <Text style={styles.playerCountText}>{activePlayers.length}</Text>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Discussion Phase Card */}
          <Card variant="gradient" padding="large" glowColor={colors.glow.purple}>
            <View style={styles.discussionHeader}>
              <Animated.View style={[styles.discussionIcon, pulseAnimatedStyle]}>
                <LinearGradient
                  colors={['#6366F1', '#8B5CF6']}
                  style={styles.discussionIconGradient}
                >
                  <Ionicons name="chatbubbles" size={32} color={colors.white} />
                </LinearGradient>
              </Animated.View>
              <Text style={styles.discussionTitle}>Fase de Discusión</Text>
            </View>

            <Text style={styles.discussionText}>
              Todos los jugadores deben decir <Text style={styles.highlightText}>UNA palabra</Text> relacionada
              con la palabra secreta. El impostor debe fingir que la conoce.
            </Text>

            <View style={styles.tipContainer}>
              <Ionicons name="bulb" size={18} color={colors.warning.main} />
              <Text style={styles.tipText}>
                Observen las reacciones y respuestas de cada jugador para detectar al impostor
              </Text>
            </View>
          </Card>

          {/* Turn Order Section */}
          <Card variant="glass" padding="medium" style={styles.turnOrderSection}>
            <View style={styles.turnOrderHeader}>
              <Ionicons name="swap-horizontal" size={18} color={colors.secondary.main} />
              <Text style={styles.turnOrderTitle}>Orden de Turnos</Text>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.turnOrderScroll}
            >
              {turnOrder.map((player, index) => (
                <View key={player.id} style={styles.turnOrderItem}>
                  <View style={[
                    styles.turnOrderChip,
                    index === 0 && styles.turnOrderChipFirst
                  ]}>
                    <Text style={styles.turnOrderNumber}>{index + 1}</Text>
                    <Text style={styles.turnOrderName} numberOfLines={1}>
                      {player.name}
                    </Text>
                  </View>
                  {index < turnOrder.length - 1 && (
                    <Ionicons name="chevron-forward" size={14} color={colors.text.muted} style={styles.turnOrderArrow} />
                  )}
                </View>
              ))}
            </ScrollView>

            <Text style={styles.turnOrderHint}>
              <Ionicons name="play" size={12} color={colors.success.main} /> {turnOrder[0]?.name} empieza
            </Text>
          </Card>

          {/* Rules Reminder */}
          <Card variant="glass" padding="medium" style={styles.rulesCard}>
            <View style={styles.rulesHeader}>
              <Ionicons name="information-circle" size={20} color={colors.primary.main} />
              <Text style={styles.rulesTitle}>Reglas</Text>
            </View>
            <View style={styles.rulesList}>
              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet} />
                <Text style={styles.ruleText}>Cada jugador dice UNA palabra por turno</Text>
              </View>
              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet} />
                <Text style={styles.ruleText}>No se puede repetir palabras</Text>
              </View>
              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet} />
                <Text style={styles.ruleText}>No se puede decir la palabra secreta</Text>
              </View>
              <View style={styles.ruleItem}>
                <View style={styles.ruleBullet} />
                <Text style={styles.ruleText}>El impostor NO conoce la palabra</Text>
              </View>
            </View>
          </Card>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Terminar Ronda e Ir a Votación"
            onPress={handleEndRound}
            size="large"
            icon="hand-left"
            iconPosition="right"
            variant="secondary"
            fullWidth
          />
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  headerLeft: {
    flex: 1,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  roundBadge: {
    backgroundColor: colors.background.glass,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  roundText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  categoryLabel: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
  },
  categoryName: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  playerCountBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 4,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  playerCountText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  discussionHeader: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  discussionIcon: {
    marginBottom: spacing.md,
  },
  discussionIconGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  discussionTitle: {
    color: colors.text.primary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    letterSpacing: 1,
  },
  discussionText: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: spacing.lg,
  },
  highlightText: {
    color: colors.primary.light,
    fontWeight: fontWeight.bold,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  tipText: {
    color: colors.warning.light,
    fontSize: fontSize.sm,
    flex: 1,
    lineHeight: 20,
  },
  turnOrderSection: {
    marginTop: spacing.lg,
  },
  turnOrderHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  turnOrderTitle: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  turnOrderScroll: {
    paddingVertical: spacing.xs,
  },
  turnOrderItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  turnOrderChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  turnOrderChipFirst: {
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderColor: colors.primary.main,
  },
  turnOrderNumber: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    width: 16,
    textAlign: 'center',
  },
  turnOrderName: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    maxWidth: 80,
  },
  turnOrderArrow: {
    marginHorizontal: spacing.xs,
  },
  turnOrderHint: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  rulesCard: {
    marginTop: spacing.xl,
  },
  rulesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  rulesTitle: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  rulesList: {
    gap: spacing.sm,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  ruleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary.main,
  },
  ruleText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    flex: 1,
  },
  bottomSpacer: {
    height: spacing.xxl,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: 'rgba(15, 15, 26, 0.9)',
    borderTopWidth: 1,
    borderTopColor: colors.background.glassBorder,
  },
});
