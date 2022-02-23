import { blue, green, grey } from '@material-ui/core/colors';
import { rgba } from 'polished';

export enum Color {
  BLACK = '#000',
  RED = '#FC0000',
  WHITE = '#FFF',
  WHITE_BLUE = '#eaebf6',
  GREY = '#EBEBEB',
  GREY_DARK = '#222222',
  GREY_LIGHTER = '#0000008a',
  GREY_LIGHT = '#5c5b5b',
  BLUE = '#3849ab',
  BLUE_WHITE = '#e7eef7',
  BLUE_LIGHTER = '#b0c6e3',
  BLUE_LIGHT = '#9db7d9',
  BLUE_MEDIUM = '#e9edf5',
  BLUE_BOLD = '#005098',
  BLUE_DARK = '#273377',
  BLUE_AUTOCOMPLETE = '#e5eef8',

  // Color palettes from design guideline
  // More info {@link https://www.figma.com/file/kjjCnJ2l1a6P9GNcGFNEya/Design-Guidelines?node-id=32%3A682}
  BG_LIGHT = '#f2f3fa',
  PRIMARY = BLUE_BOLD,
  SECONDARY = '#f78f1e',
  GREY_200 = BLUE_MEDIUM,
  GREY_400 = '#a5aac0',
  GREY_800 = '#4f4b66',

  TEXT_PRIMARY = GREY_800,
  TEXT_SECONDARY = GREY_400,

  // Statuses
  SUCCESS = '#2fce82',
  WARNING = SECONDARY,
  ERROR = '#ea4548',
}

export const rabbitVariant = {
  name: 'Rabbit',
  palette: {
    text: {
      primary: Color.TEXT_PRIMARY,
      secondary: Color.TEXT_SECONDARY,
    },
    common: {
      black: Color.BLACK,
      white: Color.WHITE,
      blue: Color.BLUE_MEDIUM,
      sky: Color.BLUE_BOLD,
    },
    primary: {
      main: Color.PRIMARY,
      contrastText: Color.WHITE,
    },
    secondary: {
      main: blue[500],
      contrastText: Color.WHITE,
    },
    grey: {
      100: Color.BG_LIGHT,
      200: Color.GREY_200,
      400: Color.GREY_400,
      800: Color.GREY_800,
    },
    success: {
      main: Color.SUCCESS,
    },
    warning: {
      main: Color.WARNING,
    },
    danger: {
      main: Color.ERROR,
    },
    info: {
      white: rgba(Color.BLUE_LIGHTER, 0),
      light: rgba(Color.BLUE_LIGHTER, 0.3),
      main: Color.BLUE_LIGHTER,
      dark: Color.BLUE_LIGHT,
    },
  },
  border: { color: Color.GREY_200, input: Color.GREY_DARK, radius: '16px' },
  header: {
    color: grey[500],
    background: Color.WHITE,
    search: {
      color: grey[800],
    },
    indicator: {
      background: blue[600],
    },
  },
  sidebar: {
    color: Color.WHITE,
    background: Color.BLUE_BOLD,
    header: {
      color: grey[200],
      background: Color.WHITE,
      brand: {
        color: blue[500],
      },
    },
    footer: {
      color: grey[200],
      background: '#232f3e',
      online: {
        background: green[500],
      },
    },
    category: {
      fontWeight: 700,
    },
    badge: {
      color: Color.WHITE,
      background: blue[500],
    },
  },
  body: {
    background: Color.GREY,
  },
};

const variants = [rabbitVariant];

export default variants;
