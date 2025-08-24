import type { IBroadcast, IChannels } from '@/api/types'
import { defineStore } from 'pinia'

export const useChannelsStore = defineStore('channels', {
  state: () => ({
    channels: [] as IChannels[],
    myBroadcastId: null as string | null,
    broadcasts: [] as IBroadcast[],
  }),
  actions: {
    setChannels (channels: IChannels[]) {
      this.channels = channels
    },
    setBroadcasts (broadcasts: IBroadcast[]) {
      this.broadcasts = broadcasts
    },
    setMyBroadcastId (broadcastId: string) {
      this.myBroadcastId = broadcastId
    },
  },
})
