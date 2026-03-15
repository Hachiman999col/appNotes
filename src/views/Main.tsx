import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';

import BoardNotes from '../components/sections/BoardNotes';
import SearchInput from '../components/Form/SearchInput';
import BasicButtons from '../components/ui/Buttons';
import { RouterContext } from '../context/routerContext';

export default function Main() {
  const { navigate } = useContext(RouterContext);
  return (
    <View style={styles.container}>
      <View style={styles.containerMain}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Mis notas</Text>
          <BasicButtons
            icon="folderPlus"
            onPress={() => {
              navigate('note');
            }}
          >
            Nueva nota
          </BasicButtons>
        </View>
        <SearchInput />
        <BoardNotes />
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
