/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify, type ThemeDefinition } from 'vuetify';

const light: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#F2F2F2',
    surface: '#FFFFFF',
    primary: '#F23545',
    toggleColor: '#01122A',
    'primary-darken-1': '#F23545',
    secondary: '#51A2FF',
    'secondary-darken-1': '#51A2FF',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    title: '#000000',
  },
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {
    background: '#000B1A',
    surface: '#01122A',
    toggleColor: '#0A2243',
    primary: '#F23545',
    'primary-darken-1': '#F23545',
    secondary: '#51A2FF',
    'secondary-darken-1': '#51A2FF',
    error: '#B00020',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FB8C00',
    title: '#ffffff',
  },
};

export default createVuetify({
  defaults: {
    global: {
      style: {
        fontFamily: 'DM Sans, sans-serif',
      },
    },
  },
  theme: {
    defaultTheme: 'dark',
    themes: {
      light,
      dark,
    },
  },
});
