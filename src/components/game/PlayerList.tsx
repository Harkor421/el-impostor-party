import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { PlayerCard } from './PlayerCard';
import { Player } from '../../types';
import { spacing } from '../../constants/theme';

interface PlayerListProps {
  players: Player[];
  onPlayerPress?: (player: Player) => void;
  onPlayerRemove?: (playerId: string) => void;
  selectedPlayerId?: string;
  showScores?: boolean;
  showRoles?: boolean;
  votes?: Record<string, string>;
  compact?: boolean;
  horizontal?: boolean;
}

export function PlayerList({
  players,
  onPlayerPress,
  onPlayerRemove,
  selectedPlayerId,
  showScores = false,
  showRoles = false,
  votes = {},
  compact = false,
  horizontal = false,
}: PlayerListProps) {
  const getVotesForPlayer = (playerId: string): number => {
    return Object.values(votes).filter((v) => v === playerId).length;
  };

  if (horizontal) {
    return (
      <FlatList
        data={players}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.horizontalList}
        renderItem={({ item }) => (
          <PlayerCard
            player={item}
            onPress={onPlayerPress ? () => onPlayerPress(item) : undefined}
            onRemove={onPlayerRemove ? () => onPlayerRemove(item.id) : undefined}
            selected={selectedPlayerId === item.id}
            showScore={showScores}
            showRole={showRoles}
            votesReceived={getVotesForPlayer(item.id)}
            compact={compact}
          />
        )}
      />
    );
  }

  return (
    <View style={styles.container}>
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          onPress={onPlayerPress ? () => onPlayerPress(player) : undefined}
          onRemove={onPlayerRemove ? () => onPlayerRemove(player.id) : undefined}
          selected={selectedPlayerId === player.id}
          showScore={showScores}
          showRole={showRoles}
          votesReceived={getVotesForPlayer(player.id)}
          compact={compact}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  horizontalList: {
    paddingHorizontal: spacing.md,
  },
});
