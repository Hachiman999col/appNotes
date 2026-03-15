import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import CardNote from './CardNote';
import { colors } from '../../../styles/color';
// Datos de ejemplo
const DATA = [
  { id: '1', title: 'Nota 1', color: colors.cardRed.light },
  { id: '2', title: 'Nota 2', color: colors.cardOrange.light },
  { id: '3', title: 'Nota 3', color: colors.cardYellow.light },
  { id: '4', title: 'Nota 4', color: colors.cardGreen.light },
  { id: '5', title: 'Nota 5', color: colors.cardBlue.light },
  { id: '6', title: 'Nota 6', color: colors.cardPurple.light },

  { id: '7', title: 'Nota 7', color: colors.cardRed.light },
  { id: '8', title: 'Nota 8', color: colors.cardOrange.light },
  { id: '9', title: 'Nota 9', color: colors.cardYellow.light },
  { id: '10', title: 'Nota 10', color: colors.cardGreen.light },
  { id: '11', title: 'Nota 11', color: colors.cardBlue.light },
  { id: '12', title: 'Nota 12', color: colors.cardPurple.light },
];
export default function BoardNotes() {
  const numColumns = 2;

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <CardNote colums={numColumns} color={item.color} title={item.title} />
        )}
        keyExtractor={item => item.id}
        numColumns={numColumns}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  listContent: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
});
