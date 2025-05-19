<script setup lang="ts">
  import Bar from './Layout/Bar.vue';
  import Banner from './Layout/UI/Banner/Banner.vue';
  import Channels from './Layout/Channels.vue';
  import Broadcasts from './Layout/Broadcasts.vue';
  import CreateChannel from './Layout/CreateChannel.vue';

  import { onMounted } from 'vue';
  import ws from '@/api/ws';
  import { getUserChannels } from '@/api/user';
  import { useUserStore } from '@/stores/user';
  import StartLiveStreaming from './Layout/StartLiveStreaming.vue';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()
  const userStore = useUserStore();

  async function handleUserChannel (){
    try {
      const channel = await getUserChannels();
      userStore.setUserChannel(channel);
    } catch (error) {
      console.error(error);
    }

  }

  onMounted(async () => {
    ws.onmessage = event => {
      const data = JSON.parse(event.data);
      if(data.status == 'broadcast-started'){
        const message = t('message.channels.feedbacks.broadcastStarted')
        alert(`${message} ${data.name}!`);
      }
    };

    handleUserChannel()
  });
</script>
<template>
  <v-app id="inspire">
    <Bar />
    <Banner />
    <StartLiveStreaming v-if="!!userStore.channel" />
    <v-footer app color="background" height="44" />

    <v-main class="mx-4 pt-0">
      <Broadcasts />
      <Channels />
      <CreateChannel v-if="!userStore.channel" />
    </v-main>
  </v-app>
</template>
