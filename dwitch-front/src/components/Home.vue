<script setup lang="ts">
  import Bar from './Layout/Bar.vue';
  import Banner from './Layout/UI/Banner/Banner.vue';
  import Channels from './Layout/Channels.vue';
  import Broadcasts from './Layout/Broadcasts.vue';
  import CreateChannel from './Layout/CreateChannel.vue';
  import LangSelect from './Layout/UI/Lang/LangSelect.vue';
  import ToggleTheme from './Layout/UI/Toggle/Toggle.vue';
  import FinishedLiveStreaming from '@/components/Layout/Broadcast/FinishLive.vue';
  import { onMounted } from 'vue';
  import ws from '@/api/ws';
  import { getUserChannels } from '@/api/user';
  import { useUserStore } from '@/stores/user';
  import StartLiveStreaming from './Layout/StartLiveStreaming.vue';
  import { useI18n } from 'vue-i18n'
  import Carousel from '@/components/Layout/UI/Carousel/Carousel.vue';
  import Ads from '@/components/Layout/UI/Ads/Ads.vue';
  import MyChannel from '@/components/Layout/UI/MyChannel/MyChannel.vue';

  const { t } = useI18n()
  const userStore = useUserStore();
  const disableBar = false;

  async function handleUserChannel (){
    try {
      console.log('GET USER CHANNEL');
      const channel = await getUserChannels();
      userStore.setUserChannel(channel);
      console.log('Channel user', channel);
    } catch (error) {
      console.error('error to get channel',error);
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
    <Bar v-if="!disableBar" />
    <Banner />
    <StartLiveStreaming v-if="!!userStore.channel" />
    <FinishedLiveStreaming v-if="!!userStore.channel" />

    <v-footer app color="background" height="44" />

    <p v-if="!!disableBar" class="flex">
      <LangSelect />
      <ToggleTheme />
    </p>

    <v-main class="mx-4 pt-0">
      <MyChannel
        v-if="!!userStore.channel"
        :id="userStore.channel?.id"
        :about="userStore.channel.about"
        :name="userStore.channel.name"
      />
      <Broadcasts />
      <Channels />
      <Carousel />
      <CreateChannel v-if="!userStore.channel" />
      <Ads />
    </v-main>
  </v-app>
</template>
