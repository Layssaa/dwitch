<script lang="ts" setup>
  import Image from './UI/Image/Logo.vue';
  import ToggleTheme from './UI/Toggle/Toggle.vue';
  import Avatar from './UI/Avatar.vue';
  import Button from './UI/Button/Button.vue';
  import LangSelect from './UI/Lang/LangSelect.vue';

  const isAuthenticated = localStorage.getItem('token')

</script>

<template>
  <v-app-bar class="ps-4 pe-4 d-flex" color="background" :elevation="0" height="72">
    <Image />
    <v-spacer />
    <LangSelect />
    <ToggleTheme />
    <Button v-if="!isAuthenticated" color="primary" text="Entrar" />
    <Avatar v-if="isAuthenticated" />
  </v-app-bar>
</template>
