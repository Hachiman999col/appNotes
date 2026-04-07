import { View, StyleSheet } from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import Table, { DataType } from '../components/ui/Table';
import BasicButtons from '../components/ui/Buttons';
import { getAllFolders, getAllNotes } from '../core/db/dbGet';
import { deleteAllFolders, deleteAllNotes } from '../core/db/dbDelete';
import { RouterContext } from '../context/routerContext';
import { TypographyBasic } from '../components/ui/Typography';

const calculateSizeInKb = (data: any[]): number => {
  const jsonString = JSON.stringify(data);
  const sizeInBytes = jsonString.length;
  const sizeInKb = sizeInBytes / 1024;
  return sizeInKb;
};

export default function Config() {
  const { navigate } = useContext(RouterContext);

  //states
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
  },
  containerMain: {
    flex: 1,
    paddingHorizontal: 8,
  },
  title: {
    fontWeight: '600',
    fontSize: 26,
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 18,
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  containerInput: {
    paddingVertical: 20,
    backgroundColor: '#f8f9fa',
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f3f6', // Color de fondo grisáceo suave del input
    borderRadius: 50, // Hace que sea totalmente ovalado
    paddingHorizontal: 15,
    height: 55, // Altura del input
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    opacity: 0.5, // Para que no se vea tan fuerte el emoji
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#495057', // Color del texto al escribir
    height: '100%',
  },
});
