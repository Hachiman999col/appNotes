import { SvgProps } from 'react-native-svg';

export interface TypeSvgProps extends SvgProps {
  size?: number | string;
}

export interface PropsIconSvg extends TypeSvgProps {
  name: string;
}
