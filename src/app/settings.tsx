import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';
import { wordCategories } from '../constants/words';
import { useGameStore } from '../store/gameStore';
import { useSettingsStore } from '../store/settingsStore';
import { useHaptics } from '../hooks/useHaptics';
import { SafeAreaView } from 'react-native-safe-area-context';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface OptionButtonProps {
  value: number;
  selected: boolean;
  onPress: () => void;
  disabled?: boolean;
}

function OptionButton({ value, selected, onPress, disabled }: OptionButtonProps) {
  const haptics = useHaptics();
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

  const handlePress = () => {
    if (!disabled) {
      haptics.selection();
      onPress();
    }
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={animatedStyle}
    >
      <View
        style={[
          styles.optionButton,
          selected && styles.optionButtonSelected,
          disabled && styles.optionButtonDisabled,
        ]}
      >
        {selected && (
          <LinearGradient
            colors={['#6366F1', '#8B5CF6']}
            style={styles.optionGradient}
          />
        )}
        <Text
          style={[
            styles.optionText,
            selected && styles.optionTextSelected,
            disabled && styles.optionTextDisabled,
          ]}
        >
          {value}
        </Text>
      </View>
    </AnimatedPressable>
  );
}

interface CategoryCardProps {
  category: { id: string; name: string; icon: string };
  selected: boolean;
  onPress: () => void;
  index: number;
}

function CategoryCard({ category, selected, onPress, index }: CategoryCardProps) {
  const haptics = useHaptics();
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(20);

  useEffect(() => {
    opacity.value = withDelay(index * 50, withTiming(1, { duration: 300 }));
    translateY.value = withDelay(index * 50, withSpring(0, { damping: 15 }));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { translateY: translateY.value }],
    opacity: opacity.value,
  }));

  const handlePressIn = () => {
    scale.value = withSpring(0.97, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handlePress = () => {
    haptics.selection();
    onPress();
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[styles.categoryCard, animatedStyle]}
    >
      <LinearGradient
        colors={selected
          ? ['rgba(99, 102, 241, 0.3)', 'rgba(139, 92, 246, 0.2)']
          : ['rgba(255, 255, 255, 0.05)', 'rgba(255, 255, 255, 0.02)']
        }
        style={[
          styles.categoryGradient,
          selected && styles.categorySelected,
        ]}
      >
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <Text style={[styles.categoryName, selected && styles.categoryNameSelected]}>
          {category.name}
        </Text>
        {selected && (
          <View style={styles.categoryCheck}>
            <Ionicons name="checkmark" size={14} color={colors.white} />
          </View>
        )}
      </LinearGradient>
    </AnimatedPressable>
  );
}

export default function SettingsScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const gameStore = useGameStore();
  const settingsStore = useSettingsStore();

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [numPlayers, setNumPlayers] = useState(4);
  const [numImpostors, setNumImpostors] = useState(1);
  const [numRounds, setNumRounds] = useState(3);

  const handleContinue = () => {
    if (!selectedCategory) return;
    haptics.success();

    gameStore.setGameSettings({
      totalRounds: numRounds,
      impostorCount: numImpostors,
    });

    router.push({
      pathname: '/players',
      params: { category: selectedCategory, numPlayers },
    });
  };

  const handleBack = () => {
    haptics.light();
    router.back();
  };

  const maxImpostors = Math.floor(numPlayers / 3);

  return (
    <AnimatedBackground>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Pressable onPress={handleBack} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color={colors.white} />
          </Pressable>
          <Text style={styles.headerTitle}>Configuración</Text>
          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Players Section */}
          <Card variant="glass" padding="large" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="people" size={20} color={colors.primary.main} />
              <Text style={styles.sectionTitle}>Jugadores</Text>
            </View>
            <View style={styles.optionsRow}>
              {[4, 5, 6, 7, 8, 9, 10].map((num) => (
                <OptionButton
                  key={num}
                  value={num}
                  selected={numPlayers === num}
                  onPress={() => {
                    setNumPlayers(num);
                    if (numImpostors > Math.floor(num / 3)) {
                      setNumImpostors(Math.max(1, Math.floor(num / 3)));
                    }
                  }}
                />
              ))}
            </View>
          </Card>

          {/* Impostors Section */}
          <Card variant="glass" padding="large" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="skull" size={20} color={colors.error.main} />
              <Text style={styles.sectionTitle}>Impostores</Text>
            </View>
            <View style={styles.optionsRow}>
              {[1, 2, 3].map((num) => (
                <OptionButton
                  key={num}
                  value={num}
                  selected={numImpostors === num}
                  onPress={() => setNumImpostors(num)}
                  disabled={num > maxImpostors}
                />
              ))}
            </View>
            <Text style={styles.hint}>
              Máximo {maxImpostors} impostor{maxImpostors !== 1 ? 'es' : ''} para {numPlayers} jugadores
            </Text>
          </Card>

          {/* Rounds Section */}
          <Card variant="glass" padding="large" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="refresh" size={20} color={colors.success.main} />
              <Text style={styles.sectionTitle}>Rondas</Text>
            </View>
            <View style={styles.optionsRow}>
              {[1, 2, 3, 4, 5].map((num) => (
                <OptionButton
                  key={num}
                  value={num}
                  selected={numRounds === num}
                  onPress={() => setNumRounds(num)}
                />
              ))}
            </View>
          </Card>

          {/* Sound & Haptics Section */}
          <Card variant="glass" padding="large" style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="settings" size={20} color={colors.warning.main} />
              <Text style={styles.sectionTitle}>Preferencias</Text>
            </View>
            <View style={styles.toggleContainer}>
              <Pressable
                onPress={settingsStore.toggleSound}
                style={[
                  styles.toggleButton,
                  settingsStore.soundEnabled && styles.toggleButtonActive,
                ]}
              >
                <Ionicons
                  name={settingsStore.soundEnabled ? 'volume-high' : 'volume-mute'}
                  size={22}
                  color={settingsStore.soundEnabled ? colors.white : colors.text.muted}
                />
                <Text style={[
                  styles.toggleText,
                  settingsStore.soundEnabled && styles.toggleTextActive,
                ]}>
                  Sonidos
                </Text>
              </Pressable>
              <Pressable
                onPress={settingsStore.toggleHaptics}
                style={[
                  styles.toggleButton,
                  settingsStore.hapticsEnabled && styles.toggleButtonActive,
                ]}
              >
                <Ionicons
                  name={settingsStore.hapticsEnabled ? 'phone-portrait' : 'phone-portrait-outline'}
                  size={22}
                  color={settingsStore.hapticsEnabled ? colors.white : colors.text.muted}
                />
                <Text style={[
                  styles.toggleText,
                  settingsStore.hapticsEnabled && styles.toggleTextActive,
                ]}>
                  Vibración
                </Text>
              </Pressable>
            </View>
          </Card>

          {/* Category Section */}
          <View style={styles.categorySection}>
            <View style={styles.categorySectionHeader}>
              <Ionicons name="grid" size={20} color={colors.secondary.main} />
              <Text style={styles.sectionTitle}>Elige una Categoría</Text>
            </View>
            <View style={styles.categoriesGrid}>
              {wordCategories.map((category, index) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  selected={selectedCategory === category.id}
                  onPress={() => setSelectedCategory(category.id)}
                  index={index}
                />
              ))}
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Continuar"
            onPress={handleContinue}
            size="large"
            icon="arrow-forward"
            iconPosition="right"
            disabled={!selectedCategory}
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
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  optionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    overflow: 'hidden',
  },
  optionButtonSelected: {
    borderColor: colors.primary.main,
  },
  optionButtonDisabled: {
    opacity: 0.4,
  },
  optionGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  optionText: {
    color: colors.text.secondary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
  },
  optionTextSelected: {
    color: colors.white,
  },
  optionTextDisabled: {
    color: colors.text.muted,
  },
  hint: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
    marginTop: spacing.sm,
  },
  toggleContainer: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.background.glass,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  toggleButtonActive: {
    backgroundColor: 'rgba(99, 102, 241, 0.3)',
    borderColor: colors.primary.main,
  },
  toggleText: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
  },
  toggleTextActive: {
    color: colors.white,
  },
  categorySection: {
    marginTop: spacing.md,
  },
  categorySectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
    gap: spacing.sm,
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  categoryCard: {
    width: '31%',
  },
  categoryGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.lg,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    position: 'relative',
  },
  categorySelected: {
    borderColor: colors.primary.main,
  },
  categoryIcon: {
    fontSize: 28,
    marginBottom: spacing.xs,
  },
  categoryName: {
    color: colors.text.secondary,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: colors.white,
  },
  categoryCheck: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.primary.main,
    alignItems: 'center',
    justifyContent: 'center',
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
