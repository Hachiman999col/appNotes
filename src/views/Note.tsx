import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import React, { useContext } from 'react';
import { colors } from '../styles/color';
import IconsSvg from '../components/iconsSvg';
import { RouterContext } from '../context/routerContext';
import BasicButtons from '../components/ui/Buttons';
import useKeyBoardStatus from '../hooks/useKeyBoardStatus';

export default function Note() {
  const { height } = useWindowDimensions();
  const isActive = useKeyBoardStatus();
  const { goBack } = useContext(RouterContext);
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
              goBack();
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
