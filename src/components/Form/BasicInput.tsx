import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TextInputProps,
  useColorScheme,
} from 'react-native';
import React from 'react';
import IconsSvg from '../iconsSvg';
import { colors } from '../../styles/color';

interface Props extends TextInputProps {
  iconName?: string;
  error?: boolean;
  msjError?: string;
}

export default function BasicInput(props: Props) {
  const { iconName, value, onChangeText, error, msjError, ...argProps } = props;
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.containerInput}>
      <View
        style={isDarkMode ? styles.searchSectionDark : styles.searchSection}
      >
        {iconName && (
          <IconsSvg
            name={iconName}
            stroke={isDarkMode ? colors.white : '#696b6e'}
            strokeWidth={2}
            style={styles.searchIcon}
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            { color: isDarkMode ? colors.white : '#495057' },
          ]}
          placeholderTextColor="#8e9aaf"
          underlineColorAndroid="transparent"
          {...argProps}
        />
      </View>
      {error && (
        <Text style={styles.errorMsj}>{msjError || 'Error en el campo'}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    paddingVertical: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 15,
    height: 55,
  },
  searchSectionDark: {
    borderColor: '#f1f3f6',
    borderWidth: 2,
    borderRadius: 50,

    flexDirection: 'row',
    alignItems: 'center',

    paddingHorizontal: 15,
    height: 55,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    opacity: 0.5,
  },
  errorMsj: {
    paddingLeft: 4,
    marginTop: 6,
    color: colors.cardRed.dark,
  },
  input: {
    flex: 1,
    fontSize: 18,

    height: '100%',
  },
});
