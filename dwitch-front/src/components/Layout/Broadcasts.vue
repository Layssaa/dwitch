<script setup lang="ts">
  import { getLiveChannels } from '@/api/channels';
  import LiveCard from './UI/LiveCard.vue';
  import type { ILiveBroadcastV2 } from '@/api/types';

  let broadcasts: ILiveBroadcastV2[] = [];
  let hasLiveStreaming = false;

  async function getBroadcasts () {
    try {
      broadcasts = await getLiveChannels();
      hasLiveStreaming = broadcasts.length > 0;
    } catch (error) {
      console.log(error);
    }
  }

  onMounted(() => {
    getBroadcasts()
  })
</script>
<template>
  <!-- DEMORANDO A SER EXIBIDO -->
  <p v-if="hasLiveStreaming" class="text-lg-h4 text-primary mb-8 mt-8">
    {{ $t('message.inLiveTitle') }}
    <v-icon class="mx-2" color="primary" icon="mdi-access-point" />
  </p>
  <v-slide-group
    v-if="hasLiveStreaming"
    class="d-flex justify-start"
    show-arrows
  >
    <div class="d-flex flex-row align-start ga-4 mb-8 my-4">
      <div v-for="(broadcast) in broadcasts" :key="broadcast.id">
        <LiveCard :id="broadcast.broadcasts[0].id" :about="broadcast.about" :name="broadcast.name" />
      </div>
    </div>
  </v-slide-group>
</template>
