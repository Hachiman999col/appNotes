import { Text, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { colors } from '../styles/color';

export default function View404() {
  return (
    <LinearGradient
      colors={[
        colors.white,
        colors.orange,
        colors.orangeDark,
        colors.orangeDark,
        colors.orange,
        colors.white,
      ]}
      style={styles.container}
    >
      <Text style={styles.title}>404</Text>
      <Text style={styles.info}>Pagina no encontrada</Text>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    fontSize: 46,
    color: colors.white,
  },
  info: {
    color: colors.white,
  },
});
