<script lang="ts" setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { authApi } from '@/api/axios'
  import Button from '../UI/Button/Button.vue'
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const router = useRouter()

  const valid = ref(false)
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const hasError = ref(false)

  const emailRules = [
    (value: string) => !!value || t('message.login.errorMessages.emptyEmail'),
    (value: string) => /.+@.+\..+/.test(value) || t('message.login.errorMessages.invalidEmail'),
  ]

  const passwordRules = [
    (value: string) => !!value || t('message.login.errorMessages.password'),
  ]
  const submit = async () => {
    if (!valid.value) return

    loading.value = true
    hasError.value = false

    try {
      const response = await authApi.post('/auth/login', {
        email: email.value,
        password: password.value,
      })

      localStorage.setItem('token', response.data.authToken)
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
        v-model="email"
        class="ma-2"
        :label="t('message.login.email')"
        required
        :rules="emailRules"
        variant="outlined"
      />

      <v-text-field
        v-model="password"
        class="ma-2"
        :label="t('message.login.password')"
        required
        :rules="passwordRules"
        type="password"
        variant="outlined"
      />

      <p v-if="hasError" class="my-6 text-error">
        <b>*  {{ $t('message.login.errorMessages.default') }} *</b>
      </p>

      <Button
        color="primary"
        :loading="loading"
        size="large"
        :text="t('message.login.login')"
        type="submit"
      />
    </v-form>
  </v-container>
</template>
