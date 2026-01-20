import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  withRepeat,
  interpolate,
  Easing,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { Button } from '../ui/Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = Math.min(SCREEN_WIDTH * 0.85, 320);
const CARD_HEIGHT = CARD_WIDTH * 1.4;

interface RoleRevealProps {
  word: string;
  isImpostor: boolean;
  playerName: string;
  onRevealComplete?: () => void;
}

export function RoleReveal({
  word,
  isImpostor,
  playerName,
  onRevealComplete,
}: RoleRevealProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const haptics = useHaptics();

  // Animations
  const flipProgress = useSharedValue(0);
  const cardScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0);
  const glowScale = useSharedValue(1);
  const iconRotate = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);
  const buttonTranslateY = useSharedValue(20);
  const shimmerPosition = useSharedValue(-1);

  useEffect(() => {
    // Shimmer animation on front card
    shimmerPosition.value = withRepeat(
      withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
      -1,
      false
    );
  }, []);

  const handlePress = () => {
    if (isRevealed) {
      // Hide card
      haptics.light();
      flipProgress.value = withTiming(0, { duration: 500, easing: Easing.inOut(Easing.ease) });
      cardScale.value = withSpring(1, { damping: 15 });
      glowOpacity.value = withTiming(0, { duration: 300 });
      buttonOpacity.value = withTiming(0, { duration: 200 });
      buttonTranslateY.value = withSpring(20);
      setIsRevealed(false);
    } else {
      // Reveal card with dramatic effect
      if (isImpostor) {
        haptics.error();
      } else {
        haptics.success();
      }

      flipProgress.value = withTiming(1, { duration: 600, easing: Easing.inOut(Easing.ease) });
      cardScale.value = withSequence(
        withTiming(0.95, { duration: 150 }),
        withSpring(1.02, { damping: 8, stiffness: 200 }),
        withSpring(1, { damping: 15 })
      );
      glowOpacity.value = withDelay(400, withTiming(1, { duration: 400 }));
      glowScale.value = withDelay(400, withRepeat(
        withSequence(
          withTiming(1.1, { duration: 1000 }),
          withTiming(1, { duration: 1000 })
        ),
        -1
      ));
      iconRotate.value = withDelay(500, withSpring(360, { damping: 12 }));
      buttonOpacity.value = withDelay(800, withTiming(1, { duration: 400 }));
      buttonTranslateY.value = withDelay(800, withSpring(0, { damping: 15 }));
      setIsRevealed(true);
    }
  };

  const handleContinue = () => {
    haptics.medium();
    onRevealComplete?.();
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [0, 180]);
    return {
      transform: [
        { perspective: 1500 },
        { rotateY: `${rotateY}deg` },
        { scale: cardScale.value },
      ],
      opacity: flipProgress.value < 0.5 ? 1 : 0,
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipProgress.value, [0, 1], [180, 360]);
    return {
      transform: [
        { perspective: 1500 },
        { rotateY: `${rotateY}deg` },
        { scale: cardScale.value },
      ],
      opacity: flipProgress.value >= 0.5 ? 1 : 0,
    };
  });

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
    transform: [{ scale: glowScale.value }],
  }));

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${iconRotate.value}deg` }],
  }));

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ translateY: buttonTranslateY.value }],
  }));

  const shimmerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: interpolate(shimmerPosition.value, [-1, 1], [-CARD_WIDTH, CARD_WIDTH]) }],
  }));

  const cardGradient = isImpostor
    ? (['#DC2626', '#EF4444', '#F43F5E'] as const)
    : (['#059669', '#10B981', '#14B8A6'] as const);

  const glowColor = isImpostor ? colors.glow.red : colors.glow.green;

  return (
    <View style={styles.container}>
      {/* Player name with glow */}
      <View style={styles.header}>
        <Text style={styles.playerLabel}>Turno de</Text>
        <Text style={styles.playerName}>{playerName}</Text>
      </View>

      <Text style={styles.instruction}>
        {isRevealed ? 'Toca la carta para ocultar' : 'Toca la carta para revelar tu rol'}
      </Text>

      {/* Card */}
      <Pressable onPress={handlePress} style={styles.cardContainer}>
        {/* Glow effect behind card */}
        <Animated.View style={[styles.cardGlow, { backgroundColor: glowColor }, glowAnimatedStyle]} />

        {/* Front of card (hidden state) */}
        <Animated.View style={[styles.card, frontAnimatedStyle]}>
          <LinearGradient
            colors={['#252542', '#1A1A2E', '#0F0F1A']}
            style={styles.cardGradient}
          >
            {/* Shimmer effect */}
            <Animated.View style={[styles.shimmer, shimmerAnimatedStyle]}>
              <LinearGradient
                colors={['transparent', 'rgba(255,255,255,0.1)', 'transparent']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.shimmerGradient}
              />
            </Animated.View>

            {/* Card border glow */}
            <View style={styles.cardBorder} />

            {/* Content */}
            <View style={styles.questionMark}>
              <Ionicons name="help" size={80} color="rgba(255,255,255,0.3)" />
            </View>
            <Text style={styles.tapText}>Toca para revelar</Text>

            {/* Decorative corners */}
            <View style={[styles.corner, styles.cornerTopLeft]} />
            <View style={[styles.corner, styles.cornerTopRight]} />
            <View style={[styles.corner, styles.cornerBottomLeft]} />
            <View style={[styles.corner, styles.cornerBottomRight]} />
          </LinearGradient>
        </Animated.View>

        {/* Back of card (revealed state) */}
        <Animated.View style={[styles.card, styles.cardBack, backAnimatedStyle]}>
          <LinearGradient
            colors={cardGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cardGradient}
          >
            {/* Top highlight */}
            <View style={styles.cardHighlight} />

            {/* Icon */}
            <Animated.View style={[styles.iconContainer, iconAnimatedStyle]}>
              <View style={styles.iconCircle}>
                <Ionicons
                  name={isImpostor ? 'skull' : 'shield-checkmark'}
                  size={50}
                  color={colors.white}
                />
              </View>
            </Animated.View>

            {/* Role label */}
            <Text style={styles.roleLabel}>
              {isImpostor ? '¡IMPOSTOR!' : 'CIVIL'}
            </Text>

            {/* Word or hint */}
            {!isImpostor ? (
              <View style={styles.wordContainer}>
                <Text style={styles.wordLabel}>Tu palabra secreta es:</Text>
                <View style={styles.wordBox}>
                  <Text style={styles.word}>{word}</Text>
                </View>
              </View>
            ) : (
              <View style={styles.hintContainer}>
                <Ionicons name="warning" size={24} color="rgba(255,255,255,0.8)" />
                <Text style={styles.impostorHint}>
                  No conoces la palabra secreta.{'\n'}¡Finge que la sabes!
                </Text>
              </View>
            )}

            {/* Decorative elements */}
            <View style={[styles.corner, styles.cornerTopLeft, styles.cornerWhite]} />
            <View style={[styles.corner, styles.cornerTopRight, styles.cornerWhite]} />
            <View style={[styles.corner, styles.cornerBottomLeft, styles.cornerWhite]} />
            <View style={[styles.corner, styles.cornerBottomRight, styles.cornerWhite]} />
          </LinearGradient>
        </Animated.View>
      </Pressable>

      {/* Continue button */}
      <Animated.View style={[styles.buttonContainer, buttonAnimatedStyle]}>
        <Button
          title="Entendido, Continuar"
          onPress={handleContinue}
          icon="arrow-forward"
          iconPosition="right"
          variant={isImpostor ? 'danger' : 'primary'}
          size="large"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  playerLabel: {
    color: colors.text.muted,
    fontSize: fontSize.md,
    marginBottom: spacing.xs,
  },
  playerName: {
    color: colors.text.primary,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    textShadowColor: colors.glow.purple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 15,
  },
  instruction: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardGlow: {
    position: 'absolute',
    width: CARD_WIDTH + 40,
    height: CARD_HEIGHT + 40,
    borderRadius: borderRadius.xxl + 20,
  },
  card: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: borderRadius.xxl,
    backfaceVisibility: 'hidden',
    overflow: 'hidden',
  },
  cardBack: {
    // Additional back card styles
  },
  cardGradient: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
    borderRadius: borderRadius.xxl,
    overflow: 'hidden',
  },
  cardBorder: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: borderRadius.xxl,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  cardHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '40%',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderTopLeftRadius: borderRadius.xxl,
    borderTopRightRadius: borderRadius.xxl,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shimmerGradient: {
    flex: 1,
    width: 100,
  },
  questionMark: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  tapText: {
    color: colors.text.muted,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.medium,
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  cornerWhite: {
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  cornerTopLeft: {
    top: spacing.md,
    left: spacing.md,
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderTopLeftRadius: 4,
  },
  cornerTopRight: {
    top: spacing.md,
    right: spacing.md,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderTopRightRadius: 4,
  },
  cornerBottomLeft: {
    bottom: spacing.md,
    left: spacing.md,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderBottomLeftRadius: 4,
  },
  cornerBottomRight: {
    bottom: spacing.md,
    right: spacing.md,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderBottomRightRadius: 4,
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  roleLabel: {
    color: colors.white,
    fontSize: 32,
    fontWeight: fontWeight.extrabold,
    letterSpacing: 2,
    marginBottom: spacing.lg,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  wordContainer: {
    alignItems: 'center',
  },
  wordLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
  },
  wordBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  word: {
    color: colors.white,
    fontSize: 28,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  hintContainer: {
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
  },
  impostorHint: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: fontSize.md,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: spacing.sm,
  },
  buttonContainer: {
    marginTop: spacing.xxl,
    width: '100%',
    maxWidth: 300,
  },
});
