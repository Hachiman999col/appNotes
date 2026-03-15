import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { TypeSvgProps } from '../types';
const ArrowLeft = ({
  size,
  width,
  height,
  fill,
  stroke,
  strokeWidth,
  ...props
}: TypeSvgProps) => (
  <Svg
    fill={fill || 'none'}
    stroke={stroke || 'currentColor'}
    strokeWidth={strokeWidth || 1.5}
    viewBox="0 0 24 24"
    width={size || width || 24}
    height={size || height || 24}
    {...props}
  >
    <Path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
    />
  </Svg>
);
export default ArrowLeft;
