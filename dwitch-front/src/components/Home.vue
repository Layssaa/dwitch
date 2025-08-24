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
  import { useChannelsStore } from '@/stores/app';

  const { t } = useI18n()
  const userStore = useUserStore();
  const channelStore = useChannelsStore();

  const disableBar = false;
  let isStreaming = false;
  async function handleUserChannel (){
    try {
      const channel = await getUserChannels();
      userStore.setUserChannel(channel);
      channelStore.setMyBroadcastId(channel.broadcasts[0].broadcastId);
      isStreaming = !!channel && !!channel.broadcasts[0]?.broadcastId;
    } catch (error) {
      console.error('Error: Get user channel',error);
    }

  }

  onMounted(async () => {
    ws.onmessage = event => {
      const data = JSON.parse(event.data);

      if(data.status == 'broadcast-started'){
        const message = t('message.channels.feedbacks.broadcastStarted')
        if(userStore.channel?.id !== data.id){
          alert(`${message} ${data.name}!`);
        }
      }
    };

    handleUserChannel()
  });
</script>
<template>
  <v-app id="inspire">
    <Bar v-if="!disableBar" />
    <Banner />
    <StartLiveStreaming v-if="!isStreaming" />
    <FinishedLiveStreaming v-if="isStreaming" />

    <v-footer app color="background" height="44" />

    <p v-if="!!disableBar" class="flex">
      <LangSelect />
      <ToggleTheme />
    </p>

    <v-main class="mx-4 my-2 pt-0">
      <MyChannel
        v-if="!!userStore.channel"
        :id="userStore.channel?.id"
        :about="userStore.channel.about"
        :name="userStore.channel.name"
      />
      <Broadcasts />
      <Channels />
      <Carousel />
      <CreateChannel v-if="!userStore.channel && userStore.isAuth" />
      <Ads />
    </v-main>
  </v-app>
</template>
