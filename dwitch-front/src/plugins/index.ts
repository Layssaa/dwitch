/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import vuetify from './vuetify'
import pinia from '../stores'
import router from '../router'
import { createI18n } from 'vue-i18n'
import * as languagues from '@/translate'

import type { App } from 'vue'

const i18n = createI18n({
  locale: 'pt',
  fallbackLocale: 'en',
  messages: { ...languagues },
})

export function registerPlugins (app: App) {
  app
    .use(vuetify)
    .use(router)
    .use(pinia)
    .use(i18n)
}
