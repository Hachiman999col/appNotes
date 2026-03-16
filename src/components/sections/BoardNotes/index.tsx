import { View, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import CardNote from './CardNote';

import { Note } from '../../../core/db/types';
// Datos de ejemplo

export default function BoardNotes({
  data,
  valueFilter,
}: {
  data: Note[];
  valueFilter?: string;
}) {
  const numColumns = 2;

  const [internalData, setInternalData] = useState<Note[]>(data || []);
  useEffect(() => {
    if (!valueFilter) {
      setInternalData(data);
      return;
    }
    const vf = valueFilter.trim().toLowerCase();
    const dataFilter = data.filter(note =>
      note.title.trim().toLowerCase().includes(vf),
    );
    setInternalData(dataFilter);

    return () => {};
  }, [valueFilter, data]);

  return (
    <View style={styles.container}>
      <FlatList
        data={internalData}
        renderItem={({ item }) => (
          <CardNote
            id={item.id}
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
