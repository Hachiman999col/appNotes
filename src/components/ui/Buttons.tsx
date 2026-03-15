import {
  Text,
  StyleSheet,
  Pressable,
  PressableProps,
  Animated,
  PanResponder,
  useWindowDimensions,
} from 'react-native';
import React, { useMemo, useRef } from 'react';
import { colors } from '../../styles/color';
import IconsSvg from '../iconsSvg';

interface BasicProps extends PressableProps {
  children: string;
  variant?: 'default' | 'warnning' | 'error';
  icon?: string;
}
const FAB_SIZE = 60;

export function DraggableFAB() {
  const { width, height } = useWindowDimensions();
  const pan = useRef(new Animated.ValueXY()).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (event, gestureState) => {
        // Calculamos la nueva posición sumando el movimiento (dx, dy) al punto inicial
        let newX = gestureState.dx;
        let newY = gestureState.dy;

        // --- LÓGICA DE RESTRICCIÓN (Clamping) ---

        // Límites horizontales (X)
        // No permitir que X sea menor a lo que lo saque por la izquierda
        // ni mayor a lo que lo saque por la derecha
        const minX = -(width - FAB_SIZE - 20); // 20 es un margen opcional
        const maxX = 30;

        // Límites verticales (Y)
        const minY = -(height - FAB_SIZE - 50);
        const maxY = 30;

        // Aplicamos la restricción manual
        if (newX < minX) newX = minX;
        if (newX > maxX) newX = maxX;
        if (newY < minY) newY = minY;
        if (newY > maxY) newY = maxY;

        console.log('width', width, newX);

        console.log('height', height, newY);
        // Seteamos el valor manualmente en lugar de usar Animated.event
        pan.x.setValue(newX);
        pan.y.setValue(newY);
      },

      onPanResponderRelease: () => {
        pan.extractOffset();
      },
    }),
  ).current;

  return (
    <Animated.View
      style={[
        styles.fab,
        {
          transform: [{ translateX: pan.x }, { translateY: pan.y }],
        },
      ]}
      {...panResponder.panHandlers}
    >
      <Text style={styles.text}>+</Text>
    </Animated.View>
  );
}

export default function BasicButtons(props: BasicProps) {
  const { variant = 'default', children, icon, style, ...argProps } = props;

  const bgColor = useMemo(() => {
    if (variant === 'default') return colors.cardPurple.main;
    if (variant === 'warnning') return colors.cardYellow.main;
    if (variant === 'error') return colors.cardRed.main;
    return colors.cardPurple.main;
  }, [variant]);
  const txtColor = useMemo(() => {
    if (variant === 'default') return colors.cardPurple.dark;
    if (variant === 'warnning') return colors.cardYellow.dark;
    if (variant === 'error') return colors.cardRed.dark;
    return colors.cardPurple.dark;
  }, [variant]);
  return (
    <Pressable
      style={
        typeof style === 'function'
          ? state => [styles.btn, { backgroundColor: bgColor }, style(state)]
          : [styles.btn, { backgroundColor: bgColor }, style]
      }
      {...argProps}
    >
      {icon && <IconsSvg name="folderPlus" stroke={txtColor} />}
      <Text
        style={[
          styles.text,
          {
            color: txtColor,
          },
        ]}
      >
        {children}
      </Text>
    </Pressable>
  );
}
export const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    gap: 4,
    marginHorizontal: 16,
    marginVertical: 8,
    backgroundColor: colors.cardPurple.main,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    borderRadius: 10,
  },

  fab: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
