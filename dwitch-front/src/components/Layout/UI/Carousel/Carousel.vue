<template>
  <v-carousel
    class="my-4"
    cycle
    height="400"
    hide-delimiter-background
    :show-arrows="false"
  >
    <v-carousel-item
      v-for="(i) in 4"
      :key="i"
      cover
      src="@/assets/home-banner.png"
    />
  </v-carousel>
</template>
