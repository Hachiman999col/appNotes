import {
  View,
  StyleSheet,
  Animated,
  useWindowDimensions,
  Easing,
  Text,
} from 'react-native';
import React, { useCallback, useContext, useEffect } from 'react';

import Svg, { Defs, RadialGradient, Circle, Stop } from 'react-native-svg';
import IconsSvg from '../components/iconsSvg';
import { colors } from '../styles/color';
import { RouterContext } from '../context/routerContext';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export default function Login() {
  const { width } = useWindowDimensions();
  const { navigate } = useContext(RouterContext);
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  const preLoadData = useCallback(async () => {
    console.log('fin');
    navigate('homeMain');
  }, [navigate]);

  useEffect(() => {
    Animated.timing(scaleValue, {
      toValue: 1,
      duration: 1500,
      easing: Easing.out(Easing.back(1.5)),
      useNativeDriver: false,
    }).start();

    setTimeout(() => {
      preLoadData();
    }, 1500);
  }, [scaleValue, preLoadData]);

  // Interpolar el valor de escala para el radio del círculo
  const animatedRadius = scaleValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 40],
  });

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.continueLogo,
          {
            height: width * 0.8,
            width: width * 0.8,
          },
        ]}
      >
        <Svg height="100%" width="100%" viewBox="0 0 100 100">
          <Defs>
            {/* Paso 1: Definir el Degradado Radial */}
            <RadialGradient
              id="grad"
              cx="50%"
              cy="50%"
              rx="50%"
              ry="50%"
              fx="50%"
              fy="50%"
              gradientUnits="userSpaceOnUse"
            >
              <Stop offset="0%" stopColor={colors.orange} stopOpacity="0.9" />

              <Stop offset="100%" stopColor={colors.orange} stopOpacity="1" />
            </RadialGradient>
          </Defs>
          <AnimatedCircle
            cx="50"
            cy="50"
            r={animatedRadius}
            fill="url(#grad)"
          />
        </Svg>
      </View>

      <View style={styles.absolutePosition}>
        <IconsSvg name="note" size={width * 0.3} fill={colors.white} />
        <Text style={styles.label}>App de notas</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueLogo: {
    backgroundColor: 'transparent',
    position: 'relative',
  },
  label: {
    width: '100%',
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '600',
    color: colors.white,
  },
  absolutePosition: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
