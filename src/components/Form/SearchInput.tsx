import { StyleSheet, TextInput, View } from 'react-native';
import IconsSvg from '../iconsSvg';
import { palette, tokens } from '../../styles/theme';

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (txt: string) => void;
}
export default function SearchInput(props: Props) {
  const { placeholder = 'Buscar toda...', value, onChange } = props;
  return (
    <View style={styles.containerInput}>
      <View style={styles.searchSection}>
        <IconsSvg
          name="search"
          fill={palette.text.muted}
          strokeWidth={4}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={palette.text.muted}
          underlineColorAndroid="transparent"
          onChangeText={(txt: string) => {
            if (onChange) onChange(txt);
          }}
        />
      </View>
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
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    opacity: 0.7,
  },
  input: {
    flex: 1,
    fontSize: tokens.typography.size.md,
    color: palette.text.primary,
    height: '100%',
  },
});
