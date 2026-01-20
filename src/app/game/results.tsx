import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Modal as RNModal } from 'react-native';
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

export default function ResultsScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const gameStore = useGameStore();

  const [showGuessModal, setShowGuessModal] = useState(false);
  const [guess, setGuess] = useState('');
  const [guessResult, setGuessResult] = useState<'correct' | 'wrong' | null>(null);

  const eliminatedPlayer = gameStore.eliminatedThisRound
    ? gameStore.players.find((p) => p.id === gameStore.eliminatedThisRound)
    : null;

  const wasImpostor = eliminatedPlayer?.isImpostor || false;
  const remainingImpostors = gameStore.players.filter(
    (p) => p.isImpostor && !p.isEliminated
  ).length;
  const remainingCivils = gameStore.players.filter(
    (p) => !p.isImpostor && !p.isEliminated
  ).length;

  const impostorsWin = remainingCivils <= remainingImpostors;
  const civilsWin = remainingImpostors === 0;
  const gameOver = impostorsWin || civilsWin;

  const pulseScale = useSharedValue(1);

  React.useEffect(() => {
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 1000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1000, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
  }, []);

  const pulseAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const handleImpostorGuess = () => {
    const isCorrect = gameStore.impostorGuess(guess);
    setGuessResult(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      haptics.success();
      setTimeout(() => {
        router.replace('/game/final');
      }, 2000);
    } else {
      haptics.error();
    }
  };

  const handleContinue = () => {
    haptics.medium();

    if (gameOver) {
      router.replace('/game/final');
    } else {
      gameStore.nextRound();
      // Go directly to play screen - same word, same roles, just another round of synonyms
      router.replace('/game/play');
    }
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
    <AnimatedBackground variant={wasImpostor ? 'impostor' : 'game'}>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Result Header */}
          {eliminatedPlayer ? (
            <>
              {/* Eliminated Player Avatar */}
              <Animated.View style={pulseAnimatedStyle}>
                <LinearGradient
                  colors={wasImpostor
                    ? ['#EF4444', '#F43F5E']
                    : ['#10B981', '#14B8A6']
                  }
                  style={styles.avatar}
                >
                  <Text style={styles.avatarText}>{getInitials(eliminatedPlayer.name)}</Text>
                </LinearGradient>
              </Animated.View>

              <Text style={styles.eliminatedName}>{eliminatedPlayer.name}</Text>
              <Text style={styles.eliminatedText}>ha sido eliminado</Text>

              {/* Role Reveal Card */}
              <Card
                variant="gradient"
                padding="large"
                glowColor={wasImpostor ? colors.glow.red : colors.glow.green}
                style={styles.roleCard}
              >
                <LinearGradient
                  colors={wasImpostor
                    ? ['rgba(239, 68, 68, 0.3)', 'rgba(244, 63, 94, 0.2)']
                    : ['rgba(16, 185, 129, 0.3)', 'rgba(20, 184, 166, 0.2)']
                  }
                  style={styles.roleGradient}
                >
                  <Ionicons
                    name={wasImpostor ? 'skull' : 'shield-checkmark'}
                    size={40}
                    color={colors.white}
                  />
                  <Text style={styles.roleText}>
                    {wasImpostor ? '¡Era el Impostor!' : 'Era un Civil'}
                  </Text>
                </LinearGradient>
              </Card>

              {/* Impostor Last Chance */}
              {wasImpostor && !gameOver && (
                <View style={styles.lastChance}>
                  <Button
                    title="Última oportunidad: Adivinar palabra"
                    onPress={() => {
                      haptics.light();
                      setShowGuessModal(true);
                    }}
                    variant="danger"
                    icon="bulb"
                    size="medium"
                  />
                </View>
              )}
            </>
          ) : (
            <>
              <View style={styles.tieIcon}>
                <LinearGradient
                  colors={['#F59E0B', '#F97316']}
                  style={styles.tieIconGradient}
                >
                  <Ionicons name="people" size={48} color={colors.white} />
                </LinearGradient>
              </View>
              <Text style={styles.tieText}>¡Empate!</Text>
              <Text style={styles.tieSubtext}>Nadie fue eliminado esta ronda</Text>
            </>
          )}

          {/* Game Status */}
          <Card variant="glass" padding="large" style={styles.statusCard}>
            <Text style={styles.statusTitle}>Estado del juego</Text>
            <View style={styles.statusRow}>
              <View style={styles.statusItem}>
                <View style={styles.statusIcon}>
                  <Ionicons name="shield-checkmark" size={24} color={colors.success.main} />
                </View>
                <Text style={styles.statusNumber}>{remainingCivils}</Text>
                <Text style={styles.statusLabel}>Civiles</Text>
              </View>
              <View style={styles.statusDivider} />
              <View style={styles.statusItem}>
                <View style={styles.statusIcon}>
                  <Ionicons name="skull" size={24} color={colors.error.main} />
                </View>
                <Text style={styles.statusNumber}>{remainingImpostors}</Text>
                <Text style={styles.statusLabel}>Impostores</Text>
              </View>
            </View>
          </Card>

          {/* Win/Lose Message */}
          {gameOver && (
            <View style={[
              styles.winBadge,
              civilsWin ? styles.civilsWinBadge : styles.impostorsWinBadge
            ]}>
              <Ionicons
                name={civilsWin ? 'trophy' : 'skull'}
                size={20}
                color={colors.white}
              />
              <Text style={styles.winText}>
                {civilsWin ? '¡Los civiles ganan!' : '¡Los impostores ganan!'}
              </Text>
            </View>
          )}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title={gameOver ? 'Ver puntuaciones finales' : 'Otra ronda de sinónimos'}
            onPress={handleContinue}
            size="large"
            icon="arrow-forward"
            iconPosition="right"
            fullWidth
          />
        </View>

        {/* Impostor Guess Modal */}
        <RNModal
          visible={showGuessModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowGuessModal(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {guessResult === null ? (
                <>
                  <View style={styles.modalIcon}>
                    <LinearGradient
                      colors={['#F59E0B', '#F97316']}
                      style={styles.modalIconGradient}
                    >
                      <Ionicons name="bulb" size={32} color={colors.white} />
                    </LinearGradient>
                  </View>
                  <Text style={styles.modalTitle}>Adivina la palabra</Text>
                  <Text style={styles.modalText}>
                    Si adivinas la palabra secreta, ¡los impostores ganan!
                  </Text>
                  <View style={styles.modalInput}>
                    <TextInput
                      placeholder="Escribe tu respuesta"
                      placeholderTextColor={colors.text.muted}
                      value={guess}
                      onChangeText={setGuess}
                      autoCapitalize="none"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.modalButtons}>
                    <Pressable
                      onPress={() => setShowGuessModal(false)}
                      style={styles.cancelButton}
                    >
                      <Text style={styles.cancelButtonText}>Cancelar</Text>
                    </Pressable>
                    <Button
                      title="Confirmar"
                      onPress={handleImpostorGuess}
                      disabled={!guess.trim()}
                      size="medium"
                    />
                  </View>
                </>
              ) : guessResult === 'correct' ? (
                <View style={styles.guessResult}>
                  <Ionicons name="trophy" size={64} color={colors.warning.main} />
                  <Text style={styles.correctText}>¡CORRECTO!</Text>
                  <Text style={styles.wordReveal}>{gameStore.currentWord}</Text>
                  <Text style={styles.winResultText}>¡Los impostores ganan!</Text>
                </View>
              ) : (
                <View style={styles.guessResult}>
                  <Ionicons name="close-circle" size={64} color={colors.error.main} />
                  <Text style={styles.wrongText}>¡Incorrecto!</Text>
                  <Button
                    title="Cerrar"
                    onPress={() => {
                      setShowGuessModal(false);
                      setGuessResult(null);
                      setGuess('');
                    }}
                    size="medium"
                  />
                </View>
              )}
            </View>
          </View>
        </RNModal>
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
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  avatarText: {
    color: colors.white,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
  },
  eliminatedName: {
    color: colors.text.primary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  eliminatedText: {
    color: colors.text.secondary,
    fontSize: fontSize.lg,
    marginBottom: spacing.lg,
  },
  roleCard: {
    marginBottom: spacing.lg,
    overflow: 'hidden',
  },
  roleGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    gap: spacing.md,
  },
  roleText: {
    color: colors.white,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  lastChance: {
    marginBottom: spacing.lg,
  },
  tieIcon: {
    marginBottom: spacing.lg,
  },
  tieIconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tieText: {
    color: colors.warning.main,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  tieSubtext: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  statusCard: {
    width: '100%',
    maxWidth: 300,
    marginBottom: spacing.lg,
  },
  statusTitle: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusItem: {
    alignItems: 'center',
    flex: 1,
  },
  statusIcon: {
    marginBottom: spacing.xs,
  },
  statusNumber: {
    color: colors.text.primary,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
  },
  statusLabel: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
  },
  statusDivider: {
    width: 1,
    height: 60,
    backgroundColor: colors.background.glassBorder,
    marginHorizontal: spacing.lg,
  },
  winBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.full,
    gap: spacing.sm,
  },
  civilsWinBadge: {
    backgroundColor: colors.success.main,
  },
  impostorsWinBadge: {
    backgroundColor: colors.error.main,
  },
  winText: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  footer: {
    padding: spacing.lg,
    paddingBottom: spacing.md,
    backgroundColor: 'rgba(15, 15, 26, 0.9)',
    borderTopWidth: 1,
    borderTopColor: colors.background.glassBorder,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 340,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  modalIcon: {
    marginBottom: spacing.lg,
  },
  modalIconGradient: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalTitle: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.sm,
  },
  modalText: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    textAlign: 'center',
    marginBottom: spacing.lg,
  },
  modalInput: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  input: {
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    padding: spacing.md,
    color: colors.text.primary,
    fontSize: fontSize.md,
    width: '100%',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: spacing.md,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.glass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  cancelButtonText: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  guessResult: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  correctText: {
    color: colors.success.main,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.md,
  },
  wrongText: {
    color: colors.error.main,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  wordReveal: {
    color: colors.warning.main,
    fontSize: fontSize.xxxl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.md,
  },
  winResultText: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    marginTop: spacing.sm,
  },
});
