import { View, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import CardNote from './CardNote';

import { Note } from '../../../core/db/types';
// Datos de ejemplo

export default function BoardNotes({ data }: { data: Note[] }) {
  const numColumns = 2;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <CardNote
            colums={numColumns}
            color={item.folderColor}
            title={item.title}
            content={item.content}
            time={item.dateCreated}
          />
        )}
        keyExtractor={item => String(item.id)}
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
