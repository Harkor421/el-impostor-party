import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, borderRadius, fontSize, fontWeight } from '../../constants/theme';
import { useHaptics } from '../../hooks/useHaptics';
import { WordCategory } from '../../types';

interface CategorySelectorProps {
  categories: WordCategory[];
  selectedId: string | null;
  onSelect: (categoryId: string) => void;
}

export function CategorySelector({
  categories,
  selectedId,
  onSelect,
}: CategorySelectorProps) {
  const haptics = useHaptics();

  const handleSelect = (categoryId: string) => {
    haptics.selection();
    onSelect(categoryId);
  };

  const renderCategory = ({ item }: { item: WordCategory }) => {
    const isSelected = selectedId === item.id;

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => handleSelect(item.id)}
        activeOpacity={0.7}
      >
        <Ionicons
          name={item.icon as any}
          size={32}
          color={isSelected ? colors.white : colors.primary}
        />
        <Text style={[styles.name, isSelected && styles.nameSelected]}>
          {item.name}
        </Text>
        <Text style={[styles.count, isSelected && styles.countSelected]}>
          {item.words.length} palabras
        </Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark-circle" size={20} color={colors.white} />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elige una categoría</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: fontSize.xl,
    fontWeight: fontWeight.bold,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  list: {
    paddingBottom: spacing.lg,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  card: {
    width: '48%',
    backgroundColor: colors.backgroundCard,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryLight,
  },
  name: {
    color: colors.text,
    fontSize: fontSize.md,
    fontWeight: fontWeight.semibold,
    marginTop: spacing.sm,
    textAlign: 'center',
  },
  nameSelected: {
    color: colors.white,
  },
  count: {
    color: colors.textMuted,
    fontSize: fontSize.xs,
    marginTop: spacing.xs,
  },
  countSelected: {
    color: 'rgba(255,255,255,0.8)',
  },
  checkmark: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
  },
});
