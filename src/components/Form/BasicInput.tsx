import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TextInputProps,
} from 'react-native';
import React from 'react';
import IconsSvg from '../iconsSvg';
import { palette, tokens } from '../../styles/theme';

interface Props extends TextInputProps {
  iconName?: string;
  error?: boolean;
  msjError?: string;
}

export default function BasicInput(props: Props) {
  const { iconName, value, onChangeText, error, msjError, ...argProps } = props;
  return (
    <View style={styles.containerInput}>
      <View
        style={[
          styles.searchSection,
          error && styles.searchSectionError,
        ]}
      >
        {iconName && (
          <IconsSvg
            name={iconName}
            stroke={palette.text.secondary}
            strokeWidth={2}
            style={styles.searchIcon}
          />
        )}

        <TextInput
          value={value}
          onChangeText={onChangeText}
          style={[
            styles.input,
            { color: palette.text.primary },
          ]}
          placeholderTextColor={palette.text.muted}
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
    paddingVertical: tokens.spacing.md,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: palette.bg.surface,
    borderRadius: tokens.radius.full,
    borderWidth: 1,
    borderColor: palette.border.DEFAULT,
    paddingHorizontal: tokens.spacing.md,
    height: 55,
  },
  searchSectionError: {
    borderColor: palette.error.DEFAULT,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    opacity: 0.7,
  },
  errorMsj: {
    paddingLeft: tokens.spacing.sm,
    marginTop: tokens.spacing.sm,
    color: palette.error.DEFAULT,
    fontSize: tokens.typography.size.sm,
  },
  input: {
    flex: 1,
    fontSize: tokens.typography.size.md,
    height: '100%',
  },
});
