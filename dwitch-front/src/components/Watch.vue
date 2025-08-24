<script lang="ts">
  export default {
    props: {
      id: String,
    },
  }


</script>

<template>
  <div>
    Canal {{ $route.params.id }}
  </div>
</template>
