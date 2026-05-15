import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import React, { useMemo } from 'react';
import IconsSvg from '../../iconsSvg';
import { objColor } from '../../../styles/theme';
import Typography, { TypographyBasic } from '../../ui/Typography';
import { palette, tokens } from '../../../styles/theme';

interface Props {
  title: string;
  iconName: string;
  colorName: keyof typeof objColor;
  count: number;
  onPress: () => void;
}

export default function FolderCard(props: Props) {
  const { title, iconName, colorName, onPress, count } = props;
  const { width } = useWindowDimensions();

  const colorData = useMemo(() => {
    const data = objColor[colorName];
    if (!data) {
      return objColor.cardRed;
    }
    return data;
  }, [colorName]);

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: palette.bg.surface, borderLeftColor: colorData.main },
      ]}
      onPress={onPress}
    >
      <View style={[styles.containerTitle, { width: width - 100 }]}>
        <View
          style={[
            styles.containerIcon,
            {
              backgroundColor: colorData.dark,
            },
          ]}
        >
          <IconsSvg
            name={iconName}
            stroke={colorData.main}
          />
        </View>
        <Typography variant="subTitle" style={styles.title}>
          {title}
        </Typography>
      </View>
      <TypographyBasic style={styles.countTxt}>
        {String(count || 0)}
      </TypographyBasic>
    </TouchableOpacity>
  );
}

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: tokens.spacing.md,
    paddingVertical: tokens.spacing.md,
    marginBottom: tokens.spacing.md,
    backgroundColor: palette.bg.surface,
    borderRadius: tokens.radius.md,
    borderLeftWidth: 4,
    borderLeftColor: palette.accent.DEFAULT,
  },

  containerTitle: {
    flexDirection: 'row',
    gap: tokens.spacing.sm,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerIcon: {
    padding: tokens.spacing.sm,
    borderRadius: tokens.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: tokens.spacing.xs,
  },
  countTxt: {
    fontSize: tokens.typography.size.md,
    color: palette.text.muted,
    fontWeight: tokens.typography.weight.semibold,
  },
});
