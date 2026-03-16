import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';

import BoardNotes from '../components/sections/BoardNotes';
import SearchInput from '../components/Form/SearchInput';
import BasicButtons from '../components/ui/Buttons';
import { RouterContext } from '../context/routerContext';
import { colors } from '../styles/color';
import IconsSvg from '../components/iconsSvg';
import { GeneralContext } from '../context/generalContext';
import { getFolderByTitle, getNotesByFolder } from '../core/db/dbGet';
import { Note } from '../core/db/types';
import { deleteFolder, deleteNote } from '../core/db/dbDelete';

export default function FolderNotes() {
  const { navigate } = useContext(RouterContext);

  const { folder } = useContext(GeneralContext);

  const [data, setData] = useState<Note[]>([]);
  const [filterValue, setFilterValue] = useState<string>('');

  const handleGetData = useCallback(async (folderName: string) => {
    const notes = await getNotesByFolder(folderName);
    const folderRaw = await getFolderByTitle(folderName);
    if (!folderRaw) return;
    const newData: Note[] = notes.map(item => {
      return {
        ...item,
        folderColor: folderRaw.color,
        folderIcon: folderRaw.icon,
      };
    });
    setData(newData);
  }, []);

  const handleDelete = useCallback(async () => {
    if (!folder) return;

    const dataDb = await getFolderByTitle(folder);
    if (!dataDb) return;
    await deleteFolder(dataDb.id);

    const listPromise = data.map(i => deleteNote(i.id));

    await Promise.all(listPromise);

    navigate('folderMain');
  }, [folder, data, navigate]);
  useEffect(() => {
    if (!folder) return;

    handleGetData(folder);

    return () => {};
  }, [folder, handleGetData]);

  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <View style={styles.titleContainer}>
          <Pressable
            style={styles.titleModalGoBack}
            onPress={() => {
              navigate('folderMain');
            }}
          >
            <IconsSvg name="arrowleft" strokeWidth={2} />
            <Text>Volver</Text>
          </Pressable>
          <BasicButtons
            icon="folderPlus"
            onPress={() => {
              navigate('note');
            }}
          >
            Nueva nota
          </BasicButtons>
        </View>
        <Text style={styles.title}>Carpeta {folder}</Text>
        <SearchInput
          value={filterValue}
          onChange={txt => {
            setFilterValue(txt);
          }}
        />
        <BoardNotes data={data} valueFilter={filterValue} />
        {folder !== 'Default' && (
          <View>
            <BasicButtons
              variant="error"
              icon={'folder'}
              onPress={() => {
                handleDelete();
              }}
            >
              Borrar carpeta
            </BasicButtons>
          </View>
        )}
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
  titleModalGoBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    color: colors.cardPurple.dark,
  },
});
