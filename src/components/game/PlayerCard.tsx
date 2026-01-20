import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { Player } from '../../types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface PlayerCardProps {
  player: Player;
  onPress?: () => void;
  onRemove?: () => void;
  showScore?: boolean;
  showRole?: boolean;
  selected?: boolean;
  votesReceived?: number;
  compact?: boolean;
}

export function PlayerCard({
  player,
  onPress,
  onRemove,
  showScore = false,
  showRole = false,
  selected = false,
  votesReceived,
  compact = false,
}: PlayerCardProps) {
  const haptics = useHaptics();
  const pressed = useSharedValue(0);

  const handlePressIn = () => {
    pressed.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    pressed.value = withSpring(0, { damping: 15, stiffness: 400 });
  };

  const handlePress = () => {
    if (!onPress || player.isEliminated) return;
    haptics.selection();
    onPress();
  };

  const handleRemove = () => {
    if (!onRemove) return;
    haptics.medium();
    onRemove();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressed.value, [0, 1], [1, 0.97]);
    return {
      transform: [{ scale }],
    };
  });

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const avatarGradient = selected
    ? (['#10B981', '#14B8A6', '#06B6D4'] as const)
    : player.isImpostor && showRole
    ? (['#EF4444', '#F43F5E', '#EC4899'] as const)
    : (['#6366F1', '#8B5CF6', '#A855F7'] as const);

  if (compact) {
    return (
      <AnimatedPressable
        style={[
          styles.compactContainer,
          selected && styles.selectedCompact,
          player.isEliminated && styles.eliminated,
          animatedStyle,
        ]}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={!onPress || player.isEliminated}
      >
        <LinearGradient
          colors={player.isEliminated ? ['#374151', '#1F2937'] : avatarGradient}
          style={styles.compactAvatar}
        >
          <Text style={styles.compactInitials}>{getInitials(player.name)}</Text>
        </LinearGradient>
        <Text
          style={[styles.compactName, player.isEliminated && styles.eliminatedText]}
          numberOfLines={1}
        >
          {player.name}
        </Text>
        {votesReceived !== undefined && votesReceived > 0 && (
          <View style={styles.compactBadge}>
            <Text style={styles.compactBadgeText}>{votesReceived}</Text>
          </View>
        )}
        {selected && (
          <Ionicons name="checkmark-circle" size={20} color={colors.success.main} style={styles.compactCheck} />
        )}
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      style={[
        styles.container,
        selected && styles.selected,
        player.isEliminated && styles.eliminated,
        animatedStyle,
      ]}
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={!onPress || player.isEliminated}
    >
      {/* Avatar with gradient */}
      <View style={styles.avatarContainer}>
        <LinearGradient
          colors={player.isEliminated ? ['#374151', '#1F2937'] : avatarGradient}
          style={styles.avatar}
        >
          <Text style={styles.initials}>{getInitials(player.name)}</Text>
        </LinearGradient>
        {selected && (
          <View style={styles.avatarBadge}>
            <Ionicons name="checkmark" size={12} color={colors.white} />
          </View>
        )}
      </View>

      {/* Player info */}
      <View style={styles.info}>
        <Text
          style={[styles.name, player.isEliminated && styles.eliminatedText]}
          numberOfLines={1}
        >
          {player.name}
        </Text>

        <View style={styles.statusRow}>
          {showRole && (
            <View style={[
              styles.roleBadge,
              player.isImpostor ? styles.impostorBadge : styles.civilBadge
            ]}>
              <Ionicons
                name={player.isImpostor ? 'skull' : 'shield-checkmark'}
                size={12}
                color={colors.white}
              />
              <Text style={styles.roleText}>
                {player.isImpostor ? 'Impostor' : 'Civil'}
              </Text>
            </View>
          )}

          {showScore && (
            <View style={styles.scoreBadge}>
              <Ionicons name="star" size={12} color={colors.warning.main} />
              <Text style={styles.scoreText}>{player.score} pts</Text>
            </View>
          )}

          {player.isEliminated && (
            <View style={styles.eliminatedBadge}>
              <Ionicons name="close-circle" size={12} color={colors.text.muted} />
              <Text style={styles.eliminatedBadgeText}>Eliminado</Text>
            </View>
          )}
        </View>
      </View>

      {/* Votes indicator */}
      {votesReceived !== undefined && votesReceived > 0 && (
        <View style={styles.votes}>
          <LinearGradient
            colors={['#EF4444', '#F43F5E']}
            style={styles.votesGradient}
          >
            <Ionicons name="hand-left" size={14} color={colors.white} />
            <Text style={styles.voteCount}>{votesReceived}</Text>
          </LinearGradient>
        </View>
      )}

      {/* Remove button */}
      {onRemove && !player.isEliminated && (
        <Pressable onPress={handleRemove} style={styles.removeButton}>
          <View style={styles.removeCircle}>
            <Ionicons name="close" size={16} color={colors.white} />
          </View>
        </Pressable>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  compactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    paddingRight: spacing.md,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  selected: {
    borderColor: colors.success.main,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  selectedCompact: {
    borderColor: colors.success.main,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  eliminated: {
    opacity: 0.5,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary.main,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  initials: {
    color: colors.white,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
    letterSpacing: 1,
  },
  avatarBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.success.main,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background.primary,
  },
  compactAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactInitials: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
  },
  compactName: {
    color: colors.text.primary,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.medium,
    marginLeft: spacing.sm,
    marginRight: spacing.xs,
    flex: 1,
  },
  compactBadge: {
    backgroundColor: colors.error.main,
    borderRadius: borderRadius.full,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  compactBadgeText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: fontWeight.bold,
  },
  compactCheck: {
    marginLeft: spacing.xs,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.xs,
  },
  eliminatedText: {
    color: colors.text.muted,
    textDecorationLine: 'line-through',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
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
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  scoreText: {
    color: colors.warning.main,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.semibold,
  },
  eliminatedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  eliminatedBadgeText: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.medium,
  },
  votes: {
    marginLeft: spacing.sm,
  },
  votesGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  voteCount: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  removeButton: {
    marginLeft: spacing.sm,
  },
  removeCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.error.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
