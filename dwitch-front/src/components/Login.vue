<script lang="ts">
  import Logo from './Layout/UI/Image/Logo.vue';
  import LoginForm from './Layout/Login/Form.vue';

  export default defineComponent({
    components: {
      Logo,
      LoginForm,
    },
  })
</script>
<template>
  <v-app id="inspire">
    <v-container class="d-flex flex-column align-center justify-center h-100 w-100 w-sm-75 w-md-50 w-lg-25">
      <Logo width="100" />
      <p class="text-lg-h5 text-primary mb-8">
        {{ $t('message.login.welcome') }}
      </p>

      <LoginForm />
      <p class="my-4">  {{ $t('message.login.notRegistered') }} <router-link class="text-secondary" to="/register">{{ $t('message.login.register') }} </router-link></p>
    </v-container>
  </v-app>
</template>
