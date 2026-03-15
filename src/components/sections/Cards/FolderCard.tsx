import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import React, { useMemo } from 'react';
import IconsSvg from '../../iconsSvg';
import { colors } from '../../../styles/color';

const listColors = {
  cardRed: colors.cardRed,
  cardOrange: colors.cardOrange,
  cardYellow: colors.cardYellow,
  cardGreen: colors.cardGreen,
  cardBlue: colors.cardBlue,
  cardPurple: colors.cardPurple,
};

interface Props {
  title: string;
  iconName: string;
  colorName: keyof typeof listColors;
  count: number;
  onPress: () => void;
}

export default function FolderCard(props: Props) {
  const { title, iconName, colorName, onPress } = props;

  const colorData = useMemo(() => {
    const data = listColors[colorName];
    if (!data) {
      return listColors.cardRed;
    }
    return data;
  }, [colorName]);

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.containerTitle}>
        <View
          style={[
            styles.containerIcon,
            {
              backgroundColor: colorData.main,
            },
          ]}
        >
          <IconsSvg name={iconName} stroke={colorData.dark} />
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.countTxt}>0</Text>
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
    fontSize: 18,
    fontWeight: '500',
  },
  countTxt: {
    fontSize: 16,
    opacity: 0.6,
  },
});
