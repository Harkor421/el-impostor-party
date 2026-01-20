import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';

interface RoundIndicatorProps {
  currentRound: number;
  totalRounds: number;
  category?: string;
}

export function RoundIndicator({
  currentRound,
  totalRounds,
  category,
}: RoundIndicatorProps) {
  return (
    <View style={styles.container}>
      <View style={styles.roundBadge}>
        <Text style={styles.roundText}>
          Ronda {currentRound}/{totalRounds}
        </Text>
      </View>
      {category && (
        <Text style={styles.category}>{category}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  roundBadge: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
  },
  roundText: {
    color: colors.white,
    fontSize: fontSize.sm,
    fontWeight: fontWeight.bold,
  },
  category: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
});
