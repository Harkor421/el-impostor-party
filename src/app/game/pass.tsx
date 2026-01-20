import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { AnimatedBackground } from '../../components/ui/AnimatedBackground';
import { Button } from '../../components/ui/Button';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../../constants/theme';
import { useGameStore } from '../../store/gameStore';
import { useHaptics } from '../../hooks/useHaptics';
import { getCategoryById } from '../../constants/words';

export default function PassScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const gameStore = useGameStore();

  const currentPlayer = gameStore.players[gameStore.currentPlayerIndex];
  const category = getCategoryById(gameStore.currentCategory);
  const isFirstPlayer = gameStore.revealedPlayers.length === 0;

  // Animations
  const arrowX = useSharedValue(0);

  React.useEffect(() => {
    arrowX.value = withRepeat(
      withSequence(
        withTiming(10, { duration: 800, easing: Easing.inOut(Easing.ease) }),
        withTiming(0, { duration: 800, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
  }, []);

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: arrowX.value }],
  }));

  const handleReady = () => {
    haptics.medium();
    router.replace('/game/reveal');
  };

  if (!currentPlayer) {
    return null;
  }

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Round Info */}
          <View style={styles.roundInfo}>
            <View style={styles.roundBadge}>
              <Text style={styles.roundText}>
                Ronda {gameStore.currentRound}/{gameStore.totalRounds}
              </Text>
            </View>
            {category && (
              <View style={styles.categoryBadge}>
                <Ionicons name={category.icon as any} size={14} color={colors.text.secondary} />
                <Text style={styles.categoryText}>{category.name}</Text>
              </View>
            )}
          </View>

          {/* Phone Icon with Arrow */}
          <View style={styles.iconRow}>
            <LinearGradient
              colors={['#6366F1', '#8B5CF6']}
              style={styles.phoneIcon}
            >
              <Ionicons name="phone-portrait" size={40} color={colors.white} />
            </LinearGradient>
            <Animated.View style={arrowAnimatedStyle}>
              <Ionicons name="arrow-forward" size={28} color={colors.text.muted} />
            </Animated.View>
          </View>

          <Text style={styles.passText}>Pasa el teléfono a</Text>

          {/* Current Player */}
          <View style={styles.playerContainer}>
            <LinearGradient
              colors={['#F43F5E', '#EC4899']}
              style={styles.playerAvatar}
            >
              <Text style={styles.playerInitials}>{getInitials(currentPlayer.name)}</Text>
            </LinearGradient>
            <Text style={styles.playerName}>{currentPlayer.name}</Text>
          </View>

          {/* Instructions */}
          <View style={styles.warningBox}>
            <Ionicons name="eye-off" size={22} color={colors.warning.main} />
            <Text style={styles.warningText}>
              {isFirstPlayer
                ? 'Asegúrate de que nadie más pueda ver la pantalla'
                : 'El jugador anterior no debe ver tu rol'}
            </Text>
          </View>

          {/* Progress */}
          <View style={styles.progressBadge}>
            <Text style={styles.progressText}>
              Jugador {gameStore.revealedPlayers.length + 1} de {gameStore.players.length}
            </Text>
          </View>

          <Button
            title="Estoy listo"
            onPress={handleReady}
            size="large"
            icon="eye"
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
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  roundInfo: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  roundBadge: {
    backgroundColor: colors.background.glass,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  roundText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    gap: spacing.xs,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  categoryText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  iconRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  phoneIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  passText: {
    color: colors.text.secondary,
    fontSize: fontSize.lg,
    marginBottom: spacing.lg,
  },
  playerContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  playerAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  playerInitials: {
    color: colors.white,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  playerName: {
    color: colors.text.primary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    textShadowColor: colors.glow.purple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.1)',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.xl,
    gap: spacing.sm,
    maxWidth: 320,
  },
  warningText: {
    color: colors.warning.main,
    fontSize: fontSize.sm,
    flex: 1,
    lineHeight: 20,
  },
  progressBadge: {
    backgroundColor: colors.background.glass,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginBottom: spacing.xl,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  progressText: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
  },
});
