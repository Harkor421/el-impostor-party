import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, TextInput, Pressable, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSpring,
  withTiming,
  runOnJS,
  FadeInDown,
  FadeOutUp,
} from 'react-native-reanimated';
import { GestureHandlerRootView, PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';
import { wordCategories } from '../constants/words';
import { useGameStore } from '../store/gameStore';
import { usePersistedStore } from '../store/persistedStore';
import { useHaptics } from '../hooks/useHaptics';
import { Player } from '../types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const PLAYER_ITEM_HEIGHT = 56;

interface CategoryChipProps {
  category: { id: string; name: string; icon: string };
  selected: boolean;
  onPress: () => void;
}

function CategoryChip({ category, selected, onPress }: CategoryChipProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={animatedStyle}
    >
      <LinearGradient
        colors={selected
          ? ['rgba(99, 102, 241, 0.4)', 'rgba(139, 92, 246, 0.3)']
          : ['rgba(255, 255, 255, 0.08)', 'rgba(255, 255, 255, 0.04)']
        }
        style={[styles.categoryChip, selected && styles.categoryChipSelected]}
      >
        <Ionicons
          name={category.icon as any}
          size={18}
          color={selected ? colors.white : colors.text.secondary}
        />
        <Text style={[styles.categoryChipText, selected && styles.categoryChipTextSelected]}>
          {category.name}
        </Text>
        {selected && (
          <View style={styles.categoryCheck}>
            <Ionicons name="checkmark" size={12} color={colors.white} />
          </View>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
}

interface DraggablePlayerProps {
  player: Player;
  index: number;
  onRemove: () => void;
  onDragStart: () => void;
  onDragEnd: (fromIndex: number, toIndex: number) => void;
  totalPlayers: number;
}

function DraggablePlayer({ player, index, onRemove, onDragStart, onDragEnd, totalPlayers }: DraggablePlayerProps) {
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);
  const zIndex = useSharedValue(0);
  const haptics = useHaptics();

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { startY: number }>({
    onStart: (_, ctx) => {
      ctx.startY = translateY.value;
      scale.value = withSpring(1.05);
      zIndex.value = 100;
      runOnJS(onDragStart)();
      runOnJS(haptics.medium)();
    },
    onActive: (event, ctx) => {
      translateY.value = ctx.startY + event.translationY;
    },
    onEnd: (event) => {
      const newIndex = Math.round(translateY.value / PLAYER_ITEM_HEIGHT) + index;
      const clampedIndex = Math.max(0, Math.min(totalPlayers - 1, newIndex));

      translateY.value = withSpring(0);
      scale.value = withSpring(1);
      zIndex.value = 0;

      if (clampedIndex !== index) {
        runOnJS(onDragEnd)(index, clampedIndex);
        runOnJS(haptics.light)();
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateY: translateY.value },
      { scale: scale.value },
    ],
    zIndex: zIndex.value,
  }));

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View style={[styles.playerRow, animatedStyle]}>
        <View style={styles.dragHandle}>
          <Ionicons name="menu" size={20} color={colors.text.muted} />
        </View>

        <LinearGradient
          colors={['#6366F1', '#8B5CF6']}
          style={styles.playerAvatar}
        >
          <Text style={styles.playerInitials}>{getInitials(player.name)}</Text>
        </LinearGradient>

        <Text style={styles.playerName} numberOfLines={1}>{player.name}</Text>

        <Pressable onPress={onRemove} style={styles.removeButton} hitSlop={8}>
          <Ionicons name="close" size={18} color={colors.white} />
        </Pressable>
      </Animated.View>
    </PanGestureHandler>
  );
}

export default function SetupScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const gameStore = useGameStore();
  const persistedStore = usePersistedStore();

  const [playerName, setPlayerName] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [numImpostors, setNumImpostors] = useState(1);
  const [numRounds, setNumRounds] = useState(3);
  const [showCustomCategory, setShowCustomCategory] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
  const [customWords, setCustomWords] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  const buttonScale = useSharedValue(1);

  // Sync persisted players on mount
  useEffect(() => {
    setPlayers(persistedStore.savedPlayers);
  }, [persistedStore.savedPlayers]);

  const handleAddPlayer = () => {
    if (!playerName.trim()) return;
    if (players.length >= 30) return;

    haptics.success();
    persistedStore.addSavedPlayer(playerName.trim());
    setPlayerName('');
  };

  const handleRemovePlayer = (playerId: string) => {
    haptics.medium();
    persistedStore.removeSavedPlayer(playerId);
  };

  const handleDragStart = () => {
    // Optional: any setup when drag starts
  };

  const handleDragEnd = (fromIndex: number, toIndex: number) => {
    const newPlayers = [...players];
    const [movedPlayer] = newPlayers.splice(fromIndex, 1);
    newPlayers.splice(toIndex, 0, movedPlayer);
    setPlayers(newPlayers);
    persistedStore.reorderPlayers(newPlayers);
  };

  const handleSelectCategory = (categoryId: string) => {
    haptics.selection();
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      }
      return [...prev, categoryId];
    });
  };

  const handleAddCustomCategory = () => {
    if (!customCategoryName.trim() || !customWords.trim()) return;

    // Parse words (comma or newline separated)
    const words = customWords
      .split(/[,\n]/)
      .map((w) => w.trim())
      .filter((w) => w.length > 0);

    if (words.length < 5) {
      // Need at least 5 words - could show an alert here
      return;
    }

    haptics.success();
    persistedStore.addCustomCategory(customCategoryName.trim(), words);

    // Auto-select the new category
    const newCategoryId = `custom_${customCategoryName.trim().toLowerCase().replace(/\s+/g, '_')}`;
    setSelectedCategories((prev) => [...prev, newCategoryId]);

    setCustomCategoryName('');
    setCustomWords('');
    setShowCustomCategory(false);
  };

  const handleStartGame = () => {
    if (selectedCategories.length === 0 || players.length < 4) return;
    haptics.success();

    // Set players in game store
    gameStore.setPlayers(players);

    // Also set custom categories in game store
    gameStore.setGameSettings({
      totalRounds: numRounds,
      impostorCount: numImpostors,
    });

    // Copy custom categories to game store for the current game
    persistedStore.customCategories.forEach(cat => {
      if (!gameStore.customCategories.find(c => c.id === cat.id)) {
        gameStore.addCustomCategory(cat.name, cat.words);
      }
    });

    // Pick random category from selected ones
    const randomCategory = selectedCategories[Math.floor(Math.random() * selectedCategories.length)];
    gameStore.startGame(randomCategory);
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

  const canStart = players.length >= 4 && selectedCategories.length > 0;
  const maxImpostors = Math.floor(players.length / 3) || 1;

  // Adjust impostor count if player count changes
  useEffect(() => {
    if (numImpostors > maxImpostors) {
      setNumImpostors(Math.max(1, maxImpostors));
    }
  }, [players.length]);

  const wordCount = customWords.split(/[,\n]/).filter(w => w.trim()).length;

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AnimatedBackground>
        <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
            <Pressable onPress={handleBack} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color={colors.white} />
            </Pressable>
            <Text style={styles.headerTitle}>Nueva Partida</Text>
            <View style={styles.headerSpacer} />
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
              {/* Step 1: Add Players */}
              <Card variant="glass" padding="large" style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepNumber}>1</Text>
                  </View>
                  <Text style={styles.sectionTitle}>Jugadores</Text>
                  <View style={styles.playerCount}>
                    <Text style={styles.playerCountText}>
                      {players.length}/30
                    </Text>
                  </View>
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
                      editable={players.length < 30}
                    />
                  </View>

                  <AnimatedPressable
                    onPress={handleAddPlayer}
                    onPressIn={handleAddPressIn}
                    onPressOut={handleAddPressOut}
                    disabled={!playerName.trim() || players.length >= 30}
                    style={addButtonAnimatedStyle}
                  >
                    <LinearGradient
                      colors={(!playerName.trim() || players.length >= 30)
                        ? ['#374151', '#1F2937']
                        : ['#6366F1', '#8B5CF6']
                      }
                      style={styles.addButton}
                    >
                      <Ionicons name="add" size={24} color={colors.white} />
                    </LinearGradient>
                  </AnimatedPressable>
                </View>

                {/* Player List - Vertical with drag reorder */}
                {players.length > 0 && (
                  <View style={styles.playerList}>
                    <Text style={styles.dragHint}>
                      <Ionicons name="menu" size={12} color={colors.text.muted} /> Mantén presionado para reordenar
                    </Text>
                    {players.map((player, index) => (
                      <DraggablePlayer
                        key={player.id}
                        player={player}
                        index={index}
                        onRemove={() => handleRemovePlayer(player.id)}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        totalPlayers={players.length}
                      />
                    ))}
                  </View>
                )}

                {players.length < 4 && (
                  <View style={styles.minPlayersHint}>
                    <Ionicons name="information-circle" size={16} color={colors.text.muted} />
                    <Text style={styles.minPlayersText}>
                      Mínimo 4 jugadores para comenzar
                    </Text>
                  </View>
                )}
              </Card>

              {/* Step 2: Select Categories */}
              <Card variant="glass" padding="large" style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepNumber}>2</Text>
                  </View>
                  <Text style={styles.sectionTitle}>Categorías</Text>
                  {selectedCategories.length > 0 && (
                    <View style={styles.categoryCountBadge}>
                      <Text style={styles.categoryCountText}>{selectedCategories.length} selec.</Text>
                    </View>
                  )}
                </View>

                <Text style={styles.categoryHint}>
                  Selecciona una o más categorías (se elegirá una al azar)
                </Text>

                <View style={styles.categoriesGrid}>
                  {wordCategories.map((category) => (
                    <CategoryChip
                      key={category.id}
                      category={category}
                      selected={selectedCategories.includes(category.id)}
                      onPress={() => handleSelectCategory(category.id)}
                    />
                  ))}

                  {/* Custom Categories */}
                  {persistedStore.customCategories.map((category) => (
                    <CategoryChip
                      key={category.id}
                      category={{ id: category.id, name: category.name, icon: 'create' }}
                      selected={selectedCategories.includes(category.id)}
                      onPress={() => handleSelectCategory(category.id)}
                    />
                  ))}

                  {/* Add Custom Category Button */}
                  <Pressable
                    onPress={() => {
                      haptics.light();
                      setShowCustomCategory(true);
                    }}
                    style={styles.addCategoryButton}
                  >
                    <Ionicons name="add-circle" size={18} color={colors.primary.main} />
                    <Text style={styles.addCategoryText}>Crear</Text>
                  </Pressable>
                </View>

                {/* Custom Category Form */}
                {showCustomCategory && (
                  <View style={styles.customCategoryForm}>
                    <Text style={styles.customCategoryTitle}>Nueva categoría</Text>
                    <TextInput
                      placeholder="Nombre de la categoría"
                      placeholderTextColor={colors.text.muted}
                      value={customCategoryName}
                      onChangeText={setCustomCategoryName}
                      style={styles.customInput}
                    />
                    <TextInput
                      placeholder="Palabras (separadas por coma o línea)"
                      placeholderTextColor={colors.text.muted}
                      value={customWords}
                      onChangeText={setCustomWords}
                      style={[styles.customInput, styles.customWordsInput]}
                      multiline
                      numberOfLines={4}
                    />
                    <Text style={styles.wordCountText}>
                      {wordCount} palabras {wordCount < 5 ? '(mínimo 5)' : '✓'}
                    </Text>
                    <View style={styles.customCategoryButtons}>
                      <Pressable
                        onPress={() => {
                          setShowCustomCategory(false);
                          setCustomCategoryName('');
                          setCustomWords('');
                        }}
                        style={styles.customCancelButton}
                      >
                        <Text style={styles.customCancelText}>Cancelar</Text>
                      </Pressable>
                      <Pressable
                        onPress={handleAddCustomCategory}
                        disabled={!customCategoryName.trim() || wordCount < 5}
                        style={[
                          styles.customSaveButton,
                          (!customCategoryName.trim() || wordCount < 5) && styles.customSaveButtonDisabled
                        ]}
                      >
                        <Text style={[
                          styles.customSaveText,
                          (!customCategoryName.trim() || wordCount < 5) && styles.customSaveTextDisabled
                        ]}>Guardar</Text>
                      </Pressable>
                    </View>
                  </View>
                )}
              </Card>

              {/* Step 3: Game Options (Simplified) */}
              <Card variant="glass" padding="large" style={styles.section}>
                <View style={styles.sectionHeader}>
                  <View style={styles.stepBadge}>
                    <Text style={styles.stepNumber}>3</Text>
                  </View>
                  <Text style={styles.sectionTitle}>Opciones</Text>
                </View>

                <View style={styles.optionsRow}>
                  <View style={styles.optionItem}>
                    <Text style={styles.optionLabel}>Impostores</Text>
                    <View style={styles.optionButtons}>
                      {[1, 2, 3].map((num) => (
                        <Pressable
                          key={num}
                          onPress={() => {
                            if (num <= maxImpostors) {
                              haptics.selection();
                              setNumImpostors(num);
                            }
                          }}
                          disabled={num > maxImpostors}
                          style={[
                            styles.optionButton,
                            numImpostors === num && styles.optionButtonSelected,
                            num > maxImpostors && styles.optionButtonDisabled,
                          ]}
                        >
                          <Text style={[
                            styles.optionButtonText,
                            numImpostors === num && styles.optionButtonTextSelected,
                            num > maxImpostors && styles.optionButtonTextDisabled,
                          ]}>
                            {num}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>

                  <View style={styles.optionItem}>
                    <Text style={styles.optionLabel}>Rondas</Text>
                    <View style={styles.optionButtons}>
                      {[1, 3, 5].map((num) => (
                        <Pressable
                          key={num}
                          onPress={() => {
                            haptics.selection();
                            setNumRounds(num);
                          }}
                          style={[
                            styles.optionButton,
                            numRounds === num && styles.optionButtonSelected,
                          ]}
                        >
                          <Text style={[
                            styles.optionButtonText,
                            numRounds === num && styles.optionButtonTextSelected,
                          ]}>
                            {num}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </View>
              </Card>

              <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Footer */}
            <View style={styles.footer}>
              <Button
                title={canStart ? "¡Comenzar!" : "Completa los pasos"}
                onPress={handleStartGame}
                size="large"
                icon={canStart ? "play" : "alert-circle"}
                iconPosition="right"
                disabled={!canStart}
                fullWidth
              />
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </AnimatedBackground>
    </GestureHandlerRootView>
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
  headerTitle: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  section: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  stepBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  stepNumber: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    flex: 1,
  },
  playerCount: {
    backgroundColor: colors.background.glass,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  playerCountText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
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
  playerList: {
    marginTop: spacing.md,
  },
  dragHint: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
    marginBottom: spacing.sm,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    height: PLAYER_ITEM_HEIGHT,
  },
  dragHandle: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  playerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  playerInitials: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  playerName: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
    flex: 1,
  },
  removeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.error.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  minPlayersHint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  minPlayersText: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    gap: spacing.xs,
  },
  categoryChipSelected: {
    borderColor: colors.primary.main,
  },
  categoryChipText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  categoryChipTextSelected: {
    color: colors.white,
  },
  categoryCheck: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.xs,
  },
  categoryCountBadge: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
  },
  categoryCountText: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  categoryHint: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    marginBottom: spacing.md,
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.primary.main,
    borderStyle: 'dashed',
    gap: spacing.xs,
  },
  addCategoryText: {
    color: colors.primary.main,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  customCategoryForm: {
    marginTop: spacing.lg,
    padding: spacing.md,
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  customCategoryTitle: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.md,
  },
  customInput: {
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    padding: spacing.md,
    color: colors.text.primary,
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
  },
  customWordsInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  wordCountText: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
    marginBottom: spacing.sm,
  },
  customCategoryButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  customCancelButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  customCancelText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  customSaveButton: {
    backgroundColor: colors.primary.main,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
  },
  customSaveButtonDisabled: {
    backgroundColor: colors.background.glass,
  },
  customSaveText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.semibold,
  },
  customSaveTextDisabled: {
    color: colors.text.muted,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  optionItem: {
    flex: 1,
  },
  optionLabel: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.sm,
  },
  optionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  optionButton: {
    flex: 1,
    height: 44,
    borderRadius: borderRadius.md,
    backgroundColor: colors.background.glass,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  optionButtonSelected: {
    backgroundColor: colors.primary.main,
    borderColor: colors.primary.main,
  },
  optionButtonDisabled: {
    opacity: 0.4,
  },
  optionButtonText: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  optionButtonTextSelected: {
    color: colors.white,
  },
  optionButtonTextDisabled: {
    color: colors.text.muted,
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
