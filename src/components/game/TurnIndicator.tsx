import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';
import { Avatar } from '../ui/Avatar';
import { Player } from '../../types';

interface TurnIndicatorProps {
  currentPlayer: Player;
  turnNumber: number;
  totalTurns: number;
}

export function TurnIndicator({
  currentPlayer,
  turnNumber,
  totalTurns,
}: TurnIndicatorProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Turno de</Text>
      <View style={styles.playerInfo}>
        <Avatar name={currentPlayer.name} color={currentPlayer.color} size="large" />
        <Text style={styles.playerName}>{currentPlayer.name}</Text>
      </View>
      <View style={styles.progress}>
        {Array.from({ length: totalTurns }).map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index < turnNumber && styles.dotActive,
              index === turnNumber - 1 && styles.dotCurrent,
            ]}
          />
        ))}
      </View>
      <Text style={styles.turnText}>
        Turno {turnNumber} de {totalTurns}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.md,
    marginBottom: spacing.sm,
  },
  playerInfo: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  playerName: {
    color: colors.text,
    fontSize: fontSize.xxl,
    fontWeight: fontWeight.bold,
    marginTop: spacing.sm,
  },
  progress: {
    flexDirection: 'row',
    marginTop: spacing.md,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.surface,
    marginHorizontal: 4,
  },
  dotActive: {
    backgroundColor: colors.success,
  },
  dotCurrent: {
    backgroundColor: colors.primary,
    transform: [{ scale: 1.3 }],
  },
  turnText: {
    color: colors.textMuted,
    fontSize: fontSize.sm,
    marginTop: spacing.sm,
  },
});
