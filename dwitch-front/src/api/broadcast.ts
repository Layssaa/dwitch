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

interface ICreateBroadcastResponse {
  message: string;
  broadcastId: string;
}
async function startABroadcast (data:IStartABroadcast): Promise<ICreateBroadcastResponse>{
  return broadcastsApi.post('/broadcasts/start', data);
}

async function finishBroadcast (data: { broadcastId: string }){
  return broadcastsApi.post('/broadcasts/finished', data);
}


export {
  startABroadcast,
  finishBroadcast,
}
