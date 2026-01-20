import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { colors, spacing, fontSize, fontWeight } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';

interface TimerProps {
  timeLeft: number;
  totalTime: number;
  size?: 'small' | 'medium' | 'large';
  showWarning?: boolean;
  warningThreshold?: number;
}

export function Timer({
  timeLeft,
  totalTime,
  size = 'medium',
  showWarning = true,
  warningThreshold = 10,
}: TimerProps) {
  const haptics = useHaptics();
  const progress = useSharedValue(timeLeft / totalTime);

  const isWarning = showWarning && timeLeft <= warningThreshold && timeLeft > 0;
  const isCritical = timeLeft <= 5 && timeLeft > 0;

  useEffect(() => {
    progress.value = withTiming(timeLeft / totalTime, {
      duration: 1000,
      easing: Easing.linear,
    });
  }, [timeLeft, totalTime]);

  useEffect(() => {
    if (isCritical) {
      haptics.warning();
    } else if (isWarning && timeLeft === warningThreshold) {
      haptics.light();
    }
  }, [timeLeft, isWarning, isCritical]);

  const dimensions = size === 'small' ? 80 : size === 'large' ? 160 : 120;
  const strokeWidth = size === 'small' ? 6 : size === 'large' ? 12 : 8;
  const textSize = size === 'small' ? fontSize.lg : size === 'large' ? fontSize.xxxl : fontSize.xxl;

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progress.value,
    };
  });

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    }
    return secs.toString();
  };

  const getColor = () => {
    if (isCritical) return colors.error;
    if (isWarning) return colors.warning;
    return colors.primary;
  };

  return (
    <View style={[styles.container, { width: dimensions, height: dimensions }]}>
      <View style={styles.svgContainer}>
        {/* Background circle */}
        <View
          style={[
            styles.circle,
            {
              width: dimensions,
              height: dimensions,
              borderRadius: dimensions / 2,
              borderWidth: strokeWidth,
              borderColor: colors.surface,
            },
          ]}
        />
        {/* Progress circle - simplified without SVG */}
        <Animated.View
          style={[
            styles.progressCircle,
            {
              width: dimensions - strokeWidth * 2,
              height: dimensions - strokeWidth * 2,
              borderRadius: (dimensions - strokeWidth * 2) / 2,
              borderWidth: strokeWidth,
              borderColor: getColor(),
            },
            animatedStyle,
          ]}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[
            styles.time,
            { fontSize: textSize, color: getColor() },
          ]}
        >
          {formatTime(timeLeft)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    position: 'absolute',
  },
  progressCircle: {
    position: 'absolute',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  time: {
    fontWeight: fontWeight.bold,
  },
});
