<script setup lang="ts">
  import { getLiveChannels } from '@/api/channels';
  import LiveCard from './UI/LiveCard.vue';
  import type { ILiveBroadcast } from '@/api/types';

  let broadcasts: ILiveBroadcast[] = [];

  async function getBroadcasts () {
    try {
      broadcasts = await getLiveChannels();
    } catch (error) {
      console.log(error);
    }
  }

  onMounted(() => {
    getBroadcasts()
  })
</script>
<template>
  <p class="text-lg-h4 text-primary mb-8 mt-8">
    {{ $t('message.inLiveTitle') }}
    <v-icon class="mx-2" color="primary" icon="mdi-access-point" />
  </p>
  <v-slide-group
    class="d-flex justify-start"
    show-arrows
  >
    <div class="d-flex flex-row align-start ga-4 mb-8">
      <div v-for="(broadcast, i) in broadcasts" :key="i">
        <LiveCard :id="broadcast.logs[0].id" :about="broadcast.channel.about" :name="broadcast.channel.name" />
      </div>
    </div>
  </v-slide-group>
</template>
