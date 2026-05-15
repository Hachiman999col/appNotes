import { View, StyleSheet } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Table, { DataType } from '../components/ui/Table';
import BasicButtons from '../components/ui/Buttons';
import { getAllFolders, getAllNotes } from '../core/db/dbGet';
import { deleteAllFolders, deleteAllNotes } from '../core/db/dbDelete';
import { RouterContext } from '../context/routerContext';
import { TypographyBasic } from '../components/ui/Typography';
import { palette, tokens } from '../styles/theme';

const calculateSizeInKb = (data: any[]): number => {
  const jsonString = JSON.stringify(data);
  const sizeInBytes = jsonString.length;
  const sizeInKb = sizeInBytes / 1024;
  return sizeInKb;
};

export default function Config() {
  const { navigate } = useContext(RouterContext);

  const [dataTable, setDataTable] = useState<DataType[]>([]);

  const handleGetData = useCallback(async () => {
    const notesDb = await getAllNotes();
    const foldersDb = await getAllFolders();

    setDataTable([
      {
        id: '1',
        name: 'carpetas',
        count: foldersDb.length,
        size: `${calculateSizeInKb(foldersDb).toFixed(2)} KB`,
      },
      {
        id: '2',
        name: 'notas',
        count: notesDb.length,
        size: `${calculateSizeInKb(notesDb).toFixed(2)} KB`,
      },
    ]);
  }, []);

  const handleDeleteAll = async () => {
    await deleteAllFolders();
    await deleteAllNotes();
    navigate('homeMain');
  };

  useEffect(() => {
    handleGetData();
    return () => {};
  }, [handleGetData]);

  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <TypographyBasic style={styles.title}>
          Datos del sistema
        </TypographyBasic>

        <View>
          <TypographyBasic style={styles.subTitle}>
            Info de notas
          </TypographyBasic>
          <Table
            data={dataTable}
            header={[
              {
                label: 'Nombre',
                name: 'name',
              },
              {
                label: 'Cantidad',
                name: 'count',
              },
              {
                label: 'Tamaño',
                name: 'size',
              },
            ]}
          />
        </View>

        <View>
          <TypographyBasic style={styles.subTitle}>
            Borrado del sistema
          </TypographyBasic>
          <BasicButtons
            variant="error"
            onPress={() => {
              handleDeleteAll();
            }}
          >
            Borrar todos los datos
          </BasicButtons>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: palette.bg.base,
  },
  containerMain: {
    flex: 1,
    paddingHorizontal: tokens.spacing.sm,
  },
  title: {
    fontWeight: tokens.typography.weight.semibold,
    fontSize: tokens.typography.size.xl,
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
    color: palette.text.primary,
  },
  subTitle: {
    fontWeight: tokens.typography.weight.medium,
    fontSize: tokens.typography.size.md,
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
    color: palette.text.secondary,
  },
});
