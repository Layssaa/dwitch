<script setup lang="ts">
  import Avatar from './UI/Avatar.vue';
  import Button from './UI/Button/Button.vue';

</script>
<template>
  <v-navigation-drawer floating>
    <div class="d-flex px-2 my-2">
      <Button color="blue" text="mock-text" />
      <Avatar />
    </div>

    <div class="d-flex px-2 my-2 align-center">
      <Button color="red" text="mock-text" />

      <Avatar color="surface-variant" size="18" />

      <Avatar class="ms-1" color="surface-variant" size="18" />
    </div>

    <div class="px-2 my-2">
      <v-sheet
        class="mb-2"
        color="surface-variant"
        height="24"
        rounded="pill"
        width="50%"
      />

      <v-sheet
        class="mb-1"
        color="grey-lighten-1"
        height="12"
        rounded="pill"
        width="40%"
      />

      <v-sheet
        class="mb-1"
        color="grey-lighten-1"
        height="12"
        rounded="pill"
        width="20%"
      />

      <v-sheet
        class="mb-1"
        color="grey-lighten-1"
        height="12"
        rounded="pill"
        width="90%"
      />

      <v-sheet
        color="grey-lighten-1"
        height="12"
        rounded="pill"
        width="70%"
      />

      <v-divider class="my-6" />

      <v-sheet
        class="mb-2"
        color="surface-variant"
        height="24"
        rounded="pill"
        width="30%"
      />

      <v-sheet
        class="mb-1"
        color="grey-lighten-1"
        height="12"
        rounded="pill"
        width="65%"
      />

      <v-sheet
        class="mb-1"
        color="grey-lighten-1"
        height="12"
        rounded="pill"
        width="70%"
      />

      <v-sheet
        class="mb-1"
        color="grey-lighten-1"
        height="12"
        rounded="pill"
        width="40%"
      />

      <v-sheet
        color="grey-lighten-1"
        height="12"
        rounded="pill"
        width="100%"
      />

      <v-divider class="my-6" />
    </div>
  </v-navigation-drawer>
</template>
