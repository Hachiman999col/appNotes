import { StyleSheet, TextInput, View } from 'react-native';
import IconsSvg from '../iconsSvg';

interface Props {
  placeholder?: string;
}
export default function SearchInput(props: Props) {
  const { placeholder = 'Buscar toda...' } = props;
  return (
    <View style={styles.containerInput}>
      <View style={styles.searchSection}>
        {/* Icono de lupa usando Unicode */}

        <IconsSvg
          name="search"
          fill="#696b6e"
          strokeWidth={4}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#8e9aaf"
          underlineColorAndroid="transparent"
        />
      </View>
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
    backgroundColor: '#f1f3f6',
    borderRadius: 50,
    paddingHorizontal: 15,
    height: 55,
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
