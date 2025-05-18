<template>
  <v-img
    aspect-ratio="1/1"
    class="ms-2 me-4"
    max-height="50"
    :max-width="width ? width : '50'"
    src="@/assets/dwitch.png"
    :width="width ? width : '50'"
  />
</template>

<script lang="ts">
  export default {
    props: ['width'],
  }
</script>
