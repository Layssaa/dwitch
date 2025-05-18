<script setup lang="ts">
 import UnloggedBar from '@/components/Layout/UI/Bar/Unlogged.vue';
</script>
<template>
  <div class="d-flex flex-column" style="background: linear-gradient(#00142E05,#F23545, to-bottom)">
    <v-app id="inspire">
      <UnloggedBar />
      <router-view />
    </v-app>
  </div>
</template>
