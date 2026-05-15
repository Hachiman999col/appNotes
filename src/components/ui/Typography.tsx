import React, { useMemo } from 'react';
import { StyleSheet, TextProps, Text } from 'react-native';
import { palette, tokens } from '../../styles/theme';

interface Props extends TextProps {
  variant?: 'title' | 'subTitle';
}
export function TypographyBasic(props: TextProps) {
  const { style, children, ...argProps } = props;

  return (
    <Text
      style={[styles.textPrimary, style].filter(Boolean)}
      {...argProps}
    >
      {children || ''}
    </Text>
  );
}

export default function Typography(props: Props) {
  const { variant, style, children, ...argProps } = props;

  const baseStyle = useMemo(() => {
    switch (variant) {
      case 'title':
        return styles.title;
      case 'subTitle':
        return styles.subTitle;
      default:
        return styles.def;
    }
  }, [variant]);

  return (
    <Text
      style={[baseStyle, styles.textPrimary, style].filter(Boolean)}
      {...argProps}
    >
      {String(children)}
    </Text>
  );
}

const styles = StyleSheet.create({
  textPrimary: {
    color: palette.text.primary,
  },

  title: {
    fontFamily: tokens.typography.family.sans,
    fontWeight: tokens.typography.weight.semibold,
    fontSize: tokens.typography.size.xl,
    textAlign: 'left',
    paddingHorizontal: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
  },
  subTitle: {
    fontFamily: tokens.typography.family.sans,
    fontWeight: tokens.typography.weight.medium,
    fontSize: tokens.typography.size.lg,
    textAlign: 'left',
    paddingHorizontal: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
  },

  def: {
    fontFamily: tokens.typography.family.sans,
    fontWeight: tokens.typography.weight.normal,
    fontSize: tokens.typography.size.md,
    textAlign: 'left',
    paddingHorizontal: tokens.spacing.sm,
    marginBottom: tokens.spacing.sm,
  },
});
