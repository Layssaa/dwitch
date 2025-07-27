/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as themesApp from '@/styles/themes';

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
    themes: themesApp,
  },
});
