<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { apiAuth } from '@/api/axios' // ajuste esse import para onde estiver sua instância do axios
  import Button from '../UI/Button/Button.vue'

  const email = ref('')
  const password = ref('')
  const repeatPassword = ref('')
  const name = ref('')
  const loading = ref(false)
  const hasError = ref(false)
  const valid = ref(false)

  const router = useRouter()

  const nameRules = [
    (value: string) => !!value || 'Informe um nome.',
  ]

  const passwordRules = [
    (value: string) => !!value || 'Informe uma senha.',
  ]

  const repeatPasswordRules = [
    (value: string) => !!value || 'Repita a senha.',
    (value: string) => value === password.value || 'As senhas devem ser iguais.',
  ]

  const emailRules = [
    (value: string) => !!value || 'Informe um email.',
    (value: string) => /.+@.+\..+/.test(value) || 'Informe um email válido.',
  ]

  const submit = async () => {
    if (!valid.value) return

    loading.value = true
    hasError.value = false

    try {
      const request = {
        email: email.value,
        name: name.value,
        password: password.value,
        repeatPassword: repeatPassword.value,
      }

      const response = await apiAuth.post('/auth/create', request)

      localStorage.setItem('token', response.data.token)
      router.push({ name: '/' })
    } catch (err) {
      console.error('Erro ao fazer login', err)
      hasError.value = true
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <v-container>
    <v-form v-model="valid" @submit.prevent="submit">
      <v-text-field
        v-model="name"
        class="mb-4"
        label="Nome"
        required
        :rules="nameRules"
        variant="outlined"
      />

      <v-text-field
        v-model="email"
        class="mb-4"
        label="Email"
        required
        :rules="emailRules"
        variant="outlined"
      />

      <v-text-field
        v-model="password"
        class="mb-4"
        label="Senha"
        required
        :rules="passwordRules"
        type="password"
        variant="outlined"
      />

      <v-text-field
        v-model="repeatPassword"
        class="mb-4"
        label="Repetir Senha"
        required
        :rules="repeatPasswordRules"
        type="password"
        variant="outlined"
      />

      <div v-if="hasError" class="text-error mb-4">Ocorreu um erro ao fazer o cadastro.</div>

      <Button
        color="primary"
        :loading="loading"
        size="large"
        text="Entrar"
        type="submit"
      />
    </v-form>
  </v-container>
</template>
