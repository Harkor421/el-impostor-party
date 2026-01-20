import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';

interface WordDisplayProps {
  word: string;
  isImpostor: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function WordDisplay({
  word,
  isImpostor,
  size = 'medium',
}: WordDisplayProps) {
  const textSize = size === 'small' ? fontSize.lg : size === 'large' ? fontSize.xxxl : fontSize.xxl;

  if (isImpostor) {
    return (
      <View style={[styles.container, styles.impostorContainer]}>
        <Ionicons name="help-circle" size={32} color={colors.error} />
        <Text style={[styles.impostorText, { fontSize: textSize }]}>???</Text>
        <Text style={styles.impostorHint}>Eres el impostor</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Tu palabra:</Text>
      <Text style={[styles.word, { fontSize: textSize }]}>{word}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
  },
  impostorContainer: {
    backgroundColor: 'rgba(231, 76, 60, 0.1)',
    borderWidth: 2,
    borderColor: colors.error,
  },
  label: {
    color: colors.textSecondary,
    fontSize: fontSize.sm,
    marginBottom: spacing.xs,
  },
  word: {
    color: colors.text,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
  },
  impostorText: {
    color: colors.error,
    fontWeight: fontWeight.bold,
    marginTop: spacing.sm,
  },
  impostorHint: {
    color: colors.error,
    fontSize: fontSize.sm,
    marginTop: spacing.sm,
  },
});
