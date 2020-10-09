import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
  palette: {
    primary: {
      light: '#E7945C',
      main: '#DD6717',
      contrastText: '#fff', 
      blue:"#4896E9",
      yellow:"#FFCA00",
      green:"#3FA01C",
      red:"#DD5A01",
      border:'#E6E6E6'
    },
    secondary: {
      ultralight: '#c5c5c5',
      light: '#526161',
      main: '#444444',
      dark:'#222222'
    },
    text: {
      primary: '#444444',
      secondary: '#526161',
      disabled: '#7B8F90',
      hint: '#A87451',
    }
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1150,
      xl: 1920,
    },
  },

  typography: {
    htmlFontSize: 10,
    fontFamily: "'IBM Plex Sans', 'Open Sans', sans-serif",
    fontSize: 10,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    body1 : {
      fontSize: "0.815rem"
    }
  },
  
});



export default Theme;