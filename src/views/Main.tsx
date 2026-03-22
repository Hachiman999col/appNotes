import { View, StyleSheet } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';

import BoardNotes from '../components/sections/BoardNotes';
import SearchInput from '../components/Form/SearchInput';
import BasicButtons from '../components/ui/Buttons';
import { RouterContext } from '../context/routerContext';
import { getNotesWithFolderInfo } from '../core/db/dbGet';
import { Note } from '../core/db/types';
import Typography from '../components/ui/Typography';

export default function Main() {
  const { navigate } = useContext(RouterContext);
  const [data, setData] = useState<Note[]>([]);

  const [filterValue, setFilterValue] = useState<string>('');
  const handleAsync = async () => {
    const dataDb = await getNotesWithFolderInfo();

    setData(dataDb);
  };

  useEffect(() => {
    handleAsync();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <View style={styles.titleContainer}>
          <Typography variant="title">Mis notas</Typography>

          <BasicButtons
            icon="folderPlus"
            onPress={() => {
              navigate('note');
            }}
          >
            Nueva nota
          </BasicButtons>
        </View>
        <SearchInput
          value={filterValue}
          onChange={txt => {
            setFilterValue(txt);
          }}
        />
        <BoardNotes data={data} valueFilter={filterValue} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    paddingHorizontal: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  title: {
    fontWeight: '600',
    fontSize: 26,

    textAlign: 'left',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});
