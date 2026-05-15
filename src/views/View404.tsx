import { Text, StyleSheet } from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { palette, tokens } from '../styles/theme';

export default function View404() {
  return (
    <LinearGradient
      colors={[
        palette.bg.base,
        palette.accent.subtle,
        palette.bg.elevated,
        palette.accent.subtle,
        palette.bg.base,
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
    fontWeight: tokens.typography.weight.bold,
    fontSize: tokens.typography.size['2xl'],
    color: palette.accent.DEFAULT,
    fontFamily: tokens.typography.family.mono,
  },
  info: {
    color: palette.text.secondary,
    marginTop: tokens.spacing.sm,
    fontSize: tokens.typography.size.md,
  },
});
