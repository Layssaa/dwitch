<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const props = defineProps<{
    name: string
    about: string
    subscribers: unknown[]
    id: string | number
  }>()
</script>

<template>
  <v-card
    class="pa-4 me-2"
    color="surface"
    prepend-avatar="https://cdn.vuetifyjs.com/images/john.jpg"
    :subtitle="props.about"
    :title="props.name"
    variant="elevated"
    width="344"
  >
    <v-btn class="ms-4" color="secondary" :text="t('message.channels.subscribe')" variant="outlined" />
  </v-card>

</template>
