<script lang="ts" setup>
  import { subscriberInChannel } from '@/api/channels';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  async function handleSubscriberChannel (){
    try {
      await subscriberInChannel({ channelId: props.id });
    } catch (error) {
      console.log('ERROR', error);
    }
  }

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
    <v-btn
      class="ms-4"
      color="secondary"
      :onclick="handleSubscriberChannel"
      :text="t('message.channels.subscribe')"
      variant="outlined"
    />
  </v-card>

</template>
