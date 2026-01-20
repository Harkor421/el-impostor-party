import React from 'react';
import { View } from 'react-native';
import { spacing } from '../../constants/theme';

interface SpacerProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  horizontal?: boolean;
}

export function Spacer({ size = 'md', horizontal = false }: SpacerProps) {
  const space = spacing[size];

  return (
    <View
      style={
        horizontal
          ? { width: space, height: '100%' }
          : { height: space, width: '100%' }
      }
    />
  );
}
