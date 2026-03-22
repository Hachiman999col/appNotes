import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { colors } from '../styles/color';
import IconsSvg from '../components/iconsSvg';
import { RouterContext } from '../context/routerContext';
import BasicButtons from '../components/ui/Buttons';
import useKeyBoardStatus from '../hooks/useKeyBoardStatus';
import { GeneralContext } from '../context/generalContext';
import { postCreateNote } from '../core/db/dbPost';
import { getNotesByid } from '../core/db/dbGet';
import { ResponseApiNote } from '../core/db/types';
import { putNote } from '../core/db/dbPut';
import { deleteNote } from '../core/db/dbDelete';
import { TypographyBasic } from '../components/ui/Typography';

export default function Note() {
  const { height } = useWindowDimensions();

  const isActive = useKeyBoardStatus();
  const { goBack } = useContext(RouterContext);
  const { folder, idNote, setIdNoteDb } = useContext(GeneralContext);
  const isDarkMode = useColorScheme() === 'dark';
  const [title, setTitle] = useState<string>('');
  const [content, setContect] = useState<string>('');

  const [prevData, setPrevData] = useState<ResponseApiNote | null>(null);

  const handleDelete = async (id: number) => {
    if (typeof id !== 'number') return;
    await deleteNote(id);

    goBack();
  };
  const handleSave = useCallback(async () => {
    const today = new Date();

    if (prevData) {
      await putNote({
        id: prevData.id,
        title: title,
        content: content,
        dateCreated: today.toISOString(),
      });
    } else {
      await postCreateNote({
        title: title,
        content: content,
        dateCreated: today.toISOString(),
        folder: folder || 'Default',
      });
    }

    goBack();
  }, [title, content, folder, goBack, prevData]);

  const handleGetData = useCallback(async () => {
    if (!idNote) return;

    const data = await getNotesByid(idNote);
    if (!data) return;
    setTitle(data.title);
    setContect(data.content);
    setPrevData(data);
  }, [idNote]);

  useEffect(() => {
    if (!idNote) return;
    handleGetData();
    return () => {
      setIdNoteDb();
    };
  }, [idNote, handleGetData, setIdNoteDb]);

  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <View style={styles.titleContainer}>
          <Pressable
            style={styles.titleModalGoBack}
            onPress={() => {
              goBack();
            }}
          >
            <IconsSvg
              name="arrowleft"
              strokeWidth={2}
              stroke={isDarkMode ? colors.white : colors.dark}
            />
            <TypographyBasic>Volver</TypographyBasic>
          </Pressable>

          {prevData ? (
            <BasicButtons
              icon="folder"
              variant="error"
              onPress={() => {
                handleDelete(prevData.id);
              }}
            >
              Borrar nota
            </BasicButtons>
          ) : (
            <TypographyBasic
              style={[
                styles.titleModalTxt,
                {
                  color: isDarkMode
                    ? colors.cardPurple.light
                    : colors.cardPurple.dark,
                },
              ]}
            >
              Nueva nota
            </TypographyBasic>
          )}
        </View>
        <View style={styles.contentTitle}>
          <TextInput
            style={[
              styles.inputTitle,
              { color: isDarkMode ? colors.white : '#696b6e' },
            ]}
            placeholder="Titulo"
            placeholderTextColor="#8e9aaf"
            value={title}
            onChangeText={setTitle}
          />
        </View>

        <View
          style={{
            height: height - 250 - (isActive ? 300 : 0),
          }}
        >
          <TextInput
            style={[
              styles.inputNote,
              {
                height: height - 250 - (isActive ? 300 : 0),

                color: isDarkMode ? colors.white : '#696b6e',
              },
            ]}
            value={content}
            onChangeText={setContect}
            placeholder="Escribir nota..."
            placeholderTextColor="#8e9aaf"
            multiline={true}
            numberOfLines={6}
            textAlignVertical="top"
          />
        </View>
        <View>
          <BasicButtons
            icon={'folderPlus'}
            onPress={() => {
              handleSave();
            }}
          >
            {prevData ? 'Actualizar Nota' : 'Guardar Nota'}
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
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleModalGoBack: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    color: colors.cardPurple.dark,
  },
  titleModalTxt: {
    paddingTop: 10,
    fontSize: 18,
    fontWeight: '600',
  },

  contentTitle: {
    marginBottom: 16,
  },
  contentNote: {
    flex: 1,
  },
  inputTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  inputNote: {
    fontSize: 16,
    fontWeight: '600',
  },
});
