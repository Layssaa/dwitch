<script lang="ts" setup>
  import Image from '@/components/Layout/UI/Image/Logo.vue';
  import ToggleTheme from '@/components/Layout/UI/Toggle/Toggle.vue';
  import LangSelect from '@/components/Layout/UI/Lang/LangSelect.vue';

</script>

<template>
  <v-app-bar class="ps-4 pe-4 d-flex" color="background" :elevation="0" height="72">
    <Image />
    <v-spacer />
    <LangSelect />
    <ToggleTheme />
  </v-app-bar>
</template>
