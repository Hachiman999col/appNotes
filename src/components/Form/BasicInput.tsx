import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TextInputProps,
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
  return (
    <View style={styles.containerInput}>
      <View style={styles.searchSection}>
        {iconName && (
          <IconsSvg
            name={iconName}
            stroke="#696b6e"
            strokeWidth={2}
            style={styles.searchIcon}
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={styles.input}
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
  errorMsj: {
    paddingLeft: 4,
    marginTop: 6,
    color: colors.cardRed.dark,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#495057', // Color del texto al escribir
    height: '100%',
  },
});
