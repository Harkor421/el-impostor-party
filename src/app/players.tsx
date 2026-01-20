import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  FadeInDown,
  FadeOutUp,
  Layout,
} from 'react-native-reanimated';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { PlayerCard } from '../components/game/PlayerCard';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';
import { useGameStore } from '../store/gameStore';
import { useHaptics } from '../hooks/useHaptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PlayersScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ category: string; numPlayers: string }>();
  const haptics = useHaptics();
  const gameStore = useGameStore();

  const [playerName, setPlayerName] = useState('');
  const numPlayers = parseInt(params.numPlayers || '4', 10);
  const category = params.category || '';

  const buttonScale = useSharedValue(1);

  const handleAddPlayer = () => {
    if (!playerName.trim()) return;
    if (gameStore.players.length >= numPlayers) return;

    haptics.success();
    gameStore.addPlayer(playerName.trim());
    setPlayerName('');
  };

  const handleRemovePlayer = (playerId: string) => {
    haptics.medium();
    gameStore.removePlayer(playerId);
  };

  const handleStartGame = () => {
    if (gameStore.players.length < 4) return;
    haptics.success();
    gameStore.startGame(category);
    router.push('/game/pass');
  };

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  const handleAddPressIn = () => {
    buttonScale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
  };

  const handleAddPressOut = () => {
    buttonScale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const addButtonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const canStart = gameStore.players.length >= 4;
  const canAddMore = gameStore.players.length < numPlayers;

  const progress = (gameStore.players.length / numPlayers) * 100;

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </Pressable>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>Jugadores</Text>
            <Text style={styles.headerSubtitle}>
              {gameStore.players.length}/{numPlayers} registrados
            </Text>
          </View>
          <View style={styles.headerSpacer} />
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressTrack}>
            <Animated.View style={[styles.progressFill, { width: `${progress}%` }]}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6', '#A855F7']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.progressGradient}
              />
            </Animated.View>
          </View>
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.flex}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Add Player Form */}
            <Card variant="glass" padding="large" style={styles.formCard}>
              <View style={styles.sectionHeader}>
                <Ionicons name="person-add" size={20} color={colors.primary.main} />
                <Text style={styles.sectionTitle}>Agregar Jugador</Text>
              </View>

              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <Ionicons
                    name="person"
                    size={20}
                    color={colors.text.muted}
                    style={styles.inputIcon}
                  />
                  <TextInput
                    placeholder="Nombre del jugador"
                    placeholderTextColor={colors.text.muted}
                    value={playerName}
                    onChangeText={setPlayerName}
                    onSubmitEditing={handleAddPlayer}
                    returnKeyType="done"
                    autoCapitalize="words"
                    style={styles.input}
                    editable={canAddMore}
                  />
                </View>

                <AnimatedPressable
                  onPress={handleAddPlayer}
                  onPressIn={handleAddPressIn}
                  onPressOut={handleAddPressOut}
                  disabled={!playerName.trim() || !canAddMore}
                  style={addButtonAnimatedStyle}
                >
                  <LinearGradient
                    colors={(!playerName.trim() || !canAddMore)
                      ? ['#374151', '#1F2937']
                      : ['#6366F1', '#8B5CF6']
                    }
                    style={styles.addButton}
                  >
                    <Ionicons name="add" size={24} color={colors.white} />
                  </LinearGradient>
                </AnimatedPressable>
              </View>

              {!canAddMore && (
                <View style={styles.limitBadge}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success.main} />
                  <Text style={styles.limitText}>
                    Todos los jugadores registrados
                  </Text>
                </View>
              )}
            </Card>

            {/* Players List */}
            {gameStore.players.length > 0 ? (
              <View style={styles.listContainer}>
                <View style={styles.listHeader}>
                  <Ionicons name="people" size={20} color={colors.secondary.main} />
                  <Text style={styles.sectionTitle}>Jugadores Registrados</Text>
                </View>

                {gameStore.players.map((player, index) => (
                  <Animated.View
                    key={player.id}
                    entering={FadeInDown.delay(index * 50).springify()}
                    exiting={FadeOutUp.springify()}
                    layout={Layout.springify()}
                  >
                    <PlayerCard
                      player={player}
                      onRemove={() => handleRemovePlayer(player.id)}
                    />
                  </Animated.View>
                ))}
              </View>
            ) : (
              <Card variant="glass" padding="large" style={styles.emptyCard}>
                <View style={styles.emptyIconContainer}>
                  <Ionicons name="people-outline" size={48} color={colors.text.muted} />
                </View>
                <Text style={styles.emptyTitle}>Sin jugadores</Text>
                <Text style={styles.emptyText}>
                  Agrega al menos 4 jugadores para comenzar el juego
                </Text>
              </Card>
            )}

            <View style={styles.bottomSpacer} />
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            {!canStart && gameStore.players.length > 0 && (
              <View style={styles.minPlayersContainer}>
                <Ionicons name="information-circle" size={16} color={colors.text.muted} />
                <Text style={styles.minPlayersText}>
                  Faltan {4 - gameStore.players.length} jugadores más
                </Text>
              </View>
            )}
            <Button
              title={canStart ? `Comenzar Juego` : `Agregar Jugadores`}
              onPress={handleStartGame}
              size="large"
              icon={canStart ? 'play' : 'people'}
              iconPosition="right"
              disabled={!canStart}
              fullWidth
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background.glass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  headerSubtitle: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    marginTop: 2,
  },
  headerSpacer: {
    width: 40,
  },
  progressContainer: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.background.glass,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressGradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  formCard: {
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    paddingHorizontal: spacing.md,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: 50,
    color: colors.text.primary,
    fontSize: fontSize.md,
  },
  addButton: {
    width: 50,
    height: 50,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  limitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    marginTop: spacing.md,
    gap: spacing.xs,
    alignSelf: 'flex-start',
  },
  limitText: {
    color: colors.success.main,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  listContainer: {
    marginTop: spacing.sm,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  emptyCard: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  emptyIconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.background.glass,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  emptyTitle: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  emptyText: {
    color: colors.text.muted,
    fontSize: fontSize.md,
    textAlign: 'center',
    lineHeight: 22,
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
  minPlayersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
    gap: spacing.xs,
  },
  minPlayersText: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
  },
});
