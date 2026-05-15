// Paleta de colores inspirada en Omarchy (DHH / 37signals)
// Estética: dark-first, minimalista, elegante, acentos en rojo cálido

export const palette = {
  // Backgrounds
  bg: {
    base: '#0A0A0A',
    elevated: '#111111',
    surface: '#18181B',
    overlay: '#27272A',
  },

  // Text
  text: {
    primary: '#F4F4F5',
    secondary: '#A1A1AA',
    muted: '#71717A',
    inverse: '#09090B',
  },

  // Accent (rojo 37signals / Omarchy)
  accent: {
    DEFAULT: '#EF4444',
    hover: '#DC2626',
    muted: '#F87171',
    subtle: '#450A0A',
  },

  // Functional
  success: {
    DEFAULT: '#22C55E',
    muted: '#14532D',
  },
  warning: {
    DEFAULT: '#F59E0B',
    muted: '#78350F',
  },
  error: {
    DEFAULT: '#DC2626',
    muted: '#450A0A',
  },

  // Borders
  border: {
    DEFAULT: '#27272A',
    light: '#3F3F46',
    focus: '#EF4444',
  },

  // Cards (tonos oscuros con acentos sutiles)
  card: {
    red: { light: '#1C1212', main: '#EF4444', dark: '#7F1D1D' },
    orange: { light: '#1C1410', main: '#F97316', dark: '#7C2D12' },
    yellow: { light: '#1C1912', main: '#EAB308', dark: '#713F12' },
    green: { light: '#111C14', main: '#22C55E', dark: '#14532D' },
    blue: { light: '#111828', main: '#3B82F6', dark: '#1E3A8A' },
    purple: { light: '#1A1225', main: '#A855F7', dark: '#581C87' },
  },
} as const;

// Tokens de diseño
export const tokens = {
  radius: {
    sm: 6,
    md: 10,
    lg: 14,
    xl: 20,
    full: 9999,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    family: {
      mono: 'Courier', // Omarchy vibe terminal
      sans: 'System', // Usar fuente del sistema
    },
    size: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 26,
      '2xl': 32,
    },
    weight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
  },
} as const;

// Helper para obtener color de card por nombre
export function getCardColor(name: string): {
  light: string;
  main: string;
  dark: string;
} {
  if (!name) return palette.card.purple;
  const key = name as keyof typeof palette.card;
  return palette.card[key] || palette.card.purple;
}

// Colores de compatibilidad (mapeo desde la API antigua)
export const colors = {
  orange: palette.accent.DEFAULT,
  orangeDark: palette.accent.hover,
  white: palette.bg.base,
  dark: palette.text.primary,
  cardRed: palette.card.red,
  cardOrange: palette.card.orange,
  cardYellow: palette.card.yellow,
  cardGreen: palette.card.green,
  cardBlue: palette.card.blue,
  cardPurple: palette.card.purple,
};

export const objColor = {
  cardRed: palette.card.red,
  cardOrange: palette.card.orange,
  cardYellow: palette.card.yellow,
  cardGreen: palette.card.green,
  cardBlue: palette.card.blue,
  cardPurple: palette.card.purple,
};
