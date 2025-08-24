<script lang="ts" setup>
  import { finishBroadcast } from '@/api/broadcast';
  import { useChannelsStore } from '@/stores/app';
  import { useUserStore } from '@/stores/user';
  import { useI18n } from 'vue-i18n'

  const { t } = useI18n()

  const userStore = useUserStore();
  const channelStore = useChannelsStore();

  async function finishBroadCast (){
    try {

      const hasChannel = userStore.channel?.id;
      const { myBroadcastId } = channelStore

      if(hasChannel && myBroadcastId){
        await finishBroadcast({
          broadcastId: myBroadcastId,
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
  <div v-if="channelStore.myBroadcastId" class="my-4">
    <Button color="tertiary" :text="t('message.channels.finishBtn')" @click="finishBroadCast" />
  </div>
</template>
