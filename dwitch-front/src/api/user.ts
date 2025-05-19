import { userApi } from './axios';
import type { IChannels } from './types';

userApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

async function getUserChannels ():Promise<IChannels>{
  const response = await userApi.get('/user/channels');
  return response.data.channel
}

export {
  getUserChannels,
}
