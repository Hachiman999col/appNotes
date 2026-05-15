import {
  View,
  Modal,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import AnimatedGradientTransition from './AnimatedGradient';
import { palette } from '../../styles/theme';
import IconsSvg from '../iconsSvg';

const colorsAnimation = [
  [palette.card.purple.dark, palette.card.purple.main],
  [palette.card.blue.dark, palette.card.blue.main],
  [palette.card.green.dark, palette.card.green.main],
  [palette.card.yellow.dark, palette.card.yellow.main],
  [palette.card.orange.dark, palette.card.orange.main],
  [palette.card.yellow.dark, palette.card.yellow.main],
  [palette.card.green.dark, palette.card.green.main],
  [palette.card.blue.dark, palette.card.blue.main],
];

const logoColor = [
  palette.card.purple.main,
  palette.card.blue.main,
  palette.card.green.main,
  palette.card.yellow.main,
  palette.card.orange.main,
  palette.card.yellow.main,
  palette.card.green.main,
  palette.card.blue.main,
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
