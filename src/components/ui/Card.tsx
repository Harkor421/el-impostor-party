import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
} from 'react-native-reanimated';
import { colors, spacing, borderRadius } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'glass' | 'outlined' | 'elevated' | 'gradient';
  padding?: 'none' | 'small' | 'medium' | 'large';
  style?: ViewStyle | ViewStyle[];
  onPress?: () => void;
  glowColor?: string;
  gradientColors?: readonly [string, string, ...string[]];
}

export function Card({
  children,
  variant = 'glass',
  padding = 'medium',
  style,
  onPress,
  glowColor,
  gradientColors = ['rgba(99, 102, 241, 0.2)', 'rgba(139, 92, 246, 0.1)'],
}: CardProps) {
  const haptics = useHaptics();
  const pressed = useSharedValue(0);

  const handlePressIn = () => {
    if (onPress) {
      pressed.value = withSpring(1, { damping: 15, stiffness: 400 });
    }
  };

  const handlePressOut = () => {
    if (onPress) {
      pressed.value = withSpring(0, { damping: 15, stiffness: 400 });
    }
  };

  const handlePress = () => {
    if (onPress) {
      haptics.light();
      onPress();
    }
  };

  const animatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(pressed.value, [0, 1], [1, 0.98]);
    return {
      transform: [{ scale }],
    };
  });

  const paddingStyles = {
    none: 0,
    small: spacing.sm,
    medium: spacing.md,
    large: spacing.lg,
  };

  const renderContent = () => {
    switch (variant) {
      case 'glass':
        return (
          <View
            style={[
              styles.glass,
              { padding: paddingStyles[padding] },
              style,
            ]}
          >
            {children}
          </View>
        );

      case 'gradient':
        return (
          <LinearGradient
            colors={gradientColors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[
              styles.gradient,
              { padding: paddingStyles[padding] },
              style,
            ]}
          >
            {children}
          </LinearGradient>
        );

      case 'outlined':
        return (
          <View
            style={[
              styles.outlined,
              { padding: paddingStyles[padding] },
              style,
            ]}
          >
            {children}
          </View>
        );

      case 'elevated':
        return (
          <View
            style={[
              styles.elevated,
              { padding: paddingStyles[padding] },
              shadows.lg,
              style,
            ]}
          >
            {children}
          </View>
        );

      default:
        return (
          <View
            style={[
              styles.default,
              { padding: paddingStyles[padding] },
              style,
            ]}
          >
            {children}
          </View>
        );
    }
  };

  if (onPress) {
    return (
      <AnimatedPressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={animatedStyle}
      >
        {renderContent()}
      </AnimatedPressable>
    );
  }

  return renderContent();
}

const styles = StyleSheet.create({
  glass: {
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    overflow: 'hidden',
    position: 'relative',
  },
  gradient: {
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
    overflow: 'hidden',
    position: 'relative',
  },
  outlined: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: colors.borderLight,
    borderRadius: borderRadius.xl,
  },
  elevated: {
    backgroundColor: colors.background.tertiary,
    borderRadius: borderRadius.xl,
  },
  default: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.xl,
  },
});
