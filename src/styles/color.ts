export const objColor = {
  cardRed: { light: '#FFF0F0', main: '#FFADAD', dark: '#5C2D2D' },
  cardOrange: { light: '#FFF5E9', main: '#FFD6A5', dark: '#5C3D21' },
  cardYellow: { light: '#FEFFF0', main: '#FDFFB6', dark: '#524F24' },
  cardGreen: { light: '#F2FFF0', main: '#CAFFBF', dark: '#2D4F2D' },
  cardBlue: { light: '#EFFFFF', main: '#9BF6FF', dark: '#204E52' },
  cardPurple: { light: '#F0F5FF', main: '#A0C4FF', dark: '#2D3A5C' },
};
export const colors = {
  orange: '#f8b981',
  orangeDark: '#e37f29',
  white: '#fafafa',
  dark: '#2e2e2e',
  ...objColor,
};
export function getColor(name: string): {
  light: string;
  main: string;
  dark: string;
} {
  if (!name) return colors.cardBlue;
  const key = name as keyof typeof objColor;

  const c = objColor[key];

  if (!c) return colors.cardBlue;
  return c;
}
