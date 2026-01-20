import React from 'react';
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
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
import { ButtonVariant, ButtonSize } from '../../types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const gradients: Record<ButtonVariant, readonly [string, string, string]> = {
  primary: ['#6366F1', '#8B5CF6', '#A855F7'] as const,
  secondary: ['#F43F5E', '#EC4899', '#D946EF'] as const,
  danger: ['#EF4444', '#DC2626', '#B91C1C'] as const,
  ghost: ['transparent', 'transparent', 'transparent'] as const,
};


export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  style,
  textStyle,
}: ButtonProps) {
  const haptics = useHaptics();
  const pressed = useSharedValue(0);

  const handlePressIn = () => {
    pressed.value = withSpring(1, { damping: 15, stiffness: 400 });
  };

  const handlePressOut = () => {
    pressed.value = withSpring(0, { damping: 15, stiffness: 400 });
  };

  const handlePress = () => {
    if (disabled || loading) return;
    haptics.medium();
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressed.value, [0, 1], [1, 0.95]);
    const translateY = interpolate(pressed.value, [0, 1], [0, 2]);

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const iconSize = size === 'small' ? 16 : size === 'large' ? 22 : 18;
  const isGhost = variant === 'ghost';

  const sizeStyles = {
    small: { paddingVertical: 10, paddingHorizontal: 16 },
    medium: { paddingVertical: 12, paddingHorizontal: 22 },
    large: { paddingVertical: 16, paddingHorizontal: 28 },
  };

  const textSizes = {
    small: fontSize.sm,
    medium: fontSize.md,
    large: fontSize.lg,
  };

  return (
    <AnimatedPressable
      onPress={handlePress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled || loading}
      style={[
        styles.container,
        fullWidth && styles.fullWidth,
        animatedStyle,
        style,
      ]}
    >
      {isGhost ? (
        <View
          style={[
            styles.ghostButton,
            sizeStyles[size],
            disabled && styles.disabled,
          ]}
        >
          {renderContent()}
        </View>
      ) : (
        <LinearGradient
          colors={disabled ? ['#374151', '#1F2937', '#111827'] : gradients[variant]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.gradient, sizeStyles[size]]}
        >
          {renderContent()}
        </LinearGradient>
      )}
    </AnimatedPressable>
  );

  function renderContent() {
    if (loading) {
      return <ActivityIndicator color={colors.white} size="small" />;
    }

    return (
      <View style={styles.content}>
        {icon && iconPosition === 'left' && (
          <Ionicons
            name={icon}
            size={iconSize}
            color={disabled ? colors.text.muted : isGhost ? colors.primary.main : colors.white}
            style={styles.iconLeft}
          />
        )}
        <Text
          style={[
            styles.text,
            { fontSize: textSizes[size] },
            isGhost && styles.ghostText,
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
        {icon && iconPosition === 'right' && (
          <Ionicons
            name={icon}
            size={iconSize}
            color={disabled ? colors.text.muted : isGhost ? colors.primary.main : colors.white}
            style={styles.iconRight}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  fullWidth: {
    width: '100%',
  },
  gradient: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontWeight: fontWeight.bold,
    letterSpacing: 0.5,
  },
  ghostButton: {
    borderWidth: 2,
    borderColor: colors.primary.main,
    borderRadius: borderRadius.xl,
    backgroundColor: 'rgba(99, 102, 241, 0.1)',
  },
  ghostText: {
    color: colors.primary.main,
  },
  disabled: {
    borderColor: colors.text.muted,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  disabledText: {
    color: colors.text.muted,
  },
  iconLeft: {
    marginRight: spacing.sm,
  },
  iconRight: {
    marginLeft: spacing.sm,
  },
});
