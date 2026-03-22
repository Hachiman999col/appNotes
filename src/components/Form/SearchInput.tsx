import { StyleSheet, TextInput, useColorScheme, View } from 'react-native';
import IconsSvg from '../iconsSvg';

interface Props {
  placeholder?: string;
  value?: string;
  onChange?: (txt: string) => void;
}
export default function SearchInput(props: Props) {
  const { placeholder = 'Buscar toda...', value, onChange } = props;
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.containerInput}>
      <View
        style={[
          styles.searchSection,
          isDarkMode ? styles.searchSectionDark : styles.searchSectionLight,
        ]}
      >
        {/* Icono de lupa usando Unicode */}

        <IconsSvg
          name="search"
          fill="#696b6e"
          strokeWidth={4}
          style={styles.searchIcon}
        />
        <TextInput
          value={value}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8e9aaf"
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
    paddingVertical: 20,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',

    borderRadius: 50,
    paddingHorizontal: 15,
    height: 55,
  },
  searchSectionDark: {
    borderColor: '#f1f3f6',
    borderWidth: 2,
    borderRadius: 50,
  },
  searchSectionLight: {
    backgroundColor: '#f1f3f6',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
    opacity: 0.5,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#495057',
    height: '100%',
  },
});
