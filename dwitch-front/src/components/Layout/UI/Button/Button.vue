<template>
  <v-btn
    class="text-white mx-4"
    :color="color"
    :size="size ? size : 'default'"
    :type="type ? type : 'button'"
    variant="tonal"
  >{{ text }}</v-btn>
</template>


<script lang="ts">
  export default {
    props: ['color', 'text', 'size', 'type'],
  };
</script>
