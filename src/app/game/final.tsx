import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
  withDelay,
  Easing,
  FadeInDown,
} from 'react-native-reanimated';
import { AnimatedBackground } from '../../components/ui/AnimatedBackground';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { useGameStore } from '../../store/gameStore';
import { useHaptics } from '../../hooks/useHaptics';

export default function FinalScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const gameStore = useGameStore();

  const remainingImpostors = gameStore.players.filter(
    (p) => p.isImpostor && !p.isEliminated
  ).length;
  const civilsWin = remainingImpostors === 0;

  const sortedPlayers = [...gameStore.players].sort((a, b) => b.score - a.score);
  const winner = sortedPlayers[0];

  // Animations
  const trophyScale = useSharedValue(0);
  const trophyRotate = useSharedValue(0);

  useEffect(() => {
    trophyScale.value = withSpring(1, { damping: 10, stiffness: 80 });
    trophyRotate.value = withRepeat(
      withSequence(
        withTiming(-5, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(5, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
  }, []);

  const trophyAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: trophyScale.value },
      { rotate: `${trophyRotate.value}deg` },
    ],
  }));

  const handlePlayAgain = () => {
    haptics.success();
    gameStore.resetGame();
    router.replace('/setup');
  };

  const handleNewPlayers = () => {
    haptics.medium();
    gameStore.setPlayers([]);
    gameStore.resetGame();
    router.replace('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getMedalColor = (index: number): [string, string] => {
    switch (index) {
      case 0:
        return ['#FFD700', '#FFA500'];
      case 1:
        return ['#C0C0C0', '#A8A8A8'];
      case 2:
        return ['#CD7F32', '#B8860B'];
      default:
        return ['#6366F1', '#8B5CF6'];
    }
  };

  return (
    <AnimatedBackground variant="victory">
      <SafeAreaView style={styles.container}>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={styles.header}>
            <Animated.View style={trophyAnimatedStyle}>
              <LinearGradient
                colors={['#FFD700', '#FFA500']}
                style={styles.trophyContainer}
              >
                <Ionicons name="trophy" size={64} color={colors.white} />
              </LinearGradient>
            </Animated.View>
            <Text style={styles.title}>¡Fin del Juego!</Text>
          </View>

          {/* Winner Card */}
          <Card
            variant="gradient"
            padding="large"
            glowColor={civilsWin ? colors.glow.green : colors.glow.red}
            style={styles.winnerCard}
          >
            <LinearGradient
              colors={civilsWin
                ? ['rgba(16, 185, 129, 0.3)', 'rgba(20, 184, 166, 0.2)']
                : ['rgba(239, 68, 68, 0.3)', 'rgba(244, 63, 94, 0.2)']
              }
              style={styles.winnerGradient}
            >
              <View style={styles.winnerBadge}>
                <Ionicons
                  name={civilsWin ? 'shield-checkmark' : 'skull'}
                  size={32}
                  color={colors.white}
                />
              </View>
              <Text style={styles.winnerTitle}>
                {civilsWin ? '¡Los Civiles Ganan!' : '¡Los Impostores Ganan!'}
              </Text>
              <Text style={styles.winnerSubtitle}>
                {civilsWin
                  ? 'Todos los impostores fueron descubiertos'
                  : 'Los impostores lograron sobrevivir'}
              </Text>
            </LinearGradient>
          </Card>

          {/* Secret Word */}
          <Card variant="glass" padding="large" style={styles.wordCard}>
            <Text style={styles.wordLabel}>La palabra secreta era:</Text>
            <Text style={styles.word}>{gameStore.currentWord}</Text>
          </Card>

          {/* MVP Card */}
          <Card variant="glass" padding="large" style={styles.mvpCard}>
            <View style={styles.mvpHeader}>
              <Ionicons name="star" size={24} color={colors.warning.main} />
              <Text style={styles.mvpTitle}>Jugador Destacado</Text>
            </View>
            <LinearGradient
              colors={['#FFD700', '#FFA500']}
              style={styles.mvpAvatar}
            >
              <Text style={styles.mvpInitials}>{getInitials(winner.name)}</Text>
            </LinearGradient>
            <Text style={styles.mvpName}>{winner.name}</Text>
            <Text style={styles.mvpScore}>{winner.score} puntos</Text>
          </Card>

          {/* Scoreboard */}
          <View style={styles.scoreboardSection}>
            <View style={styles.scoreboardHeader}>
              <Ionicons name="podium" size={20} color={colors.primary.main} />
              <Text style={styles.scoreboardTitle}>Puntuaciones Finales</Text>
            </View>

            {sortedPlayers.map((player, index) => (
              <Animated.View
                key={player.id}
                entering={FadeInDown.delay(index * 100).springify()}
              >
                <View style={styles.scoreRow}>
                  <View style={styles.rankContainer}>
                    {index < 3 ? (
                      <LinearGradient
                        colors={getMedalColor(index)}
                        style={styles.medalBadge}
                      >
                        <Text style={styles.medalText}>{index + 1}</Text>
                      </LinearGradient>
                    ) : (
                      <Text style={styles.rankNumber}>{index + 1}</Text>
                    )}
                  </View>

                  <LinearGradient
                    colors={getMedalColor(index)}
                    style={styles.scoreAvatar}
                  >
                    <Text style={styles.scoreInitials}>{getInitials(player.name)}</Text>
                  </LinearGradient>

                  <View style={styles.scoreInfo}>
                    <Text style={styles.scoreName}>{player.name}</Text>
                    <View style={[
                      styles.roleBadge,
                      player.isImpostor ? styles.impostorBadge : styles.civilBadge
                    ]}>
                      <Ionicons
                        name={player.isImpostor ? 'skull' : 'shield-checkmark'}
                        size={10}
                        color={colors.white}
                      />
                      <Text style={styles.roleText}>
                        {player.isImpostor ? 'Impostor' : 'Civil'}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.playerScore}>{player.score}</Text>
                </View>
              </Animated.View>
            ))}
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Jugar de Nuevo"
            onPress={handlePlayAgain}
            size="large"
            icon="refresh"
            fullWidth
          />
          <View style={styles.footerSpacer} />
          <Button
            title="Cambiar Jugadores"
            onPress={handleNewPlayers}
            variant="ghost"
            size="medium"
            icon="people"
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  trophyContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  title: {
    color: colors.text.primary,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    textShadowColor: colors.glow.purple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  winnerCard: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  winnerGradient: {
    alignItems: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
  },
  winnerBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  winnerTitle: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.xs,
  },
  winnerSubtitle: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: fontSize.md,
    textAlign: 'center',
  },
  wordCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  wordLabel: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    marginBottom: spacing.xs,
  },
  word: {
    color: colors.warning.main,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  mvpCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  mvpHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  mvpTitle: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
  },
  mvpAvatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  mvpInitials: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  mvpName: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  mvpScore: {
    color: colors.warning.main,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  scoreboardSection: {
    marginBottom: spacing.lg,
  },
  scoreboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  scoreboardTitle: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  rankContainer: {
    width: 36,
    alignItems: 'center',
  },
  medalBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  medalText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  rankNumber: {
    color: colors.text.muted,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  scoreAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  scoreInitials: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  scoreInfo: {
    flex: 1,
  },
  scoreName: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    marginBottom: 2,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
    gap: 4,
  },
  impostorBadge: {
    backgroundColor: colors.error.main,
  },
  civilBadge: {
    backgroundColor: colors.success.main,
  },
  roleText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: fontWeight.medium,
  },
  playerScore: {
    color: colors.primary.main,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    minWidth: 50,
    textAlign: 'right',
  },
  bottomSpacer: {
    height: spacing.xl,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: 'rgba(15, 15, 26, 0.9)',
    borderTopWidth: 1,
    borderTopColor: colors.background.glassBorder,
  },
  footerSpacer: {
    height: spacing.sm,
  },
});
