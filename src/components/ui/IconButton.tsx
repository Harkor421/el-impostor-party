import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

interface IconButtonProps {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  backgroundColor?: string;
  disabled?: boolean;
  style?: ViewStyle;
}

export function IconButton({
  icon,
  onPress,
  size = 'medium',
  color = colors.white,
  backgroundColor = colors.primary,
  disabled = false,
  style,
}: IconButtonProps) {
  const haptics = useHaptics();

  const handlePress = () => {
    if (disabled) return;
    haptics.light();
    onPress();
  };

  const iconSize = size === 'small' ? 20 : size === 'large' ? 32 : 24;
  const buttonSize = size === 'small' ? 36 : size === 'large' ? 56 : 44;

  return (
    <TouchableOpacity
      style={[
        styles.base,
        {
          width: buttonSize,
          height: buttonSize,
          backgroundColor: disabled ? colors.surfaceLight : backgroundColor,
        },
        style,
      ]}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Ionicons
        name={icon}
        size={iconSize}
        color={disabled ? colors.textMuted : color}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.full,
  },
});
