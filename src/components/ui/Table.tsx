import { View, Text, StyleSheet, FlatList } from 'react-native';
import React from 'react';
import { palette, tokens } from '../../styles/theme';
import { TypographyBasic } from './Typography';

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
                <TypographyBasic
                  key={
                    item.name + index.toString() + indexK.toString() + 'cell'
                  }
                  style={[styles.cell, { flex: itemK?.flex || 1 }]}
                >
                  {item[itemK.name]}
                </TypographyBasic>
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
    padding: tokens.spacing.md,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: palette.bg.surface,
    borderBottomWidth: 1,
    borderBottomColor: palette.border.light,
    paddingVertical: tokens.spacing.sm + 2,
    borderRadius: tokens.radius.md,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: palette.border.DEFAULT,
    paddingVertical: tokens.spacing.sm + 4,
  },
  columnHeader: {
    fontWeight: tokens.typography.weight.bold,
    color: palette.accent.DEFAULT,
    textAlign: 'center',
    fontSize: tokens.typography.size.sm,
  },
  cell: {
    textAlign: 'center',
    fontSize: tokens.typography.size.sm,
    color: palette.text.secondary,
  },
});
