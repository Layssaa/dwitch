<template>
  <v-sheet :color="color" :height="height" :width="width" />
</template>


<script lang="ts">
  export default {
    props: ['color', 'width', 'height'],
  };
</script>
