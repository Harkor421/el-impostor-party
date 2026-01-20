import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../constants/theme';

interface ContainerProps {
  children: ReactNode;
  centered?: boolean;
  flex?: boolean;
  style?: ViewStyle;
}

export function Container({
  children,
  centered = false,
  flex = false,
  style,
}: ContainerProps) {
  return (
    <View
      style={[
        styles.container,
        centered && styles.centered,
        flex && styles.flex,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxWidth: 500,
    alignSelf: 'center',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
  },
});
