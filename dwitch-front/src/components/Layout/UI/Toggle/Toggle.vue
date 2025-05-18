<template>
  <v-switch
    class="me-2"
    color="toggleColor"
    hide-details
    inset
    :label="theme.global.current.value.dark ? 'Dark' : 'Light'"
    @click="toggleTheme"
  />
</template>


<script lang="ts" setup>
  import { useTheme } from 'vuetify'

  const theme = useTheme()

  function toggleTheme () {
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
  }
</script>
