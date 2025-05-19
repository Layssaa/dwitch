import type { IChannels } from '@/api/types'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    channel: null as IChannels | null,
  }),
  actions: {
    setUserChannel (channel: IChannels) {
      this.channel = channel
    },
  },
})
