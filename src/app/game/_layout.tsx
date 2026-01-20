import { Stack } from 'expo-router';
import { colors } from '../../constants/theme';

export default function GameLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
        animation: 'fade',
        gestureEnabled: false, // Prevent back gesture during game
      }}
    >
      <Stack.Screen name="pass" />
      <Stack.Screen name="reveal" />
      <Stack.Screen name="play" />
      <Stack.Screen name="vote" />
      <Stack.Screen name="results" />
      <Stack.Screen name="final" />
    </Stack>
  );
}
