<script lang="ts" setup>
  import { startABroadcast } from '@/api/broadcast';
  import { useUserStore } from '@/stores/user';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const userStore = useUserStore();

  async function initBroadCast (){
    try {

      const hasChannel = userStore.channel?.id

      if(hasChannel){
        await startABroadcast({
          channelId: hasChannel,
        })
      }else {
        const message = t('message.channels.feedbacks.dontHaveAChannel');
        alert(message);
      }

    } catch (error) {
      console.log(error);
      const message = t('message.channels.feedbacks.unableToStartTransmission');
      alert(message);
    }
  }

</script>
<template>
  <div class="my-4">
    <Button color="tertiary" :text="t('message.channels.startBtn')" @click="initBroadCast" />
  </div>
</template>
