<script lang="ts" setup>
  import { useI18n } from 'vue-i18n'
  import { useRouter } from 'vue-router'

  const { t } = useI18n()
  const router = useRouter()

  const props = defineProps<{
    name: string
    about: string
    id: string | number
  }>()

  function goToWatchBroadcast (){
    router.push(`/watch/${props.id}`)
  }
</script>

<template>
  <v-card
    color="surface"
    :onclick="goToWatchBroadcast"
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
