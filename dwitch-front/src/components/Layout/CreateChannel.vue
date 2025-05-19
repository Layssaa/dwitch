<script setup lang="ts">
  import { ref, shallowRef } from 'vue'

  import type { IChannels } from '@/api/types';
  import { createChannel, getAllChannels } from '@/api/channels';
  import Button from './UI/Button/Button.vue';

  import { useI18n } from 'vue-i18n'
  import { useChannelsStore } from '@/stores/app';

  const { t } = useI18n()

  const channelsStore = useChannelsStore();

  const dialog = shallowRef(false)
  const createdChannel = ref<IChannels[]>([])
  const hasError = ref(false)
  const isLoading = ref(false)
  const valid = ref(false)
  const name = ref('')
  const description = ref('')

  const nameRules = [
    (value: string) => !!value || t('message.channels.inputs.errorsMessages.emptyName'),
  ]

  const descriptionRules = [
    (value: string) => !!value || t('message.channels.inputs.errorsMessages.emptyDescription'),
  ]

  async function submitCreateChannel () {
    if (!valid.value) return

    isLoading.value = true
    hasError.value = false

    try {
      createdChannel.value = await createChannel({
        name: name.value,
        about: description.value,
      });
      const channels = await getAllChannels();
      channelsStore.setChannels(channels)
      dialog.value = false
    } catch (error) {
      console.error(error);
      hasError.value = true
    } finally {
      isLoading.value = false
    }
  }


</script>
<template>
  <div class=" text-center">
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">

        <p class="text-lg-h5 text-title my-8">
          {{ $t('message.channels.invite') }}
          <Button color="primary" :text="t('message.channels.createChannel')" v-bind="activatorProps" />
        </p>

      </template>

      <v-form v-model="valid" @submit.prevent="submitCreateChannel">
        <v-card
          :title="t('message.channels.createChannel')"
        >
          <v-card-text>
            <v-text-field
              v-model="name"
              :label="t('message.channels.inputs.channelName')"
              required
              :rules="nameRules"
              variant="outlined"
            />
            <v-text-field
              v-model="description"
              :label="t('message.channels.inputs.description')"
              required
              :rules="descriptionRules"
              variant="outlined"
            />
          </v-card-text>

          <v-divider />

          <v-card-actions>
            <v-spacer />
            <Button
              class="text-title"
              :disabled="isLoading"
              :text="t('message.channels.inputs.cancelBTN')"
              variant="plain"
              @click="dialog = false"
            />
            <Button
              color="primary"
              :loading="isLoading"
              :text="t('message.channels.inputs.confirmBTN')"
              type="submit"
              variant="tonal"
            />
          </v-card-actions>
        </v-card>
      </v-form>

    </v-dialog>
  </div>
</template>
