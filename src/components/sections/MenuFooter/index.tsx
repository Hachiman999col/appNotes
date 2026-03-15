import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, { useContext } from 'react';
import IconsSvg from '../../iconsSvg';
import { RouterContext } from '../../../context/routerContext';
import { colors } from '../../../styles/color';
import { GeneralContext } from '../../../context/generalContext';

const width = Dimensions.get('window').width;
export default function MenuFooter() {
  const { routeName, navigate } = useContext(RouterContext);
  const { setFolderName } = useContext(GeneralContext);
  const goPath = (name: string) => {
    setFolderName('');
    navigate(name);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.iconMenu]}
        onPress={() => {
          goPath('homeMain');
        }}
      >
        <IconsSvg
          name="home"
          strokeWidth={2}
          fill={routeName.includes('home') ? colors.orangeDark : 'none'}
          stroke={routeName.includes('home') ? colors.orangeDark : '#495057'}
        />
        <Text
          style={[
            styles.menuText,
            routeName.includes('home') && styles.menuTextActive,
          ]}
        >
          Home
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconMenu]}
        onPress={() => {
          goPath('folderMain');
        }}
      >
        <IconsSvg
          name="folder"
          strokeWidth={2}
          fill={routeName.includes('folder') ? colors.orangeDark : 'none'}
          stroke={routeName.includes('folder') ? colors.orangeDark : '#495057'}
        />
        <Text
          style={[
            styles.menuText,
            routeName.includes('folder') && styles.menuTextActive,
          ]}
        >
          Carpetas
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.iconMenu]}
        onPress={() => {
          goPath('configMain');
        }}
      >
        <IconsSvg
          name="gear"
          strokeWidth={2}
          fill={routeName.includes('config') ? colors.orangeDark : 'none'}
          stroke={routeName.includes('config') ? colors.orangeDark : '#495057'}
        />
        <Text
          style={[
            styles.menuText,
            routeName.includes('config') && styles.menuTextActive,
          ]}
        >
          Datos
        </Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.13,
    paddingVertical: 8,
  },

  iconMenu: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 4,
    borderRadius: 13,
  },
  menuText: {
    color: '#495057',
  },
  menuTextActive: {
    color: colors.orangeDark,
  },
});
