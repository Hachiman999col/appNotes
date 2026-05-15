import {
  View,
  StyleSheet,
  Pressable,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { palette, tokens } from '../styles/theme';
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
              stroke={palette.text.primary}
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
                { color: palette.accent.DEFAULT },
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
              { color: palette.text.primary },
            ]}
            placeholder="Titulo"
            placeholderTextColor={palette.text.muted}
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
                color: palette.text.secondary,
              },
            ]}
            value={content}
            onChangeText={setContect}
            placeholder="Escribir nota..."
            placeholderTextColor={palette.text.muted}
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
    backgroundColor: palette.bg.base,
  },
  containerMain: {
    flex: 1,
    paddingHorizontal: tokens.spacing.sm,
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
    gap: tokens.spacing.sm,
  },
  titleModalTxt: {
    paddingTop: 10,
    fontSize: tokens.typography.size.md,
    fontWeight: tokens.typography.weight.semibold,
  },

  contentTitle: {
    marginBottom: tokens.spacing.md,
  },
  contentNote: {
    flex: 1,
  },
  inputTitle: {
    fontSize: tokens.typography.size.xl,
    fontWeight: tokens.typography.weight.semibold,
  },
  inputNote: {
    fontSize: tokens.typography.size.md,
    fontWeight: tokens.typography.weight.medium,
  },
});
