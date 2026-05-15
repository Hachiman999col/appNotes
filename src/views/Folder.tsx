import {
  View,
  StyleSheet,
  Text,
  FlatList,
  useWindowDimensions,
  Pressable,
} from 'react-native';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import SearchInput from '../components/Form/SearchInput';
import { objColor } from '../styles/theme';

import BasicButtons from '../components/ui/Buttons';
import FolderCard from '../components/sections/Cards/FolderCard';
import TemplateModal from '../components/Modal/TemplateModal';
import IconsSvg from '../components/iconsSvg';
import BasicInput from '../components/Form/BasicInput';
import LinearGradient from 'react-native-linear-gradient';
import { RouterContext } from '../context/routerContext';
import { postCreatefolder } from '../core/db/dbPost';
import { getAllFolders, getNotesCount } from '../core/db/dbGet';
import { ResponseApiFolder } from '../core/db/types';
import { GeneralContext } from '../context/generalContext';
import Typography, { TypographyBasic } from '../components/ui/Typography';
import { palette, tokens } from '../styles/theme';

interface FolderType extends ResponseApiFolder {
  count: number;
}

const listIcons: string[] = ['home', 'search', 'folderPlus'];
const listColors: {
  name: string;
  colors: {
    light: string;
    main: string;
    dark: string;
  };
}[] = [
  { name: 'cardRed', colors: palette.card.red },
  { name: 'cardOrange', colors: palette.card.orange },
  { name: 'cardYellow', colors: palette.card.yellow },
  { name: 'cardGreen', colors: palette.card.green },
  { name: 'cardBlue', colors: palette.card.blue },
  { name: 'cardPurple', colors: palette.card.purple },
];

function NewFolder({
  onCancel,
  onReset,
}: {
  onCancel: () => void;
  onReset: () => void;
}) {
  const { width, height } = useWindowDimensions();
  const [iconSelect, setIconSelect] = useState<string>('');
  const [colorSelect, setColorSelect] = useState<string>('');
  const [valueTitle, setValueTitle] = useState<string>('');
  const [existFolder, setExistFolder] = useState<boolean>(false);

  const handleCreateData = async (
    title: string,
    icon: string,
    color: string,
  ) => {
    const today = new Date();
    const id = await postCreatefolder({
      title: title.trim(),
      icon,
      color,
      dateCreated: today.toISOString(),
    });

    if (typeof id === 'number') {
      onReset();
      onCancel();
    } else {
      onCancel();
    }
  };

  const handleEndEdit = async (txt: string) => {
    const folders = await getAllFolders();
    const names = folders.map(i => i.title.trim());
    const exit = names.includes(txt);
    setExistFolder(exit);
  };

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
          <IconsSvg
            name="arrowleft"
            strokeWidth={2}
            stroke={palette.text.primary}
          />
          <TypographyBasic>Volver</TypographyBasic>
        </Pressable>
        <TypographyBasic style={styles.titleModalTxt}>
          Nueva carpeta
        </TypographyBasic>
      </View>
      <View style={styles.container}>
        <BasicInput
          iconName="folderPlus"
          placeholder="Nombre de la carpeta"
          value={valueTitle}
          onChangeText={setValueTitle}
          onEndEditing={e => {
            const txt = e.nativeEvent.text;
            handleEndEdit(String(txt));
          }}
          error={existFolder}
          msjError="Este campo ya existe"
        />

        <View>
          <TypographyBasic style={styles.iconTitle}>
            Seleccione el icono
          </TypographyBasic>

          <FlatList
            data={listIcons}
            horizontal
            renderItem={({ item }) => (
              <Pressable
                style={[
                  styles.iconContainer,
                  item === iconSelect ? styles.iconActive : styles.iconDefault,
                ]}
                onPress={() => {
                  setIconSelect(item);
                }}
              >
                <IconsSvg
                  name={item}
                  strokeWidth={2}
                  stroke={
                    item === iconSelect ? palette.text.primary : palette.text.muted
                  }
                />
              </Pressable>
            )}
            keyExtractor={item => item}
            ListEmptyComponent={
              <View>
                <TypographyBasic style={styles.titleModalTxt}>
                  Sin Carpetas
                </TypographyBasic>
              </View>
            }
          />
        </View>

        <View>
          <TypographyBasic style={styles.iconTitle}>
            Perfil de color
          </TypographyBasic>
          <FlatList
            style={{
              height: height - 420,
            }}
            data={listColors}
            numColumns={2}
            columnWrapperStyle={styles.row}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <Pressable
                style={[styles.colorContainer, { height: width / 2 - 40 }]}
                onPress={() => {
                  setColorSelect(item.name);
                }}
              >
                <LinearGradient
                  style={styles.colorContainerGradient}
                  colors={
                    colorSelect === item.name
                      ? [item.colors.main, item.colors.dark]
                      : [item.colors.light, item.colors.main, item.colors.dark]
                  }
                >
                  <Text
                    style={[
                      styles.colorTxt,
                      {
                        color:
                          colorSelect === item.name
                            ? palette.text.primary
                            : item.colors.main,
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
                <Text style={{ color: palette.text.secondary }}>Sin Carpetas</Text>
              </View>
            }
          />
        </View>
      </View>
      <View>
        <BasicButtons
          onPress={() => {
            if (existFolder) return;
            if (!valueTitle) return;
            if (!iconSelect) return;
            if (!colorSelect) return;
            handleCreateData(valueTitle, iconSelect, colorSelect);
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
  const { setFolderName } = useContext(GeneralContext);
  const [filterValue, setFilterValue] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);
  const [data, setData] = useState<FolderType[]>([]);
  const getData = async (filter: string) => {
    const folders = await getAllFolders();
    const count = await getNotesCount();

    const dataRaw = folders.map(i => {
      const f = count.find(it => it.folder === i.title);
      return {
        ...i,
        count: f ? f.count : 0,
      };
    });

    const folderFilter = dataRaw.filter(i =>
      i.title.toLowerCase().includes(filter.toLowerCase()),
    );
    setData(folderFilter);
  };

  useEffect(() => {
    getData(filterValue);
  }, [filterValue]);

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
          onReset={() => {
            getData('');
          }}
        />
      </TemplateModal>
      <View style={styles.container}>
        <View style={styles.containerMain}>
          <Typography variant="title">Carpetas</Typography>
          <SearchInput
            placeholder="Buscar carpeta "
            onChange={txt => {
              setFilterValue(txt);
            }}
          />
          <View style={styles.container}>
            <FlatList
              data={data}
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
                  colorName={item.color as keyof typeof objColor}
                  iconName={item.icon}
                  count={item.count}
                  onPress={() => {
                    setFolderName(item.title);
                    navigate('folderNotes');
                  }}
                />
              )}
              keyExtractor={item => String(item.id)}
              ListEmptyComponent={
                <View>
                  <Text style={{ color: palette.text.secondary }}>Sin Carpetas</Text>
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
    paddingHorizontal: tokens.spacing.sm,
    backgroundColor: palette.bg.base,
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
    paddingHorizontal: tokens.spacing.sm,
    borderBottomWidth: 1,
    paddingBottom: tokens.spacing.sm,
    borderBottomColor: palette.border.DEFAULT,
    alignItems: 'center',
  },
  titleModalTxt: {
    fontSize: tokens.typography.size.md,
    fontWeight: tokens.typography.weight.semibold,
    color: palette.text.primary,
  },

  titleModalGoBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: tokens.spacing.sm,
  },

  iconTitle: {
    marginVertical: tokens.spacing.md,
    fontSize: tokens.typography.size.lg,
    fontWeight: tokens.typography.weight.semibold,
    color: palette.text.primary,
  },
  iconContainer: {
    padding: tokens.spacing.sm,
    borderWidth: 1,
    marginRight: tokens.spacing.md,
    borderRadius: tokens.radius.sm,
  },
  iconDefault: {
    borderColor: palette.border.DEFAULT,
    backgroundColor: palette.bg.surface,
  },
  iconActive: {
    borderColor: palette.accent.DEFAULT,
    backgroundColor: palette.accent.subtle,
  },

  colorContainer: {
    flex: 1,
    margin: tokens.spacing.sm,
    padding: tokens.spacing.sm,
  },
  colorContainerGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: tokens.radius.md,
  },
  colorTxt: {
    fontSize: tokens.typography.size.lg,
    fontWeight: tokens.typography.weight.semibold,
  },

  listContent: {
    paddingHorizontal: tokens.spacing.sm,
  },
  row: {
    justifyContent: 'space-between',
  },
});
