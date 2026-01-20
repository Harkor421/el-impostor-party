import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Modal, ScrollView, Linking } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Constants from 'expo-constants';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
  withSequence,
  withTiming,
  withDelay,
  Easing,
  interpolate,
} from 'react-native-reanimated';
import { AnimatedBackground } from '../components/ui/AnimatedBackground';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { colors, spacing, fontSize, fontWeight, borderRadius } from '../constants/theme';
import { useHaptics } from '../hooks/useHaptics';

const APP_VERSION = Constants.expoConfig?.version || '1.0.0';
const PRIVACY_POLICY_URL = 'https://degentech.app/elimpostor/privacy';
const TERMS_URL = 'https://degentech.app/elimpostor/terms';
const SUPPORT_EMAIL = 'support@degentech.app';

export default function HomeScreen() {
  const router = useRouter();
  const haptics = useHaptics();
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  // Animations
  const logoScale = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(30);
  const buttonsOpacity = useSharedValue(0);
  const buttonsTranslateY = useSharedValue(40);
  const pulseScale = useSharedValue(1);
  const glowOpacity = useSharedValue(0.5);

  useEffect(() => {
    // Entrance animations
    logoScale.value = withSpring(1, { damping: 12, stiffness: 100 });

    titleOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    titleTranslateY.value = withDelay(300, withSpring(0, { damping: 15 }));

    buttonsOpacity.value = withDelay(600, withTiming(1, { duration: 600 }));
    buttonsTranslateY.value = withDelay(600, withSpring(0, { damping: 15 }));

    // Continuous pulse animation
    pulseScale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 2000, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );

    // Glow animation
    glowOpacity.value = withRepeat(
      withSequence(
        withTiming(0.8, { duration: 1500, easing: Easing.inOut(Easing.ease) }),
        withTiming(0.4, { duration: 1500, easing: Easing.inOut(Easing.ease) })
      ),
      -1
    );
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value * pulseScale.value }],
  }));

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const buttonsAnimatedStyle = useAnimatedStyle(() => ({
    opacity: buttonsOpacity.value,
    transform: [{ translateY: buttonsTranslateY.value }],
  }));

  const glowAnimatedStyle = useAnimatedStyle(() => ({
    opacity: glowOpacity.value,
  }));

  const handlePlay = () => {
    haptics.medium();
    router.push('/setup');
  };

  const handleHowToPlay = () => {
    haptics.light();
    setShowHowToPlay(true);
  };

  const handleAbout = () => {
    haptics.light();
    setShowAbout(true);
  };

  const openURL = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch (error) {
      console.log('Error opening URL:', error);
    }
  };

  const openEmail = () => {
    Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=El Impostor Party - Soporte`);
  };

  return (
    <AnimatedBackground>
      <View style={styles.container}>
        {/* Logo Section */}
        <View style={styles.logoSection}>
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            {/* Glow effect */}
            <Animated.View style={[styles.logoGlow, glowAnimatedStyle]} />

            {/* Logo circle */}
            <LinearGradient
              colors={['#6366F1', '#8B5CF6', '#A855F7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoCircle}
            >
              <View style={styles.logoInner}>
                <Ionicons name="eye-off" size={56} color={colors.white} />
              </View>
            </LinearGradient>
          </Animated.View>

          {/* Title */}
          <Animated.View style={titleAnimatedStyle}>
            <Text style={styles.title}>EL IMPOSTOR PARTY</Text>
            <Text style={styles.subtitle}>Juego de Palabras</Text>
          </Animated.View>
        </View>

        {/* Description Card */}
        <Animated.View style={[styles.descriptionContainer, titleAnimatedStyle]}>
          <Card variant="glass" padding="large">
            <Text style={styles.descriptionText}>
              Un jugador es el <Text style={styles.highlightText}>impostor</Text> y no conoce la palabra secreta.
            </Text>
            <Text style={[styles.descriptionText, { marginTop: spacing.sm }]}>
              ¡Descúbrelo antes de que sea tarde!
            </Text>
          </Card>
        </Animated.View>

        {/* Buttons */}
        <Animated.View style={[styles.buttons, buttonsAnimatedStyle]}>
          <Button
            title="JUGAR"
            onPress={handlePlay}
            size="large"
            icon="play"
            fullWidth
          />
          <View style={styles.buttonSpacer} />
          <Button
            title="Cómo Jugar"
            onPress={handleHowToPlay}
            variant="ghost"
            size="medium"
            icon="help-circle-outline"
            fullWidth
          />
        </Animated.View>

        {/* Footer */}
        <Animated.View style={[styles.footer, buttonsAnimatedStyle]}>
          <View style={styles.footerBadge}>
            <Ionicons name="people" size={16} color={colors.text.secondary} />
            <Text style={styles.footerText}>4-30 jugadores</Text>
            <View style={styles.footerDot} />
            <Ionicons name="phone-portrait-outline" size={16} color={colors.text.secondary} />
            <Text style={styles.footerText}>Pasa el teléfono</Text>
          </View>

          {/* About/Info Button */}
          <Pressable onPress={handleAbout} style={styles.aboutButton}>
            <Ionicons name="information-circle-outline" size={20} color={colors.text.muted} />
            <Text style={styles.aboutText}>v{APP_VERSION}</Text>
          </Pressable>
        </Animated.View>
      </View>

      {/* How to Play Modal */}
      <Modal
        visible={showHowToPlay}
        transparent
        animationType="fade"
        onRequestClose={() => setShowHowToPlay(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Cómo Jugar</Text>
              <Pressable onPress={() => setShowHowToPlay(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              <View style={styles.ruleSection}>
                <View style={styles.ruleHeader}>
                  <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.ruleIcon}>
                    <Text style={styles.ruleNumber}>1</Text>
                  </LinearGradient>
                  <Text style={styles.ruleTitle}>Preparación</Text>
                </View>
                <Text style={styles.ruleText}>
                  Elige el número de jugadores, impostores y una categoría de palabras. Cada jugador recibirá una palabra secreta, excepto el impostor.
                </Text>
              </View>

              <View style={styles.ruleSection}>
                <View style={styles.ruleHeader}>
                  <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.ruleIcon}>
                    <Text style={styles.ruleNumber}>2</Text>
                  </LinearGradient>
                  <Text style={styles.ruleTitle}>Revelar Roles</Text>
                </View>
                <Text style={styles.ruleText}>
                  Pásense el teléfono. Cada jugador verá su rol en privado: la palabra secreta si es civil, o "Eres el Impostor" si lo es.
                </Text>
              </View>

              <View style={styles.ruleSection}>
                <View style={styles.ruleHeader}>
                  <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.ruleIcon}>
                    <Text style={styles.ruleNumber}>3</Text>
                  </LinearGradient>
                  <Text style={styles.ruleTitle}>Dar Pistas</Text>
                </View>
                <Text style={styles.ruleText}>
                  Por turnos, cada jugador dice UNA palabra relacionada con la palabra secreta. El impostor debe fingir que la conoce sin delatarse.
                </Text>
              </View>

              <View style={styles.ruleSection}>
                <View style={styles.ruleHeader}>
                  <LinearGradient colors={['#6366F1', '#8B5CF6']} style={styles.ruleIcon}>
                    <Text style={styles.ruleNumber}>4</Text>
                  </LinearGradient>
                  <Text style={styles.ruleTitle}>Votación</Text>
                </View>
                <Text style={styles.ruleText}>
                  Después de varias rondas de pistas, voten para eliminar al sospechoso. Si eliminan al impostor, ¡los civiles ganan!
                </Text>
              </View>

              <View style={styles.ruleSection}>
                <View style={styles.ruleHeader}>
                  <LinearGradient colors={['#F43F5E', '#EC4899']} style={styles.ruleIcon}>
                    <Ionicons name="skull" size={16} color={colors.white} />
                  </LinearGradient>
                  <Text style={styles.ruleTitle}>Última Oportunidad</Text>
                </View>
                <Text style={styles.ruleText}>
                  Si el impostor es descubierto, tiene una última oportunidad de adivinar la palabra secreta para ganar.
                </Text>
              </View>

              <View style={styles.tipsSection}>
                <Text style={styles.tipsTitle}>Consejos</Text>
                <View style={styles.tipItem}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success.main} />
                  <Text style={styles.tipText}>Da pistas que no sean demasiado obvias</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success.main} />
                  <Text style={styles.tipText}>Observa las reacciones de los demás</Text>
                </View>
                <View style={styles.tipItem}>
                  <Ionicons name="checkmark-circle" size={16} color={colors.success.main} />
                  <Text style={styles.tipText}>El impostor debe escuchar y adaptarse</Text>
                </View>
              </View>
            </ScrollView>

            <Button
              title="¡Entendido!"
              onPress={() => setShowHowToPlay(false)}
              size="large"
              fullWidth
            />
          </View>
        </View>
      </Modal>

      {/* About Modal */}
      <Modal
        visible={showAbout}
        transparent
        animationType="fade"
        onRequestClose={() => setShowAbout(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.aboutModalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Acerca de</Text>
              <Pressable onPress={() => setShowAbout(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text.primary} />
              </Pressable>
            </View>

            <View style={styles.aboutLogoSection}>
              <LinearGradient
                colors={['#6366F1', '#8B5CF6', '#A855F7']}
                style={styles.aboutLogo}
              >
                <Ionicons name="eye-off" size={32} color={colors.white} />
              </LinearGradient>
              <Text style={styles.aboutAppName}>El Impostor Party</Text>
              <Text style={styles.aboutVersion}>Versión {APP_VERSION}</Text>
            </View>

            <View style={styles.aboutLinks}>
              <Pressable style={styles.aboutLinkItem} onPress={() => openURL(PRIVACY_POLICY_URL)}>
                <Ionicons name="shield-checkmark" size={22} color={colors.primary.main} />
                <Text style={styles.aboutLinkText}>Política de Privacidad</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
              </Pressable>

              <Pressable style={styles.aboutLinkItem} onPress={() => openURL(TERMS_URL)}>
                <Ionicons name="document-text" size={22} color={colors.primary.main} />
                <Text style={styles.aboutLinkText}>Términos de Uso</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
              </Pressable>

              <Pressable style={styles.aboutLinkItem} onPress={openEmail}>
                <Ionicons name="mail" size={22} color={colors.primary.main} />
                <Text style={styles.aboutLinkText}>Contacto / Soporte</Text>
                <Ionicons name="chevron-forward" size={20} color={colors.text.muted} />
              </Pressable>
            </View>

            <View style={styles.aboutFooter}>
              <Text style={styles.aboutCopyright}>© 2024 DegenTech</Text>
              <Text style={styles.aboutMadeWith}>Hecho con ❤️ para fiestas</Text>
            </View>

            <Button
              title="Cerrar"
              onPress={() => setShowAbout(false)}
              variant="ghost"
              size="medium"
              fullWidth
            />
          </View>
        </View>
      </Modal>
    </AnimatedBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xl,
  },
  logoGlow: {
    position: 'absolute',
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: colors.glow.purple,
  },
  logoCircle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary.main,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
  },
  logoInner: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  title: {
    fontSize: 36,
    fontWeight: fontWeight.extrabold,
    color: colors.white,
    textAlign: 'center',
    letterSpacing: 2,
    textShadowColor: colors.glow.purple,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 20,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: colors.primary.light,
    marginTop: spacing.xs,
    letterSpacing: 2,
    textAlign: 'center',
  },
  descriptionContainer: {
    width: '100%',
    maxWidth: 340,
    marginBottom: spacing.xl,
  },
  descriptionText: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: 24,
  },
  highlightText: {
    color: colors.secondary.main,
    fontWeight: fontWeight.bold,
  },
  buttons: {
    width: '100%',
    maxWidth: 300,
  },
  buttonSpacer: {
    height: spacing.md,
  },
  footer: {
    position: 'absolute',
    bottom: spacing.xxl,
  },
  footerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.text.secondary,
    marginLeft: spacing.xs,
  },
  footerDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.text.muted,
    marginHorizontal: spacing.sm,
  },
  aboutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  aboutText: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 380,
    maxHeight: '85%',
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  aboutModalContent: {
    backgroundColor: colors.background.secondary,
    borderRadius: borderRadius.xxl,
    padding: spacing.xl,
    width: '100%',
    maxWidth: 340,
    borderWidth: 1,
    borderColor: colors.background.glassBorder,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  modalTitle: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.background.glass,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScroll: {
    marginBottom: spacing.lg,
  },
  // How to Play styles
  ruleSection: {
    marginBottom: spacing.lg,
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  ruleIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ruleNumber: {
    color: colors.white,
    fontSize: fontSize.md,
    fontWeight: fontWeight.bold,
  },
  ruleTitle: {
    color: colors.text.primary,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.semibold,
  },
  ruleText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
    lineHeight: 22,
    marginLeft: 48,
  },
  tipsSection: {
    backgroundColor: colors.background.glass,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  tipsTitle: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginBottom: spacing.sm,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.xs,
  },
  tipText: {
    color: colors.text.secondary,
    fontSize: fontSize.sm,
  },
  // About modal styles
  aboutLogoSection: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  aboutLogo: {
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  aboutAppName: {
    color: colors.text.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
  },
  aboutVersion: {
    color: colors.text.muted,
    fontSize: fontSize.sm,
    marginTop: spacing.xs,
  },
  aboutLinks: {
    marginBottom: spacing.lg,
  },
  aboutLinkItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.glass,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  aboutLinkText: {
    color: colors.text.primary,
    fontSize: fontSize.md,
    flex: 1,
  },
  aboutFooter: {
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  aboutCopyright: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
  },
  aboutMadeWith: {
    color: colors.text.muted,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
});
