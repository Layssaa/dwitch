<template>
  <v-carousel
    height="400"
    :show-arrows="false"
    cycle
    class="my-4"
    hide-delimiter-background
  >
    <v-carousel-item
      v-for="(i) in 4"
      :key="i"
      src="@/assets/home-banner.png"
    cover
    >
    </v-carousel-item>
  </v-carousel>
</template>
