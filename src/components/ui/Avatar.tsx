import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, borderRadius, fontSize, fontWeight } from '../../constants/theme';

interface AvatarProps {
  name?: string;
  color: string;
  size?: 'small' | 'medium' | 'large';
  showIcon?: boolean;
  isEliminated?: boolean;
  style?: ViewStyle;
}

export function Avatar({
  name,
  color,
  size = 'medium',
  showIcon = false,
  isEliminated = false,
  style,
}: AvatarProps) {
  const dimensions = size === 'small' ? 32 : size === 'large' ? 64 : 48;
  const textSize = size === 'small' ? fontSize.sm : size === 'large' ? fontSize.xl : fontSize.lg;
  const iconSize = size === 'small' ? 16 : size === 'large' ? 32 : 24;

  const initial = name ? name.charAt(0).toUpperCase() : '?';

  return (
    <View
      style={[
        styles.container,
        {
          width: dimensions,
          height: dimensions,
          backgroundColor: isEliminated ? colors.eliminated : color,
        },
        style,
      ]}
    >
      {showIcon ? (
        <Ionicons
          name={isEliminated ? 'skull' : 'person'}
          size={iconSize}
          color={colors.white}
        />
      ) : (
        <Text style={[styles.text, { fontSize: textSize }]}>{initial}</Text>
      )}
      {isEliminated && !showIcon && (
        <View style={styles.eliminatedOverlay}>
          <Ionicons name="close" size={dimensions * 0.6} color={colors.error} />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: fontWeight.bold,
  },
  eliminatedOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: borderRadius.full,
  },
});
