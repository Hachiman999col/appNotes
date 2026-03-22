import {
  View,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  useColorScheme,
} from 'react-native';
import React, { useMemo } from 'react';
import IconsSvg from '../../iconsSvg';
import { objColor } from '../../../styles/color';
import Typography, { TypographyBasic } from '../../ui/Typography';

interface Props {
  title: string;
  iconName: string;
  colorName: keyof typeof objColor;
  count: number;
  onPress: () => void;
}

export default function FolderCard(props: Props) {
  const { title, iconName, colorName, onPress, count } = props;
  const isDarkMode = useColorScheme() === 'dark';
  const { width } = useWindowDimensions();

  const colorData = useMemo(() => {
    const data = objColor[colorName];
    if (!data) {
      return objColor.cardRed;
    }
    return data;
  }, [colorName]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.containerTitle, { width: width - 100 }]}>
        <View
          style={[
            styles.containerIcon,
            {
              backgroundColor: colorData[isDarkMode ? 'dark' : 'main'],
            },
          ]}
        >
          <IconsSvg
            name={iconName}
            stroke={colorData[isDarkMode ? 'light' : 'dark']}
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
    paddingHorizontal: 16,
    marginBottom: 26,
  },

  containerTitle: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  containerIcon: {
    padding: 4,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginTop: 4,
  },
  countTxt: {
    fontSize: 16,
    opacity: 0.6,
  },
});
