import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  withSequence,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../../constants/theme';

const { width, height } = Dimensions.get('window');

interface FloatingOrbProps {
  delay: number;
  duration: number;
  size: number;
  color: string;
  startX: number;
  startY: number;
}

const FloatingOrb: React.FC<FloatingOrbProps> = ({
  delay,
  duration,
  size,
  color,
  startX,
  startY,
}) => {
  const progress = useSharedValue(0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration, easing: Easing.inOut(Easing.ease) }),
        -1,
        true
      )
    );
    scale.value = withDelay(
      delay,
      withRepeat(
        withSequence(
          withTiming(1.2, { duration: duration / 2, easing: Easing.inOut(Easing.ease) }),
          withTiming(1, { duration: duration / 2, easing: Easing.inOut(Easing.ease) })
        ),
        -1
      )
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(progress.value, [0, 1], [0, -100]);
    const translateX = interpolate(progress.value, [0, 0.5, 1], [0, 30, 0]);

    return {
      transform: [
        { translateX },
        { translateY },
        { scale: scale.value },
      ],
      opacity: interpolate(progress.value, [0, 0.5, 1], [0.3, 0.6, 0.3]),
    };
  });

  return (
    <Animated.View
      style={[
        styles.orb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          left: startX,
          top: startY,
        },
        animatedStyle,
      ]}
    />
  );
};

interface AnimatedBackgroundProps {
  children: React.ReactNode;
  variant?: 'default' | 'game' | 'impostor' | 'victory';
}

export const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  variant = 'default',
}) => {
  const getGradientColors = () => {
    switch (variant) {
      case 'game':
        return ['#0F0F1A', '#1A1035', '#0F0F1A'] as const;
      case 'impostor':
        return ['#1A0F0F', '#2D1515', '#1A0F0F'] as const;
      case 'victory':
        return ['#0F1A15', '#152D1F', '#0F1A15'] as const;
      default:
        return ['#0F0F1A', '#1A1A2E', '#0F0F1A'] as const;
    }
  };

  const getOrbColors = () => {
    switch (variant) {
      case 'impostor':
        return [colors.glow.red, colors.glow.pink, colors.error.main];
      case 'victory':
        return [colors.glow.green, colors.glow.blue, colors.success.main];
      default:
        return [colors.glow.purple, colors.glow.pink, colors.glow.blue];
    }
  };

  const orbColors = getOrbColors();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={getGradientColors()}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />

      {/* Floating orbs */}
      <FloatingOrb
        delay={0}
        duration={8000}
        size={200}
        color={orbColors[0]}
        startX={-50}
        startY={height * 0.2}
      />
      <FloatingOrb
        delay={1000}
        duration={10000}
        size={150}
        color={orbColors[1]}
        startX={width - 100}
        startY={height * 0.5}
      />
      <FloatingOrb
        delay={2000}
        duration={12000}
        size={180}
        color={orbColors[2]}
        startX={width * 0.3}
        startY={height * 0.7}
      />
      <FloatingOrb
        delay={500}
        duration={9000}
        size={120}
        color={orbColors[0]}
        startX={width * 0.6}
        startY={height * 0.1}
      />

      {/* Content */}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  orb: {
    position: 'absolute',
  },
  content: {
    flex: 1,
    zIndex: 1,
  },
});
