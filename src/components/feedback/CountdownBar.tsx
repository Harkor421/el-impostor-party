import React, { useEffect } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, borderRadius } from '../../constants/theme';

interface CountdownBarProps {
  progress: number; // 0 to 1
  height?: number;
  showWarning?: boolean;
  warningThreshold?: number;
  style?: ViewStyle;
}

export function CountdownBar({
  progress,
  height = 8,
  showWarning = true,
  warningThreshold = 0.3,
  style,
}: CountdownBarProps) {
  const animatedProgress = useSharedValue(progress);

  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 300,
      easing: Easing.out(Easing.ease),
    });
  }, [progress]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value * 100}%`,
    };
  });

  const getBarColor = () => {
    if (showWarning) {
      if (progress <= 0.1) return colors.error;
      if (progress <= warningThreshold) return colors.warning;
    }
    return colors.primary;
  };

  return (
    <View style={[styles.container, { height }, style]}>
      <Animated.View
        style={[
          styles.bar,
          { backgroundColor: getBarColor() },
          animatedStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.surface,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    borderRadius: borderRadius.full,
  },
});
