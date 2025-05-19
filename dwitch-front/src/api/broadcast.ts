import { broadcastsApi } from './axios';

broadcastsApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
})

interface IStartABroadcast {
  channelId: string
}
async function startABroadcast (data:IStartABroadcast){
  return broadcastsApi.post('/broadcasts/start', data);
}

export {
  startABroadcast,
}
