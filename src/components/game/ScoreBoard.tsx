import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';
import { Avatar } from '../ui/Avatar';
import { Player } from '../../types';

interface ScoreBoardProps {
  players: Player[];
  showRoles?: boolean;
}

export function ScoreBoard({ players, showRoles = false }: ScoreBoardProps) {
  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);

  const getMedalColor = (index: number): string | null => {
    switch (index) {
      case 0:
        return '#FFD700'; // Gold
      case 1:
        return '#C0C0C0'; // Silver
      case 2:
        return '#CD7F32'; // Bronze
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puntuaciones</Text>

      {sortedPlayers.map((player, index) => {
        const medalColor = getMedalColor(index);

        return (
          <View key={player.id} style={styles.row}>
            <View style={styles.rank}>
              {medalColor ? (
                <Ionicons name="medal" size={24} color={medalColor} />
              ) : (
                <Text style={styles.rankNumber}>{index + 1}</Text>
              )}
            </View>

            <Avatar
              name={player.name}
              color={player.color}
              size="small"
              isEliminated={player.isEliminated}
            />

            <View style={styles.info}>
              <Text style={styles.name} numberOfLines={1}>
                {player.name}
              </Text>
              {showRoles && (
                <Text
                  style={[
                    styles.role,
                    player.isImpostor ? styles.impostorRole : styles.civilRole,
                  ]}
                >
                  {player.isImpostor ? 'Impostor' : 'Civil'}
                </Text>
              )}
            </View>

            <Text style={styles.score}>{player.score}</Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rank: {
    width: 36,
    alignItems: 'center',
  },
  rankNumber: {
    color: colors.textMuted,
    fontSize: fontSize.lg,
    fontWeight: fontWeight.bold,
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  name: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.medium,
  },
  role: {
    fontSize: fontSize.xs,
    marginTop: 2,
  },
  impostorRole: {
    color: colors.error,
  },
  civilRole: {
    color: colors.success,
  },
  score: {
    color: colors.primary,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    minWidth: 60,
    textAlign: 'right',
  },
});
