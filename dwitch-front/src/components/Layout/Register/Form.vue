<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { authApi } from '@/api/axios' // ajuste esse import para onde estiver sua instância do axios
  import Button from '../UI/Button/Button.vue'
  import { useI18n } from 'vue-i18n'

  const email = ref('')
  const password = ref('')
  const repeatPassword = ref('')
  const name = ref('')
  const loading = ref(false)
  const hasError = ref(false)
  const valid = ref(false)

  const router = useRouter()
  const { t } = useI18n()

  const nameRules = [
    (value: string) => !!value || t('message.register.errorMessages.emptyName'),
  ]

  const passwordRules = [
    (value: string) => !!value || t('message.register.errorMessages.password'),
  ]

  const repeatPasswordRules = [
    (value: string) => !!value || t('message.register.errorMessages.repeatPassword'),
    (value: string) => value === password.value || t('message.register.errorMessages.passwordNotMatch'),
  ]

  const emailRules = [
    (value: string) => !!value || t('message.register.errorMessages.emptyEmail'),
    (value: string) => /.+@.+\..+/.test(value) || t('message.register.errorMessages.invalidEmail'),
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

      const response = await authApi.post('/auth/create', request)

      localStorage.setItem('token', response.data.token)
      router.push({ name: '/' })
    } catch (err) {
      console.error('Erro ao fazer o cadastro', err)
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
        :label="t('message.register.name')"
        required
        :rules="nameRules"
        variant="outlined"
      />

      <v-text-field
        v-model="email"
        class="mb-4"
        :label="t('message.register.email')"
        required
        :rules="emailRules"
        variant="outlined"
      />

      <v-text-field
        v-model="password"
        class="mb-4"
        :label="t('message.register.password')"
        required
        :rules="passwordRules"
        type="password"
        variant="outlined"
      />

      <v-text-field
        v-model="repeatPassword"
        class="mb-4"
        :label="t('message.register.repeatPassword')"
        required
        :rules="repeatPasswordRules"
        type="password"
        variant="outlined"
      />

      <div v-if="hasError" class="text-error mb-4"> {{ $t('message.register.errorMessages.default') }} </div>

      <Button
        color="primary"
        :loading="loading"
        size="large"
        :text="t('message.register.signUp')"
        type="submit"
      />
    </v-form>
  </v-container>
</template>
