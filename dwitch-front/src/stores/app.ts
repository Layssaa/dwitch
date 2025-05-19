import type { IBroadcast, IChannels } from '@/api/types'
import { defineStore } from 'pinia'

export const useChannelsStore = defineStore('app', {
  state: () => ({
    channels: [] as IChannels[],
    broadcasts: [] as IBroadcast[],
  }),
  actions: {
    setChannels (channels: IChannels[]) {
      this.channels = channels
    },
    setBroadcasts (broadcasts: IBroadcast[]) {
      this.broadcasts = broadcasts
    },
  },
})
