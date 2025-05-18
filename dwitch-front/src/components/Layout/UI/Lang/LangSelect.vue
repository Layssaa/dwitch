<template>
  <v-select
    v-model="selectedLocale"
    class="w-20"
    color="primary"
    density="compact"
    hide-details
    item-title="title"
    item-value="value"
    :items="languaguesAvailable"
    max-width="150"
    variant="outlined"
  />
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { useLocale } from 'vuetify'
  import { languaguesAvailable } from '@/translate/available'

  const { locale } = useI18n()
  const { current } = useLocale()

  const selectedLocale = ref(locale.value)

  watch(selectedLocale, newLocale => {
    locale.value = newLocale
    current.value = newLocale
  })
</script>
