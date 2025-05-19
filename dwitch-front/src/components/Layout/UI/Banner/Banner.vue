<template>
  <div class="position-relative">
    <v-img
      aspect-ratio="16/9"
      cover
      height="80vh"
      src="@/assets/home-banner.png"
      :width="'100vw'"
    />

    <v-btn class="position-absolute bottom-16 left-16 text-white " color="primary" style="bottom: 2rem; left: 2rem;" variant="tonal">
      <v-icon class="mx-2" color="primary" icon="mdi-access-point" />
      {{ $t('message.channels.toWatchLive') }}
    </v-btn>
  </div>
</template>
