<script setup lang="ts">
  import Bar from './Layout/Bar.vue';
  import Banner from './Layout/UI/Banner/Banner.vue';
  import Channels from './Layout/Channels.vue';
  import Broadcasts from './Layout/Broadcasts.vue';
  import CreateChannel from './Layout/CreateChannel.vue';

</script>
<template>
  <v-app id="inspire">
    <Bar />
    <Banner />
    <v-footer app color="background" height="44" />

    <v-main class="mx-4">
      <Broadcasts />
      <Channels />
      <CreateChannel />
    </v-main>
  </v-app>
</template>
