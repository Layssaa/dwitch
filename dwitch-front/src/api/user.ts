import { userApi } from './axios';
import type { IMyChannel } from './types';

userApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

async function getUserChannels ():Promise<IMyChannel>{
  const response = await userApi.get('/user/channels');
  return response.data.channel
}

export {
  getUserChannels,
}
