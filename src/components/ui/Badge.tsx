import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';

interface BadgeProps {
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'small' | 'medium';
  style?: ViewStyle;
}

export function Badge({
  label,
  variant = 'default',
  size = 'medium',
  style,
}: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant], styles[`${size}Size`], style]}>
      <Text style={[styles.text, styles[`${size}Text`]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.full,
    alignSelf: 'flex-start',
  },

  // Variants
  default: {
    backgroundColor: colors.surface,
  },
  success: {
    backgroundColor: colors.success,
  },
  warning: {
    backgroundColor: colors.warning,
  },
  danger: {
    backgroundColor: colors.error,
  },
  info: {
    backgroundColor: colors.info,
  },

  // Sizes
  smallSize: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  mediumSize: {
    paddingVertical: spacing.xs + 2,
    paddingHorizontal: spacing.md,
  },

  // Text
  text: {
    color: colors.white,
    fontWeight: fontWeight.semibold,
  },
  smallText: {
    fontSize: fontSize.xs,
  },
  mediumText: {
    fontSize: fontSize.sm,
  },
});
