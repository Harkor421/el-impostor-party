import React, { ReactNode } from 'react';
import { ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { colors, spacing } from '../../constants/theme';

interface ScrollContainerProps {
  children: ReactNode;
  padding?: boolean;
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export function ScrollContainer({
  children,
  padding = true,
  style,
  contentStyle,
}: ScrollContainerProps) {
  return (
    <ScrollView
      style={[styles.scroll, style]}
      contentContainerStyle={[
        styles.content,
        padding && styles.padding,
        contentStyle,
      ]}
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flexGrow: 1,
  },
  padding: {
    padding: spacing.lg,
  },
});
