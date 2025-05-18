<script lang="ts" setup>
  import Image from './UI/Image/Logo.vue';
  import ToggleTheme from './UI/Toggle/Toggle.vue';
  import Avatar from './Avatar.vue';
  import Button from './UI/Button/Button.vue';
</script>

<template>
  <v-app-bar class="ps-4 pe-4 d-flex" color="background" :elevation="0" height="72">
    <Image />
    <v-spacer />

    <!--  adcicionarn abaixo
    <v-text-field
      class="mb-4 border "
      density="compact"
      flat
      hide-details
      prepend-inner-icon="mdi-magnify"
      variant="solo-filled"
    /> -->

    <v-spacer />

    <ToggleTheme />
    <Button color="primary" text="Entrar" />
    <Avatar />
  </v-app-bar>
</template>
