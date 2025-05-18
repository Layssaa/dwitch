<template>
  <v-card
    class="pa-4 me-2"
    color="surface"
    subtitle="Descrição do canal"
    title="Nome do Canal"
    variant="elevated"
    width="344"
  >
    <v-btn class="ms-4" color="secondary" text="Button" variant="outlined" />
  </v-card>

</template>

<script lang="ts">
  export default {
    props: ['name', 'about', 'id', 'subscribers'],
  };
</script>
