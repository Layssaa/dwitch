<script lang="ts">
  import { apiAuth } from '@/api/axios'
  import Button from '../UI/Button/Button.vue'
  import { defineComponent } from 'vue'

  export default defineComponent( {
    // eslint-disable-next-line vue/no-reserved-component-names
    components: { Button },
    data: () => ({
      valid: false,
      email: '',
      password: '',
      passwordRules: [
        ( value: unknown) => {
          if (value) return true

          return 'Password is required.'
        },
      ],
      emailRules: [
        ( value: unknown) => {
          return value ? true : 'E-mail is required.'
        },
        ( value: string) => {
          if (/.+@.+\..+/.test(value)) return true

          return 'E-mail must be valid.'
        },
      ],
    }),
    reactive: {
      error: null,
      loading: false,
    },
    goToHome () {
      this.$router.push({ name: '/' })
    },
    methods: {
      async submit () {
        if (!this.valid) return

        this.loading = false
        this.error = null

        try {
          const request = {
            email: this.email,
            password: this.password,
          }

          this.loading = true
          const response = await apiAuth.post('/auth/login', request)

          localStorage.setItem('token', response.data.token)

          this.$router.push({ name: '/' })
        } catch (err) {
          console.error('Erro ao fazer login', err)
          alert('Credenciais inválidas ou erro de rede.')
        } finally {
          this.loading = false
        }
      },
    },
  })

</script>
<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="submit">
      <!-- <v-container class="ga-8"> -->
      <v-text-field
        v-model="email"
        class="ma-2"
        label="Email"
        required
        :rules="emailRules"
        variant="outlined"
      />

      <v-text-field
        v-model="password"
        class="ma-2"
        label="Last name"
        required
        :rules="passwordRules"
        type="password"
        variant="outlined"
      />
      <!-- <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
      </p> -->
      <Button color="primary" size="large" text="Entrar" type="submit" />

    </v-form>
  </v-container>
</template>
