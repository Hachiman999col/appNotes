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
import { palette, tokens } from '../../styles/theme';
import IconsSvg from '../iconsSvg';

interface BasicProps extends PressableProps {
  children: string;
  variant?: 'default' | 'warning' | 'error';
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
        let newX = gestureState.dx;
        let newY = gestureState.dy;

        const minX = -(width - FAB_SIZE - 20);
        const maxX = 30;
        const minY = -(height - FAB_SIZE - 50);
        const maxY = 30;

        if (newX < minX) newX = minX;
        if (newX > maxX) newX = maxX;
        if (newY < minY) newY = minY;
        if (newY > maxY) newY = maxY;

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
      <Text style={styles.fabText}>+</Text>
    </Animated.View>
  );
}

export default function BasicButtons(props: BasicProps) {
  const { variant = 'default', children, icon, style, ...argProps } = props;

  const theme = useMemo(() => {
    switch (variant) {
      case 'error':
        return {
          bg: palette.error.DEFAULT,
          text: palette.text.primary,
        };
      case 'warning':
        return {
          bg: palette.warning.DEFAULT,
          text: palette.text.inverse,
        };
      default:
        return {
          bg: palette.accent.DEFAULT,
          text: palette.text.primary,
        };
    }
  }, [variant]);

  return (
    <Pressable
      style={
        typeof style === 'function'
          ? state => [
              styles.btn,
              { backgroundColor: theme.bg },
              style(state),
            ]
          : [
              styles.btn,
              { backgroundColor: theme.bg },
              style,
            ]
      }
      {...argProps}
    >
      {icon && (
        <IconsSvg
          name="folderPlus"
          stroke={theme.text}
        />
      )}
      <Text
        style={[
          styles.text,
          { color: theme.text },
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
    gap: tokens.spacing.sm,
    marginHorizontal: tokens.spacing.md,
    marginVertical: tokens.spacing.sm,
    backgroundColor: palette.accent.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    padding: tokens.spacing.sm + 2,
    borderRadius: tokens.radius.md,
  },

  fab: {
    position: 'absolute',
    bottom: 50,
    right: 30,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: tokens.radius.full,
    backgroundColor: palette.accent.DEFAULT,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  fabText: {
    fontSize: tokens.typography.size.lg,
    fontWeight: tokens.typography.weight.bold,
    color: palette.text.primary,
  },
  text: {
    fontSize: tokens.typography.size.md,
    fontWeight: tokens.typography.weight.semibold,
  },
});
