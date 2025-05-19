<script setup lang="ts">
  import ChannelCard from './UI/ChannelCard.vue';
  import { ref } from 'vue'
  import { useChannelsStore } from '@/stores/app';

  const channelsStore = useChannelsStore();

  import { getAllChannels } from '../../api/channels';

  const hasError = ref(false)
  const isLoading = ref(true)

  async function getChannels () {
    try {
      const channels = await getAllChannels();
      channelsStore.setChannels(channels)
    } catch (error) {
      console.error(error);
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }

  onMounted(() => {
    getChannels()
  })
</script>
<template>
  <p class="text-lg-h5 text-title mb-8">
    {{ $t('message.channelsWouldYouLike') }}
  </p>

  <v-slide-group
    class="d-flex justify-start"
    show-arrows
  >
    <v-slide-group-item v-for="channel in channelsStore.channels" :key="channel.name">
      <ChannelCard :id="channel.id" :about="channel.about" :name="channel.name" :subscribers="channel.subscribers" />
    </v-slide-group-item>
  </v-slide-group>
</template>
