import { createMuiTheme } from '@material-ui/core';
import tinycolor from 'tinycolor2';

const primary = "#4B9FFE";
const warning = "#FEAA4B";
const success = "#1ACA95";
const info = "#AA4BFE";
const error = "#FF4D3A";
const secondary = "#514BFE";
const highLight = "#FE4B9F";
const secondaryLight = "#85B6EC";
const defaultTheme = "#AFB9C2";

const dark = "#4D4D4D";
const darkGray = "#666666";
const darkGrayPlus = "#CCCBCA";
const lightGray = "#CCCCCC";
const subtleGray = "#E6E6E6";
const semiWhite = "#EFEDEA";
const light = "#F9F6F2";

const text = "#4A4A4A";
const secondaryText = "#9B9A9B";
const textHighlight = "#3485E0";

export const themeOptions = {
  typography: {
    useNextVariants: true,
    fontFamily: [
      "'Roboto'",
      'sans-serif',
      '-apple-system',
    ].join(','),
    fontSizes: {
      small: 12,
      main: '1rem',
    },
  },
  palette: {
    activeText: primary,
    primary: {
      main: text,
    },
    secondary: {
      main: text,
    },
    error: {
      main: error,
    },
    text: {
      primary: text,
      secondary: secondaryText,
      warning: warning,
      info: info,
      success: success,
      highlight: textHighlight,
      primaryTheme: primary,
      defaultTheme: defaultTheme,
      secondaryTheme: secondary,
      secondaryLight: secondaryLight,
      infoTheme: "#5DC5FF",
      warningTheme: warning,
      successTheme: success,
      extraTheme: highLight,
      errorTheme: error,
    },
    warning: {
      main: warning,
      light: warning,
      dark: warning,
    },
    success: {
      main: success,
      light: success,
      dark: success,
    },
    info: {
      main: info,
      light: info,
      dark: info,
    },
    table: {
      odd: 'rgba(232, 236, 240, 0.28)',
      active: '#F4F8FF',
    },
    checkbox: {
      unchecked: '#D8D8D8',
      checked: '#4B9FFE',
    },
    link: {
      main: '#4A8DE7',
      active: textHighlight,
    },
    button: {
      primary: '#4B9FFE',
      secondary: '#FFFFFF',
      extra: '#fff',
      warning: '#FEAA4B',
      inferior: '#DBE9F9',
      info: secondaryLight,
      success: '#1ACA95',
      infoTheme: "#5DC5FF",
      danger: '#FF4D3A',
      text: text,
    },
    bg: {
      rightColumn: 'rgba(182, 193, 203, 0.25)',
      divideLine: 'rgba(151, 151, 151, 0.25)'
    },
    input: {
      label: 'rgba(74, 73, 74, 0.8)',
    },
  },
  customShadows: {
    widget:
      "0px 3px 11px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetDark:
      "0px 3px 18px 0px #4558A3B3, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A",
    widgetWide:
      "0px 12px 33px 0px #E8EAFC, 0 3px 3px -2px #B2B2B21A, 0 1px 8px 0 #9A9A9A1A"
  },
  elements: {
    button: {
      spaceBetween: 15,
    },
    switch: {
      backgroundColor: primary,
    },
  },
  mixins: {
    border: (width = 1) => `${width}px solid #DFDFDF`,
  },
  overrides: {
    // Style sheet name ⚛️
    MuiAlert: {
      // Name of the rule
      message: {
        paddingRight: 50,
        fontWeight: 500,
      },
      outlinedError: {
        color: `${error}!important`,
        boxShadow: 'none',
        borderRadius: 0,
        borderColor: 'rgba(255,77,58, .8)',
        padding: '0 16px',
        backgroundColor: '#fff',
      },
      outlinedWarning: {
        color: `${warning}!important`,
        boxShadow: 'none',
        borderRadius: 0,
        borderColor: 'rgba(254,170,75, .8)',
        padding: '0 16px',
        backgroundColor: '#fff',
      },
      outlinedSuccess: {
        color: `${success}!important`,
        boxShadow: 'none',
        borderRadius: 0,
        borderColor: 'rgba(26,202,149, .8)',
        padding: '0 16px',
        backgroundColor: '#fff',
      },
      outlinedInfo: {
        color: `${info}!important`,
        boxShadow: 'none',
        borderRadius: 0,
        borderColor: 'rgba(170,75,254, .8)',
        padding: '0 16px',
        backgroundColor: '#fff',
      },
    },
  },
};

export const theme = createMuiTheme(themeOptions);