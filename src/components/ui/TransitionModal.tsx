import { View, Modal, StyleSheet, useWindowDimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import AnimatedGradientTransition from './AnimatedGradient';
import { colors } from '../../styles/color';
import IconsSvg from '../iconsSvg';

const colorsAnimation = [
  [colors.cardPurple.light, colors.cardPurple.main],
  [colors.cardBlue.light, colors.cardBlue.main],
  [colors.cardGreen.light, colors.cardGreen.main],
  [colors.cardYellow.light, colors.cardYellow.main],
  [colors.cardOrange.light, colors.cardOrange.main],
  [colors.cardYellow.light, colors.cardYellow.main],
  [colors.cardGreen.light, colors.cardGreen.main],
  [colors.cardBlue.light, colors.cardBlue.main],
];

const logoColor = [
  colors.cardPurple.dark,
  colors.cardBlue.dark,
  colors.cardGreen.dark,
  colors.cardYellow.dark,
  colors.cardOrange.dark,
  colors.cardYellow.dark,
  colors.cardGreen.dark,
  colors.cardBlue.dark,
];

export default function TransitionModal({ open = false }: { open?: boolean }) {
  const [colorIndex, setColorIndex] = useState<number>(0);

  const { width, height } = useWindowDimensions();
  useEffect(() => {
    const intervalId = setInterval(() => {
      setColorIndex(prevCounter => {
        if (prevCounter + 1 > 7) {
          return 0;
        }

        return prevCounter + 1;
      });
    }, 500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={open}
      onRequestClose={() => {}}
    >
      <View
        style={[
          styles.centeredView,
          {
            height: height,

            width: width,
          },
        ]}
      >
        <AnimatedGradientTransition
          colors={colorsAnimation[colorIndex]}
          style={{
            height: height,

            width: width,
          }}
        />
        <View style={styles.logo}>
          <IconsSvg
            name="note"
            size={width * 0.3}
            fill={logoColor[colorIndex]}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',
  },

  logo: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
