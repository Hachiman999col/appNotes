import {
  View,
  StyleSheet,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import React, { Fragment, useContext, useState } from 'react';
import SearchInput from '../components/Form/SearchInput';
import { colors } from '../styles/color';

import BasicButtons from '../components/ui/Buttons';
import FolderCard from '../components/sections/Cards/FolderCard';
import TemplateModal from '../components/Modal/TemplateModal';
import IconsSvg from '../components/iconsSvg';
import BasicInput from '../components/Form/BasicInput';
import LinearGradient from 'react-native-linear-gradient';
import { RouterContext } from '../context/routerContext';
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

const listIcons: string[] = ['home', 'search', 'folderPlus'];
const listColors: {
  name: string;
  colors: {
    light: string;
    main: string;
    dark: string;
  };
}[] = [
  {
    name: 'Rojo',
    colors: colors.cardRed,
  },
  {
    name: 'Naranja',
    colors: colors.cardOrange,
  },
  {
    name: 'Amarillo',
    colors: colors.cardYellow,
  },
  {
    name: 'Verde',
    colors: colors.cardGreen,
  },
  {
    name: 'Azul',
    colors: colors.cardBlue,
  },
  {
    name: 'Violeta',
    colors: colors.cardPurple,
  },
];
function NewFolder({ onCancel }: { onCancel: () => void }) {
  const { width, height } = useWindowDimensions();
  //states
  const [iconSelect, setIconSelect] = useState<number>(-1);
  const [colorSelect, setColorSelect] = useState<number>(-1);
  return (
    <View
      style={[
        styles.containerMain,
        {
          height: height,

          width: width,
        },
      ]}
    >
      <View style={styles.titleModal}>
        <Pressable
          style={styles.titleModalGoBack}
          onPress={() => {
            onCancel();
          }}
        >
          <IconsSvg name="arrowleft" strokeWidth={2} />
          <Text>Volver</Text>
        </Pressable>
        <Text style={styles.titleModalTxt}>Nueva carpeta</Text>
      </View>
      <View style={styles.container}>
        <BasicInput iconName="folderPlus" placeholder="Nombre de la carpeta" />

        <View>
          <Text style={styles.iconTitle}>Seleccione el icono</Text>
          <FlatList
            data={listIcons}
            horizontal
            renderItem={({ item, index }) => (
              <Pressable
                style={[
                  styles.iconContainer,
                  index === iconSelect ? styles.iconActive : styles.iconDefault,
                ]}
                onPress={() => {
                  setIconSelect(index);
                }}
              >
                <IconsSvg
                  name={item}
                  strokeWidth={2}
                  stroke={
                    index === iconSelect ? colors.white : colors.cardPurple.dark
                  }
                />
              </Pressable>
            )}
            keyExtractor={item => item}
            ListEmptyComponent={
              <View>
                <Text>Sin Carpetas</Text>
              </View>
            }
          />
        </View>

        <View>
          <Text style={styles.iconTitle}>Perfil de color</Text>
          <FlatList
            style={{
              height: height - 420,
            }}
            data={listColors}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            renderItem={({ item, index }) => (
              <Pressable
                style={[styles.colorContainer, { height: width / 2 - 40 }]}
                onPress={() => {
                  setColorSelect(index);
                }}
              >
                <LinearGradient
                  style={styles.colorContainerGradient}
                  colors={
                    colorSelect === index
                      ? [item.colors.main, item.colors.dark]
                      : [item.colors.light, item.colors.main, item.colors.dark]
                  }
                >
                  <Text
                    style={[
                      styles.colorTxt,
                      {
                        color:
                          colorSelect === index
                            ? colors.white
                            : item.colors.dark,
                      },
                    ]}
                  >
                    {item.name}
                  </Text>
                </LinearGradient>
              </Pressable>
            )}
            keyExtractor={item => item.name}
            ListEmptyComponent={
              <View>
                <Text>Sin Carpetas</Text>
              </View>
            }
          />
        </View>
      </View>
      <View>
        <BasicButtons
          onPress={() => {
            onCancel();
          }}
        >
          Guardar
        </BasicButtons>
      </View>
    </View>
  );
}

export default function Folder() {
  const { navigate } = useContext(RouterContext);

  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <Fragment>
      <TemplateModal
        open={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <NewFolder
          onCancel={() => {
            setShowModal(false);
          }}
        />
      </TemplateModal>
      <View style={styles.container}>
        <View style={styles.containerMain}>
          <Text style={styles.title}>Carpetas</Text>
          <SearchInput placeholder="Buscar carpeta " />
          <View style={styles.container}>
            <FlatList
              data={DATA}
              initialNumToRender={10}
              maxToRenderPerBatch={10}
              windowSize={5}
              getItemLayout={(_, index) => ({
                length: 60,
                offset: 60 * index,
                index,
              })}
              renderItem={({ item }) => (
                <FolderCard
                  title={item.title}
                  colorName={'cardGreen'}
                  iconName={'home'}
                  count={1}
                  onPress={() => {
                    navigate('folderNotes');
                  }}
                />
              )}
              keyExtractor={item => item.id}
              ListEmptyComponent={
                <View>
                  <Text>Sin Carpetas</Text>
                </View>
              }
            />
          </View>
          <View>
            <BasicButtons
              icon={'folderPlus'}
              onPress={() => {
                setShowModal(true);
              }}
            >
              Agregar carpeta
            </BasicButtons>
          </View>
        </View>
      </View>
    </Fragment>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerMain: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
  },
  title: {
    fontWeight: '600',
    fontSize: 26,
    width: '100%',
    textAlign: 'left',
    paddingHorizontal: 8,
    marginBottom: 8,
  },

  titleModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    paddingBottom: 8,
    borderBottomColor: colors.cardPurple.light,
  },
  titleModalTxt: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.cardPurple.dark,
  },

  titleModalGoBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    color: colors.cardPurple.dark,
  },

  //
  iconTitle: {
    marginVertical: 16,
    fontSize: 22,
    fontWeight: '600',
  },
  iconContainer: {
    padding: 6,

    borderWidth: 1,
    marginRight: 16,
    borderRadius: 8,
  },
  iconDefault: {
    borderColor: colors.cardPurple.dark,
    backgroundColor: colors.cardPurple.light,
  },
  iconActive: {
    borderColor: colors.cardPurple.light,
    backgroundColor: colors.cardPurple.main,
  },
  //

  colorContainer: {
    flex: 1,
    margin: 8,
    padding: 8,
  },
  colorContainerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  colorTxt: {
    fontSize: 24,
    fontWeight: '600',
  },

  listContent: {
    paddingHorizontal: 10,
  },
  row: {
    justifyContent: 'space-between',
  },
});
