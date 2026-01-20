import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';

interface ScreenProps {
  children: ReactNode;
  padding?: boolean;
  centered?: boolean;
  style?: ViewStyle;
  unsafe?: boolean;
}

export function Screen({
  children,
  padding = true,
  centered = false,
  style,
  unsafe = false,
}: ScreenProps) {
  const Container = unsafe ? View : SafeAreaView;

  return (
    <Container style={[styles.safe, unsafe && styles.unsafeContainer]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background.primary} />
      <View
        style={[
          styles.container,
          padding && styles.padding,
          centered && styles.centered,
          style,
        ]}
      >
        {children}
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  unsafeContainer: {
    paddingTop: 0,
  },
  container: {
    flex: 1,
  },
  padding: {
    padding: spacing.lg,
  },
  centered: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
