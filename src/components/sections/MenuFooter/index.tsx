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
import { palette, tokens } from '../../../styles/theme';
import { GeneralContext } from '../../../context/generalContext';

const width = Dimensions.get('window').width;
export default function MenuFooter() {
  const { routeName, navigate } = useContext(RouterContext);
  const { setFolderName } = useContext(GeneralContext);
  const goPath = (name: string) => {
    setFolderName('');
    navigate(name);
  };

  const inactiveColor = palette.text.muted;
  const activeColor = palette.accent.DEFAULT;

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
          fill={routeName.includes('home') ? activeColor : 'none'}
          stroke={routeName.includes('home') ? activeColor : inactiveColor}
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
          fill={routeName.includes('folder') ? activeColor : 'none'}
          stroke={routeName.includes('folder') ? activeColor : inactiveColor}
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
          fill={routeName.includes('config') ? activeColor : 'none'}
          stroke={routeName.includes('config') ? activeColor : inactiveColor}
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
    paddingVertical: tokens.spacing.sm,
    backgroundColor: palette.bg.elevated,
    borderTopWidth: 1,
    borderTopColor: palette.border.DEFAULT,
  },

  iconMenu: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacing.sm,
    borderRadius: tokens.radius.md,
  },
  menuText: {
    color: palette.text.muted,
    fontSize: tokens.typography.size.xs,
    marginTop: tokens.spacing.xs,
    fontWeight: tokens.typography.weight.medium,
  },
  menuTextActive: {
    color: palette.accent.DEFAULT,
  },
});
