<template>
  <v-card
    color="surface"
    width="344"
  >
    <v-img
      cover
      height="150px"
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
    />

    <v-card-title>
      {{ name }}
    </v-card-title>

    <v-card-subtitle>
      {{ about }}
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="primary"
        text="See More"
      />

      <v-spacer />

    </v-card-actions>

  </v-card>
</template>
<script lang="ts">
  export default {
    props: ['name', 'about', 'id'],
  }
</script>
