import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, { useCallback, useContext, useState } from 'react';
import { colors } from '../styles/color';
import IconsSvg from '../components/iconsSvg';
import { RouterContext } from '../context/routerContext';
import BasicButtons from '../components/ui/Buttons';
import useKeyBoardStatus from '../hooks/useKeyBoardStatus';
import { GeneralContext } from '../context/generalContext';
import { postCreateNote } from '../core/db/dbPost';

export default function Note() {
  const { height } = useWindowDimensions();
  const isActive = useKeyBoardStatus();
  const { goBack } = useContext(RouterContext);
  const { folder } = useContext(GeneralContext);

  const [title, setTitle] = useState<string>('');
  const [content, setContect] = useState<string>('');
  const handleSave = useCallback(async () => {
    const today = new Date();
    await postCreateNote({
      title: title,
      content: content,
      dateCreated: today.toISOString(),
      folder: folder,
    });

    goBack();
  }, [title, content, folder, goBack]);
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
            <IconsSvg name="arrowleft" strokeWidth={2} />
            <Text>Volver</Text>
          </Pressable>
          <Text style={styles.titleModalTxt}>Nueva nota</Text>
        </View>
        <View style={styles.contentTitle}>
          <TextInput
            style={styles.inputTitle}
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
              { height: height - 250 - (isActive ? 300 : 0) },
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
            Guardar Nota
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
    fontSize: 18,
    fontWeight: '600',
    color: colors.cardPurple.dark,
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
    color: '#696b6e',
  },
  inputNote: {
    fontSize: 16,
    fontWeight: '600',
    color: '#696b6e',
  },
});
