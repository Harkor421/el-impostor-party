import { useCallback, useRef, useEffect } from 'react';
import { Audio } from 'expo-av';
import { useSettingsStore } from '../store/settingsStore';

export type SoundType = 'tap' | 'reveal' | 'tick' | 'alert' | 'vote' | 'victory' | 'defeat' | 'whoosh';

// Sound file mapping - we'll use simple tones for now
// In production, replace with actual sound files
const SOUNDS: Record<SoundType, any> = {
  tap: null, // Will be generated programmatically
  reveal: null,
  tick: null,
  alert: null,
  vote: null,
  victory: null,
  defeat: null,
  whoosh: null,
};

export function useSound() {
  const soundEnabled = useSettingsStore((state) => state.soundEnabled);
  const volume = useSettingsStore((state) => state.volume);
  const soundRef = useRef<Audio.Sound | null>(null);

  useEffect(() => {
    // Configure audio mode
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: false,
      staysActiveInBackground: false,
      shouldDuckAndroid: true,
    });

    return () => {
      // Cleanup sound on unmount
      if (soundRef.current) {
        soundRef.current.unloadAsync();
      }
    };
  }, []);

  const play = useCallback(async (type: SoundType) => {
    if (!soundEnabled) return;

    try {
      // Unload previous sound
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
      }

      // For now, we'll create simple beep sounds
      // In production, load actual sound files
      const { sound } = await Audio.Sound.createAsync(
        // Using a simple approach - in production use actual audio files
        { uri: 'https://cdn.freesound.org/previews/220/220206_4100837-lq.mp3' },
        { volume, shouldPlay: true }
      );

      soundRef.current = sound;

      // Auto-unload after playing
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.isLoaded && status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.log('Sound playback error:', error);
    }
  }, [soundEnabled, volume]);

  return {
    play,
    tap: () => play('tap'),
    reveal: () => play('reveal'),
    tick: () => play('tick'),
    alert: () => play('alert'),
    vote: () => play('vote'),
    victory: () => play('victory'),
    defeat: () => play('defeat'),
    whoosh: () => play('whoosh'),
  };
}
