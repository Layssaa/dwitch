<script setup lang="ts">
  import Bar from './Layout/Bar.vue';
  import LiveCard from './Layout/LiveCard.vue';
  import ChannelCard from './Layout/ChannelCard.vue';
  import Banner from './Layout/UI/Banner/Banner.vue';

</script>
<template>
  <v-app id="inspire">
    <Bar />
    <Banner />
    <v-footer app color="background" height="44" />

    <v-main class="mx-4">
      <p class="text-lg-h4 text-primary mb-8">
        Ao vivo na Dwitch
      </p>

      <div class="d-flex flex-row align-start ga-4 mb-8">
        <LiveCard about="about" name="name" />
        <LiveCard about="about" name="name" />
        <LiveCard about="about" name="name" />
      </div>

      <p class="text-lg-h5 text-title mb-8">
        Canais que talvez você goste
      </p>

      <v-slide-group
        class="d-flex justify-start"
        show-arrows
      >
        <v-slide-group-item v-for="n in 10" :key="n">
          <ChannelCard />
        </v-slide-group-item>
      </v-slide-group>
    </v-main>
  </v-app>
</template>
