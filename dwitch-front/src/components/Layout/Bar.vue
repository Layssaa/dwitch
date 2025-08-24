<script lang="ts" setup>
  import Image from './UI/Image/Logo.vue';
  import ToggleTheme from './UI/Toggle/Toggle.vue';
  import Avatar from './UI/Avatar.vue';
  import Button from './UI/Button/Button.vue';
  import LangSelect from './UI/Lang/LangSelect.vue';
  import { useRouter } from 'vue-router'

  const isAuthenticated = localStorage.getItem('token')

  const router = useRouter()

  function goToLogin () {
    router.push('/login')
  }

</script>

<template>
  <v-app-bar class="ps-4 pe-4 d-flex" color="background" :elevation="0" height="72">
    <Image />
    <v-spacer />
    <LangSelect />
    <ToggleTheme />
    <Button v-if="!isAuthenticated" color="primary" text="Entrar" @onclick="goToLogin" />
    <Avatar v-if="isAuthenticated" />
  </v-app-bar>
</template>
