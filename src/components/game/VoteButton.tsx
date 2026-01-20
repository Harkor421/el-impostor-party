import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';
import { Avatar } from '../ui/Avatar';
import { useHaptics } from '../../hooks/useHaptics';
import { Player } from '../../types';

interface VoteButtonProps {
  player: Player;
  onVote: () => void;
  isSelected: boolean;
  disabled?: boolean;
  votesReceived?: number;
}

export function VoteButton({
  player,
  onVote,
  isSelected,
  disabled = false,
  votesReceived = 0,
}: VoteButtonProps) {
  const haptics = useHaptics();

  const handlePress = () => {
    if (disabled) return;
    haptics.medium();
    onVote();
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isSelected && styles.selected,
        disabled && styles.disabled,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Avatar
        name={player.name}
        color={player.color}
        size="medium"
        isEliminated={player.isEliminated}
      />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {player.name}
        </Text>
        {votesReceived > 0 && (
          <View style={styles.votesBadge}>
            <Ionicons name="hand-left" size={14} color={colors.white} />
            <Text style={styles.votesCount}>{votesReceived}</Text>
          </View>
        )}
      </View>

      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
        {isSelected && (
          <Ionicons name="checkmark" size={20} color={colors.white} />
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selected: {
    borderColor: colors.primary,
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
  },
  disabled: {
    opacity: 0.5,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    color: colors.text,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  votesBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.error,
    borderRadius: borderRadius.full,
    paddingVertical: 2,
    paddingHorizontal: spacing.sm,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  votesCount: {
    color: colors.white,
    fontSize: fontSize.xs,
    fontWeight: fontWeight.bold,
    marginLeft: 4,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: borderRadius.full,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
});
