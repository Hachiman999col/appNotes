import React, { useMemo } from 'react';
import { StyleSheet, TextProps, Text, useColorScheme } from 'react-native';

interface Props extends TextProps {
  variant?: 'title' | 'subTitle';
}
export function TypographyBasic(props: TextProps) {
  const { style, children, ...argProps } = props;

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Text
      style={[isDarkMode ? styles.d : styles.w, style].filter(Boolean)}
      {...argProps}
    >
      {children || ''}
    </Text>
  );
}

export default function Typography(props: Props) {
  const { variant, style, children, ...argProps } = props;

  const isDarkMode = useColorScheme() === 'dark';
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
      style={[baseStyle, isDarkMode ? styles.d : styles.w, style].filter(
        Boolean,
      )}
      {...argProps}
    >
      {String(children)}
    </Text>
  );
}

const styles = StyleSheet.create({
  w: {
    color: '#2e2e2e',
  },
  d: {
    color: '#f0f0f0',
  },

  title: {
    fontWeight: '600',
    fontSize: 26,

    textAlign: 'left',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  subTitle: {
    fontWeight: '500',
    fontSize: 20,

    textAlign: 'left',
    paddingHorizontal: 8,
    marginBottom: 8,
  },

  def: {
    fontWeight: '400',
    fontSize: 16,

    textAlign: 'left',
    paddingHorizontal: 8,
    marginBottom: 8,
  },
});
