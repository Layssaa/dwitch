<script setup lang="ts">
  import LiveCard from './UI/LiveCard.vue';

  async function getBroadcasts () {
  }

  onMounted(() => {
    getBroadcasts()
  })
</script>
<template>
  <p class="text-lg-h4 text-primary mb-8">
    {{ $t('message.inLiveTitle') }}
    <v-icon class="mx-2" color="primary" icon="mdi-access-point" />
  </p>
  <v-slide-group
    class="d-flex justify-start"
    show-arrows
  >
    <div class="d-flex flex-row align-start ga-4 mb-8">
      <div v-for="n in 3" :key="n">
        <LiveCard id="channel.id" about="channel.about" name="channel.name" />
      </div>
    </div>
  </v-slide-group>
</template>
