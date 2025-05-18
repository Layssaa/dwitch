<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const props = defineProps<{
    name: string
    about: string
    id: string | number
  }>()
</script>

<template>
  <v-card
    color="surface"
    width="344"
  >
    <v-img
      cover
      height="150px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
    />

    <v-card-title>
      {{ props.name }}
    </v-card-title>

    <v-card-subtitle>
      {{ props.about }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="primary"
        :text="t('message.channels.seeMore')"
      />

      <v-spacer />

    </v-card-actions>

  </v-card>
</template>
