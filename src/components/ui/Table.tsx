import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { colors } from '../../styles/color';

export type DataType = {
  id: string | number;
  [k: string]: string | number;
};

type HeaderType = {
  label: string;
  name: string;
  flex?: number;
};

function TableHeader({ header }: { header: HeaderType[] }) {
  return (
    <View style={styles.header}>
      {header.map(item => {
        return (
          <Text
            key={item.name}
            style={[styles.columnHeader, { flex: item?.flex || 1 }]}
          >
            {item.label}
          </Text>
        );
      })}
    </View>
  );
}

export default function Table({
  data,
  header,
}: {
  data: DataType[];
  header: HeaderType[];
}) {
  return (
    <View style={styles.container}>
      <TableHeader header={header} />
      <FlatList
        data={data}
        keyExtractor={item => String(item.id)}
        renderItem={({ item, index }) => (
          <View style={styles.row}>
            {header.map((itemK, indexK) => {
              return (
                <Text
                  key={
                    item.name + index.toString() + indexK.toString() + 'cell'
                  }
                  style={[styles.cell, { flex: itemK?.flex || 1 }]}
                >
                  {item[itemK.name]}
                </Text>
              );
            })}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: colors.cardPurple.dark,
    borderBottomWidth: 2,
    borderBottomColor: colors.cardPurple.light,
    paddingVertical: 10,
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 12,
  },
  columnHeader: {
    fontWeight: 'bold',
    color: colors.white,
    textAlign: 'center',
  },
  cell: {
    textAlign: 'center',
    color: colors.cardPurple.dark,
    fontSize: 14,
  },
});
